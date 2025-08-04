import { FastifyInstance } from "fastify";
import {
  AddFriendSchema,
  MyFriendSchema,
  DeleteFriendSchema,
  DeclineFriendSchema,
  ConfirmFriendSchema
} from "../schema/FriendSchema";
import {
  addFriend,
  myFriend,
  deleteFriend,
  confirmFriend,
  checkRequests,
  declineFriend,
} from "../controllers/Friends";
import { check } from "zod";

export async function FriendsRoutes(app: FastifyInstance) {
  app.post("/addFriend", async (req, reply) => {
    const validated = AddFriendSchema.safeParse(req.body);
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }
    return addFriend({ ...req, body: validated.data }, reply);
  });
  app.post("/myFriends", async (req, reply) => {
    const validated = MyFriendSchema.safeParse(req.body);
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }
    return myFriend({ ...req, body: validated.data }, reply);
  });

  app.post("/declineFriend", async (req, reply) => {
    const validated = DeclineFriendSchema.safeParse(req.body);
    console.log(validated)
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }
    return declineFriend({ ...req, body: validated.data }, reply);
  });
    app.post("/confirmFriend", async (req, reply) => {
    const validated = ConfirmFriendSchema.safeParse(req.body);
    console.log(validated)
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }
    return confirmFriend({ ...req, body: validated.data }, reply);
  });
  app.get("/checkRequests", checkRequests);
  app.delete("/deleteFriend", async (req, reply) => {
    const validated = DeleteFriendSchema.safeParse(req.body);
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }
    return deleteFriend({ ...req, body: validated.data }, reply);
  });
}
