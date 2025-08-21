import { FastifyInstance } from "fastify";
import { allUsers, me } from "../controllers/AllUsersControllers";
import { MeSchema } from "../schema/UsersSchema";

export async function UsersRoutes(app:FastifyInstance) {

    app.get("/users", allUsers)
    
    app.post("/me", async (req, reply) => {
      const validated = MeSchema.safeParse(req.body);
      if (!validated.success) {
        const message = validated.error.issues[0]?.message || "Validation failed";
        reply.code(400).send({ message });
        return; 
      }
      return me({ ...req, body: validated.data }, reply);
    });
    
}