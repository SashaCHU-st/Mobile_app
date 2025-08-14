import { FastifyReply, FastifyRequest } from "fastify";
import { addFavoriteBody, friendsFavoriteBody } from "../types/types";
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

export async function friendsFavorites(
  req: FastifyRequest<{ Body: friendsFavoriteBody }>,
  reply: FastifyReply
) {
  const userId = (req.user as { id: number }).id;
  try {
    const { rows } = await pool.query(
      `
        SELECT 
          u.name, 
          f.image, 
          f.title, 
          f.summary,
          f.id
      FROM friends fr
      JOIN users u 
          ON fr.friends_id = u.id
      JOIN favorites f 
          ON f.user_id = u.id
      WHERE fr.confirmrequest = 1
        AND fr.user_id = $1 OR fr.friends_id = $1;
      `,
      [userId]
    );

    const grouped = rows.reduce((acc, row) => {
      if (!acc[row.name]) acc[row.name] = [];
      acc[row.name].push({ title: row.title, image: row.image, summary:row.summary });
      return acc;
    }, {});

    console.log(grouped);

    return reply.code(200).send({ checkFriendsFav: grouped });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
