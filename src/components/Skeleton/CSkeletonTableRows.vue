<template>
  <div class="flex flex-col">
    <div
      v-for="n in rows"
      :key="n"
      class="flex items-center gap-16 py-8"
      :style="{ borderBottom: '1px solid var(--p-content-border-color)' }">
      <Skeleton
        v-for="c in columns"
        :key="c"
        class="flex-1"
        height="1rem" />
    </div>
  </div>
</template>

<script>
import Skeleton from 'primevue/skeleton'

export default {
  name: 'CSkeletonTableRows',

  components: {
    Skeleton,
  },

  props: {
    rows: { type: Number, default: 5 },
    columns: { type: Number, default: 4 },
  },
}
</script>
