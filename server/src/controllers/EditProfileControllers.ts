import { FastifyReply, FastifyRequest } from "fastify";
import { ProfileBody } from "../types/types";
import { pool } from "../db/db";
import { hashedPass } from "../utils/hashedPass";
import { authorisation } from "../utils/authorisation";

export async function editProfile(
  req: FastifyRequest,
  reply: FastifyReply,
  validatedBody:ProfileBody
) {
  try {
   const userId = await authorisation(req);
    const { name, password, image } = validatedBody;

    if (!name && !password && !image) {
      return reply.code(400).send({
        message: "At least one field must be provided",
      });
    }

    if (name && password && image) {
      await pool.query(
        `UPDATE users SET name = $1, password = $2, image = $3 WHERE id = $4`,
        [name, await hashedPass(password), image, userId]
      );
      return reply.code(200).send({
        message: "Profile updated",
      });
    }
    if (name) {
      await pool.query(`UPDATE users SET name = $1 WHERE id = $2`, [
        name,
        userId,
      ]);
      return reply.code(200).send({
        message: "Name updated",
      });
    }

    if (password) {
      await pool.query(`UPDATE users SET password = $1 WHERE id = $2`, [
        await hashedPass(password),
        userId,
      ]);
      return reply.code(200).send({
        message: "Password updated",
      });
    }

    if (image) {
      await pool.query(`UPDATE users SET image = $1 WHERE id = $2`, [
        image,
        userId,
      ]);
      return reply.code(200).send({
        message: "Image updated",
      });
    }
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
