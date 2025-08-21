import { FastifyReply, FastifyRequest } from "fastify";
import {
  addFavoriteBody,
  friendsFavoriteBody,
  commentsBody,
  oldCommentsBody,
} from "../types/types";
import { pool } from "../db/db";

export async function addFavorites(
  req: FastifyRequest<{ Body: addFavoriteBody }>,
  reply: FastifyReply
) {
  console.log("WE IN FAV");
  const userId = (req.user as { id: number }).id;
  const { image, food_id, summary, title } = req.body;

  try {
    const checkExists = await pool.query(`SELECT food_id FROM favorites WHERE user_id = $1 AND food_id = $2`,[userId, food_id]);
    // console.log("IIII=>", checkExists.rows)
    if (checkExists.rowCount === 0) {
    const addFav = await pool.query(
      `INSERT INTO favorites (user_id, image, food_id,summary, title )
         VALUES ($1, $2, $3, $4, $5)`,
      [userId, image, food_id, summary, title]
    );
    return reply.code(201).send({ message: "added", addFav: addFav });
    } else {
      return reply.code(400).send({ message: "Already in Favorite" });
    }
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
          ON fr.friends_id = u.id OR fr.user_id = u.id
      JOIN favorites f 
          ON f.user_id = u.id
      WHERE fr.confirmrequest = 1 AND u.id != $1
        AND (fr.user_id = $1 OR fr.friends_id = $1);

      `,
      [userId]
    );

    const grouped = rows.reduce((acc, row) => {
      if (!acc[row.name]) acc[row.name] = [];
      acc[row.name].push({
        id: row.id,
        title: row.title,
        image: row.image,
        summary: row.summary,
      });
      return acc;
    }, {});

    // console.log(grouped);

    return reply.code(200).send({ checkFriendsFav: grouped });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function commentsFavorites(
  req: FastifyRequest<{ Body: commentsBody }>,
  reply: FastifyReply
) {
  const userId = (req.user as { id: number }).id;
  const { comments, id, time } = req.body;

  try {
    if (!comments) {
      return reply.code(400).send({ message:"Comments cannot be empty" });
    }
    const now = new Date();
    const localTime = now.toLocaleString("sv-SE", {
      timeZone: "Europe/Helsinki",
    });
    const addComment = await pool.query(
      `INSERT INTO comments  (comment_id,comment, time, user_id) VALUES ($1, $2, $3, $4)`,
      [id, comments, localTime, userId]
    );

    return reply.code(201).send({ comments: addComment });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function getOldComments(
  req: FastifyRequest<{ Body: oldCommentsBody }>,
  reply: FastifyReply
) {
  const { id } = req.body;

  try {
    const checkComments = await pool.query(
      `SELECT u.name,c.id, c.comment, c.time
        FROM comments c
        JOIN users u ON c.user_id = u.id
        WHERE comment_id = $1`,
      [id]
    );
    // console.log("YYYY=>", checkComments)
    return reply.code(200).send({ comments: checkComments.rows });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
