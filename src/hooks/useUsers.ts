import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/authService";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../types/types";
import { CustomerRegisterFormData } from "../schemas/customerSchema";
 
export const useRegisterCustomer = () => {
  return useMutation<void, AxiosError<ApiErrorResponse>, CustomerRegisterFormData>({
    mutationFn: async (payload) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("email", payload.email);
      formData.append("phone", payload.phone);
      formData.append("gender", payload.gender);
      formData.append("password", payload.password);
      formData.append("password_confirmation", payload.password_confirmation);
      if (payload.photo) {
        formData.append("photo", payload.photo);
      }

      await authService.registerCustomer(formData); 
    },
  });
};