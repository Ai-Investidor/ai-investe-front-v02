<template>
  <div
    class="w-full h-[400px] flex flex-col px-32 pb-32 pt-16 rounded-lg bg-surface-200">
    <div class="flex flex-col gap-24">
      <Skeleton width="6rem" height="2rem" />
      <Skeleton width="17.75rem" height="2rem" />
    </div>

    <div class="mt-auto">
      <Skeleton width="75%" height="2rem" class="mb-16" />
      <Skeleton width="50%" height="2rem" class="mb-16" />
      <Skeleton width="50%" height="2rem" class="mb-16" />
      <Skeleton width="50%" height="2rem" />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Skeleton from 'primevue/skeleton'

export default {
  name: 'CSkeletonQuestoes',

  components: {
    Skeleton,
  },
}
</script>
