<template>
  <q-layout view="lhh Lpr lff">
    <c-sidebar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import CSidebar from "@components/Sidebar/CSidebar.vue";

export default {
  name: "MainLayout",

  components: {
    CSidebar,
  },
};
</script>
