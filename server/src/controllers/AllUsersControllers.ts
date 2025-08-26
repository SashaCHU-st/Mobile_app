import { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/db";
import { authorisation } from "../utils/authorisation";

export async function allUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
   const userId = await authorisation(request);

    const result = await pool.query(
      `
      SELECT u.id, u.name, u.image, f.confirmRequest,
        CASE 
          WHEN f.user_id = $1 THEN 'sent'
          WHEN f.friends_id = $1 THEN 'received'
          ELSE NULL
        END as "requestFrom"
      FROM users u
      LEFT JOIN friends f
        ON (f.user_id = $1 AND f.friends_id = u.id)
        OR (f.friends_id = $1 AND f.user_id = u.id)
      WHERE u.id != $1
        AND (f.confirmRequest IS NULL OR f.confirmRequest IN (0,2))
      `,
      [userId]
    );

    return reply.code(200).send({
      Users: result.rows,
    });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function me(req: FastifyRequest, reply: FastifyReply) {
  try {
   const userId = await authorisation(req);
    const me = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);

    return reply.code(200).send({ me: me.rows[0] });
  } catch (err: any) {
    console.error("Database error:", err);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

