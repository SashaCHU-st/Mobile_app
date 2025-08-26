import { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/db";
import { ReadChatBody } from "../types/types";

export async function readMessage(req: FastifyRequest, reply: FastifyReply) {
  try {
const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.status(401).send({ message: "Not authorized" });
    }
    const token = authHeader.replace("Bearer ", "");

    let payload: { id: number };
    try {
      payload = await req.server.jwt.verify(token); 
    } catch (err) {
      return reply.status(401).send({ message: "Invalid token" });
    }

    const userId = payload.id;
    const { friendId } = req.params as any;
    const res = await pool.query(
      `
      SELECT 
        m."from" as from_id,
        m."to" as to_id,
        m.message,
        m.created_at,
        m.id,
        u_from.name AS from_name,
        u_to.name AS to_name
      FROM messages m
      JOIN users u_from ON m."from" = u_from.id
      JOIN users u_to ON m."to" = u_to.id
      WHERE (m."from"=$1 AND m."to"=$2) OR (m."from"=$2 AND m."to"=$1)
      ORDER BY m.created_at ASC
      `,
      [userId, friendId]
    );

    const messages = res.rows.map((row: any) => ({
      id: row.id,
      from: { id: row.from_id, name: row.from_name },
      to: { id: row.to_id, name: row.to_name },
      message: row.message,
      created_at: row.created_at,
    }));

    console.log("LLLL=>", messages);
    return messages;
  } catch (err: any) {
    console.error(err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function getChats(req: FastifyRequest, reply: FastifyReply) {
  // const userId = (req.user as { id: number }).id;

  try {
    const token = req.cookies?.auth_token;
    if (!token) {
      return reply.status(401).send({ message: "Not authorized" });
    }
    let payload: { id: number };
    try {
      payload = await req.jwtVerify();
    } catch (err) {
      return reply.status(401).send({ message: "Invalid token" });
    }

    const userId = payload.id;
    const getChats = await pool.query(
      `SELECT u.id, u.name, m.read, m.id AS message_id, m.from AS from_friend
        FROM users u
        JOIN (
            SELECT 
                CASE 
                  WHEN m."from" = $1 THEN m."to"
                  ELSE m."from"
                END AS other_user_id,
                MAX(m.id) AS last_message_id
            FROM messages m
            WHERE m."from" = $1 OR m."to" = $1
            GROUP BY other_user_id
        ) t ON u.id = t.other_user_id
        JOIN messages m ON m.id = t.last_message_id;
`,
      [userId]
    );
    console.log("OOOO=>", getChats.rows);

    return reply.code(200).send({
      chats: getChats.rows,
    });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function readChat(
  req: FastifyRequest,
  reply: FastifyReply,
  validatedBody:ReadChatBody
) {
  try {
    const token = req.cookies?.auth_token;
    if (!token) {
      return reply.status(401).send({ message: "Not authorized" });
    }
    let payload: { id: number };
    try {
      payload = await req.jwtVerify();
    } catch (err) {
      return reply.status(401).send({ message: "Invalid token" });
    }

    const to = payload.id;
    const { id } = validatedBody;
    const readMessage = await pool.query(
      `UPDATE messages SET read = true WHERE "to" = $1 AND id = $2`,
      [to, id]
    );
    return reply.code(200).send({
      chats: readMessage.rows,
    });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
