import { FastifyReply, FastifyRequest } from "fastify";
import { addFriendBody } from "../types/types";
import { pool } from "../db/db";

export async function addFriend(
  req: FastifyRequest<{ Body: addFriendBody }>,
  reply: FastifyReply
) {
  const userId = (req.user as { id: number }).id;
  const { friendsId } = req.body;

  try {
    const alreadyFriend = await pool.query(
      `SELECT * FROM friends WHERE (user_id = $1 AND friends_id = $2) OR (user_id = $3 AND friends_id = $4)`,
      [userId, friendsId, friendsId, userId]
    );

    console.log("UUUU=>", alreadyFriend);
    if (alreadyFriend.rowCount === 0) {
      await pool.query(
        `INSERT INTO friends (user_id, friends_id) VALUES ($1, $2)`,
        [userId, friendsId]
      );
      return reply.code(201).send({ message: "All good" });
    } else {
      return reply.code(400).send({ message: "Alredy friends" });
    }

    // console.log("ADD friend=>", addFriend);
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
