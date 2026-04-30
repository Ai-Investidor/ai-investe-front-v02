<template>
  <div
    :class="[
      'flex mb-6 animate-fadeIn',
      sender === 'user' ? 'justify-end' : 'justify-start',
    ]"
  >
    <div
      :class="[
        'flex items-start space-x-3 max-w-[85%] md:max-w-[75%] lg:max-w-[65%]',
        sender === 'user' ? 'flex-row-reverse space-x-reverse' : '',
      ]"
    >
      <!-- Avatar -->
      <div
        :class="[
          'w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0',
          sender === 'user'
            ? 'bg-gradient-to-br from-primary to-secondary'
            : 'bg-gradient-to-br from-accent to-accent-dark',
        ]"
      >
        <svg
          v-if="sender === 'user'"
          class="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          ></path>
        </svg>
        <svg
          v-else
          class="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          ></path>
        </svg>
      </div>

      <!-- Mensagem -->
      <div
        :class="[
          'rounded-2xl px-4 py-3 shadow-sm',
          sender === 'user'
            ? 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-tr-sm'
            : 'bg-[#161B22] text-white rounded-tl-sm border border-[#30363D]',
        ]"
      >
        <!-- Indicador de digitação -->
        <div v-if="isTyping" class="flex space-x-1.5">
          <div
            class="w-2 h-2 bg-current rounded-full animate-bounce"
            style="animation-delay: 0s"
          ></div>
          <div
            class="w-2 h-2 bg-current rounded-full animate-bounce"
            style="animation-delay: 0.2s"
          ></div>
          <div
            class="w-2 h-2 bg-current rounded-full animate-bounce"
            style="animation-delay: 0.4s"
          ></div>
        </div>

        <!-- Conteúdo da mensagem -->
        <div v-else>
          <div
            class="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed"
            v-html="formattedMessage"
          ></div>

          <!-- Timestamp -->
          <div
            v-if="timestamp"
            :class="[
              'text-xs mt-2 opacity-70 flex items-center',
              sender === 'user' ? 'text-white' : 'text-gray-400',
            ]"
          >
            <svg
              class="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            {{ formatTime(timestamp) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import { safeJsonParse } from "src/utils/parse..utils";

export default {
  name: "CChatMessage",

  props: {
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
      validator: (value) => ["user", "ai"].includes(value),
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

  computed: {
    formattedMessage() {
      if (this.isTyping) return "";
      try {
        // debugger;
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
/* Estilos para markdown renderizado */
:deep(p) {
  margin-bottom: 0.5rem;
}

:deep(p:last-child) {
  margin-bottom: 0;
}

:deep(ul),
:deep(ol) {
  margin-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

:deep(li) {
  margin-bottom: 0.25rem;
}

:deep(strong) {
  font-weight: 600;
}

:deep(code) {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
  font-family: "Courier New", monospace;
  color: #f8f8f2;
}

:deep(pre) {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.75rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

:deep(pre code) {
  background-color: transparent;
  padding: 0;
}

:deep(a) {
  color: inherit;
  text-decoration: underline;
  opacity: 0.8;
}
</style>
