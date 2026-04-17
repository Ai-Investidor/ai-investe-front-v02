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
        <!-- Botão anexar -->
        <button
          type="button"
          class="flex items-center justify-center size-10 shrink-0 bg-transparent border-none rounded-full cursor-pointer text-dark-text-muted transition-colors hover:bg-white/7 hover:text-dark-text disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          :disabled="disabled"
          aria-label="Anexar arquivos"
          @click="openFilePicker"
        >
          <q-icon name="attach_file" size="20px" />
        </button>
        <input
          ref="fileInput"
          type="file"
          multiple
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

  emits: ["send", "attach", "remove-file"],

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

    openFilePicker() {
      if (this.disabled) return;
      this.$refs.fileInput?.click();
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
