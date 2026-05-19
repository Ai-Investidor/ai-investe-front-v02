<template>
  <q-page
    :style-fn="
      (offset) => ({ height: `calc(100vh - ${offset}px)`, minHeight: '0' })
    "
    class="relative flex flex-row overflow-hidden chat-welcome-bg"
  >
    <!-- Backdrop mobile -->
    <transition name="fade">
      <div
        v-if="isMobile && sidebarOpen"
        class="absolute inset-0 bg-black/50 z-40"
        @click="sidebarOpen = false"
      />
    </transition>

    <transition name="sidebar">
      <CChatConversationsMenu
        v-show="sidebarOpen"
        :open="sidebarOpen"
        :class="{ 'absolute! inset-y-0 left-0 z-50': isMobile }"
        :conversations="chat.sessions.value"
        :active-conversation-id="chat.activeConversationId.value"
        @new-chat="openNewChat"
        @select-conversation="onSelectConversation"
      />
    </transition>

    <!-- Coluna 3: área principal -->

    <div
      class="chat-container-content relative flex-1 min-w-0 overflow-hidden rounded-[12px] m-[10px] max-sm:m-[4px]"
    >

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
        :pending-files="chat.pendingFiles.value"
        @select-prompt="onSelectPrompt"
        @attach="onAttachFiles"
        @remove-file="onRemoveFile"
        @generate-chart="onGenerateChart"
      />

      <template v-else>
        <CChatMessageList
          ref="messageList"
          :messages="chat.messages.value"
          :is-typing="chat.isTyping.value"
          :has-more-messages="chat.hasMoreMessages.value"
          :conversation-id="chat.activeConversationId.value"
          :on-load-more-messages="chat.loadMoreMessages"
          class="chat-message-wrapper"
        />

        <div class="chat-area-input shrink-0">
          <div class="w-full max-w-[900px] mx-auto">
            <CChatInputArea
              :disabled="chat.isTyping.value"
              :pending-files="chat.pendingFiles.value"
              no-bg
              class="px-4!"
              @send="sendNewMessage"
              @attach="onAttachFiles"
              @remove-file="onRemoveFile"
              @generate-chart="onGenerateChart"
            />
            <p class="chat-disclaimer">
              AI invest é uma IA e pode cometer erros pode cometer erros.
            </p>
          </div>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script>
import { useChat } from "@composables/useChat";
import { useAuthStore } from "@stores/auth.store";
import { useUiStore } from "@stores/ui.store";
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
    const uiStore = useUiStore();
    return {
      chat: useChat(),
      authStore,
      uiStore,
    };
  },

  computed: {
    isMobile() {
      return this.$q.screen.lt.md;
    },

    userId() {
      return this.authStore.user?.id;
    },

    sidebarOpen: {
      get() {
        return this.uiStore.chatSidebarOpen;
      },
      set(value) {
        this.uiStore.setChatSidebarOpen(value);
      },
    },
  },

  watch: {
    isMobile: {
      immediate: true,
      handler(mobile) {
        if (mobile) {
          this.uiStore.setChatSidebarOpen(false);
        }
      },
    },
  },

  mounted() {
    this.chat.selectedSession.value = null;
    this.uiStore.setChatSidebarOpen(false);
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
      this.closeSidebar();
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

    onAttachFiles(files) {
      this.chat.attachFiles(files);
    },

    onRemoveFile(index) {
      this.chat.removeFile(index);
    },

    onGenerateChart() {
      // TODO: implement chart generation flow
    },

    openNewChat() {
      this.chat.newConversation();
      this.closeSidebar();
    },

    closeSidebar() {
      if (this.isMobile) {
        this.sidebarOpen = false;
      }
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

/* ── Backdrop fade ──────────────────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.chat-container-content {
  display: grid;
  grid-template-rows: [content] 1fr [input] auto;
  grid-template-columns: minmax(0, 1fr);

  overflow: hidden;

  background: linear-gradient(315deg, #151515 0%, #000000 100%);
}

.chat-container-content::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('../../assets/imgs/ai_investe_logo.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 95%;
  opacity: 0.01;
  pointer-events: none;
  z-index: 0;
}

.chat-area-content {
  width: 100%;

  grid-row: content;

  overflow-y: auto;

  min-height: 0;
  min-width: 0;
}

.chat-message-wrapper {
  grid-row: content;
  min-height: 0;
  min-width: 0;
  position: relative;
}

.chat-area-input {
  grid-row: input;
  min-height: auto;
  min-width: 0;
}

.chat-disclaimer {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif;
  font-size: 12px;
  font-weight: 274;
  line-height: 100%;
  letter-spacing: 0.04em;
  text-align: center;
  color: rgba(255, 255, 255, 0.25);
  margin-top: 25px !important;
  padding-bottom: 55px;
}
</style>
