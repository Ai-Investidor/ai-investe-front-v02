<template>
  <div class="p-24 md:!p-16 flex gap-16 overflow-hidden">
    <div
      v-for="n in 3"
      :key="n"
      class="flex-shrink-0 w-[19rem] md:w-full"
      :class="cardsClass">
      <!-- Card skeleton -->
      <div
        class="rounded-xl bg-white dark:!bg-surface-400 border border-black/10 flex flex-col h-[99%] min-h-[22rem] overflow-hidden mt-16">
        <!-- Imagem do banner -->
        <div class="h-[8.5rem] relative p-12 rounded-t-xl overflow-hidden">
          <Skeleton width="100%" height="100%" class="absolute inset-0" border-radius="0" />
          <!-- Badge subcategoria -->
          <Skeleton
            width="3.5rem"
            height="1.25rem"
            class="relative z-10"
            border-radius="0.75rem 0.75rem 0 0" />
        </div>

        <!-- Barra de status/badges -->
        <div
          class="flex items-center border-y border-black/10 h-[2.25rem] px-12 mb-8">
          <div class="flex items-center gap-8">
            <Skeleton width="4rem" height="1.25rem" border-radius="9999px" />
            <Skeleton width="3.5rem" height="1.25rem" border-radius="9999px" />
            <Skeleton width="3rem" height="1.5rem" border-radius="0.75rem" />
          </div>
        </div>

        <!-- Titulo -->
        <div class="px-12 h-48">
          <Skeleton width="100%" height="1.25rem" class="mb-16" />
          <Skeleton width="75%" height="1.25rem" />
        </div>

        <!-- Progresso -->
        <div class="pt-24 px-12 space-y-8 mt-auto">
          <Skeleton width="4rem" height="0.75rem" />
          <Skeleton width="100%" height="0.5rem" border-radius="9999px" />
        </div>

        <!-- Botao -->
        <div class="pt-16 pb-12 px-12">
          <Skeleton width="100%" height="2.5rem" border-radius="0.5rem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from 'primevue/skeleton'

export default {
  name: 'CSkeletonCards',

  components: {
    Skeleton,
  },

  props: {
    cardsClass: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
