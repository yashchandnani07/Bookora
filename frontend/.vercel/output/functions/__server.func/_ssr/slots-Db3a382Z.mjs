import { a as api } from "./client-Bk_QgbDl.mjs";
function getOfferSlots(offerId) {
  return api(`/OfferSlot/offer/${offerId}`);
}
export {
  getOfferSlots as g
};
