<template>
  <q-page
    :style-fn="(offset) => ({ height: `calc(100vh - ${offset}px)` })"
    class="flex overflow-hidden bg-[#0D1117]"
  >
    <!-- Overlay mobile para fechar sidebar -->
    <div
      v-if="sidebarOpen && $q.screen.lt.md"
      class="fixed inset-0 bg-black/50 z-10"
      @click="sidebarOpen = false"
    />

    <!-- Sidebar de conversas -->
    <transition name="sidebar">
      <CChatConversationsMenu
        v-show="sidebarOpen"
        :open="sidebarOpen"
        :conversations="chat.conversations.value"
        :formatForDisplay="chat.formatForDisplay"
        class="z-20 flex-shrink-0"
        :class="$q.screen.lt.md ? 'absolute inset-y-0 left-0' : 'relative'"
        @new-chat="chat.newConversation"
        @select-conversation="onSelectConversation"
      />
    </transition>

    <!-- Área principal -->
    <div class="flex-1 flex flex-col min-w-0 relative">
      <!-- Topbar da área de chat -->
      <header
        class="flex items-center gap-3 px-4 py-3 border-b border-[#30363D] bg-[#0D1117] flex-shrink-0"
      >
        <button
          class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#21262D] transition-colors"
          @click="sidebarOpen = !sidebarOpen"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div class="flex-1 min-w-0">
          <p
            v-if="chat.hasActiveConversation.value"
            class="text-sm font-medium text-white truncate"
          >
            {{ activeTitle }}
          </p>
          <p v-else class="text-sm text-gray-500">
            Selecione ou inicie uma conversa
          </p>
        </div>

        <button
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#21262D] hover:bg-[#30363D] text-gray-300 hover:text-white text-sm transition-colors"
          @click="chat.newConversation"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span class="hidden sm:inline">Novo chat</span>
        </button>
      </header>

      <!-- Mensagens ou Welcome -->
      <CChatWelcome
        v-if="
          !chat.hasActiveConversation.value || chat.messages.value.length === 0
        "
        @select-prompt="onSelectPrompt"
      />

      <CChatMessageList
        v-else
        :messages="chat.messages.value"
        :is-typing="chat.isTyping.value"
      />

      <!-- Input -->
      <CChatInputArea
        :disabled="chat.isTyping.value"
        @send="chat.sendMessage"
      />
    </div>
  </q-page>
</template>

<script>
import { useChat } from "@composables/useChat";
import CChatConversationsMenu from "@components/Chat/CChatConversationsMenu.vue";
import CChatWelcome from "@components/Chat/CChatWelcome.vue";
import CChatMessageList from "@components/Chat/CChatMessageList.vue";
import CChatInputArea from "@components/Chat/CChatInputArea.vue";

export default {
  name: "PageChat",

  components: {
    CChatConversationsMenu,
    CChatWelcome,
    CChatMessageList,
    CChatInputArea,
  },

  setup() {
    return {
      chat: useChat(),
    };
  },

  data() {
    return {
      sidebarOpen: true,
    };
  },

  computed: {
    activeTitle() {
      const conv = this.chat.conversations.value.find(
        (c) => c.id === this.chat.activeConversationId.value,
      );
      return conv?.title || "Nova conversa";
    },
  },

  created() {
    if (this.$q.screen.lt.md) {
      this.sidebarOpen = false;
    }
  },

  methods: {
    onSelectConversation(id) {
      this.chat.selectConversation(id);
      if (this.$q.screen.lt.md) {
        this.sidebarOpen = false;
      }
    },

    async onSelectPrompt(text) {
      if (!this.chat.hasActiveConversation.value) {
        this.chat.newConversation();
      }
      await this.chat.sendMessage(text);
    },
  },
};
</script>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
