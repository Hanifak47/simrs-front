// import { z } from "zod";

// export const specialistSchema = z.object({
//   name: z.string().min(1, "Name is required"),

//   price: z.string()
//     .min(1, "Price is required")  
//     .refine((val) => !isNaN(Number(val)), { message: "Price must be a valid number" })
//     .refine((val) => Number(val) >= 0, { message: "Price must be at least 0" }),


//   about: z.string().min(1, "About is required"),
//   photo: z
//     .custom<File>((file) => file instanceof File, "Photo is required")
//     .refine((file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type), {
//       message: "Invalid image format. Use PNG or JPEG.",
//     })
//     .refine((file) => file.size <= 2 * 1024 * 1024, {
//       message: "Image must be less than 2MB.",
//     }),
// });

// export type SpecialistFormData = z.infer<typeof specialistSchema>;

import { z } from "zod";

export const specialistSchema = z.object({
  name: z.string().min(1, "Name is required"),

  price: z.string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a valid number",
    })
    .refine((val) => Number(val) >= 0, {
      message: "Price must be at least 0",
    }),

  about: z.string().min(1, "About is required"),

  photo: z
    .any()
    .refine(
      (file) =>
        file === undefined ||
        file === null ||
        typeof file === "string" || // untuk foto lama (URL string)
        file instanceof File, // untuk upload baru
      { message: "Photo is required" }
    )
    .refine(
      (file) =>
        !file ||
        typeof file === "string" ||
        ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      { message: "Invalid image format. Use PNG or JPEG." }
    )
    .refine(
      (file) =>
        !file ||
        typeof file === "string" ||
        file.size <= 2 * 1024 * 1024,
      { message: "Image must be less than 2MB." }
    ),
});

export type SpecialistFormData = z.infer<typeof specialistSchema>;
