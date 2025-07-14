import Fastify from "fastify";
import cors from "@fastify/cors";
import {pool} from "./db/db"
import { AuthRoutes } from "./routes/AuthRoute";

const app = Fastify();

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
});


app.register(AuthRoutes)
pool.connect()
  .then(() => {
    console.log("✅ DB connected");
    return app.listen({ port: 3001 ,host: "0.0.0.0" });
  })
  .then(() => {
    console.log("kuku");
  })
 .catch((err) => {
  console.error("❌ DB connection error:", err);
});
