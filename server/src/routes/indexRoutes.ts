import { FastifyInstance } from "fastify";
import { AuthRoutes } from "./AuthRoute";
import { UsersRoutes } from "./UsersRoutes";
import { FriendsRoutes } from "./FriendsRoutes";
import { ProfileRoutes } from "./ProfileRoutes";
import { FavoritesRoutes } from "./FavoritesRoutes";
import { ChatRoutes } from "./ChatRoutes";

export async function registerRoutes(app: FastifyInstance) {
  app.register(AuthRoutes);
  app.register(async (instance) => {
    instance.addHook("preHandler", async (req, reply) => {
      if (req.method === "OPTIONS") return;
      try {
        await req.jwtVerify();
      } catch {
        return reply.code(401).send({ message: "Unauthorized" });
      }
    });
    instance.register(UsersRoutes);
    instance.register(FriendsRoutes);
    instance.register(ProfileRoutes);
    instance.register(FavoritesRoutes);
    instance.register(ChatRoutes);
  });
}
