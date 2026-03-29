<template>
  <div class="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
    <!-- Ícone principal -->
    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    </div>

    <h1 class="text-headline-3 text-white mb-2">Como posso ajudar?</h1>
    <p class="text-paragraph-2 text-gray-400 max-w-md mb-10">
      Sou seu assistente de investimentos com IA. Pergunte sobre estratégias, análise de ativos, planejamento financeiro e muito mais.
    </p>

    <!-- Cards de sugestão -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
      <button
        v-for="prompt in prompts"
        :key="prompt.id"
        class="group flex items-start gap-3 p-4 rounded-xl bg-[#161B22] border border-[#30363D] hover:border-primary hover:bg-[#1C2128] transition-all duration-200 text-left"
        @click="$emit('select-prompt', prompt.text)"
      >
        <span class="text-xl flex-shrink-0 mt-0.5">{{ prompt.icon }}</span>
        <div>
          <p class="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{{ prompt.title }}</p>
          <p class="text-xs text-gray-500 mt-0.5 leading-relaxed">{{ prompt.description }}</p>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CChatWelcome',

  emits: ['select-prompt'],

  data() {
    return {
      prompts: [
        {
          id: 1,
          icon: '📊',
          title: 'Como diversificar minha carteira?',
          description: 'Estratégias de alocação para reduzir risco',
          text: 'Como devo diversificar minha carteira de investimentos?',
        },
        {
          id: 2,
          icon: '🏛️',
          title: 'Tesouro Direto ou CDB?',
          description: 'Compare as opções de renda fixa disponíveis',
          text: 'Qual a diferença entre Tesouro Direto e CDB? Qual é melhor para mim?',
        },
        {
          id: 3,
          icon: '📈',
          title: 'Começar na renda variável',
          description: 'Primeiros passos para investir em ações',
          text: 'Como começar a investir em ações sendo iniciante?',
        },
        {
          id: 4,
          icon: '🏠',
          title: 'Fundos Imobiliários (FIIs)',
          description: 'Entenda como funcionam e como escolher',
          text: 'Como funcionam os Fundos de Investimento Imobiliário (FIIs)?',
        },
      ],
    }
  },
}
</script>
