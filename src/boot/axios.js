import { defineBoot } from "#q-app/wrappers";
import axios from "axios";
import { Logger } from "@boot/logger";
import { NotifyError } from "@boot/notify";
import { useAuthStore } from "src/stores/auth.store";

const BASE_URL = import.meta.env.VITE_BASE_URL_API || "https://localhost:8000";

export const URLS = {
  CHAT_ADVISOR: "/chat",
  
  // supabase
  CHAT_SESSIONS: "/chat_sessions",
  CHAT_MESSAGES_PAGINATED: "/chat_messages_paginated",
};

const api = axios.create({ baseURL: BASE_URL });

export default defineBoot(({ app, store }) => {
  app.config.globalProperties.$axios = axios;

  api.interceptors.request.use((config) => {
    // temporario ate implementar jwt token
    const authStore = useAuthStore(store);
    config.headers.set("X-User-Id", authStore.user?.id);

    return config;
  });

  api.interceptors.response.use((response) => {
    const route = response?.config?.url;

    Logger.info(route);

    return response;
  });

  api.interceptors.response.use(null, (error) => {
    const messageError =
      error.response?.data?.error ||
      error.message ||
      "Algo inesperado aconteceu";

    NotifyError(messageError);

    return Promise.reject(error);
  });

  app.config.globalProperties.$api = api;
});

export { api };
