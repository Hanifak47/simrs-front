import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/axiosConfig";
import { AxiosError } from "axios";
import { BookingTransaction } from "../types/types";

export const useFetchTransactions = () => {
  return useQuery<BookingTransaction[], AxiosError>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await apiClient.get("/transactions");
      return response.data;
    },
  });
};

 
export const useFetchTransaction = (id: number) => {
    return useQuery<BookingTransaction, AxiosError>({
      queryKey: ["transaction", id],
      queryFn: async () => {
        const response = await apiClient.get(`/transactions/${id}`);
        return response.data ?? [];
      },
      enabled: !!id,
    });
  };

  export const useUpdateTransactionStatus = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({
        id,
        status,
      }: {
        id: number;
        status: "Approved" | "Rejected";
      }) => {
        const response = await apiClient.patch(`/transactions/${id}/status`, { status });
        return response.data;
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ["transaction", id] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      },
    });
  };
