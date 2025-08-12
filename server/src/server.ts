import Fastify, { fastify } from "fastify";
import cors from "@fastify/cors";
import { pool } from "./db/db";
import { AuthRoutes } from "./routes/AuthRoute";
import jwt from "@fastify/jwt";
import { UsersRoutes } from "./routes/UsersRoutes";
import { FriendsRoutes } from "./routes/FriendsRoutes";
import { ProfileRoutes } from "./routes/ProfileRoutes";
import { FavoritesRoutes } from "./routes/FavoritesRoutes";

const app = Fastify({
  // logger: true,
  bodyLimit: 5 * 1024 * 1024,
});

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
});

const jwtSecret = process.env.SECRET || "kuku";
app.register(jwt, { secret: jwtSecret });

app.register(AuthRoutes);
app.register(async (instance) => {
  instance.addHook("preHandler", async (req, reply) => {
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
});
pool
  .connect()
  .then(() => {
    console.log("DB connected");
    return app.listen({ port: 3001, host: "0.0.0.0" });
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
  });
