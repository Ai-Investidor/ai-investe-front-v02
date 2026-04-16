<template>
  <q-page
    :style-fn="
      (offset) => ({ height: `calc(100vh - ${offset}px)`, minHeight: '0' })
    "
    class="flex flex-row overflow-hidden bg-dark"
  >
    <transition name="sidebar">
      <CChatConversationsMenu
        v-show="sidebarOpen"
        :open="sidebarOpen"
        :conversations="chat.sessions.value"
        :active-conversation-id="chat.activeConversationId.value"
        @new-chat="chat.newConversation"
        @select-conversation="onSelectConversation"
      />
    </transition>

    <!-- Coluna 3: área principal -->

    <div class="chat-container-content flex-1 min-w-0">
      <!-- Conteúdo: loading / welcome / mensagens -->
      <div
        v-if="chat.isLoadingMessages.value"
        class="chat-area-content flex items-center justify-center"
      >
        <CSpinner size="4rem" />
      </div>

      <CChatWelcome
        v-else-if="
          !chat.hasActiveConversation.value || chat.messages.value.length === 0
        "
        class="chat-area-content overflow-y-auto"
        @select-prompt="onSelectPrompt"
      />

      <div v-else class="chat-area-content flex! flex-col overflow-y-scroll!">
        <CChatMessageList
          ref="messageList"
          :messages="chat.messages.value"
          :is-typing="chat.isTyping.value"
        />
      </div>

      <!-- Input sempre visível no rodapé -->
      <div class="chat-area-input">
        <CChatInputArea
          :disabled="chat.isTyping.value"
          @send="sendNewMessage"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { useChat } from "@composables/useChat";
import { useAuthStore } from "@stores/auth.store";
import CChatConversationsMenu from "@components/Chat/CChatConversationsMenu.vue";
import CChatWelcome from "@components/Chat/CChatWelcome.vue";
import CChatMessageList from "@components/Chat/CChatMessageList.vue";
import CChatInputArea from "@components/Chat/CChatInputArea.vue";
import CSpinner from "@components/Spinner/CSpinner.vue";

export default {
  name: "PageChat",

  components: {
    CChatConversationsMenu,
    CChatWelcome,
    CChatMessageList,
    CChatInputArea,
    CSpinner,
  },

  setup() {
    const authStore = useAuthStore();
    return {
      chat: useChat(),
      authStore,
    };
  },

  data() {
    return {
      sidebarOpen: true,
    };
  },

  computed: {
    userId() {
      return this.authStore.user?.id;
    },
  },

  created() {
    if (this.$q.screen.lt.md) {
      this.sidebarOpen = false;
    }
  },

  mounted() {
    this.chat.selectedSession.value = null;
    this.onLoadSessions();
  },

  methods: {
    async onLoadSessions() {
      if (this.userId) {
        await this.chat.loadSessions(this.userId);
      }
    },

    async onSelectConversation(id) {
      await this.chat.getMessagesSessions(id);
      this.$nextTick(() => {
        this.$refs.messageList?.scrollToBottom();
      });
      if (this.$q.screen.lt.md) {
        this.sidebarOpen = false;
      }
    },

    async onSelectPrompt(text) {
      if (!this.chat.hasActiveConversation.value) {
        this.chat.newConversation();
      }
      await this.chat.sendMessage(text);
      this.onLoadSessions();
    },

    async sendNewMessage(text) {
      await this.chat.sendMessage(text);
      this.onLoadSessions();
    },
  },
};
</script>

<style scoped>
/* ── Animação da text sidebar ────────────────────── */
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

.chat-container-content {
  display: grid;
  grid-template-rows: [content] 1fr [input] auto;
  grid-template-columns: 1fr;

  height: 100%;
  overflow: hidden;
}

.chat-area-content {
  width: 100%;

  grid-row: content;

  overflow-y: auto;

  min-height: 0;
}

.chat-area-input {
  grid-row: input;
  min-height: 0;
}
</style>
