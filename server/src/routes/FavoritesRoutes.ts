import { FastifyInstance } from "fastify";
import { AddFavoritesSchema } from "../schema/Favorites";
import { addFavorites, myFavorites } from "../controllers/Favorites";

export async function FavoritesRoutes(app: FastifyInstance) {
  app.post("/addFavorites", async (req, reply) => {
    console.log("Received body:", req.body);
    console.log("We in favaaa")
    const validated = AddFavoritesSchema.safeParse(req.body);
    if (!validated.success) {
      console.log("Validation errors:", validated.error.issues);
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }
    return addFavorites({ ...req, body: validated.data }, reply);
  });

    app.get("/myFavorites",myFavorites);
}
