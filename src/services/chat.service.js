import useApi from "@composables/useApi";
import { URLS } from "boot/axios";

export function useChatService() {
  const api = useApi();

  return {
    sendMessage: (formData) =>
      api.mutation(URLS.CHAT_ADVISOR, "post", formData),
  };
}
