import { FastifyReply, FastifyRequest } from "fastify";
import {
  addFriendBody,
  deleteFriendBody,
  confirmFriendBody,
} from "../types/types";
import { pool } from "../db/db";
import { ftruncate } from "fs";

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
      `SELECT u.id, u.name, u.image
      FROM friends f
      JOIN users u ON f.friends_id = u.id
      WHERE f.user_id = $1 AND f.confirmRequest = 1`,
      [userId]
    );
    return reply.code(200).send({ friends: myFriends.rows });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function deleteFriend(
  req: FastifyRequest<{ Body: deleteFriendBody }>,
  reply: FastifyReply
) {
  const userId = (req.user as { id: number }).id;
  const { friendsId } = req.body;

  try {
    await pool.query(
      `DELETE FROM friends WHERE user_id = $1 AND friends_id = $2`,
      [userId, friendsId]
    );

    return reply.code(200).send({ message: "friend Deleted" });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function confirmFriend(
  req: FastifyRequest<{ Body: confirmFriendBody }>,
  reply: FastifyReply
) {
  const userId = (req.user as { id: number }).id;
  // const { friendsId } = req.body;

  try {
    const checkRequest = await pool.query(
      `SELECT * FROM friends WHERE friends_id = $1 AND confirmRequest = 2`,
      [userId]
    );
    const friendRequest = checkRequest.rowCount;
    console.log("Check req =>", checkRequest.rows[0].user_id);

    if (friendRequest !== 0) {
      const friendId = checkRequest.rows[0].user_id;
      await pool.query(
        `UPDATE friends SET confirmRequest = 1 WHERE friends_id = $1 AND user_id = $2`,
        [userId, friendId]
      );
    }
    return reply.code(200).send({ check: checkRequest.rows });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function checkRequests(
  request: FastifyRequest,
  reply: FastifyReply
) {
  console.log("WE IN CHECK");
  const userId = (request.user as { id: number }).id;

  try {
    const checkRequest = await pool.query(
      `SELECT * FROM friends WHERE friends_id = $1 AND confirmRequest = 2`,
      [userId]
    );
    console.log("Number=>", checkRequest.rowCount);

    if (checkRequest.rowCount !== 0) {
      const requestedUsers = await pool.query(
        ` 
        SELECT f.user_id, u.id, u.name, u.image
        FROM friends f
        JOIN users u ON f.user_id = u.id
        WHERE f.friends_id = $1 AND confirmRequest = 2`,
        [userId]
      );
      return reply
        .code(200)
        .send({ friend: checkRequest.rows[0], users: requestedUsers.rows });
    }
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
