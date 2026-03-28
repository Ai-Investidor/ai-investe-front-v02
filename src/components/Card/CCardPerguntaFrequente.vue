<template>
  <div
    class="CardPerguntaFrequente group cursor-pointer rounded-lg border border-black/10 bg-white dark:!bg-surface-600 p-16 transition-all hover:shadow-md hover:border-primary-30"
    @click="$emit('click', pergunta)"
  >
    <!-- Categoria badge -->
    <span
      v-if="pergunta.categoria"
      class="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary-10 rounded px-8 py-8 mb-8"
    >
      {{ pergunta.categoria }}
    </span>

    <!-- Título -->
    <h5
      class="text-headline-3 text-surface-950 dark:text-white mb-16 line-clamp-2 group-hover:text-primary transition-colors"
    >
      {{ pergunta.titulo }}
    </h5>

    <!-- Descrição truncada -->
    <p v-if="pergunta.descricao" class="text-paragraph-3 text-surface-500 dark:text-surface-400 line-clamp-2">
      {{ pergunta.descricao }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CCardPerguntaFrequente',

  props: {
    pergunta: {
      type: Object,
      required: true,
    },
  },

  emits: ['click'],
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
