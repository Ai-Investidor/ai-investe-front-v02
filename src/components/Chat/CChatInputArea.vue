<template>
  <div
    class="flex flex-col items-center gap-4 py-3 px-7.5 max-sm:px-2 bg-dark! shrink-0 w-full min-w-0"
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
        class="flex items-center gap-3 w-full bg-dark rounded-input py-2 px-4 border border-border-input shadow-xs"
      >
        <!-- Botão anexar com menu dropdown -->
        <button
          type="button"
          class="attach-btn flex items-center justify-center size-8 shrink-0 bg-transparent border-none rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="disabled"
          aria-label="Anexar arquivos"
        >
          <img
            :src="IconAttach"
            class="attach-icon w-3 h-3.5 object-contain"
            aria-hidden="true"
            alt=""
          />

          <q-menu
            anchor="top left"
            self="bottom left"
            :offset="[0, 8]"
            transition-show="jump-up"
            transition-hide="jump-down"
          >
            <q-list class="attach-menu">
              <q-item
                v-close-popup
                clickable
                class="attach-menu-item"
                @click="openDocPicker"
              >
                <q-item-section side>
                  <q-icon name="description" size="16px" />
                </q-item-section>
                <q-item-section>Documento</q-item-section>
              </q-item>

              <q-item
                v-close-popup
                clickable
                class="attach-menu-item"
                @click="openImgPicker"
              >
                <q-item-section side>
                  <q-icon name="image" size="16px" />
                </q-item-section>
                <q-item-section>IMG</q-item-section>
              </q-item>

              <q-item
                v-close-popup
                clickable
                class="attach-menu-item"
                @click="onGenerateChart"
              >
                <q-item-section side>
                  <q-icon name="bar_chart" size="16px" />
                </q-item-section>
                <q-item-section>Gerar Gráfico</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </button>

        <!-- Inputs de arquivo ocultos -->
        <input
          ref="docInput"
          type="file"
          multiple
          class="hidden"
          accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.ppt,.pptx"
          @change="handleFileChange"
        />
        <input
          ref="imgInput"
          type="file"
          multiple
          class="hidden"
          accept="image/*"
          @change="handleFileChange"
        />

        <textarea
          ref="textareaRef"
          v-model="message"
          class="flex-1 bg-transparent border-none outline-none resize-none text-dark-text text-paragraph-2 max-h-32 overflow-y-auto placeholder:text-dark-text-placeholder"
          placeholder="Fale com nossa IA..."
          :disabled="disabled"
          rows="1"
          @keydown="handleKeyDown"
          @input="handleInput"
        />

        <!-- Botão enviar -->
        <button
          class="flex items-center justify-center gap-1.5 shrink-0 rounded-input border-none cursor-pointer transition-[background-color,opacity] duration-200 py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
          :class="
            canSend
              ? 'bg-search-btn text-light-text'
              : 'bg-dark-elevated text-dark-text-muted'
          "
          :disabled="disabled || !canSend"
          aria-label="Enviar mensagem"
          @click="handleSend"
        >
          <svg
            width="16"
            height="16"
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

  </div>
</template>

<script>
import CChatAttachedFiles from "@components/Chat/CChatAttachedFiles.vue";
import IconAttach from "@assets/icons/icon-attach.svg";

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
      IconAttach,
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

<style scoped>
.attach-btn .attach-icon {
  transition: filter 0.18s ease;
}

.attach-btn:hover:not(:disabled) .attach-icon {
  filter: brightness(0) saturate(100%) invert(98%) sepia(67%) saturate(1573%)
    hue-rotate(5deg) brightness(107%) contrast(107%);
}

:deep(.attach-menu) {
  min-width: 160px;
  background: var(--color-dark-card) !important;
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-md) !important;
  padding: 4px;
}

:deep(.attach-menu-item) {
  color: var(--color-dark-text);
  border-radius: var(--radius-base);
  font-size: var(--font-size-sm);
  min-height: 36px;
  padding: 6px 12px;
  gap: 8px;
}

:deep(.attach-menu-item:hover) {
  background: var(--color-dark-elevated) !important;
}

:deep(.attach-menu-item .q-icon) {
  color: var(--color-dark-text-muted);
  transition: color 0.18s ease;
}

:deep(.attach-menu-item:hover .q-icon) {
  color: var(--color-primary);
}
</style>
