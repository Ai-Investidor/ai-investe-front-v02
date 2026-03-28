<template>
  <div class="flex flex-col gap-16">
    <span class="text-paragraph-4 text-surface-500 dark:text-surface-400">{{ label }}</span>
    <p class="text-headline-3 text-surface-950 dark:text-white/90">{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: 'CTextFieldDisplay',

  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
