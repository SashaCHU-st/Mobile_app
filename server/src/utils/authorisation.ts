import {  FastifyRequest } from "fastify";

export async function authorisation(req:FastifyRequest) {
  const token = req.cookies?.auth_token;
  if (!token) {
    throw new Error("Not authorized");
  }
  let payload: { id: number };
  try {
    payload = req.server.jwt.verify(token) as { id: number };
  } catch (err) {
    throw new Error("Invalid token");
  }
  return payload.id
}
