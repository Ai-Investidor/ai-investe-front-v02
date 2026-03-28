<template>
  <div class="max-w-[1400px] mx-auto mt-32 px-16 flex gap-24">
    <!-- Sidebar Nav skeleton -->
    <aside class="w-[200px] shrink-0 lg:hidden">
      <div class="p-16 rounded-xl sticky top-0 border border-black/10 bg-white dark:bg-surface-600">
        <div class="space-y-8">
          <Skeleton v-for="n in 7" :key="n" width="100%" height="40px" border-radius="0.5rem" />
        </div>
      </div>
    </aside>

    <!-- Conteudo principal -->
    <div class="flex-1 min-w-0">
      <div class="overflow-hidden rounded-xl border border-black/10 bg-white dark:bg-surface-600">
        <!-- Banner skeleton -->
        <Skeleton width="100%" height="200px" border-radius="0" />

        <section class="px-32">
          <!-- Avatar e nome -->
          <div class="flex flex-col !-mt-[3.75rem]">
            <Skeleton width="120px" height="120px" shape="circle" />
            <Skeleton width="250px" height="1.5rem" class="mt-16" />
          </div>

          <div class="border-t border-black/10 mt-16 mb-32"></div>

          <!-- Campos de informacao -->
          <div class="flex gap-24">
            <div class="flex-1 flex flex-col gap-8">
              <Skeleton width="60px" height="1rem" />
              <Skeleton width="180px" height="1rem" />
            </div>
            <div class="flex-1 flex flex-col gap-8">
              <Skeleton width="40px" height="1rem" />
              <Skeleton width="160px" height="1rem" />
            </div>
            <div class="flex-1 flex flex-col gap-8">
              <Skeleton width="100px" height="1rem" />
              <Skeleton width="200px" height="1rem" />
            </div>
          </div>

          <!-- Sobre mim -->
          <div class="flex items-center gap-8 mt-32">
            <Skeleton width="24px" height="24px" shape="circle" />
            <Skeleton width="100px" height="1rem" />
          </div>
          <div class="border border-black/10 p-24 pb-12 rounded-lg mt-16">
            <Skeleton width="100%" height="1rem" class="mb-8" />
            <Skeleton width="100%" height="1rem" class="mb-8" />
            <Skeleton width="100%" height="1rem" class="mb-8" />
            <Skeleton width="70%" height="1rem" />
          </div>

          <!-- Interesses -->
          <div class="flex items-center gap-8 mt-32">
            <Skeleton width="24px" height="24px" shape="circle" />
            <Skeleton width="90px" height="1rem" />
          </div>
          <div class="border border-black/10 p-24 rounded-lg mt-16 mb-24">
            <div class="flex gap-8">
              <Skeleton width="80px" height="2rem" border-radius="9999px" />
              <Skeleton width="100px" height="2rem" border-radius="9999px" />
              <Skeleton width="70px" height="2rem" border-radius="9999px" />
              <Skeleton width="90px" height="2rem" border-radius="9999px" />
              <Skeleton width="85px" height="2rem" border-radius="9999px" />
            </div>
          </div>
        </section>
      </div>

      <!-- Tabs skeleton -->
      <div class="flex gap-16 mt-16 px-16">
        <Skeleton width="100px" height="1rem" />
        <Skeleton width="130px" height="1rem" />
      </div>

      <!-- Tab content skeleton -->
      <div class="border border-black/10 p-24 overflow-hidden mb-24 mt-16 rounded-xl bg-white dark:bg-surface-600">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-8">
            <Skeleton width="24px" height="24px" shape="circle" />
            <Skeleton width="280px" height="1rem" />
          </div>
          <Skeleton width="120px" height="2.25rem" border-radius="0.25rem" />
        </div>

        <!-- Timeline skeleton -->
        <div class="mt-24">
          <!-- Ano -->
          <Skeleton width="60px" height="1rem" class="mb-16" />

          <!-- Timeline items -->
          <div v-for="n in 3" :key="n" class="flex gap-16 mb-24">
            <div class="flex flex-col items-center">
              <Skeleton width="16px" height="16px" shape="circle" />
              <Skeleton width="2px" height="80px" class="mt-8" />
            </div>
            <div class="flex-1">
              <Skeleton width="150px" height="1rem" class="mb-8" />
              <Skeleton width="100%" height="1rem" class="mb-16" />
              <Skeleton width="80%" height="1rem" class="mb-12" />
              <div class="flex gap-8">
                <Skeleton width="100px" height="2.25rem" border-radius="0.25rem" />
                <Skeleton width="120px" height="2.25rem" border-radius="0.25rem" />
              </div>
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
  name: 'CSkeletonProfile',

  components: {
    Skeleton,
  },
}
</script>
