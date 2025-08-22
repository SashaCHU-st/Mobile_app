import { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/db";

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
      from: { id: row.from_id, name: row.from_name },
      to: { id: row.to_id, name: row.to_name },
      message: row.message,
      created_at: row.created_at,
    }));

    return messages;
  } catch (err: any) {
    console.error(err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
