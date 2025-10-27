
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/axiosConfig";
import { AxiosError } from "axios";
import {
  ApiErrorResponse,
  CreateHospitalPayload,
  Hospital,
} from "../types/types";


export const useFetchHospitals = () => {
  return useQuery<Hospital[], AxiosError>({
    queryKey: ["hospitals"],
    queryFn: async () => {
      const response = await apiClient.get("/hospitals");
      return response.data;
    },
  });
};


export const useFetchHospital = (id: number) => {
  return useQuery<Hospital, AxiosError>({
    queryKey: ["hospital", id],
    queryFn: async () => {
      const response = await apiClient.get(`/hospitals/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};


export const useCreateHospital = () => {
  const queryClient = useQueryClient();

  return useMutation<Hospital, AxiosError<ApiErrorResponse>, CreateHospitalPayload>({
    mutationFn: async (payload: CreateHospitalPayload) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      if (payload.photo) {
        formData.append("photo", payload.photo);
      }
      formData.append("about", payload.about);
      formData.append("address", payload.address);
      formData.append("city", payload.city);
      formData.append("post_code", payload.post_code);
      formData.append("phone", payload.phone);

      const response = await apiClient.post("/hospitals", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
};


export const useUpdateHospital = () => {
  const queryClient = useQueryClient();

  return useMutation<Hospital, AxiosError<ApiErrorResponse>, { id: number } & CreateHospitalPayload>({
    mutationFn: async ({ id, ...payload }) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("about", payload.about);
      formData.append("address", payload.address);
      formData.append("city", payload.city);
      formData.append("post_code", payload.post_code);
      formData.append("phone", payload.phone);
      formData.append("_method", "PUT");

      if (payload.photo) {
        formData.append("photo", payload.photo);
      }

      const response = await apiClient.post(`/hospitals/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
      queryClient.invalidateQueries({ queryKey: ["hospital", id] });
    },
  });
};


export const useDeleteHospital = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/hospitals/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
};
