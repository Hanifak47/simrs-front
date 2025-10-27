import { z } from "zod";

export const checkoutSchema = z.object({
  doctor_id: z.number(),
  started_at: z.string(),
  time_at: z.string(),
  proof: z
        .custom<File>((file) => file instanceof File, "proof is required")
        .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
            message: "Invalid file format (PNG or JPEG only)",
        })
        .refine((file) => file.size <= 2 * 1024 * 1024, {
            message: "Image must be under 2MB",
        }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
