import { FastifyReply, FastifyRequest } from "fastify";
import { addFavoriteBody } from "../types/types";
import { pool } from "../db/db";

export async function addFavorites(
  req: FastifyRequest<{ Body: addFavoriteBody }>,
  reply: FastifyReply
) {
  console.log("WE IN FAV");
  const userId = (req.user as { id: number }).id;
  const { image, food_id, summary, title } = req.body;

  try {
    const addFav = await pool.query(
      `INSERT INTO favorites (user_id, image, food_id,summary, title )
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, image, food_id, summary, title]
    );
    return reply.code(201).send({ message: "added" });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function myFavorites(req: FastifyRequest, reply: FastifyReply) {
  const userId = (req.user as { id: number }).id;
  try {
    const checkFav = await pool.query(
      `SELECT * FROM favorites WHERE user_id = $1`,
      [userId]
    );
    return reply.code(200).send({ favorites: checkFav });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
