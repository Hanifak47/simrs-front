import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiErrorResponse, CreateSpecialistPayload, Specialist } from "../types/types";
import apiClient from "../api/axiosConfig";


export const useFetchSpecialists = () => {
  return useQuery<Specialist[], AxiosError>({
    queryKey: ["specialists"],
    queryFn: async () => {
      const response = await apiClient.get("/specialists");
      return response.data;
    },
  });
};


export const useFetchSpecialist = (id: number) => {
  return useQuery<Specialist, AxiosError>({
    queryKey: ["specialist", id],
    queryFn: async () => {
      const response = await apiClient.get(`/specialists/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};


export const useCreateSpecialist = () => {
  const queryClient = useQueryClient();

  return useMutation<Specialist, AxiosError<ApiErrorResponse>, CreateSpecialistPayload>({
    mutationFn: async (payload: CreateSpecialistPayload) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("price", payload.price.toString());
      formData.append("about", payload.about);
      if (payload.photo) {
        formData.append("photo", payload.photo);
      }

      const response = await apiClient.post("/specialists", formData, {
        headers: { "Content-Type": "multipart/form-data" },

      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialists"] });
    },
  });
};

export const useUpdateSpecialist = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Specialist,
    AxiosError<ApiErrorResponse>,
    { id: number } & CreateSpecialistPayload
  >({
    mutationFn: async ({ id, ...payload }) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("price", payload.price.toString());
      formData.append("about", payload.about);
      formData.append("_method", "PUT");

      if (payload.photo) {
        formData.append("photo", payload.photo);
      }

      const response = await apiClient.post(`/specialists/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["specialists"] });
      queryClient.invalidateQueries({ queryKey: ["specialist", id] });
    },
  });
};



export const useDeleteSpecialist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/specialists/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialists"] });
    },
  });
};
