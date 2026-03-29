import { defineBoot } from "#q-app/wrappers";
import axios from "axios";
import Logger from "@boot/logger";
import { NotifyError } from "@boot/notify";

export const URLS = {
  CHAT_ADVISOR: "/chat",
};

const api = axios.create({ baseURL: "https://api.example.com",  });

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios;

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
