import { FastifyInstance } from "fastify";
import { readMessage, getChats, readChat } from "../controllers/ChatControllers";
import { ChatSchema } from "../schema/ChatSchema";

export async function ChatRoutes(app: FastifyInstance) {
  app.get("/chat/:userId/:friendId", readMessage);

  app.get("/getChats", getChats);
  app.post("/readChat", async (req, reply) => {
    console.log("Received body:", req.body);
    const validated = ChatSchema.safeParse(req.body);
    if (!validated.success) {
      console.log("Validation errors:", validated.error.issues);
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }
    return readChat({ ...req, body: validated.data }, reply);
  });
}
