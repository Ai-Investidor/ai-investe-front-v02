<template>
  <div
    class="relative flex-1 h-full min-h-svh"
  >
    <div
      class="flex justify-center items-center flex-col gap-6 w-full h-full max-w-2xl mx-auto"
    >
      <h1 class="text-welcome-heading text-white whitespace-nowrap">
        Como posso te
        <span class="font-semibold text-primary text-glow-primary">ajudar</span>
        hoje?
      </h1>

      <p
        class="text-paragraph-4! text-dark-text-subtle! text-center! max-w-156"
      >
        Sou seu assistente especializado em análise financeira e investimentos.
        Posso ajudar com análise de ativos, tendências de mercado e estratégias
        de investimento
      </p>

      <div class="grid grid-cols-2 gap-4 w-full">
        <CCardAction
          icon="chat"
          title="Análise Fundamentalista"
          description="faça análise fundamentalista da apple baseada em noticias"
          class="col-span-1"
        />

        <CCardAction
          icon="chat"
          title="Análise Fundamentalista"
          description="faça análise fundamentalista da apple baseada em noticias"
          class="col-span-1"
        />

        <CCardAction
          icon="chat"
          title="Análise Fundamentalista"
          description="faça análise fundamentalista da apple baseada em noticias"
          class="col-span-1"
        />

        <CCardAction
          icon="chat"
          title="Análise Fundamentalista"
          description="faça análise fundamentalista da apple baseada em noticias"
          class="col-span-1"
        />
      </div>

      <div
        class="flex items-center w-full bg-chat-bg text-neutral-500 border border-border-input rounded-md p-1 overflow-hidden"
      >
        <input
          v-model="inputMessage"
          type="text"
          placeholder="Fale com nossa IA..."
          class="input-container-message"
          @keydown.enter.prevent="handleInputSend"
        />
        <q-btn icon="send" size="100%" dense color="white" class="text-black" @click="handleInputSend" />
      </div>

      <p class="text-paragraph-4! text-white/40! text-center!">
        AI invest é uma IA e pode cometer erros pode cometer erros.
      </p>
    </div>
  </div>
</template>

<script>
import CCardAction from "../Card/CCardAction.vue";
export default {
  name: "CChatWelcome",
  components: {
    CCardAction,
  },
  emits: ["select-prompt"],

  data() {
    return {
      inputMessage: "",
      prompts: [
        {
          id: 1,
          icon: "trending_up",
          title: "Análise Fundamentalista",
          description:
            "Faça análise fundamentalista da Apple baseada em notícias",
          text: "Faça análise fundamentalista da Apple baseada em notícias",
        },
        {
          id: 2,
          icon: "bar_chart",
          title: "Comparação de ETFs",
          description:
            "Compare o desempenho de ETFs de tecnologia nos últimos 5 anos",
          text: "Compare o desempenho de ETFs de tecnologia nos últimos 5 anos",
        },
        {
          id: 3,
          icon: "loop",
          title: "Diversificação de Portfolio",
          description: "Como posso diversificar um portfolio de R$ 100.000?",
          text: "Como posso diversificar um portfolio de R$ 100.000?",
        },
        {
          id: 4,
          icon: "savings",
          title: "Análise de Dividend Yield",
          description: "Melhores ações com dividend yield acima de 6%",
          text: "Quais são as melhores ações com dividend yield acima de 6%?",
        },
      ],
    };
  },

  methods: {
    handleInputSend() {
      const text = this.inputMessage.trim();
      if (!text) return;
      this.$emit("select-prompt", text);
      this.inputMessage = "";
    },
  },
};
</script>

<style scoped>
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

.input-container-message {
  flex: 1;
  height: 100%;
  background: transparent;
  outline: none;
  padding: 0.8rem 0.75rem;

  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-dark-text);
  line-height: 1.5;

  &::placeholder {
    color: var(--color-dark-text-placeholder);
  }
}
</style>
