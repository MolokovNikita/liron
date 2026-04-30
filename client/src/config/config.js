const defaultApiUrl =
  typeof window !== "undefined" ? window.location.origin : "https://liron-fura.ru";

export default {
  API_URL: import.meta.env.VITE_API_URL || defaultApiUrl,
  LOGOUT_STORAGE_KEY: import.meta.env.VITE_LOGOUT_STORAGE_KEY,
};
