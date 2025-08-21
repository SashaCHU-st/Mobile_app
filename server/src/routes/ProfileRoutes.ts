import fastify, { FastifyInstance } from "fastify";
import { ProfileSchema } from "../schema/ProfileSchema";
import { editProfile } from "../controllers/EditProfileControllers";

export async function ProfileRoutes(app: FastifyInstance) {
  app.post("/editProfile", async (req, reply) => {
    const validated = ProfileSchema.safeParse(req.body);
    if (!validated.success) {
      const message = validated.error.issues[0]?.message || "Validation failed";
      reply.code(400).send({ message });
      return;
    }
    return editProfile({ ...req, body: validated.data }, reply);
  });
}
