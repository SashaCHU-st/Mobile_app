import { FastifyReply, FastifyRequest } from "fastify";
import { ChatBody } from "../types/types";
import { pool } from "../db/db";

export async function sendMessage(req: FastifyRequest<{Body:ChatBody}>, reply: FastifyReply) {

    const userId = (req.user as { id: number }).id;

    const {friends_id, message} = req.body;

    try
    {
        const sendMessage = await pool.query(`INSERT INTO messages (user_id, friends_id, message) VALUES ($1, $2, $3)`,
            [userId, friends_id, message])

    return reply.code(201).send({ message: sendMessage });
    }
catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }

}