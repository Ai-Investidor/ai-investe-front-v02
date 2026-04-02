<template>
  <label
    class="o-check flex items-center gap-8"
    :class="'size-' + sizeKey">
    <Checkbox
      v-bind="filteredAttrs"
      :binary="filteredAttrs.binary !== false"
    />
    <div
      v-if="filteredAttrs.label"
      class="o-check-label cursor-pointer leading-none"
      :class="labelSizeClass">
      {{ filteredAttrs.label }}
    </div>
    <slot></slot>
  </label>
</template>

<script>
import Checkbox from 'primevue/checkbox'

export default {
  name: 'CCheck',

  components: {
    Checkbox,
  },

  inheritAttrs: false,

  computed: {
    sizeKey() {
      return this.$attrs.size || 'md'
    },

    labelSizeClass() {
      const map = { sm: 'text-[0.75rem]', md: 'text-[0.875rem]', lg: 'text-[1rem]' }
      return map[this.sizeKey] || map.md
    },

    filteredAttrs() {
      // eslint-disable-next-line no-unused-vars
      const { size, ...rest } = this.$attrs
      return rest
    },
  },
}
</script>
