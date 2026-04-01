<template>
  <div
    :style="{ width: size, height: size }"
    class="flex items-center justify-center"
  >
    <q-spinner
      :style="{ width: size, height: size }"
      stroke-width="4"
      animation-duration="1.5s"
      color="primary"
    />
  </div>
</template>

<script>
export default {
  name: "CSpinner",

  props: {
    size: {
      type: String,
      default: "3rem",
    },
  },
};
</script>
