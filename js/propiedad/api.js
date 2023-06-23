import renderCall from "./render.js";

export default async function apiCall() {
  localStorage.removeItem('globalResponse');
  renderCall();
}
