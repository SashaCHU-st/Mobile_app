import { FastifyInstance } from "fastify";
import { AddFriendSchema, MyFriendSchema } from "../schema/FriendSchema";
import { addFriend, myFriend } from "../controllers/Friends";

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
    app.post("/myFriends", async (req, reply) => {
    const validated = MyFriendSchema.safeParse(req.body);
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }
    return myFriend({...req, body:validated.data}, reply)
  });
}
