<template>
  <q-btn v-bind="$attrs">
    <template v-for="(_, slot) in $slots" #[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps || {}"></slot>
    </template>
  </q-btn>
</template>

<script>
export default {
  name: 'CButton',

  inheritAttrs: false,
}
</script>

<style lang="scss" scoped></style>
