<template>
  <q-layout view="LHH Lpp lFf">
    <CHeader />

    <CSidebar />

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
};
</script>
