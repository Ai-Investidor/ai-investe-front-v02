<template>
  <div class="input-controller">
    <!-- Campo de input -->
    <div class="input-controller__field">
      <textarea
        ref="textareaRef"
        v-model="message"
        class="input-controller__textarea"
        placeholder="Digite sua pergunta sobre investimentos, análise de ativos ou mercado financeiro . . ."
        :disabled="disabled"
        rows="1"
        @keydown="handleKeyDown"
        @input="handleInput"
      />

      <!-- Botão enviar -->
      <button
        class="input-controller__send"
        :class="{ 'input-controller__send--active': canSend }"
        :disabled="disabled || !canSend"
        aria-label="Enviar mensagem"
        @click="handleSend"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M22 2L11 13"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22 2L15 22L11 13L2 9L22 2Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <!-- Hint de atalhos -->
    <p class="input-controller__hint">
      Pressione
      <span class="input-controller__hint-key">Enter</span>
      para enviar,
      <span class="input-controller__hint-key">Shift + Enter</span>
      para pra nova linha
    </p>
  </div>
</template>

<script>
export default {
  name: "CChatInputArea",

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["send"],

  data() {
    return {
      message: "",
    };
  },

  computed: {
    canSend() {
      return this.message.trim().length > 0;
    },
  },

  watch: {
    disabled(newVal) {
      if (!newVal) {
        this.$nextTick(() => {
          this.$refs.textareaRef?.focus();
        });
      }
    },
  },

  methods: {
    handleInput() {
      const el = this.$refs.textareaRef;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 128) + "px";
    },

    handleKeyDown(event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (this.canSend && !this.disabled) {
          this.handleSend();
        }
      }
    },

    handleSend() {
      if (!this.canSend || this.disabled) return;
      const text = this.message.trim();
      this.$emit("send", text);
      this.message = "";
      this.$nextTick(() => {
        if (this.$refs.textareaRef) {
          this.$refs.textareaRef.style.height = "auto";
        }
      });
    },
  },
};
</script>

<style scoped>
/* ── Root ─────────────────────────────────────────── */
.input-controller {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 25px 30px;
  background-color: var(--color-dark);
  border-top: 1px solid var(--color-border-dark);
  flex-shrink: 0;
}

/* ── Input field wrapper ──────────────────────────── */
.input-controller__field {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 900px;
  background-color: var(--color-dark-card);
  border-radius: var(--radius-input);
  padding: 7px 15px;
}

/* ── Textarea ─────────────────────────────────────── */
.input-controller__textarea {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  color: var(--color-dark-text);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-ui);
  line-height: 1.5;
  max-height: 128px;
  overflow-y: auto;
}

.input-controller__textarea::placeholder {
  color: var(--color-dark-text-placeholder);
}

.input-controller__textarea::-webkit-scrollbar {
  width: 3px;
}
.input-controller__textarea::-webkit-scrollbar-track {
  background: transparent;
}
.input-controller__textarea::-webkit-scrollbar-thumb {
  background: var(--color-border-dark);
  border-radius: var(--radius-full);
}

/* ── Send button ─────────────────────────────────── */
.input-controller__send {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: var(--radius-full);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    opacity 0.18s ease;
  background-color: var(--color-dark-elevated);
  color: var(--color-dark-text-muted);
}

.input-controller__send--active {
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-dark2) 100%
  );
  color: var(--color-dark-text);
}

.input-controller__send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Hint ─────────────────────────────────────────── */
.input-controller__hint {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-dark-text-hint);
  text-align: center;
  white-space: nowrap;
}

.input-controller__hint-key {
  color: var(--color-dark-text-hint-emphasis);
}
</style>
