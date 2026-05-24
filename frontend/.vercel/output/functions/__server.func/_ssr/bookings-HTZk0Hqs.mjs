import { a as api } from "./client-Bk_QgbDl.mjs";
function createBooking(data) {
  return api("/Booking", {
    method: "POST",
    body: JSON.stringify(data)
  }).then((response) => response.data);
}
function getBookingById(id) {
  return api(`/Booking/${id}`);
}
function getMyBookings() {
  return api("/Booking/my");
}
export {
  getMyBookings as a,
  createBooking as c,
  getBookingById as g
};
