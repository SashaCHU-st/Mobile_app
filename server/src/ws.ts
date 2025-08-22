import { Server } from "http";
import WebSocket, { WebSocketServer } from "ws";
import { FastifyInstance } from "fastify";
import { pool } from "./db/db";

export function initWebSocket(server: Server, app: FastifyInstance) {
  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", async (ws, req) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const token = url.searchParams.get("token");
    if (!token) return ws.close();

    const decoded = app.jwt.verify(token) as any;
    const userId = decoded.id;

    (ws as any).userId = userId;

    ws.on("message", async (msg: string | Buffer) => {
      try {
        const text = typeof msg === "string" ? msg : msg.toString();
        const data = JSON.parse(text);

        if (!data.message || !data.to) return;
            const now = new Date();
    const localTime = now.toLocaleString("sv-SE", {
      timeZone: "Europe/Helsinki",
    });
        await pool.query(
          'INSERT INTO messages("from", "to", message, created_at) VALUES($1, $2, $3, $4)',
          [userId, data.to, data.message, localTime]
        );
        const result = await pool.query(
          "SELECT id, name FROM users WHERE id = ANY($1::int[])",
          [[userId, data.to]]
        );

        const usersMap: Record<number, { id: number; name: string }> = {};
        result.rows.forEach((row) => {
          usersMap[row.id] = { id: row.id, name: row.name };
        });

        const savedMsg = {
          from: usersMap[userId],
          to: usersMap[data.to],
          message: data.message,
          created_at:data.created_at
        };

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            const clientUserId = (client as any).userId;
            if (clientUserId === userId || clientUserId === data.to) {
              client.send(JSON.stringify(savedMsg));
            }
          }
        });
      } catch (err) {
        console.error(err);
      }
    });
  });
}
