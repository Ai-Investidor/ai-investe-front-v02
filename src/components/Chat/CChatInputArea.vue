<template>
  <div
    class="flex flex-col items-center gap-4 py-6 px-7.5 max-sm:px-2 bg-dark! border-t border-border-dark shrink-0 w-full min-w-0"
  >
    <!-- Wrapper: chips + input -->
    <div class="flex flex-col gap-2 w-full min-w-0 max-w-225">
      <!-- Carousel de arquivos anexados -->
      <CChatAttachedFiles
        v-if="pendingFiles.length > 0"
        :files="pendingFiles"
        @remove="handleRemoveFile"
      />

      <!-- Campo de input -->
      <div
        class="flex items-center gap-3 w-full bg-dark-card! rounded-input py-2 px-4"
      >
        <!-- Botão anexar com dropdown -->
        <button
          type="button"
          class="flex items-center justify-center size-10 shrink-0 bg-transparent border-none rounded-full cursor-pointer text-dark-text-muted transition-colors hover:bg-white/7 hover:text-dark-text disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          :disabled="disabled"
          aria-label="Adicionar arquivo"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <q-menu
            anchor="top left"
            self="bottom left"
            :offset="[0, 8]"
            class="attach-menu"
          >
            <q-list dense class="attach-menu__list">
              <q-item
                v-close-popup
                clickable
                class="attach-menu__item"
                @click="openDocPicker"
              >
                <q-item-section avatar class="attach-menu__icon">
                  <q-icon name="svguse:icons/icons.svg#icon-attach-doc" size="16px" />
                </q-item-section>
                <q-item-section>Documento</q-item-section>
              </q-item>

              <q-item
                v-close-popup
                clickable
                class="attach-menu__item"
                @click="openImgPicker"
              >
                <q-item-section avatar class="attach-menu__icon">
                  <q-icon name="svguse:icons/icons.svg#icon-attach-img" size="16px" />
                </q-item-section>
                <q-item-section>IMG</q-item-section>
              </q-item>

              <q-separator class="attach-menu__separator" />

              <q-item
                v-close-popup
                clickable
                class="attach-menu__item"
                @click="onGenerateChart"
              >
                <q-item-section avatar class="attach-menu__icon">
                  <q-icon name="svguse:icons/icons.svg#icon-attach-chart" size="16px" />
                </q-item-section>
                <q-item-section>Gerar Gráfico</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </button>

        <input
          ref="docInput"
          type="file"
          multiple
          accept=".pdf,.csv,.txt,.xlsx,.md"
          class="hidden"
          @change="handleFileChange"
        />
        <input
          ref="imgInput"
          type="file"
          multiple
          accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
          class="hidden"
          @change="handleFileChange"
        />

        <textarea
          ref="textareaRef"
          v-model="message"
          class="flex-1 bg-transparent border-none outline-none resize-none text-dark-text text-paragraph-2 max-h-32 overflow-y-auto placeholder:text-dark-text-placeholder"
          placeholder="Digite sua pergunta sobre investimentos, análise de ativos ou mercado financeiro . . ."
          :disabled="disabled"
          rows="1"
          @keydown="handleKeyDown"
          @input="handleInput"
        />

        <!-- Botão enviar -->
        <button
          class="flex items-center justify-center size-10 shrink-0 rounded-full border-none cursor-pointer transition-[background-color,opacity] duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          :class="
            canSend
              ? 'bg-linear-to-br from-primary to-primary-dark2 text-dark-text'
              : 'bg-dark-elevated text-dark-text-muted'
          "
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
    </div>

    <!-- Hint de atalhos -->
    <p
      class="text-paragraph-2 text-dark-text-hint text-center whitespace-nowrap"
    >
      Pressione
      <span class="text-dark-text-hint-emphasis">Enter</span>
      para enviar,
      <span class="text-dark-text-hint-emphasis">Shift + Enter</span>
      para pra nova linha
    </p>
  </div>
</template>

<script>
import CChatAttachedFiles from "@components/Chat/CChatAttachedFiles.vue";

export default {
  name: "CChatInputArea",

  components: {
    CChatAttachedFiles,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    pendingFiles: {
      type: Array,
      default: () => [],
    },
  },

  emits: ["send", "attach", "remove-file", "generate-chart"],

  data() {
    return {
      message: "",
    };
  },

  computed: {
    canSend() {
      return this.message.trim().length > 0 || this.pendingFiles.length > 0;
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

    openDocPicker() {
      if (this.disabled) return;
      this.$refs.docInput?.click();
    },

    openImgPicker() {
      if (this.disabled) return;
      this.$refs.imgInput?.click();
    },

    onGenerateChart() {
      this.$emit("generate-chart");
    },

    handleFileChange(event) {
      const files = Array.from(event.target.files ?? []);
      if (files.length > 0) {
        this.$emit("attach", files);
      }
      event.target.value = "";
    },

    handleRemoveFile(index) {
      this.$emit("remove-file", index);
    },
  },
};
</script>

<style>
/* global — q-menu renderiza fora do componente (teleport), scoped não alcança */
.attach-menu.q-menu {
  background: #e6e8e9 !important;
  border: 0.5px solid rgba(12, 66, 136, 0.18) !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12) !important;
  width: 188px !important;
  max-width: 188px !important;
  overflow: hidden !important;
}

.attach-menu__list {
  padding: 4px;
  height: 138px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.attach-menu__item.q-item {
  border-radius: 8px;
  color: #0c4288 !important;
  font-size: 14px;
  font-weight: 500;
  min-height: 38px;
  transition: background 0.15s;
}

.attach-menu__item.q-item:hover {
  background: rgba(12, 66, 136, 0.08) !important;
}

.attach-menu__icon {
  min-width: 32px;
  color: #0c4288 !important;
}

.attach-menu__separator {
  background: rgba(12, 66, 136, 0.15) !important;
  margin: 2px 8px;
}
</style>
