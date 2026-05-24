import { api } from "./client";
import type { Offer } from "./offers";
import type { OfferSlot } from "./slots";

export interface Booking {
  id: string;
  bookingReference: string;
  offerId: string;
  offer: Offer;
  slotId: string;
  slot: OfferSlot;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  peopleCount: number;
  specialNote?: string | null;
  status: string;
  createdAt: string;
}

export interface CreateBookingPayload {
  offerId: string;
  slotId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  peopleCount: number;
  specialNote?: string;
}

export function createBooking(data: CreateBookingPayload) {
  return api<{ success: boolean; message: string; data: Booking }>("/Booking", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((response) => response.data);
}

export function getBookingById(id: string) {
  return api<Booking>(`/Booking/${id}`);
}

export function getMyBookings() {
  return api<Booking[]>("/Booking/my");
}
