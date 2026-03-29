<template>
  <q-layout view="lHh Lpr lFf">
    <c-header :sidebar-mini="sidebarMini" @toggle:sidebar="onToggleSidebar" />

    <c-sidebar
      :open="sidebarOpen"
      :mini="sidebarMini"
      @update:open="sidebarOpen = $event"
      @update:mini="sidebarMini = $event"
    />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import CHeader from "src/components/Header/CHeader.vue";
import CSidebar from "src/components/Sidebar/CSidebar.vue";

export default {
  name: "MainLayout",

  components: {
    CHeader,
    CSidebar,
  },

  data() {
    return {
      sidebarOpen: true,
      sidebarMini: false,
    };
  },

  methods: {
    onToggleSidebar() {
      if (this.$q.screen.gt.sm) {
        this.sidebarMini = !this.sidebarMini;
      } else {
        this.sidebarOpen = !this.sidebarOpen;
      }
    },
  },
};
</script>
