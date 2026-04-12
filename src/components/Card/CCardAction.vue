<template>
  <button type="button" class="card-action" @click="$emit('click', $event)">
    <q-icon :name="icon" size="16px" class="card-action__icon" aria-hidden="true" />
    <div class="card-action__body">
      <p class="card-action__title">{{ title }}</p>
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
  },

  emits: ["click"],
};
</script>

<style scoped>
/* ── Root ─────────────────────────────────────────── */
.card-action {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 19px 21px;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-dark);
  background-color: var(--color-card-overlay);
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease;
}

.card-action:hover {
  background-color: rgba(17, 29, 45, 0.4);
  border-color: rgba(51, 150, 254, 0.3);
}

/* ── Icon ────────────────────────────────────────── */
.card-action__icon {
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 2px;
}

/* ── Body ────────────────────────────────────────── */
.card-action__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

/* ── Title ───────────────────────────────────────── */
.card-action__title {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
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
  color: var(--color-dark-text-secondary);
}
</style>
