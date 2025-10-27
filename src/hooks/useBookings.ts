import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { ApiErrorResponse, BookingInfo, BookingTransaction, CreateTransactionPayload } from "../types/types";
import { AxiosError } from "axios";
import apiClient from "../api/axiosConfig";

export const useBookDoctor = () => {
  return useCallback((booking: BookingInfo) => {
    localStorage.setItem("bookingInfo", JSON.stringify(booking));
  }, []);
};

export const getBookingInfo = (): BookingInfo | null => {
  const raw = localStorage.getItem("bookingInfo");
  if (!raw) return null;

  const parsed = JSON.parse(raw);

  return {
    doctorId: parsed.doctorId,
    doctorName: parsed.doctorName,
    started_at: parsed.started_at,
    time_at: parsed.time_at,
    specialist: parsed.specialist,
    price: parsed.price,
  };
};

export const clearBookingInfo = () => {
  localStorage.removeItem("bookingInfo");
};

export const useCreateBookingTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<BookingTransaction, AxiosError<ApiErrorResponse>, CreateTransactionPayload>({
    mutationFn: async (payload) => {
      const formData = new FormData();
      formData.append("proof", payload.proof);
      formData.append("started_at", payload.started_at);
      formData.append("time_at", payload.time_at);
      formData.append("doctor_id", String(payload.doctor_id));

      const response = await apiClient.post("/my-orders", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },

    onError: (error) => {
      console.error("Booking Error:", error);
    },

  });
};

export const useMyOrders = () => {
  return useQuery<BookingTransaction[], AxiosError>({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const response = await apiClient.get("/my-orders");
      return response.data;
    },
  });
};

export const useMyOrderDetails = (id: number) => {
  return useQuery<BookingTransaction, AxiosError>({
    queryKey: ["my-order", id],
    queryFn: async () => {
      const response = await apiClient.get(`/my-orders/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};