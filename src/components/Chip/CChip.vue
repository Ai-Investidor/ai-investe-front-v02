<template>
  <Chip
    v-bind="filteredAttrs"
    :label="$attrs.label"
    :pt="chipPt">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Chip>
</template>

<script>
import Chip from 'primevue/chip'

export default {
  name: 'CChip',

  components: {
    Chip,
  },

  inheritAttrs: false,

  computed: {
    filteredAttrs() {
      const { size, label, ...rest } = this.$attrs
      return rest
    },

    chipPt() {
      const sizeMap = {
        sm: { fontSize: '11px', padding: '0.25rem 0.25rem', height: 'auto' },
        md: { fontSize: '12px', padding: '0.125rem 0.375rem', height: '32px' },
        lg: { fontSize: '14px', padding: '0.125rem 0.5rem', height: '40px' },
      }
      const s = sizeMap[this.$attrs.size || 'md'] || sizeMap.md
      return {
        root: {
          style: `font-size: ${s.fontSize}; padding: ${s.padding}; height: ${s.height}; border-radius: 100px;`,
        },
      }
    },
  },
}
</script>
