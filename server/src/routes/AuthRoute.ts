import { FastifyInstance } from "fastify";
import { SignUpSchema } from "../schema/AuthSchema";
import { signUp } from "../controllers/AuthController";

export async function AuthRoutes(app: FastifyInstance) {
  console.log("In AUTH ROUTES");
  app.post("/signup", async (req, reply) => {
    const validated = SignUpSchema.safeParse(req.body);
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return; 
    }
    return signUp({ ...req, body: validated.data }, reply);
  });
}
