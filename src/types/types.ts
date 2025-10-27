import { JSX, ReactNode } from "react";

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  photo: string;
  phone: string;
  gender: string;
  roles?: (Role | string)[];
  // roles: string;
  token?: string;
  role_names?: string[];
}

export interface Specialist {
  id: number;
  name: string;
  price: number;
  about: string;
  photo?: string;
  doctors_count: number;
  doctors: Doctor[];
  hospitals_count: number;
  updated_at: string;
  hospitals: Hospital[];
}

export interface Doctor {
  id: number;
  name: string;
  yoe: number;
  specialist_id: number;
  hospital_id: number;
  about: string;
  photo?: string;
  gender: string;
  specialist: Specialist;
  updated_at: string;
  hospital: Hospital;
  booking_transactions: BookingTransaction[];
}

export interface BookingTransaction {
  id: number;
  started_at: string;
  time_at: string;
  status: "Approved" | "Rejected" | "Waiting";
  user: User;
  doctor: Doctor;
  doctor_id: number;
  sub_total: number;
  tax_total: number;
  updated_at: string;
  grand_total: number;
  proof: string;
}

export interface CreateSpecialistPayload {
  name: string;
  price: string;
  about: string;
  photo?: File;
}

export interface CreateTransactionPayload {
  proof: File;
  doctor_id: number;
  started_at: string;
  time_at: string;
}

export interface ApiErrorResponse {
  message?: string;
  errors: Record<string, string[]>;
}

export interface Hospital {
  id: number;
  name: string;
  photo: string;
  about: string;
  address: string;
  city: string;
  post_code: string;
  phone: string;
  specialists_count: number;
  doctors_count: number;
  updated_at: string;
  specialists: Specialist[];
  doctors: Doctor[];
}

export interface CreateHospitalPayload {
  name: string;
  about: string;
  address: string;
  city: string;
  post_code: string;
  phone: string;
  photo?: File;
}

export interface CreateDoctorPayload {
  name: string;
  yoe: number;
  about: string;
  gender: string;
  specialist_id: number;
  hospital_id: number;
  photo?: File;
}

export interface DeleteHospitalSpecialistPayload {
  hospital_id: number;
  specialist_id: number;
}

export interface BookingInfo {
  doctorId: number;
  doctorName: string;
  started_at: string;
  time_at: string;
  specialist: string;
  price: number;
}

export interface AssignHospitalSpecialistPayload {
  hospital_id: number;
  specialist_id: number;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: string[];
}
