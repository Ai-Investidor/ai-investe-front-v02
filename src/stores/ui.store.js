import { defineStore, acceptHMRUpdate } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    sidebarOpen: false,
    chatSidebarOpen: false,
  }),

  actions: {
    openMainSidebar() {
      this.chatSidebarOpen = false;
      this.sidebarOpen = true;
    },

    closeMainSidebar() {
      this.sidebarOpen = false;
    },

    setMainSidebarOpen(value) {
      this.sidebarOpen = value;
    },

    setChatSidebarOpen(value) {
      this.chatSidebarOpen = value;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUiStore, import.meta.hot));
}
