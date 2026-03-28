<template>
  <OSelect
    v-bind="$attrs"
    :model-value="modelValue"
    :stack-label="selectedCount > 0"
    use-input
    emit-value
    map-options
    clearable
    multiple
    use-chips
    size="md"
    class="border-white/10 border-b-0 rounded-lg !text-paragraph-3 OSelectMultiple"
    @update:model-value="onUpdate">
    <template v-if="selectedCount" #append>
      <BadgeCircle :value="selectedCount" />
    </template>

    <template #selected-item="scope">
      <span
        class="inline-flex items-center gap-16 px-8 py-8 rounded-full bg-primary-10 text-primary text-12 m-8">
        {{ getOptionLabel(scope.opt) }}
        <OIcon
          name="close"
          class="cursor-pointer"
          size="14px"
          @click="scope.removeAtIndex(scope.index)" />
      </span>
    </template>

    <template v-for="slot in parentSlots" :key="slot" #[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps || {}" />
    </template>
  </OSelect>
</template>

<script>
import BadgeCircle from 'components/Badge/CBadgeCircle.vue'
import OIcon from 'components/Icon/OIcon.vue'
import OSelect from 'components/Select/CSelect.vue'

export default {
  name: 'CSelectMultiple',

  components: {
    BadgeCircle,
    OIcon,
    OSelect,
  },

  inheritAttrs: false,

  props: {
    modelValue: { type: Array, default: () => [] },
    optionLabel: { type: String, default: 'label' },
  },

  emits: ['update:modelValue'],

  computed: {
    selectedCount() {
      return this.modelValue?.length || 0
    },

    parentSlots() {
      return Object.keys(this.$slots).filter((s) => s !== 'selected-item' && s !== 'append')
    },
  },

  methods: {
    getOptionLabel(opt) {
      if (opt == null) return ''
      if (typeof opt === 'object') return opt[this.optionLabel] ?? opt.label ?? ''
      return String(opt)
    },

    onUpdate(val) {
      this.$emit('update:modelValue', val)
    },
  },
}
</script>

<style lang="sass" scoped>
.OSelectMultiple
  :deep(.p-select-label)
    font-size: 1rem
    line-height: 150%
    letter-spacing: -0.02rem
    @apply dark:text-white
</style>
