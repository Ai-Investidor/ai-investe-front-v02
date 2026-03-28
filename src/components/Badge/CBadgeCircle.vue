<template>
  <p
    v-if="value"
    class="!h-24 w-24 shrink-0 rounded-full bg-primary grid place-items-center text-white text-paragraph-3 !font-bold"
    style="line-height: 0">
    {{ value }}
  </p>
</template>

<script>
export default {
  name: 'CBadgeCircle',

  props: {
    value: {
      type: Number,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
