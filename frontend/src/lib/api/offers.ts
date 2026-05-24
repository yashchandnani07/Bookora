import { api } from "./client";

export interface OfferBusiness {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  city: string;
  address: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  category: string;
  originalPrice: number;
  offerPrice: number;
  totalSlots: number;
  remainingSlots: number;
  startDate: string;
  endDate: string;
  status: string;
  maxBookingPerCustomer: number;
  businessId: string;
  createdAt: string;
  business?: OfferBusiness;
}

export interface CreateOfferPayload {
  title: string;
  description: string;
  category: string;
  originalPrice: number;
  offerPrice: number;
  totalSlots: number;
  maxBookingPerCustomer: number;
  startDate: string;
  endDate: string;
  status: string;
  businessId: string;
}

export function getAllOffers() {
  return api<Offer[]>("/Offer/all");
}

export function getMyOffers() {
  return api<Offer[]>("/Offer/my");
}

export function getOfferById(id: string) {
  return api<Offer>(`/Offer/${id}`);
}

export function createOffer(data: CreateOfferPayload) {
  return api<{ message: string; offer: Offer }>("/Offer", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((response) => response.offer);
}
