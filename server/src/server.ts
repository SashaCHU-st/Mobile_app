import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { pool } from "./db/db";
import { registerRoutes } from "./routes/indexRoutes";
import { initWebSocket } from "./ws";
import cookie from '@fastify/cookie';

const app = Fastify({ bodyLimit: 5 * 1024 * 1024 });

if (!process.env.COOKIE_SECRET) {
  throw new Error(" NO COOKIE_SECRET");
}

app.register(cookie, {
  secret: process.env.COOKIE_SECRET,
  parseOptions: {}
});
if (!process.env.JWT_SECRET_KEY) {
  throw new Error("NO JWT_SECRET_KEY");
}

const jwtSecret = process.env.JWT_SECRET_KEY;
app.register(jwt, {
  secret: jwtSecret,
  cookie: {
    cookieName: "auth_token",
    signed: false
  }
});

app.register(cors, {
  origin: "http://localhost:8081",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
});

registerRoutes(app);

const server = app.server;
initWebSocket(server, app);

pool
  .connect()
  .then(() => app.listen({ port: 3001, host: "0.0.0.0" }))
  .then(() => console.log("Server running on 3001"))
  .catch((err) => console.error("❌ DB connection error:", err));
