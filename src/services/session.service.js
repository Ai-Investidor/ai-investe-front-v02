import { supabase } from "@boot/superbase";
import { URLS } from "@boot/axios";

export function useSessionService() {
  return {
    updateTitle: (p_session_id, p_title) =>
      supabase.rpc(URLS.CHAT_SESSION_UPDATE_TITLE, {
        p_session_id,
        p_title,
      }),
  };
}
