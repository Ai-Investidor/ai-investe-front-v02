<template>
  <div class="welcome">
    <!-- Glow de fundo -->
    <div class="welcome__bg-glow" aria-hidden="true" />

    <!-- Ícone central -->
    <div class="welcome__icon">
      <q-icon
        name="svguse:icons/icons.svg#icon-log"
        size="64px"
        color="white"
      />
    </div>

    <!-- Título principal -->
    <h1 class="welcome__title">Como posso te ajudar hoje?</h1>

    <!-- Subtítulo -->
    <p class="welcome__subtitle">
      Sou seu assistente especializado em análise financeira e investimentos.
      Posso ajudar com análise de ativos, tendências de mercado e estratégias de
      investimento
    </p>

    <!-- Grid de cards de sugestão -->
    <div class="welcome__cards">
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
};
</script>

<style scoped>
/* ── Root ─────────────────────────────────────────── */
.welcome {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  overflow: hidden;
}

/* ── Background glow ─────────────────────────────── */
.welcome__bg-glow {
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  background: radial-gradient(
    30% 50% at 50% 50%,
    rgba(51, 150, 254, 0.34) 0%,
    rgba(2, 12, 22, 0.34) 100%
  );

  pointer-events: none;
  z-index: 0;
}

/* ── Ícone ────────────────────────────────────────── */
.welcome__icon {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  flex-shrink: 0;
}

/* ── Título ──────────────────────────────────────── */
.welcome__title {
  position: relative;
  z-index: 1;
  font-family: var(--font-family-sans);
  font-size: 2.5rem !important; /* 40px — especificado no Figma */
  font-weight: var(--font-weight-medium);
  line-height: 1.1;
  letter-spacing: var(--tracking-ui);
  color: var(--color-dark-text);
  margin-bottom: 16px !important;
}

/* ── Subtítulo ───────────────────────────────────── */
.welcome__subtitle {
  position: relative;
  z-index: 1;
  font-family: var(--font-family-sans);
  font-size: var(--font-size-xl) !important; /* 20px */
  font-weight: var(--font-weight-medium);
  line-height: 1.4;
  letter-spacing: var(--tracking-ui);
  color: var(--color-dark-text-muted); /* opacity ~0.43 */
  max-width: 736px;
  margin-bottom: 40px !important;
}

/* ── Cards grid ──────────────────────────────────── */
.welcome__cards {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.4rem;
  width: 100%;
  max-width: 44rem;
}
</style>
