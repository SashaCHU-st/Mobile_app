import { FastifyInstance } from "fastify";
import { allUsers } from "../controllers/AllUsers";

export async function UsersRoutes(app:FastifyInstance) {

    app.get("/users", allUsers)
    
}