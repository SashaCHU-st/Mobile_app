import { FastifyInstance } from "fastify";
import {
  readMessage,
  getChats,
  readChat,
} from "../controllers/ChatControllers";
import { ChatSchema } from "../schema/ChatSchema";
import { handleValidationError } from "../utils/validation";

export async function ChatRoutes(app: FastifyInstance) {
  app.get("/chat/:userId/:friendId", readMessage);

  app.get("/getChats", getChats);
  app.post("/readChat", async (req, reply) => {
    const validated = ChatSchema.safeParse(req.body);
    if (!validated.success) {
      return handleValidationError(reply, validated.error.issues[0]?.message);
    }
    return readChat(req, reply, validated.data);
  });
}
