<template>
  <div
    class="inline-flex items-center text-surface-950 text-title-3 md:!text-16 dark:text-white/90"
    :class="column ? 'flex-col gap-12' : 'gap-12'">
    <OIcon :name="icon" class="text-primary w-24 h-24" :class="iconClass" />

    <p>{{ text }}</p>
    <OIcon
      v-if="tooltip"
      v-tooltip="tooltipText"
      name="error_outline"
      class="text-surface-500 dark:text-surface-400 cursor-help"
      size="1.25rem" />
  </div>
</template>

<script>
import OIcon from 'components/Icon/OIcon.vue'

export default {
  name: 'CTextIcon',

  components: {
    OIcon,
  },

  props: {
    icon: { type: String, default: '' },
    text: { type: String, default: '' },
    iconClass: { type: String, default: '' },
    tooltipText: { type: String, default: '' },
    tooltip: { type: Boolean, default: false },
    column: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss" scoped></style>
