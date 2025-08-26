import { FastifyInstance } from "fastify";
import {
  AddFriendSchema,
  DeleteFriendSchema,
  DeclineFriendSchema,
  ConfirmFriendSchema,
} from "../schema/FriendSchema";
import {
  addFriend,
  myFriend,
  deleteFriend,
  confirmFriend,
  checkRequests,
  declineFriend,
} from "../controllers/FriendsControllers";
import { handleValidationError } from "../utils/validation";

export async function FriendsRoutes(app: FastifyInstance) {
  app.post("/addFriend", async (req, reply) => {
    const validated = AddFriendSchema.safeParse(req.body);
    if (!validated.success) {
      return handleValidationError(reply, validated.error.issues[0]?.message);
    }
    return addFriend(req, reply, validated.data);
  });

  app.get("/myFriends", myFriend);

  app.post("/declineFriend", async (req, reply) => {
    const validated = DeclineFriendSchema.safeParse(req.body);
    if (!validated.success) {
      return handleValidationError(reply, validated.error.issues[0]?.message);
    }
    return declineFriend(req, reply, validated.data);
  });

  app.post("/confirmFriend", async (req, reply) => {
    const validated = ConfirmFriendSchema.safeParse(req.body);
    if (!validated.success) {
      return handleValidationError(reply, validated.error.issues[0]?.message);
    }
    return confirmFriend(req, reply, validated.data);
  });

  app.get("/checkRequests", checkRequests);

  app.delete("/deleteFriend", async (req, reply) => {
    const validated = DeleteFriendSchema.safeParse(req.body);
    if (!validated.success) {
      return handleValidationError(reply, validated.error.issues[0]?.message);
    }
    return deleteFriend(req, reply, validated.data);
  });
}
