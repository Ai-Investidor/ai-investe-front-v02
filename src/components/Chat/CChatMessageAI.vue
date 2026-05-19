<template>
  <div class="flex mb-24">
    <div class="flex justify-center items-start gap-4">
      <!-- Avatar -->

      <q-avatar size="32px" alt="AI" class="flex-shrink-0">
        <img
          :src="`${aiChatLogo}`"
          alt="AI"
          class="w-full h-full object-contain"
        />
      </q-avatar>

      <!-- Mensagem -->
      <div class="chat-bubble-ai flex flex-col gap-4 flex-1">
        <!-- Indicador de digitação -->
        <div v-if="isTyping" class="flex gap-1.5 py-1">
          <div
            class="w-2 h-2 bg-primary rounded-full animate-bounce"
            style="animation-delay: 0s"
          ></div>
          <div
            class="w-2 h-2 bg-primary rounded-full animate-bounce"
            style="animation-delay: 0.2s"
          ></div>
          <div
            class="w-2 h-2 bg-primary rounded-full animate-bounce"
            style="animation-delay: 0.4s"
          ></div>
        </div>

        <!-- Conteúdo da mensagem -->
        <div
          v-else
          class="chat-prose break-words"
          v-html="formattedMessage"
        ></div>

        <!-- Timestamp -->
        <div v-if="timestamp && !isTyping" class="flex items-center gap-4">
          <q-icon name="schedule" size="1.4rem" alt="" color="primary" />
          <span class="text-paragraph-3 text-white" style="opacity: 0.55">
            {{ formatTime(timestamp) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import aiLogo from "@assets/imgs/ai_investe_logo.webp";
import clockIcon from "@assets/imgs/icon-clock.svg";
import aiChatLogo from "@assets/imgs/chat_logo.webp";

export default {
  name: "CChatMessageAI",

  props: {
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: [Date, String],
      default: null,
    },
    isTyping: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      aiLogo,
      aiChatLogo,
      clockIcon,
    };
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
      return d.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
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
</style>
