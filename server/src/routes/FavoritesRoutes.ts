import { FastifyInstance } from "fastify";
import {
  AddFavoritesSchema,
  FriendsFavoritesSchema,
  CommentsSchema,
  OldCommentsSchema,
} from "../schema/Favorites";
import {
  addFavorites,
  myFavorites,
  friendsFavorites,
  commentsFavorites,
  getOldComments,
} from "../controllers/Favorites";

export async function FavoritesRoutes(app: FastifyInstance) {
  app.post("/addFavorites", async (req, reply) => {
    console.log("Received body:", req.body);
    console.log("We in favaaa");
    const validated = AddFavoritesSchema.safeParse(req.body);
    if (!validated.success) {
      console.log("Validation errors:", validated.error.issues);
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }
    return addFavorites({ ...req, body: validated.data }, reply);
  });

  app.get("/myFavorites", myFavorites);

  app.post("/friendsFavorites", async (req, reply) => {
    const validated = FriendsFavoritesSchema.safeParse(req.body);
    if (!validated.success) {
      console.log("Validation errors:", validated.error.issues);
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }
    return friendsFavorites({ ...req, body: validated.data }, reply);
  });
  app.post("/addComments", async (req, reply) => {
    const validated = CommentsSchema.safeParse(req.body);
    if (!validated.success) {
      console.log("Validation errors:", validated.error.issues);
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }
    return commentsFavorites({ ...req, body: validated.data }, reply);
  });

  app.post("/oldComments", async (req, reply) => {
    const validated = OldCommentsSchema.safeParse(req.body);
    if (!validated.success) {
      console.log("Validation errors:", validated.error.issues);
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }
    return getOldComments({ ...req, body: validated.data }, reply);
  });
}
