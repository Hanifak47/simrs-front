import { z } from "zod";

export const doctorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  about: z.string().min(1, "About is required"),
  photo: z
    .custom<File>((file) => file instanceof File, "Photo is required")
    .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
      message: "Invalid file format (PNG or JPEG only)",
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Image must be under 2MB",
    })
    .optional(),
  hospital_id: z.coerce.number().min(1, "Please select a hospital"),
  specialist_id: z.coerce.number().min(1, "Please select a specialist"),
  gender: z.enum(["Male", "Female"], { required_error: "Gender is required" }),
  yoe: z.coerce.number().min(1, "Experience must be at least 1 year"),
});

export type DoctorFormData = z.infer<typeof doctorSchema>;