<template>
  <div
    class="flex-shrink-0 border-t border-[#30363D] bg-[#0D1117] px-4 md:px-8 lg:px-16 py-4"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Preview de arquivos pendentes -->
      <div v-if="pendingFiles.length > 0" class="flex flex-wrap gap-2 mb-3">
        <div
          v-for="(file, index) in pendingFiles"
          :key="index"
          class="flex items-center gap-2 bg-[#161B22] border border-[#30363D] rounded-lg px-3 py-2 text-xs text-gray-300"
        >
          <q-icon
            :name="getFileIcon(file.type)"
            size="14px"
            class="text-primary flex-shrink-0"
          />
          <span class="max-w-[120px] truncate">{{ file.name }}</span>
          <span class="text-gray-600 flex-shrink-0">{{
            formatFileSize(file.size)
          }}</span>
          <button
            class="ml-1 text-gray-600 hover:text-red-400 transition-colors flex-shrink-0"
            :aria-label="`Remover ${file.name}`"
            @click="$emit('remove-file', index)"
          >
            <q-icon name="close" size="12px" />
          </button>
        </div>
      </div>

      <!-- Input area -->
      <div
        class="flex items-end gap-3 bg-[#161B22] border-2 border-[#30363D] rounded-2xl px-4 py-3 transition-all duration-200 focus-within:border-primary"
      >
        <!-- Botão de anexo com menu -->
        <div class="flex-shrink-0 self-end mb-0.5">
          <button
            ref="attachBtnRef"
            :disabled="disabled"
            class="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 text-gray-500 hover:text-primary hover:bg-[#21262D] disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Anexar arquivo"
            @click="toggleAttachMenu"
          >
            <q-icon name="add_circle_outline" size="20px" />
          </button>

          <q-menu
            anchor="top left"
            self="bottom left"
            :offset="[0, 8]"
            class="chat-attach-menu"
            auto-close
          >
            <div
              class="bg-[#161B22] border border-[#30363D] rounded-xl overflow-hidden shadow-xl min-w-[200px]"
            >
              <div class="px-3 py-2 border-b border-[#30363D]">
                <span
                  class="text-xs text-gray-500 font-medium uppercase tracking-wider"
                >
                  Anexar
                </span>
              </div>
              <div class="py-1">
                <button
                  v-for="option in attachMenuOptions"
                  :key="option.key"
                  v-close-popup
                  class="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-[#21262D] hover:text-white transition-colors text-left"
                  @click="handleAttachOption(option)"
                >
                  <q-icon
                    :name="option.icon"
                    size="18px"
                    class="text-primary flex-shrink-0"
                  />
                  <div class="flex flex-col">
                    <span class="font-medium">{{ option.label }}</span>
                    <span class="text-xs text-gray-600">{{ option.hint }}</span>
                  </div>
                </button>
              </div>
            </div>
          </q-menu>
        </div>

        <!-- Textarea -->
        <textarea
          ref="textareaRef"
          v-model="message"
          :placeholder="placeholder"
          :disabled="disabled"
          rows="1"
          class="flex-1 bg-transparent text-white placeholder-gray-500 text-sm md:text-base resize-none outline-none leading-relaxed max-h-32 overflow-y-auto self-center"
          @keydown="handleKeyDown"
          @input="handleInput"
        />

        <!-- Botão de enviar -->
        <button
          :disabled="disabled || !canSend"
          class="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 self-end"
          :class="
            canSend
              ? 'bg-gradient-to-br from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-px'
              : 'bg-[#21262D] text-gray-600 cursor-not-allowed'
          "
          aria-label="Enviar mensagem"
          @click="handleSend"
        >
          <svg
            v-if="!disabled"
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <div
            v-else
            class="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"
          />
        </button>
      </div>

      <p class="text-xs text-gray-600 text-center mt-4!">
        Pressione
        <kbd class="px-1 py-0.5 bg-[#21262D] rounded text-gray-500 text-xs"
          >Enter</kbd
        >
        para enviar,
        <kbd class="px-1 py-0.5 bg-[#21262D] rounded text-gray-500 text-xs"
          >Shift+Enter</kbd
        >
        para nova linha
      </p>
    </div>

    <!-- Input de arquivo oculto -->
    <input
      ref="fileInputRef"
      type="file"
      :accept="currentAccept"
      multiple
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template>

<script>
export default {
  name: "CChatInputArea",

  props: {
    placeholder: {
      type: String,
      default: "Pergunte sobre investimentos...",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    pendingFiles: {
      type: Array,
      default: () => [],
    },
  },

  emits: ["send", "attach-files", "remove-file"],

  data() {
    return {
      message: "",
      currentAccept: "*/*",
      attachMenuOptions: [
        {
          isOpen: false,
          key: "files",
          label: "Enviar arquivos",
          hint: "PDF, Excel, CSV, imagens...",
          icon: "attach_file",
          accept: ".pdf,.xlsx,.xls,.csv,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx",
        },
      ],
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
    toggleAttachMenu() {
      this.attachMenuOptions[0].isOpen = !this.attachMenuOptions[0].isOpen;
      //this.$refs.attachMenuRef?.toggle(event);
    },

    handleAttachOption(option) {
      this.currentAccept = option.accept ?? "*/*";
      this.$refs.attachMenuRef?.hide();
      this.$nextTick(() => {
        this.$refs.fileInputRef?.click();
      });
    },

    handleFileChange(event) {
      const files = event.target.files;
      if (!files || files.length === 0) return;
      this.$emit("attach-files", Array.from(files));
      // Limpa o input para permitir selecionar o mesmo arquivo novamente
      event.target.value = "";
    },

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

    getFileIcon(mimeType) {
      if (!mimeType) return "insert_drive_file";
      if (mimeType.startsWith("image/")) return "image";
      if (mimeType === "application/pdf") return "picture_as_pdf";
      if (
        mimeType.includes("spreadsheet") ||
        mimeType.includes("excel") ||
        mimeType.includes("csv")
      )
        return "table_chart";
      if (mimeType.includes("word") || mimeType.includes("document"))
        return "description";
      if (mimeType.startsWith("text/")) return "article";
      return "insert_drive_file";
    },

    formatFileSize(bytes) {
      if (!bytes) return "";
      if (bytes < 1024) return `${bytes}B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
    },
  },
};
</script>

<style scoped>
textarea::-webkit-scrollbar {
  width: 4px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background: #30363d;
  border-radius: 2px;
}

.chat-attach-menu {
  background: transparent !important;
  box-shadow: none !important;
}
</style>
