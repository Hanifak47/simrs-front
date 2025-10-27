import { z } from "zod";

export const hospitalSchema = z.object({
  name: z.string().min(1, "Name is required"),
  about: z.string().min(1, "About is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  post_code: z.string().min(1, "Post code is required"),
  phone: z.string().min(1, "Phone is required"),
  // Ubah validasi foto menjadi opsional jika ada existingPhoto
  photo: z
    .any() // Gunakan z.any() untuk menerima string (URL) atau File
    .optional() // Jadikan field opsional
    .refine((file) => {
      // Jika file bukan File, berarti ini adalah URL foto yang sudah ada, jadi valid
      if (typeof file === 'string') {
        return true;
      }
      // Jika file adalah File, lakukan validasi seperti sebelumnya
      if (file instanceof File) {
        return ["image/png", "image/jpeg"].includes(file.type);
      }
      // Jika tidak ada file (dan ini opsional), juga valid
      return true;
    }, {
      message: "Format File Salah (PNG or JPEG only)",
    })
    .refine((file) => {
      // Jika file bukan File, berarti ini adalah URL foto yang sudah ada, jadi valid
      if (typeof file === 'string') {
        return true;
      }
      // Jika file adalah File, lakukan validasi ukuran seperti sebelumnya
      if (file instanceof File) {
        return file.size <= 2 * 1024 * 1024;
      }
      // Jika tidak ada file (dan ini opsional), juga valid
      return true;
    }, {
      message: "Ukuran Harus Di Bawah 2MB",
    }),
});

export type HospitalFormData = z.infer<typeof hospitalSchema>;