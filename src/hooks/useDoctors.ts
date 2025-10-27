import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/axiosConfig";
import { AxiosError } from "axios";
import {
  ApiErrorResponse,
  CreateDoctorPayload,
  Doctor,
} from "../types/types";

export type DoctorAvailability = {
  [date: string]: string[];
};

export const useDoctorAvailability = (doctorId: number) => {
  return useQuery<DoctorAvailability, AxiosError>({
    queryKey: ["doctor-availability", doctorId],
    queryFn: async () => {
      const response = await apiClient.get(`/doctors/${doctorId}/available-slots`);
      return response.data.data;  
    },
    enabled: !!doctorId,
  });
};



export const useFetchDoctors = () => {
  return useQuery<Doctor[], AxiosError>({
    queryKey: ["doctors"],
    queryFn: async () => {
      const response = await apiClient.get("/doctors");
      return response.data;
    },
  });
};


export const useFetchDoctor = (id: number) => {
  return useQuery<Doctor, AxiosError>({
    queryKey: ["doctor", id],
    queryFn: async () => {
      const response = await apiClient.get(`/doctors/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};


export const useCreateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation<Doctor, AxiosError<ApiErrorResponse>, CreateDoctorPayload>({
    mutationFn: async (payload) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("gender", payload.gender);
      formData.append("about", payload.about);
      formData.append("yoe", String(payload.yoe));
      formData.append("specialist_id", String(payload.specialist_id));
      formData.append("hospital_id", String(payload.hospital_id));

      if (payload.photo) {
        formData.append("photo", payload.photo);
      }
      // formData.append("photo", payload.photo);

      const response = await apiClient.post("/doctors", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};


export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation<Doctor, AxiosError<ApiErrorResponse>, { id: number } & CreateDoctorPayload>({
    mutationFn: async ({ id, ...payload }) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("gender", payload.gender);
      formData.append("about", payload.about);
      formData.append("yoe", String(payload.yoe));
      formData.append("specialist_id", String(payload.specialist_id));
      formData.append("hospital_id", String(payload.hospital_id));
      formData.append("_method", "PUT");  

      if (payload.photo) {
        formData.append("photo", payload.photo);
      }

      const response = await apiClient.post(`/doctors/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor", id] });
    },
  });
};


export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/doctors/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: (error: AxiosError) => {
      console.error("Failed to delete category:", error.message);
    },
  });
};

export const useDoctorsByHospitalSpecialist = (
  hospitalId: number,
  specialistId: number
) => {
  return useQuery<Doctor[], AxiosError>({
    queryKey: ["doctors", { hospitalId, specialistId }],

    queryFn: async () => {
      const response = await apiClient.get("/doctors-filter", {
        params: {
          hospital_id: hospitalId,
          specialist_id: specialistId,
        },
      });

      return response.data.data;
    },
    enabled: !!hospitalId && !!specialistId,
  });
};
