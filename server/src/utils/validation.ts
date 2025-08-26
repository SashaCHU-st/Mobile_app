import  { FastifyReply } from "fastify";
export function handleValidationError(reply: FastifyReply, message?: string) {
  reply.code(400).send({ message: message || "Validation failed" });
}