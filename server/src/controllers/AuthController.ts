import { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/db";
type SignUpBody = {
  email: string;
  name: string;
  password: string;
};

type LoginBody = {
  email: string;
  // name: string;
  password: string;
};

export async function signUp(
  req: FastifyRequest<{ Body: SignUpBody }>,
  reply: FastifyReply
) {
  const { email, name, password } = req.body;

  try {
    const newUser = await pool.query(
      "INSERT INTO users (email,name,  password) VALUES ($1, $2, $3)",
      [email, name, password]
    );

    return reply.code(201).send({ message: "All good", newUser: newUser });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function login(
  req: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;

  try {
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (user.rowCount === 0) {
      return reply.code(400).send({ message: "No such user" });
    }
    if (user.rows[0].password !== password) {
      return reply.code(400).send({ message: "Wrong password" });
    }
    return reply.code(200).send({ message: "All good", user: user.rows });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
