import { z } from "zod";

export const isAcceptingMessageSchema = z.object({
    acceptingMessage: z.boolean(),
})