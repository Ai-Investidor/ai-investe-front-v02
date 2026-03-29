import { defineStore, acceptHMRUpdate } from "pinia";

const STORAGE_KEY = "ai_investe_user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null"),
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
      this._persistUser();
    },

    setUser(user) {
      this.user = user;
      this._persistUser();
    },

    setLoading(value) {
      this.loading = value;
    },

    clear() {
      this.user = null;
      this.session = null;
      this.loading = false;
      localStorage.removeItem(STORAGE_KEY);
    },

    _persistUser() {
      if (this.user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
