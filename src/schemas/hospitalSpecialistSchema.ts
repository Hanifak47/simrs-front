import { z } from "zod";

export const assignHospitalSpecialistSchema = z.object({
  specialist_id: z.string().min(1, "Specialist is required"),
});

export type AssignHospitalSpecialistFormData = z.infer<typeof assignHospitalSpecialistSchema>;
