import { z } from "zod";

export const signInSchema = z.object({
    identifire: z.string(), // we can use email, username ect but indentifire is batter word
    password: z.string()
})