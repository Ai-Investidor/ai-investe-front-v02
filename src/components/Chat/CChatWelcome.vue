<template>
  <div class="relative flex-1 h-full min-h-svh">
    <div
      class="flex justify-center items-center flex-col gap-6 w-full h-full max-w-2xl mx-auto"
    >
      <h1 class="welcome-heading text-white whitespace-nowrap">
        Como posso te
        <span class="welcome-heading-accent text-primary text-glow-primary">ajudar</span>
        hoje?
      </h1>

      <p class="welcome-subtitle">
        Sou seu assistente especializado em análise financeira e investimentos.
        Posso ajudar com análise de ativos, tendências de mercado e estratégias
        de investimento
      </p>

      <div class="grid grid-cols-2 gap-[15px] max-w-[539px] mx-auto w-full">
        <CCardAction
          icon="svguse:icons/icons.svg#icon-chat"
          title="Análise Fundamentalista"
          description="Faça análise fundamentalista da Apple baseada em notícias"
          class="col-span-1"
          @click="$emit('select-prompt', 'Faça análise fundamentalista da Apple baseada em notícias')"
        />
        <CCardAction
          icon="svguse:icons/icons.svg#icon-card-etf"
          title="Comparação de ETFs"
          description="Compare o desempenho de ETFs de tecnologia nos últimos 5 anos"
          class="col-span-1"
          @click="$emit('select-prompt', 'Compare o desempenho de ETFs de tecnologia nos últimos 5 anos')"
        />
        <CCardAction
          icon="svguse:icons/icons.svg#icon-card-diversify"
          title="Diversificação de Portfolio"
          description="Como posso diversificar um portfolio de R$ 100.000?"
          class="col-span-1"
          @click="$emit('select-prompt', 'Como posso diversificar um portfolio de R$ 100.000?')"
        />
        <CCardAction
          icon="svguse:icons/icons.svg#icon-card-dividend"
          title="Análise de Dividend Yield"
          description="Melhores ações com dividend yield acima de 6%"
          class="col-span-1"
          @click="$emit('select-prompt', 'Quais são as melhores ações com dividend yield acima de 6%?')"
        />
      </div>

      <CChatInputArea
        :pending-files="pendingFiles"
        class="w-full px-0!"
        @send="(text) => $emit('select-prompt', text)"
        @attach="(files) => $emit('attach', files)"
        @remove-file="(i) => $emit('remove-file', i)"
        @generate-chart="$emit('generate-chart')"
      />

      <p class="text-paragraph-4! text-white/40! text-center!">
        AI invest é uma IA e pode cometer erros pode cometer erros.
      </p>
    </div>
  </div>
</template>

<script>
import CCardAction from "../Card/CCardAction.vue";
import CChatInputArea from "@components/Chat/CChatInputArea.vue";

export default {
  name: "CChatWelcome",

  components: {
    CCardAction,
    CChatInputArea,
  },

  props: {
    pendingFiles: {
      type: Array,
      default: () => [],
    },
  },

  emits: ["select-prompt", "attach", "remove-file", "generate-chart"],
};
</script>

<style scoped>
.welcome-heading {
  font-size: 35px;
  font-weight: 274;
  line-height: 1;
  letter-spacing: -0.09em;
}

.welcome-heading-accent {
  font-size: 35px;
  font-weight: 590;
  line-height: 1;
  letter-spacing: -0.09em;
}

.welcome-subtitle {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif;
  font-size: 12px;
  font-weight: 274;
  line-height: 100%;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  max-width: 38rem;
}

.card-prompt {
  background: linear-gradient(
    to right,
    var(--color-dark),
    var(--color-dark-card)
  );
  border: 1px solid var(--color-border-dark);
  box-shadow: var(--shadow-button);
}

.card-prompt:hover {
  background: linear-gradient(
    to right,
    var(--color-dark-card),
    var(--color-dark-panel)
  );
}
</style>
