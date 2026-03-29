// boot/supabase.js
import { defineBoot } from "@quasar/app-vite/wrappers";
import { createClient } from "@supabase/supabase-js";
import { Logger } from "./logger";
import { useAuthStore } from "@stores/auth.store";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  Logger.error("Chaves do Supabase não encontradas. Verifique o arquivo .env");
  throw new Error(
    "Chaves do Supabase não encontradas. Verifique o arquivo .env",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export default defineBoot(async ({ app, router, store }) => {
  app.config.globalProperties.$supabase = supabase;

  const authStore = useAuthStore(store);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    authStore.setSession(session);
    authStore.setUser(session.user);
  }

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
      Logger.info("Usuário logado no boot do Quasar!");

      authStore.setSession(session);
      authStore.setUser(session.user);

      if (event === "SIGNED_IN") {
        router.push("/");
      }
    } else if (event === "SIGNED_OUT") {
      authStore.clear();
      router.push("/login");
    }
  });
});
