import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be 8+ characters"),
});

export const registerSchema = z.object({
  name: z.string().min(4, "Username must be 4+ characters"),
  email: z.string().email("Enter a valid email"),
  mobile: z.string().min(10, "Enter a valid mobile number"),
  password: z.string().min(8, "Password must be 8+ characters"),
  confirmPassword: z.string().min(8, "Password must be 8+ characters")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});
