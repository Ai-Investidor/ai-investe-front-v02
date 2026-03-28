<template>
  <q-layout view="lHh Lpr lFf">
    <c-header @click:toggle="toggleLeftDrawer" />

    <c-sidebar :open="leftDrawerOpen" />

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
      leftDrawerOpen: true,
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
};
</script>