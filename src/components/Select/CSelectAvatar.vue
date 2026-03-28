<template>
  <OSelect
    ref="componentRef"
    v-model="model"
    class="select-avatar"
    :class="{ 'have-model': model }"
    option-value="id"
    option-label="nome"
    use-input
    :popup-content-class="popupClass"
    v-bind="$attrs"
    @update:model-value="(value) => $emit('updateValue', value)">
    <template #option="{ option }">
      <div class="flex items-center gap-8 px-16 py-16 cursor-pointer hover:bg-surface-50">
        <OAvatar
          :nome="option[nomeKey]"
          :foto="option[fotoKey]"
          class-avatar="!w-[1.25em] !h-[1.25em]" />
      </div>
    </template>

    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex items-center">
        <OAvatar
          class-avatar="!w-[0.74em] !h-[0.74em]"
          :nome="slotProps.value[nomeKey]"
          :foto="slotProps.value[fotoKey]"
          :class-text="classText" />
      </div>
      <span v-else>{{ slotProps.placeholder }}</span>
    </template>
  </OSelect>
</template>

<script>
import OAvatar from 'components/Avatar/OAvatar.vue'
import OSelect from 'components/Select/CSelect.vue'

export default {
  name: 'CSelectAvatar',

  components: {
    OAvatar,
    OSelect,
  },

  inheritAttrs: false,

  props: {
    modelValue: {
      type: [String, Number, Object],
      default: '',
    },
    classText: {
      type: String,
      default: '',
    },
    popupClass: {
      type: String,
      default: 'select-menu',
    },
    nomeKey: {
      type: String,
      default: 'nome',
    },
    fotoKey: {
      type: String,
      default: 'foto',
    },
  },

  emits: ['updateValue'],

  data() {
    return {
      model: this.modelValue,
    }
  },

  watch: {
    modelValue(v) {
      this.model = v
    },
  },
}
</script>

<style lang="sass" scoped>
// .select-avatar
//   :deep(.q-placeholder)
//     opacity: 0 !important
//   &.have-model
//     :deep(.q-placeholder)
//       opacity: 1 !important
</style>
