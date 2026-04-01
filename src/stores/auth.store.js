import { defineStore, acceptHMRUpdate } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    session: null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    userFullName: (state) => state.user?.user_metadata?.full_name ?? "",
    userEmail: (state) => state.user?.email ?? "",
    userAvatar: (state) => state.user?.user_metadata?.avatar_url ?? "",
  },

  actions: {
    setSession(session) {
      this.session = session;
      this.user = session?.user ?? null;
    },

    setUser(user) {
      this.user = user;
    },

    setLoading(value) {
      this.loading = value;
    },

    clear() {
      this.user = null;
      this.session = null;
      this.loading = false;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
