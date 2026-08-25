import api from "./axios";
import type { AuthResponse, User } from "../types";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  college?: string;
  branch?: string;
  year?: string;
}

export const registerRequest = (data: RegisterPayload) =>
  api.post<AuthResponse>("/auth/register", data).then((res) => res.data);

export const loginRequest = (data: { email: string; password: string }) =>
  api.post<AuthResponse>("/auth/login", data).then((res) => res.data);

export const getMeRequest = () =>
  api.get<{ success: boolean; user: User }>("/auth/me").then((res) => res.data);
