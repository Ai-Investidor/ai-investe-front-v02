<template>
  <q-page
    :style-fn="(offset) => ({ height: `calc(100vh - ${offset}px)`, minHeight: '0' })"
    class="page-chat"
  >
    <!-- Coluna 1: icon sidebar (75px, sempre visível) -->
    <CSidebar />

    <!-- Coluna 2: text sidebar (281px, togglável) -->
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
    <div class="page-chat__main">

      <!-- Header inline (não é q-header) -->
      <CHeader @toggle:sidebar="sidebarOpen = !sidebarOpen" />

      <!-- Conteúdo: loading / welcome / mensagens -->
      <div
        v-if="chat.isLoadingMessages.value"
        class="page-chat__loading"
      >
        <CSpinner size="4rem" />
      </div>

      <CChatWelcome
        v-else-if="!chat.hasActiveConversation.value || chat.messages.value.length === 0"
        class="page-chat__content"
        @select-prompt="onSelectPrompt"
      />

      <CChatMessageList
        v-else
        ref="messageList"
        :messages="chat.messages.value"
        :is-typing="chat.isTyping.value"
        class="page-chat__content"
      />

      <!-- Input sempre visível no rodapé -->
      <CChatInputArea
        :disabled="chat.isTyping.value"
        @send="sendNewMessage"
      />
    </div>
  </q-page>
</template>

<script>
import { useChat } from "@composables/useChat";
import { useAuthStore } from "@stores/auth.store";
import CSidebar from "@components/Sidebar/CSidebar.vue";
import CHeader from "@components/Header/CHeader.vue";
import CChatConversationsMenu from "@components/Chat/CChatConversationsMenu.vue";
import CChatWelcome from "@components/Chat/CChatWelcome.vue";
import CChatMessageList from "@components/Chat/CChatMessageList.vue";
import CChatInputArea from "@components/Chat/CChatInputArea.vue";
import CSpinner from "@components/Spinner/CSpinner.vue";

export default {
  name: "PageChat",

  components: {
    CSidebar,
    CHeader,
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
/* ── Root: flex row cobrindo a tela inteira ──────── */
.page-chat {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background-color: var(--color-dark);
}

/* ── Coluna principal (header + conteúdo + input) ── */
.page-chat__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

/* ── Área de conteúdo (welcome / mensagens) ──────── */
.page-chat__content {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

/* ── Loading state ───────────────────────────────── */
.page-chat__loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
}

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
</style>
