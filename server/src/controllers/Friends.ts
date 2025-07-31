import { FastifyReply, FastifyRequest } from "fastify";
import { addFriendBody, deleteFriendBody } from "../types/types";
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
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function myFriend(req: FastifyRequest, reply: FastifyReply) {
  const userId = (req.user as { id: number }).id;

  try {
    const myFriends = await pool.query(
      `SELECT u.id, u.name
      FROM friends f
      JOIN users u ON f.friends_id = u.id
      WHERE f.user_id = $1 AND f.confirmRequest = 1`,
      [userId]
    );
    console.log("MY friends", myFriends.rows);
    myFriends.rows.map((row) => row.friends_id);
    return reply.code(200).send({ friends: myFriends.rows });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}


export async function deleteFriend(  req: FastifyRequest<{ Body: deleteFriendBody }>,
  reply: FastifyReply) {
    const userId = (req.user as { id: number }).id;
  const { friendsId } = req.body;

  try
  {
    await pool.query(`DELETE FROM friends WHERE user_id = $1 AND friends_id = $2`,[userId, friendsId])

    return reply.code(200).send({ message: "friend Deleted"  });
  }catch (err: any) { 
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}