import { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/db";

export async function allUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
    const allUsers = await pool.query(`SELECT name, id FROM users`);

    console.log("ALL users=>", allUsers.rows);

    return reply.code(200).send({ Users: allUsers.rows });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function me(req: FastifyRequest, reply: FastifyReply) {

    const userId = (req.user as { id: number }).id;
  try {

    const me = await pool.query(`SELECT * FROM users WHERE id = $1`,[userId]);
    return reply.code(200).send({ me: me.rows });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}