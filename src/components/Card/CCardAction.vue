<template>
  <button type="button" class="card-action" @click="$emit('click', $event)">
    <!-- Ícone + título na mesma linha -->
    <q-icon
      :name="icon"
      :color="iconColor"
      size="20px"
      class="card-action__icon"
      aria-hidden="true"
    />

    <div>
      <div class="card-action__header">
        <p class="card-action__title">{{ title }}</p>
      </div>

      <!-- Descrição -->
      <p class="card-action__description">{{ description }}</p>
    </div>
  </button>
</template>

<script>
export default {
  name: "CCardAction",

  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    iconColor: {
      type: String,
      default: "var(--color-primary)",
    },
  },

  emits: ["click"],
};
</script>

<style scoped>
/* ── Root ─────────────────────────────────────────── */
.card-action {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  padding: 19px 21px;
  border-radius: var(--radius-xl);
  height: min-content;

  /* Glass effect */
  background: rgba(17, 29, 45, 0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  /* Borda com luminosidade azul sutil */
  border: 1px solid rgba(51, 150, 254, 0.22);

  /* Highlight interno no topo (camada de vidro) */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 4px 24px rgba(0, 0, 0, 0.18);

  cursor: pointer;
  text-align: left;
  width: 100%;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.card-action:hover {
  background: rgba(17, 29, 45, 0.55);
  border-color: rgba(51, 150, 254, 0.4);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 4px 32px rgba(51, 150, 254, 0.12);
}

/* ── Header: ícone + título ──────────────────────── */
.card-action__header {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ── Icon ────────────────────────────────────────── */
.card-action__icon {
  flex-shrink: 0;
  margin-top: 2px !important;
}

/* ── Title ───────────────────────────────────────── */
.card-action__title {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base) !important;
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-ui);
  line-height: 1.3;
  color: var(--color-dark-text);
}

/* ── Description ─────────────────────────────────── */
.card-action__description {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-ui);
  line-height: 1.5;
  color: var(--color-dark-text-muted);
}
</style>
