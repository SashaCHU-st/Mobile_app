import { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/db";

export async function allUsers(request: FastifyRequest, reply: FastifyReply) {
  const userId = (request.user as { id: number }).id; 

  try {
    const result = await pool.query(
      `SELECT id, name, image FROM users
       WHERE id != $1
       AND id NOT IN (
         SELECT friends_id FROM friends WHERE user_id = $1
       )`,
      [userId]
    );

    return reply.code(200).send({ Users: result.rows });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function me(req: FastifyRequest, reply: FastifyReply) {
  const userId = (req.user as { id: number }).id;
  try {
    const me = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    return reply.code(200).send({ me: me.rows });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
