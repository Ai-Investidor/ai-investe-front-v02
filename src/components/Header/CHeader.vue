<template>
  <q-header elevated class="flex items-center px-8 shrink-0">
    <div class="flex items-center gap-2.5">
      <c-button icon="svguse:icons/icons.svg#icon-aba" flat round @click="onClickToggle" />
      <span class="text-title-lg text-white">AI.INVEST</span>
    </div>
  </q-header>
</template>

<script>
import CButton from '../Button/CButton.vue'

export default {
  name: 'CHeader',

  components: {
    CButton,
  },

  emits: ['click:toggle'],

  methods: {
    onClickToggle() {
      this.$emit('click:toggle')
    },
  },
}
</script>

<style lang="sass" scoped>
.q-header
  height: $layout-header-height
</style>
