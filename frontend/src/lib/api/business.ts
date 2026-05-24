import { api } from "./client";

export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  businessType?: string;
  ownerName?: string;
  phone?: string;
  email?: string;
  city?: string;
  address?: string;
}

export interface CreateBusinessPayload {
  name: string;
  slug: string;
  description: string;
}

export interface UpdateBusinessPayload {
  name: string;
  businessType: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  description: string;
}

export function createBusiness(
  data: CreateBusinessPayload
) {
  return api<Business>("/Business", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getMyBusiness() {
  return api<Business>("/Business/me");
}

export function updateBusiness(id: string, data: UpdateBusinessPayload) {
  return api<Business>(`/Business/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}