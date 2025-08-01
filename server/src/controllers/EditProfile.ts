import { FastifyReply, FastifyRequest } from "fastify";
import { ProfileBody } from "../types/types";
import { pool } from "../db/db";

export async function editProfile(
  req: FastifyRequest<{ Body: ProfileBody }>,
  reply: FastifyReply
) {
  const userId = (req.user as { id: number }).id;
  const { name, password, image } = req.body;

  if (!name && !password && !image) {
    return reply.code(400).send({
      message: "At least one field must be provided",
    });
  }

  try {
    if (name) {
      await pool.query(`UPDATE users SET name = $1 WHERE id = $2`, [name, userId]);
    }

    if (password) {
      await pool.query(`UPDATE users SET password = $1 WHERE id = $2`, [password, userId]);
    }

    if (image) {
      await pool.query(`UPDATE users SET image = $1 WHERE id = $2`, [image, userId]);
    }

    const updatedUser = await pool.query(`SELECT name, image FROM users WHERE id = $1`, [userId]);

    return reply.code(200).send({
      message: "Profile updated",
      user: updatedUser.rows[0],
    });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
