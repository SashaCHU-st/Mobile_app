import fastify, { FastifyInstance } from "fastify";
import { MessageSchema } from "../schema/ChatSchema";
import { sendMessage } from "../controllers/ChatControllers";

export async function ChatRoutes(app: FastifyInstance) {
    app.post("/sendMessage", async (req, reply) => {
        const validated = MessageSchema.safeParse(req.body);
        if (!validated.success) {
          const message = validated.error.issues[0]?.message || "Validation failed";
          reply.code(400).send({ message });
          return; 
        }
        return sendMessage({ ...req, body: validated.data }, reply);
      })
}