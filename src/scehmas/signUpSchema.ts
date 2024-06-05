import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "User Name must be atleast 2 characters")
    .max(20, "User Name must be not more then 20 characters")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: 'Password msut be atleast 6 characters' })
})