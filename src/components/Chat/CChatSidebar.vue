<template>
  <aside
    class="flex flex-col shrink-0 w-80 bg-chat-surface border-r border-chat-border"
  >
    <!-- Botão Novo Chat -->
    <div class="p-4">
      <button
        @click="$emit('new-chat')"
        class="flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary text-white font-medium rounded-xl shadow-sm transition-colors duration-200 hover:bg-primary-dark"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        <span>Novo Chat</span>
      </button>
    </div>

    <!-- Conversas Recentes -->
    <div class="flex-1 overflow-y-auto px-4 pb-4">
      <h3
        class="text-caps-1 text-dark-text-muted mb-3 px-2"
      >
        Conversas recentes
      </h3>
      <div class="flex flex-col gap-1">
        <button
          v-for="conversation in conversations"
          :key="conversation.id"
          @click="$emit('select-conversation', conversation.id)"
          class="flex items-start gap-3 w-full text-left px-3 py-2.5 rounded-md transition-colors duration-150 group hover:bg-chat-hover"
        >
          <svg
            class="shrink-0 w-5 h-5 mt-0.5 text-dark-text-hint-emphasis"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          <div class="flex-1 min-w-0">
            <div class="text-paragraph-3 text-dark-text-secondary truncate">
              {{ conversation.title }}
            </div>
            <div class="text-paragraph-4 text-dark-text-hint-emphasis mt-1">
              {{ formatForDisplay(conversation.timestamp) }}
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Configurações e Perfil -->
    <div class="flex flex-col gap-3 shrink-0 border-t border-chat-border p-4">
      <!-- Toggle de Tema -->
      <div class="flex items-center justify-between px-2 py-1.5">
        <svg
          class="shrink-0 w-5 h-5 text-dark-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          ></path>
        </svg>
        <button
          @click="$emit('toggle-theme')"
          class="relative w-14 h-7 rounded-full transition-all duration-200 focus:outline-none"
          :class="isDark ? 'bg-primary' : 'bg-chat-hover'"
        >
          <div
            class="absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 shadow-sm"
            :class="isDark ? 'left-1 translate-x-7' : 'left-1'"
          ></div>
        </button>
        <svg
          class="shrink-0 w-5 h-5 text-dark-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          ></path>
        </svg>
      </div>

      <!-- Configurações -->
      <button
        class="flex items-center gap-3 w-full text-left px-2 py-2 rounded-md text-dark-text-muted transition-colors duration-150 hover:bg-chat-hover hover:text-dark-text-secondary"
      >
        <svg
          class="shrink-0 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
        <span class="text-paragraph-3">Configurações</span>
      </button>

      <!-- Perfil do Usuário -->
      <div class="px-2 py-2">
        <div class="flex items-center gap-3">
          <div
            class="flex items-center justify-center shrink-0 w-8 h-8 bg-primary rounded-full"
          >
            <svg
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
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-paragraph-3 text-dark-text-secondary truncate">
              {{ user?.name || "Usuário" }}
            </div>
            <div class="text-paragraph-4 text-dark-text-hint-emphasis truncate">
              {{ user?.email || "user@email.com" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "CChatSidebar",

  props: {
    conversations: {
      type: Array,
      required: true,
    },
    formatForDisplay: {
      type: Function,
      required: true,
    },
    user: {
      type: Object,
      default: null,
    },
    isDark: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["new-chat", "select-conversation", "toggle-theme"],
};
</script>
