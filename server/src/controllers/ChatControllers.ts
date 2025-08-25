import { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/db";
import { ReadChatBody } from "../types/types";

export async function readMessage(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { userId, friendId } = request.params as any;

  try {
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
  const userId = (req.user as { id: number }).id;

  try {
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
  req: FastifyRequest<{ Body: ReadChatBody }>,
  reply: FastifyReply
) {

  console.log("JJJJJ")
  const { id, to } = req.body;
  try {
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
