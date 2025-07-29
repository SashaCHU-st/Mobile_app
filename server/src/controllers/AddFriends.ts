import { FastifyReply, FastifyRequest } from "fastify";
import { addFriendBody } from "../types/types";
import { pool } from "../db/db";
import fr from "zod/v4/locales/fr.cjs";

export async function addFriend(
  req: FastifyRequest<{ Body: addFriendBody }>,
  reply: FastifyReply
) {
const userId = (req.user as { id: number }).id;
  const { friendsId } = req.body;

  try {
    const addFriend = await pool.query(
      `INSERT INTO friends (user_id, friends_id) VALUES ($1, $2)`,
      [userId, friendsId]
    );

    console.log("ADD friend=>", addFriend);

    return reply
        .code(201)
        .send({ message: "All good" });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
