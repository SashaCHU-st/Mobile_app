import { FastifyReply } from "fastify";
export async function notEmptySignup(
  email: string,
  name: string,
  password: string,
  reply: FastifyReply
) {
  if (!email) {
    return reply.status(400).send({ message: "Email required" });
  }
  if (!name) {
    return reply.status(400).send({ message: "Name required" });
  }
  if (!password) {
    return reply.status(400).send({ message: "Password required" });
  }
}

export async function notEmptyLogin(
  email: string,
  password: string,
  reply: FastifyReply
) {
  if (!email) {
    return reply.status(400).send({ message: "Email required" });
  }
  if (!password) {
    return reply.status(400).send({ message: "Password required" });
  }
}