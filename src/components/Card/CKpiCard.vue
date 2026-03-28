<template>
  <Card :pt="cardPt" v-bind="$attrs">
    <template #content>
      <span class="text-caps-2 text-surface-500 dark:text-white/50">
        {{ label }}
      </span>
      <span class="text-headline-2 text-surface-950 dark:text-white mt-8 block">
        {{ value }}
      </span>
      <span v-if="subtitle" class="text-paragraph-4 text-surface-500 dark:text-white/40 mt-16 block ">
        {{ subtitle }}
      </span>
      <slot />
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card'

export default {
  name: 'CKpiCard',

  components: {
    Card,
  },

  props: {
    label: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
    subtitle: { type: String, default: '' },
  },

  data() {
    return {
      cardPt: {
        root: { class: '!shadow-none !rounded-12 !border border-surface-200 dark:!border-white/10  dark:bg-white/5' },
        body: { class: '!p-0' },
        content: { class: '!p-24 ' },
      },
    }
  },
}
</script>
