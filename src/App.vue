<template>
  <router-view />
</template>

<script>
import { useQuasar } from "quasar";

export default {
  name: "App",

  setup() {
    const $q = useQuasar();
    const isDevMode = import.meta.env.VITE_APP_DEV_MODE === "true";

    $q.dark.set(isDevMode);
  },
};
</script>

