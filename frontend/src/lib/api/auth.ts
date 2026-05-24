import { api } from "./client";

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  businessName: string;
  businessType: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
}

export function register(data: RegisterPayload) {
  return api<AuthResponse>("/Auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function login(data: LoginPayload) {
  return api<AuthResponse>("/Auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}