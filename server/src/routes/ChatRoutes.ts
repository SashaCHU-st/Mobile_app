import { FastifyInstance } from "fastify";
import { readMessage } from "../controllers/ChatControllers";

export async function ChatRoutes(app: FastifyInstance) {
  app.get("/chat/:userId/:friendId", readMessage);
}
