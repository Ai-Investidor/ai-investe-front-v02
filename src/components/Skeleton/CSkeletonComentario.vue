<template>
  <div class="flex flex-col gap-16">
    <div v-for="i in count" :key="i" class="rounded-lg overflow-hidden p-16">
      <!-- Header com titulo e botao ver mais -->
      <div class="flex items-center px-24 h-[72px] bg-surface-100 rounded">
        <Skeleton width="220px" height="32px" />
        <Skeleton
          width="80px"
          height="32px"
          class="ml-auto"
          border-radius="0.25rem" />
      </div>

      <!-- Comentario item -->
      <div class="p-16">
        <div class="flex items-start !px-0 w-full gap-8">
          <Skeleton width="40px" height="40px" shape="circle" />
          <div class="ml-8 flex-1">
            <!-- Nome e data -->
            <div class="flex items-center mb-8">
              <Skeleton width="120px" height="24px" />
              <Skeleton width="80px" height="24px" class="ml-8" />
            </div>
            <!-- Texto do comentario -->
            <div class="mt-8 space-y-16">
              <Skeleton width="100%" height="1rem" />
              <Skeleton width="85%" height="1rem" />
            </div>
            <!-- Botoes de acao -->
            <div class="flex items-center gap-12 mt-8">
              <Skeleton
                width="160px"
                height="28px"
                border-radius="0.25rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from 'primevue/skeleton'

export default {
  name: 'CSkeletonComentario',

  components: {
    Skeleton,
  },

  props: {
    count: {
      type: Number,
      default: 3,
    },
  },
}
</script>
