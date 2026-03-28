<template>
  <div v-if="label" class="o-select-wrapper">
    <label class="o-select-label">{{ label }}</label>
    <Select
      ref="componentRef"
      class="Oselect"
      :class="'size-' + (size || 'md')"
      v-bind="selectProps"
      :options="options"
      :filter="filter"
      :filterMatchMode="filterMatchMode"
      :showClear="showClear"
      :resetFilterOnHide="true"
      :autoFilterFocus="filter"
      :optionLabel="resolvedOptionLabel"
      :optionValue="resolvedOptionValue"
      filterPlaceholder="Buscar...">
      <template v-for="slot in forwardedSlots" :key="slot" #[slot]="slotProps">
        <slot :name="slot" v-bind="slotProps || {}"></slot>
      </template>

      <template #empty>
        <slot name="empty">
          <div class="flex items-center gap-8 px-16 py-8">
            <OIcon
              name="fluorescent"
              class="block mx-auto opacity-30"
              size="2rem" />
            <p class="opacity-40">Sem Dados para exibir.</p>
          </div>
        </slot>
      </template>
    </Select>
  </div>

  <Select
    v-else
    ref="componentRef"
    class="Oselect"
    :class="'size-' + (size || 'md')"
    v-bind="selectProps"
    :options="options"
    :filter="filter"
    :filterMatchMode="filterMatchMode"
    :showClear="showClear"
    :resetFilterOnHide="true"
    :autoFilterFocus="filter"
    :optionLabel="resolvedOptionLabel"
    :optionValue="resolvedOptionValue"
    filterPlaceholder="Buscar...">
    <template v-for="slot in forwardedSlots" :key="slot" #[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps || {}"></slot>
    </template>

    <template #empty>
      <slot name="empty">
        <div class="flex items-center gap-8 px-16 py-8">
          <OIcon
            name="fluorescent"
            class="block mx-auto opacity-30"
            size="2rem" />
          <p class="opacity-40">Sem Dados para exibir.</p>
        </div>
      </slot>
    </template>
  </Select>
</template>

<script>
import Select from 'primevue/select'
import OIcon from 'components/Icon/OIcon.vue'

const IGNORED_ATTRS = new Set([
  'popupContentClass',
  'inputDebounce',
  'transitionDuration',
  'optionsSelectedClass',
  'useInput',
  'use-input',
  'mapOptions',
  'map-options',
  'emitValue',
  'emit-value',
  'useChips',
  'use-chips',
  'fillInput',
  'fill-input',
  'stackLabel',
  'stack-label',
  'clearable',
  'multiple',
  'size',
  'label',
  'option-label',
  'option-value',
])

export default {
  name: 'CSelect',

  components: {
    Select,
    OIcon,
  },

  inheritAttrs: false,

  props: {
    options: { type: Array, default: () => [] },
    label: { type: String, default: null },
    size: { type: String, default: 'md' },
    filter: { type: Boolean, default: true },
    filterMatchMode: { type: String, default: 'contains' },
    showClear: { type: Boolean, default: true },
    optionsLabel: { type: String, default: 'label' },
    optionsValue: { type: String, default: 'value' },
  },

  computed: {
    forwardedSlots() {
      return Object.keys(this.$slots).filter((s) => s !== 'empty')
    },

    resolvedOptionLabel() {
      return this.$attrs.optionLabel || this.$attrs['option-label'] || this.optionsLabel
    },

    resolvedOptionValue() {
      return this.$attrs.optionValue || this.$attrs['option-value'] || this.optionsValue
    },

    selectProps() {
      const result = {}
      for (const [key, value] of Object.entries(this.$attrs)) {
        if (IGNORED_ATTRS.has(key)) continue
        if (key === 'optionLabel' || key === 'optionValue') continue
        result[key] = value
      }
      return result
    },
  },
}
</script>

<style lang="sass">
.o-select-wrapper
  display: flex
  flex-direction: column


.o-select-label
  font-size: 0.875rem
  font-weight: 500
  line-height: 1.25rem
  color: var(--p-text-muted-color)
  margin-bottom: 0.375rem

.Oselect
  width: 100%

  .p-select-filter
    padding: 0.375rem 0.625rem
    font-size: 0.875rem
</style>
