<template>
  <div class="flex items-start w-full max-w-[956px] mx-auto mb-[25px]">

    <!-- Gutter esquerdo — avatar da IA fora do quadrante central, 44px fixo -->
    <div class="flex-shrink-0 w-11 flex justify-end pr-3 pt-1">
      <q-avatar size="32px" alt="AI" class="flex-shrink-0">
        <img :src="aiChatLogo" alt="AI" class="w-full h-full object-contain" />
      </q-avatar>
    </div>

    <!-- Coluna central — hugs content quando curto, expande até o espaço disponível quando longo -->
    <div class="min-w-0 w-fit max-w-[calc(100%-88px)]">
      <div class="chat-bubble-ai flex flex-col gap-4">

        <div v-if="isTyping" class="flex gap-1.5 py-1">
          <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0s" />
          <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0.2s" />
          <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0.4s" />
        </div>

        <div
          v-else
          class="chat-prose break-words"
          v-html="formattedMessage"
        />

        <div v-if="timestamp && !isTyping" class="flex items-center gap-4">
          <q-icon name="schedule" size="1.4rem" color="primary" />
          <span class="text-paragraph-3 text-white" style="opacity: 0.55">
            {{ formatTime(timestamp) }}
          </span>
          <button type="button" class="copy-btn ml-auto" @click="copyMessage">
            <q-icon :name="copied ? 'check' : 'content_copy'" size="14px" />
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 6]" class="copy-tooltip">
              {{ copied ? 'Copiado!' : 'Copiar' }}
            </q-tooltip>
          </button>
        </div>
      </div>
    </div>

    <!-- Gutter direito — espaçador simétrico, 44px fixo -->
    <div class="flex-shrink-0 w-11" />

  </div>
</template>

<script>
import { marked } from "marked";
import aiChatLogo from "@assets/imgs/chat_logo.webp";

export default {
  name: "CChatMessageAI",

  props: {
    message: { type: String, required: true },
    timestamp: { type: [Date, String], default: null },
    isTyping: { type: Boolean, default: false },
  },

  data() {
    return { aiChatLogo, copied: false };
  },

  computed: {
    formattedMessage() {
      if (this.isTyping) return "";
      try {
        return marked.parse(this.message, { breaks: true });
      } catch {
        return this.message.replace(/\n/g, "<br>");
      }
    },
  },

  methods: {
    formatTime(date) {
      if (!date) return "";
      const d = new Date(date);
      return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    },

    async copyMessage() {
      try {
        await navigator.clipboard.writeText(this.message);
        this.copied = true;
        setTimeout(() => { this.copied = false; }, 2000);
      } catch { /* clipboard indisponível */ }
    },
  },
};
</script>

<style scoped>
.chat-prose {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.65;
  letter-spacing: 0.02px;
  color: var(--color-dark-text);
}

:deep(.chat-prose p) { margin-bottom: 0.85rem; }
:deep(.chat-prose p:last-child) { margin-bottom: 0; }

:deep(.chat-prose h1), :deep(.chat-prose h2),
:deep(.chat-prose h3), :deep(.chat-prose h4) {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif;
  font-weight: 600;
  line-height: 1.3;
  margin-top: 1.4rem;
  margin-bottom: 0.55rem;
}
:deep(.chat-prose h1) { font-size: 1.3em; }
:deep(.chat-prose h2) { font-size: 1.15em; }
:deep(.chat-prose h3) { font-size: 1.05em; }

:deep(.chat-prose ul), :deep(.chat-prose ol) { margin-left: 1.4rem; margin-top: 0.55rem; margin-bottom: 0.55rem; }
:deep(.chat-prose li) { margin-bottom: 0.4rem; }
:deep(.chat-prose li::marker) { color: var(--color-primary); }

:deep(.chat-prose strong) { font-weight: 600; }
:deep(.chat-prose em) { font-style: italic; opacity: 0.85; }

:deep(.chat-prose code) {
  background-color: rgba(255, 255, 255, 0.07);
  padding: 0.15rem 0.35rem;
  border-radius: 4px;
  font-size: 0.88em;
  font-family: "Courier New", monospace;
  color: var(--color-primary);
}
:deep(.chat-prose pre) {
  background-color: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--color-border-dark);
  padding: 0.85rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-top: 0.65rem;
  margin-bottom: 0.65rem;
}
:deep(.chat-prose pre code) { background: transparent; padding: 0; color: #f8f8f2; font-size: 0.85em; }
:deep(.chat-prose blockquote) { border-left: 3px solid var(--color-primary); padding-left: 0.85rem; margin: 0.65rem 0; opacity: 0.8; }
:deep(.chat-prose a) { color: var(--color-primary); text-decoration: underline; opacity: 0.9; }
:deep(.chat-prose hr) { border: none; border-top: 1px solid var(--color-border-dark); margin: 0.85rem 0; }
:deep(.chat-prose table) { width: 100%; border-collapse: collapse; margin: 0.65rem 0; font-size: 0.9em; }
:deep(.chat-prose th) { padding: 0.4rem 0.65rem; font-weight: 600; border-bottom: 1px solid var(--color-border-dark); text-align: left; background: rgba(255,255,255,0.05); }
:deep(.chat-prose td) { padding: 0.35rem 0.65rem; border-bottom: 1px solid rgba(255,255,255,0.05); }

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.35);
  border-radius: 4px;
  transition: color 0.15s, background 0.15s;
  flex-shrink: 0;
}
.copy-btn:hover {
  color: rgba(255, 255, 255, 0.75);
  background: rgba(255, 255, 255, 0.06);
}
</style>

<style>
.copy-tooltip.q-tooltip {
  background: var(--color-dark-card) !important;
  color: var(--color-dark-text) !important;
  border: 1px solid var(--color-border-dark) !important;
  border-radius: 6px !important;
  font-size: 11px;
  padding: 4px 8px;
}
</style>
