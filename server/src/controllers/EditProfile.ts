import { FastifyReply, FastifyRequest } from "fastify";
import { ProfileBody } from "../types/types";
import { pool } from "../db/db";
export async function editProfile(
  req: FastifyRequest<{ Body: ProfileBody }>,
  reply: FastifyReply
) {
  const userId = (req.user as { id: number }).id;
  const { name, password } = req.body;

  try {
    const updateName = await pool.query(
      `UPDATE users SET name = $1 WHERE id = $2`,
      [name, userId]
    );

    const updatePassword = await pool.query(
      `UPDATE users SET password = $1 WHERE id = $2`,
      [password, userId]
    );

    return reply
      .code(200)
      .send({
        message: "Profile updated",
        name: updateName.rows,
        password: updatePassword.rows,
      });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
