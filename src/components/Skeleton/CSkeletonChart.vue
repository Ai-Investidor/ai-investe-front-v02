<template>
  <div class="h-full">
    <div
      class="flex border-b border-l border-black/10 dark:border-white/10 flex-1"
    >
      <div
        class="flex flex-[1_1_auto] w-full h-full px-16 items-end justify-evenly flex-nowrap gap-8"
      >
        <Skeleton
          v-for="n in 18"
          v-once
          :key="n"
          width="48px"
          :height="Math.random() * 100 + 'px'"
          border-radius="3px 3px 0 0"
          class="transition-[height] duration-300"
        />
      </div>
    </div>
    <div class="flex justify-center gap-24 mt-24 flex-[0]">
      <Skeleton v-for="n in 4" v-once :key="n" width="90px" height="20px" />
    </div>
  </div>
</template>

<script>
import Skeleton from 'primevue/skeleton'

export default {
  name: 'CSkeletonChart',

  components: {
    Skeleton,
  },
}
</script>
