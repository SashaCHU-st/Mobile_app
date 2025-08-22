import { FastifyInstance } from "fastify";
import { readMessage, getChats } from "../controllers/ChatControllers";
import { ChatSchema } from "../schema/ChatSchema";

export async function ChatRoutes(app: FastifyInstance) {
  app.get("/chat/:userId/:friendId", readMessage);

  app.get("/getChats", getChats);
}
