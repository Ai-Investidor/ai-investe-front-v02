<template>
  <div
    class="border border-black/10 rounded-lg md:rounded-none bg-white dark:!bg-surface-600"
    :class="{ '!border-0 !bg-transparent': !showHeader }">
    <!-- Header -->
    <div
      v-if="showHeader"
      class="px-14 py-8 h-56 border-b border-black/5 flex justify-between items-center">
      <Skeleton width="7.5rem" height="1rem" />
      <div class="flex items-center gap-16">
        <Skeleton width="2rem" height="2rem" border-radius="0.25rem" />
        <Skeleton width="2rem" height="2rem" border-radius="0.25rem" />
      </div>
    </div>

    <SkeletonCards />
  </div>
</template>

<script>
import Skeleton from 'primevue/skeleton'
import SkeletonCards from 'components/Skeleton/CSkeletonCards.vue'

export default {
  name: 'CSkeletonSectionCards',

  components: {
    Skeleton,
    SkeletonCards,
  },

  props: {
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="sass" scoped></style>
