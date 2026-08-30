import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(2, "Name must be atleast 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z.email("Invalid email format").trim().lowercase(),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be atleast 8 characters")
    .max(100, "Password cannot exceed 100 characters"),
  phone: z
    .string({ message: "Phone number is required" })
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .trim()
    .lowercase()
    .pipe(z.email({ message: "Email is invalid" })),
  password: z
    .string({ message: "Password is required" })
    .min(1, "Password cannot be empty"),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
