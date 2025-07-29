import { FastifyInstance } from "fastify";
import { AddFriendSchema } from "../schema/FriendSchema";
import { addFriend } from "../controllers/AddFriends";

export async function FriendsRoutes(app: FastifyInstance) {
  app.post("/addFriend", async (req, reply) => {
    const validated = AddFriendSchema.safeParse(req.body);
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }
    return addFriend({...req, body:validated.data}, reply)
  });
}
