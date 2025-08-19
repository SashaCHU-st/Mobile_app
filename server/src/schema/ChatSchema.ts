import { z } from "zod";

export const MessageSchema = z.object({
    userId:z.number(),
    friends_id:z.number(),
    message:z.string()

});