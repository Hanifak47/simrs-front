import { z } from "zod";

export const customerRegisterSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(8, "Phone is required"),
    gender: z.string().min(1, "Gender is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(8, "Please confirm your password"),
    photo: z
        .custom<File>((file) => file instanceof File, "Photo is required")
        .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
            message: "Invalid file format (PNG or JPEG only)",
        })
        .refine((file) => file.size <= 2 * 1024 * 1024, {
            message: "Image must be under 2MB",
        }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type CustomerRegisterFormData = z.infer<typeof customerRegisterSchema>;
