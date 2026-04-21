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
        .from(URLS.CHAT_SESSIONS)
        .select("*")
        .eq("user_id", idSession)
        .order("created_at", { ascending: false }),
    getMessagesPaginated: (
      sessionId,
      page = 1,
      pageSize = 10,
      order = "DESC",
    ) =>
      supabase.rpc(URLS.CHAT_MESSAGES_PAGINATED, {
        p_session_id: sessionId,
        p_page: page,
        p_page_size: pageSize,
        p_order: order,
      }),
  };
}
