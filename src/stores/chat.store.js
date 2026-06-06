import { defineStore, acceptHMRUpdate } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => ({
    sessions: [],
    isLoadingSessions: false,
    searchTerm: "",
  }),

  actions: {
    setSessions(sessions) {
      this.sessions = sessions ?? [];
    },

    setLoadingSessions(value) {
      this.isLoadingSessions = value;
    },

    setSearchTerm(term) {
      this.searchTerm = term ?? "";
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot));
}
