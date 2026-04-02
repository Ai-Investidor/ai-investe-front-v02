<template>
  <div class="o-radio" :class="'size-' + sizeKey">
    <RadioButton
      v-bind="filteredAttrs"
      :input-id="filteredAttrs.name + '-' + filteredAttrs.value" />
    <label v-if="filteredAttrs.label" :for="filteredAttrs.name + '-' + filteredAttrs.value" class="o-radio__label">
      {{ filteredAttrs.label }}
    </label>
  </div>
</template>

<script>
import RadioButton from 'primevue/radiobutton'

export default {
  name: 'CRadio',

  components: {
    RadioButton,
  },

  inheritAttrs: false,

  computed: {
    sizeKey() {
      return this.$attrs.size || 'md'
    },

    filteredAttrs() {
      // eslint-disable-next-line no-unused-vars
      const { size, ...rest } = this.$attrs
      return rest
    },
  },
}
</script>

<style lang="sass" scoped>
.o-radio
  display: flex
  align-items: center
  gap: 8px

  &.size-sm .o-radio__label
    font-size: 0.75rem

  &.size-md .o-radio__label
    font-size: 0.875rem

  &.size-lg .o-radio__label
    font-size: 1rem

.o-radio__label
  cursor: pointer
</style>
