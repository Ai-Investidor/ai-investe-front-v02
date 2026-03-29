<template>
  <q-page
    :style-fn="(offset) => ({ height: `calc(100vh - ${offset}px)` })"
    class="flex overflow-hidden bg-[#0D1117] h-full"
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
        class="z-20 flex-shrink-0 h-full"
        :class="$q.screen.lt.md ? 'absolute inset-y-0 left-0' : 'relative'"
        @new-chat="chat.newConversation"
        @select-conversation="onSelectConversation"
      />
    </transition>

    <!-- Área principal -->
    <div class="flex-1 flex flex-col min-w-0 relative h-full overflow-hidden">
      <!-- Topbar da área de chat -->
      <header
        class="flex items-center gap-3 px-4 py-3 border-b border-[#30363D] bg-[#0D1117] flex-shrink-0"
      >
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

        <c-button
          icon="add"
          color="dark"
          class="rounded-lg text-sm"
          unelevated
          no-caps
          dense
          @click="chat.newConversation"
        />
      </header>

      <!-- Mensagens ou Welcome -->
      <CChatWelcome
        v-if="
          !chat.hasActiveConversation.value || chat.messages.value.length === 0
        "
        class="flex-1 overflow-y-auto"
        @select-prompt="onSelectPrompt"
      />

      <CChatMessageList
        v-else
        :messages="chat.messages.value"
        :is-typing="chat.isTyping.value"
        class="flex-1 min-h-0"
      />

      <!-- Input -->
      <CChatInputArea
        :disabled="chat.isTyping.value"
        :pending-files="chat.pendingFiles.value"
        class="flex-shrink-0"
        @send="chat.sendMessage"
        @attach-files="chat.attachFiles"
        @remove-file="chat.removeFile"
      />
    </div>
  </q-page>
</template>

<script>
import { useChat } from "@composables/useChat";
import CButton from "@components/Button/CButton.vue";
import CChatConversationsMenu from "@components/Chat/CChatConversationsMenu.vue";
import CChatWelcome from "@components/Chat/CChatWelcome.vue";
import CChatMessageList from "@components/Chat/CChatMessageList.vue";
import CChatInputArea from "@components/Chat/CChatInputArea.vue";

export default {
  name: "PageChat",

  components: {
    CButton,
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
