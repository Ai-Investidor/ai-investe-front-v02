<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="rename-card">
      <q-card-section class="rename-card__header">
        <h6 class="text-headline-6 text-dark-text">Editar título</h6>
        <button
          class="rename-card__close"
          type="button"
          aria-label="Fechar"
          @click="onDialogCancel"
        >
          <q-icon name="close" size="18px" />
        </button>
      </q-card-section>

      <q-card-section class="rename-card__body">
        <q-input
          v-model="newTitle"
          outlined
          dense
          autofocus
          placeholder="Digite o novo título"
          class="rename-card__input"
          :input-style="{ color: 'var(--color-dark-text)' }"
          @keydown.enter="onConfirm"
          @keydown.esc="onDialogCancel"
        />
      </q-card-section>

      <q-card-actions class="rename-card__actions">
        <button
          class="rename-card__btn rename-card__btn--cancel"
          type="button"
          @click="onDialogCancel"
        >
          Cancelar
        </button>
        <button
          class="rename-card__btn rename-card__btn--confirm"
          type="button"
          :disabled="!newTitle.trim()"
          @click="onConfirm"
        >
          Renomear
        </button>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";

export default {
  name: "CModalRenameSession",

  props: {
    title: {
      type: String,
      default: "",
    },
  },

  emits: [...useDialogPluginComponent.emits],

  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    return { dialogRef, onDialogHide, onDialogOK, onDialogCancel };
  },

  data() {
    return {
      newTitle: this.title,
    };
  },

  methods: {
    onConfirm() {
      const trimmed = this.newTitle.trim();
      if (!trimmed) return;
      this.onDialogOK(trimmed);
    },
  },
};
</script>

<style scoped>
.rename-card {
  width: 400px;
  max-width: 90vw;
  background: var(--color-dark-card);
  border: 1px solid var(--color-border-dark);
  border-radius: 12px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
}

.rename-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0;
}

.rename-card__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--color-dark-text-muted);
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}

.rename-card__close:hover {
  color: var(--color-dark-text);
  background: var(--color-dark-elevated);
}

.rename-card__body {
  padding: 16px 20px;
}

.rename-card__input :deep(.q-field__control) {
  background: var(--color-dark-elevated);
  border-radius: 8px;
}

.rename-card__input :deep(.q-field__control::before) {
  border-color: var(--color-border-pinned);
}

.rename-card__input :deep(.q-field__control:hover::before) {
  border-color: var(--color-primary);
}

.rename-card__input :deep(.q-field--focused .q-field__control::before) {
  border-color: var(--color-primary);
}

.rename-card__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 0 20px 20px;
}

.rename-card__btn {
  height: 36px;
  padding: 0 16px;
  border-radius: 8px;
  border: none;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, opacity 0.15s;
}

.rename-card__btn--cancel {
  background: var(--color-dark-elevated);
  color: var(--color-dark-text-secondary);
}

.rename-card__btn--cancel:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-dark-text);
}

.rename-card__btn--confirm {
  background: var(--color-primary);
  color: var(--color-primary-dark);
}

.rename-card__btn--confirm:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.rename-card__btn--confirm:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
