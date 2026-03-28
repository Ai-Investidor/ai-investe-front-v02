<template>
  <div class="flex border-b border-black/10 text-surface-500 dark:text-surface-400">
    <template v-if="isRouteTabs">
      <RouterLink
        v-for="option in options"
        :key="option.name"
        :to="option.to"
        class="tabs-menu-item flex items-center gap-8 px-16 py-10 text-paragraph-3 font-light border-b-2 transition-colors whitespace-nowrap"
        :class="model === option.name ? 'border-primary text-primary !font-medium' : 'border-transparent text-surface-500 dark:text-surface-400 hover:text-surface-950 dark:hover:text-white'"
        style="--color1: currentColor"
        @click="model = option.name">
        <OIcon v-if="option.icon" :name="option.icon" size="1.25rem" style="color: var(--color1)" />
        {{ option.label }}
      </RouterLink>
    </template>
    <template v-else>
      <button
        v-for="option in options"
        :key="option.name"
        class="tabs-menu-item flex items-center gap-8 px-16 py-10 text-paragraph-3 font-light border-b-2 transition-colors whitespace-nowrap"
        :class="model === option.name ? 'border-primary text-primary !font-medium' : 'border-transparent text-surface-500 dark:text-surface-400 hover:text-surface-950 dark:hover:text-white'"
        style="--color1: currentColor"
        @click="model = option.name">
        <OIcon v-if="option.icon" :name="option.icon" size="1.25rem" style="color: var(--color1)" />
        {{ option.label }}
      </button>
    </template>
  </div>
</template>

<script>
import OIcon from 'components/Icon/OIcon.vue'

export default {
  name: 'CTabsMenu',

  components: {
    OIcon,
  },

  props: {
    options: {
      type: Array,
      default: () => [{ icon: 'svguse:/icons.svg#folder', label: '', name: '' }],
    },
    modelValue: {
      type: String,
      default: '',
    },
    isRouteTabs: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      model: this.modelValue,
    }
  },

  watch: {
    model(val) {
      this.$emit('update:modelValue', val)
    },
    modelValue(val) {
      this.model = val
    },
  },
}
</script>

<style lang="sass">
.tabs-menu-item
  cursor: pointer
  user-select: none
</style>
