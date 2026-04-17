<template>
  <div
    class="welcome-glow-bg relative flex-1 flex flex-col flex-nowrap! items-center max-sm:items-start justify-center py-12 px-6 text-center overflow-x-hidden overflow-y-scroll"
  >
    <!-- Ícone central -->
    <div class="relative z-1 flex items-center justify-center mb-6 shrink-0">
      <q-icon
        name="svguse:icons/icons.svg#icon-log"
        size="64px"
        color="white"
      />
    </div>

    <!-- Título principal -->
    <h1 class="relative z-1 text-welcome-heading text-dark-text mb-4!">
      Como posso te ajudar hoje?
    </h1>

    <!-- Subtítulo -->
    <p
      class="relative z-1 text-welcome-subtitle text-dark-text-muted max-w-[46rem] !mb-10"
    >
      Sou seu assistente especializado em análise financeira e investimentos.
      Posso ajudar com análise de ativos, tendências de mercado e estratégias de
      investimento
    </p>

    <!-- Grid de cards de sugestão -->
    <div
      class="relative z-1 grid grid-cols-2 max-sm:grid-cols-1 gap-6 w-full max-w-176"
    >
      <c-card-action
        v-for="prompt in prompts"
        :key="prompt.id"
        :icon="prompt.icon"
        :icon-color="prompt.color"
        :title="prompt.title"
        :description="prompt.description"
        @click="$emit('select-prompt', prompt.text)"
      />
    </div>
  </div>
</template>

<script>
import CCardAction from "@components/Card/CCardAction.vue";

export default {
  name: "CChatWelcome",

  components: {
    CCardAction,
  },

  emits: ["select-prompt"],

  data() {
    return {
      prompts: [
        {
          id: 1,
          icon: "trending_up",
          title: "Análise Fundamentalista",
          color: "blue",
          description:
            "Faça análise fundamentalista da Apple baseada em notícias",
          text: "Faça análise fundamentalista da Apple baseada em notícias",
        },
        {
          id: 2,
          icon: "bar_chart",
          title: "Comparação de ETFs",
          color: "green",
          description:
            "Compare o desempenho de ETFs de tecnologia nos últimos 5 anos",
          text: "Compare o desempenho de ETFs de tecnologia nos últimos 5 anos",
        },
        {
          id: 3,
          icon: "pie_chart",
          title: "Diversificação de Portfolio",
          color: "red",
          description: "Como posso diversificar um portfolio de R$ 100.000?",
          text: "Como posso diversificar um portfolio de R$ 100.000?",
        },
        {
          id: 4,
          icon: "savings",
          title: "Análise de Dividend Yield",
          color: "blue",
          description: "Melhores ações com dividend yield acima de 6%",
          text: "Quais são as melhores ações com dividend yield acima de 6%?",
        },
      ],
    };
  },

  mounted() {
    const refHeader = document.getElementsByTagName("header")[0];
    const isMobile = this.$q.screen.lt.sm;

    if (refHeader && isMobile) {
      const headerHeight = refHeader.offsetHeight;
      const welcomeContainer = this.$el;
      welcomeContainer.style.paddingTop = `${headerHeight * 6}px`;

      console.log(welcomeContainer.style.paddingTop);
    }
  },
};
</script>
