<template>
  <div class="flex items-center gap-8">
    <span
      v-if="labelFalse"
      class="text-paragraph-2 text-surface-500 dark:text-white/60"
      :class="{ 'text-surface-950 dark:text-white font-medium': !modelValue }">
      {{ labelFalse }}
    </span>
    <ToggleSwitch
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)" />
    <span
      v-if="labelTrue || label"
      class="text-paragraph-2 text-surface-500 dark:text-white/60"
      :class="{ 'text-surface-950 dark:text-white font-medium': modelValue }">
      {{ modelValue ? (labelTrue || label) : (label || labelTrue) }}
    </span>
  </div>
</template>

<script>
import ToggleSwitch from 'primevue/toggleswitch'

export default {
  name: 'CToggle',

  components: {
    ToggleSwitch,
  },

  props: {
    modelValue: { type: Boolean, default: false },
    label: { type: String, default: '' },
    labelTrue: { type: String, default: '' },
    labelFalse: { type: String, default: '' },
  },

  emits: ['update:modelValue'],
}
</script>
