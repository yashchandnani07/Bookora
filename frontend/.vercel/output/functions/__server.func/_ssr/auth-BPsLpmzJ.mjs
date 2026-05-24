import { a as api } from "./client-Bk_QgbDl.mjs";
function register(data) {
  return api("/Auth/register", {
    method: "POST",
    body: JSON.stringify(data)
  });
}
function login(data) {
  return api("/Auth/login", {
    method: "POST",
    body: JSON.stringify(data)
  });
}
export {
  login as l,
  register as r
};
