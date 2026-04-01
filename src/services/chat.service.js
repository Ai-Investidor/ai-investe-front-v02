import useApi from "@composables/useApi";
import { URLS } from "@boot/axios";
import { supabase } from "@boot/superbase";

export function useChatService() {
  const api = useApi();

  return {
    sendMessage: (formData) =>
      api.mutation(URLS.CHAT_ADVISOR, "post", formData),
    getSessions: (idSession) =>
      supabase
        .from("chat_sessions")
        .select("*")
        .eq("user_id", idSession)
        .order("created_at", { ascending: false }),
    getMessagesSessions: (idSession) =>
      supabase
        .from("chat_messages")
        .select("*")
        .eq("session_id", idSession)
        .order("created_at", { ascending: false }),
  };
}
