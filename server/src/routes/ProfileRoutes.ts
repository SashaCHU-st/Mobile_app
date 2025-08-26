import fastify, { FastifyInstance, FastifyReply } from "fastify";
import { ProfileSchema } from "../schema/ProfileSchema";
import { editProfile } from "../controllers/EditProfileControllers";
import { handleValidationError } from "../utils/validation";

export async function ProfileRoutes(app: FastifyInstance) {
  app.post("/editProfile", async (req, reply) => {
    const validated = ProfileSchema.safeParse(req.body);
    if (!validated.success) {
      return handleValidationError(reply, validated.error.issues[0]?.message);
    }
    return editProfile(req, reply, validated.data);
  });
}
