<template>
  <button
    type="button"
    class="inline-flex flex-nowrap items-center justify-center gap-2 w-full h-8 px-4 bg-gradient-to-r from-dark to-dark-card border border-chat-border shadow-button text-dark-text rounded-button text-paragraph-3 cursor-pointer transition-opacity hover:opacity-80"
    aria-label="Registrar nova interação"
    @click="$emit('new-chat')"
  >
    <q-icon name="add" size="1rem" color="primary" />
    <span class="flex-1">Registrar Interação</span>
  </button>
</template>

<script>
export default {
  name: "CChatSessionsInfo",

  emits: ["new-chat"],
};
</script>
