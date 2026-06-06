<template>
  <aside
    v-show="open"
    class="flex flex-col shrink-0 h-full min-h-0 w-60 overflow-hidden"
  >
    <!-- Botão Novo Chat -->
    <div class="flex justify-center shrink-0 px-4 pt-4">
      <CChatSessionsInfo @new-chat="$emit('new-chat')" />
    </div>

    <!-- Lista de conversas -->
    <div
      ref="conversationsList"
      class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-2 pt-3 pb-3 flex flex-col"
    >
      <div
        v-if="loading"
        class="flex flex-1 items-center justify-center min-h-0"
        aria-busy="true"
        aria-label="Carregando conversas"
      >
        <CSpinner size="2.5rem" />
      </div>

      <div
        v-if="!loading"
        class="border-l-2 border-border-pinned pl-2 dashed-border-left flex flex-col gap-1 pt-4 w-full min-w-0 overflow-hidden"
      >
        <CChatConversationItem
          v-for="conversation in conversations"
          :key="conversation.id"
          :conversation="conversation"
          :active="conversation.session_id === activeConversationId"
          @select="$emit('select-conversation', $event)"
          @rename="$emit('rename-conversation', $event)"
          @delete="$emit('delete-conversation', $event)"
        />
      </div>
    </div>

    <!-- Footer: plano do usuário -->
    <div class="shrink-0 px-4 py-3 border-t border-border-dark">
      <span class="text-paragraph-4 text-dark-text-muted">{{ userPlan }}</span>
    </div>
  </aside>
</template>

<script>
import { useAuthStore } from "@stores/auth.store";
import CSpinner from "@components/Spinner/CSpinner.vue";
import CChatSessionsInfo from "./CChatSessionsInfo.vue";
import CChatConversationItem from "./CChatConversationItem.vue";

export default {
  name: "CChatConversationsMenu",

  components: {
    CSpinner,
    CChatSessionsInfo,
    CChatConversationItem,
  },

  props: {
    open: {
      type: Boolean,
      default: true,
    },
    conversations: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    activeConversationId: {
      type: String,
      default: null,
    },
  },

  emits: [
    "new-chat",
    "select-conversation",
    "rename-conversation",
    "delete-conversation",
  ],

  computed: {
    userPlan() {
      const authStore = useAuthStore();
      return authStore.userPlan || "Plano X";
    },
  },

  watch: {
    conversations() {
      this.$nextTick(() => this.scrollToBottom());
    },
  },

  methods: {
    scrollToBottom() {
      const el = this.$refs.conversationsList;
      if (el) el.scrollTop = el.scrollHeight;
    },
  },
};
</script>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    rgba(9, 10, 10, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
}

.dashed-border-left {
  border-style: dashed;
  border-image: repeating-linear-gradient(
      to bottom,
      var(--color-border-pinned) 0,
      var(--color-border-pinned) 6px,
      transparent 6px,
      transparent 10px
    )
    1;
}
</style>
