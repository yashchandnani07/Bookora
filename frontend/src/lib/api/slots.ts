import { api } from "./client";

export interface OfferSlot {
  id: string;
  slotStart: string;
  slotEnd: string;
  capacity: number;
  remainingCapacity: number;
  isActive: boolean;
  createdAt: string;
  offerId: string;
  bookedCount: number;
  status: string;
}

export function getOfferSlots(offerId: string) {
  return api<OfferSlot[]>(`/OfferSlot/offer/${offerId}`);
}
