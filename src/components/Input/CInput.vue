<template>
  <q-input ref="refInput" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'CInput',

  inheritAttrs: false,
}
</script>

<style lang="scss" scoped></style>
