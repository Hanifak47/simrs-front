import apiClient from "./axiosConfig";
import { User } from "../types/types";
import { AxiosError } from "axios"; 
import csrfClient from "./csrfClient";

export const authService = {
  fetchUser: async (): Promise<User | null> => {
    try {
      const { data } = await apiClient.get("/user");
      return { ...data, roles: data.roles ?? [] };  
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Error fetching user.");
      }
      throw new Error("Unexpected error. Please try again.");
    }
  },

  login: async (email: string, password: string): Promise<User> => {
    try { 
       
      await csrfClient.get("/sanctum/csrf-cookie");

      const { data } = await apiClient.post(
        "/login",
        { email, password },
      ); 
      return { ...data.user, roles: data.user.roles ?? [] };
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Invalid credentials.");
      }
      throw new Error("Unexpected error. Please try again.");
    }
  }, 

  registerCustomer: async (formData: FormData) => {
    await csrfClient.get("/sanctum/csrf-cookie");

    const response = await apiClient.post("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

    logout: async (): Promise<void> => {
      try {
        await apiClient.post("/logout"); 

        window.location.href = "/";
      } catch (error) {
        console.error("Logout failed", error);
      }
    },
};
