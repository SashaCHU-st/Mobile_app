import { FastifyInstance } from "fastify";
import { allUsers, me } from "../controllers/AllUsersControllers";
import { MeSchema } from "../schema/UsersSchema";

export async function UsersRoutes(app: FastifyInstance) {
  app.get("/users", allUsers);
  app.get("/me",me ) 
}
