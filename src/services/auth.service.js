import { supabase } from "src/boot/superbase";

export function useAuthService() {
  return {
    login: (email, password) =>
      supabase.auth.signInWithPassword({ email, password }),

    loginWithGoogle: () =>
      supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      }),

    register: (email, password) => supabase.auth.signUp({ email, password }),

    logout: () => supabase.auth.signOut(),

    getSession: () => supabase.auth.getSession(),

    getUser: () => supabase.auth.getUser(),

    resetPassword: (email) =>
      supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/nova-senha`,
      }),

    updatePassword: (newPassword) =>
      supabase.auth.updateUser({ password: newPassword }),

    onAuthStateChange: (callback) => supabase.auth.onAuthStateChange(callback),
  };
}
