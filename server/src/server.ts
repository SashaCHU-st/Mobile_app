import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { pool } from "./db/db";
import { registerRoutes } from "./routes/indexRoutes";
import { initWebSocket } from "./ws";

const app = Fastify({ bodyLimit: 5 * 1024 * 1024 });

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
});

const jwtSecret = process.env.SECRET || "kuku";
app.register(jwt, { secret: jwtSecret });


registerRoutes(app);

const server = app.server;
initWebSocket(server, app); 

pool
  .connect()
  .then(() => app.listen({ port: 3001, host: "0.0.0.0" }))
  .then(() => console.log("Server running on 3001"))
  .catch((err) => console.error("❌ DB connection error:", err));
