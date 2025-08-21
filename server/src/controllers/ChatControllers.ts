import { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/db";

export async function readMessage(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { userId, friendId } = request.params as any;
  try {
    const res = await pool.query(
      `SELECT * FROM messages
       WHERE ("from"=$1 AND "to"=$2) OR ("from"=$2 AND "to"=$1)
       ORDER BY created_at ASC`,
      [userId, friendId]
    );
    
    return res.rows;
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
