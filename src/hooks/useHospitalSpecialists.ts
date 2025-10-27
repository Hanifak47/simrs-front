import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "../api/axiosConfig";
import { ApiErrorResponse, AssignHospitalSpecialistPayload, DeleteHospitalSpecialistPayload, Hospital } from "../types/types"; 



export const useAssignHospitalSpecialist = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AssignHospitalSpecialistPayload,  
    AxiosError<ApiErrorResponse>,
    AssignHospitalSpecialistPayload
  >({
    mutationFn: async ({ hospital_id, specialist_id }) => {
      const response = await apiClient.post(`/hospitals/${hospital_id}/specialists`, {
        specialist_id,
      });
      return response.data;
    },
    onSuccess: (_, { hospital_id }) => {
      queryClient.invalidateQueries({ queryKey: ["hospital", hospital_id] });
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
};
 
export const useDeleteHospitalSpecialist = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<ApiErrorResponse>,
    DeleteHospitalSpecialistPayload
  >({
    mutationFn: async ({ hospital_id, specialist_id }) => {
      const response = await apiClient.delete(`/hospitals/${hospital_id}/specialists/${specialist_id}`);
      return response.data;
    },
    onSuccess: (_, { hospital_id }) => {
      queryClient.invalidateQueries({ queryKey: ["hospital", hospital_id] });
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
}; 

export const useHospitalsBySpecialist = (specialistId: number) => {
  return useQuery<Hospital[]>({
    queryKey: ["hospitals-by-specialist", specialistId],
    queryFn: async () => {
      const response = await apiClient.get(`/hospital-specialists/specialist/${specialistId}`);
      return response.data.data;
    },
    enabled: !!specialistId,
  });
};