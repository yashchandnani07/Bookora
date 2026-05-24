import { a as api } from "./client-Bk_QgbDl.mjs";
function getAllOffers() {
  return api("/Offer/all");
}
function getMyOffers() {
  return api("/Offer/my");
}
function getOfferById(id) {
  return api(`/Offer/${id}`);
}
function createOffer(data) {
  return api("/Offer", {
    method: "POST",
    body: JSON.stringify(data)
  }).then((response) => response.offer);
}
export {
  getOfferById as a,
  getMyOffers as b,
  createOffer as c,
  getAllOffers as g
};
