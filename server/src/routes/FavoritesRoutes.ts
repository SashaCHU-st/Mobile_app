import { FastifyInstance } from "fastify";
import {
  AddFavoritesSchema,
  FriendsFavoritesSchema,
  CommentsSchema,
  OldCommentsSchema,
} from "../schema/FavoritesSchema";
import {
  addFavorites,
  myFavorites,
  friendsFavorites,
  commentsFavorites,
  getOldComments,
} from "../controllers/FavoritesControllers";
import { handleValidationError } from "../utils/validation";

export async function FavoritesRoutes(app: FastifyInstance) {
  app.post("/addFavorites", async (req, reply) => {
    const validated = AddFavoritesSchema.safeParse(req.body);
    if (!validated.success) {
      return handleValidationError(reply, validated.error.issues[0]?.message);
    }
    return addFavorites(req, reply, validated.data);
  });

  app.get("/myFavorites", myFavorites);

  app.get("/friendsFavorites", friendsFavorites);

  app.post("/addComments", async (req, reply) => {
    const validated = CommentsSchema.safeParse(req.body);
    if (!validated.success) {
      return handleValidationError(reply, validated.error.issues[0]?.message);
    }
    return commentsFavorites(req, reply, validated.data);
  });

  app.post("/oldComments", async (req, reply) => {
    const validated = OldCommentsSchema.safeParse(req.body);
    if (!validated.success) {
      return handleValidationError(reply, validated.error.issues[0]?.message);
    }
    return getOldComments(req, reply, validated.data);
  });
}
