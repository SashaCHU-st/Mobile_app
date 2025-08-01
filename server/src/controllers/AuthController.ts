import { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/db";
import { notEmptyLogin, notEmptySignup } from "../utils/notEmpty";
import { SignUpBody, LoginBody } from "../types/types";

export async function signUp(
  req: FastifyRequest<{ Body: SignUpBody }>,
  reply: FastifyReply
) {
  const { email, name, password } = req.body;

  const empty = await notEmptySignup(email, name, password, reply);
  if (empty) return;
  try {
    const userExists = await pool.query(
      `SELECT email FROM users WHERE email = $1`,
      [email]
    );
    if (userExists.rowCount === 0) {
      const newUser = await pool.query(
        "INSERT INTO users (email,name,  password) VALUES ($1, $2, $3) RETURNING *",
        [email, name, password]
      );
      const user = newUser.rows[0];
      const token = reply.server.jwt.sign({ id: user.id });

      return reply
        .code(201)
        .send({ message: "All good", newUser: newUser.rows[0], token: token });
    } else {
      return reply.code(400).send({ message: "User already exists" });
    }
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

  const empty = await notEmptyLogin(email, password, reply);
  if (empty) 
    return;

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
    const userData = user.rows[0];
    const token = reply.server.jwt.sign({ id: userData.id });

    return reply
      .code(200)
      .send({ message: "All good", user: user.rows, token: token });
  } catch (err: any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
