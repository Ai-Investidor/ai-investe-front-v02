<template>
  <Card :pt="cardPt" v-bind="$attrs">
    <template #content>
      <slot />
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card'

export default {
  name: 'CCard',

  components: {
    Card,
  },

  inheritAttrs: false,

  props: {
    padding: {
      type: String,
      default: 'md',
      validator: (v) => ['sm', 'md'].includes(v),
    },
  },

  computed: {
    cardPt() {
      return {
        root: { class: 'o-card' },
        body: { class: 'p-0' },
        content: { class: this.padding === 'sm' ? 'p-8' : 'p-16' },
      }
    },
  },
}
</script>

<style lang="scss">
.o-card {
  box-shadow: none !important;
  border-radius: 0.75rem !important;
  border: 1px solid var(--p-surface-200) !important;
  background: var(--p-surface-0) !important;

  .body--dark & {
    border-color: rgba(255, 255, 255, 0.08) !important;
    background: var(--p-content-background) !important;
  }
}
</style>
