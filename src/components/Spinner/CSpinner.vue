<template>
  <div :style="{ width: size, height: size }" class="flex items-center justify-center">
    <ProgressSpinner
      :style="{ width: size, height: size }"
      stroke-width="4"
      animation-duration="1.5s" />
  </div>
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner'

export default {
  name: 'CSpinner',

  components: {
    ProgressSpinner,
  },

  props: {
    size: {
      type: String,
      default: '3rem',
    },
  },
}
</script>
