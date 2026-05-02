<template>
  <aside
    v-show="open"
    class="flex flex-col shrink-0 h-full min-h-0 w-60 bg-dark-card border-r border-border-dark overflow-hidden"
  >
    <!-- Botão Novo Chat -->
    <div class="flex justify-center shrink-0 px-4 py-4">
      <CChatSessionsInfo @new-chat="$emit('new-chat')" />
    </div>

    <!-- Lista de conversas -->
    <div
      ref="conversationsList"
      class="flex flex-col min-h-0 overflow-y-auto gap-0.5 pb-3 px-2"
    >
      <button
        v-for="conversation in conversations"
        :key="conversation.id"
        type="button"
        class="flex items-center flex-nowrap gap-2 w-full px-2 py-2 rounded-button border-0 cursor-pointer text-left text-dark-text transition-colors duration-200 shrink-0 hover:bg-dark-elevated"
        :class="{
          'bg-dark-elevated ring-inset ring-1 ring-white/10':
            conversation.session_id === activeConversationId,
        }"
        :aria-label="`Abrir conversa: ${conversation.title || 'Nova Conversa'}`"
        @click="$emit('select-conversation', conversation.session_id)"
      >
        <svg
          class="size-[16px] shrink-0 text-dark-text-muted"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <span class="text-paragraph-3 text-dark-text truncate">
          {{ conversation.title ?? "Nova Conversa" }}
        </span>
      </button>
    </div>

    <!-- Spacer -->
    <div class="flex-1" />

    <!-- Footer: plano do usuário -->
    <div class="shrink-0 px-4 py-3 border-t border-border-dark">
      <span class="text-paragraph-4 text-dark-text-muted">{{ userPlan }}</span>
    </div>
  </aside>
</template>

<script>
import { useAuthStore } from "@stores/auth.store";
import CChatSessionsInfo from "./CChatSessionsInfo.vue";

export default {
  name: "CChatConversationsMenu",

  components: {
    CChatSessionsInfo,
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
    activeConversationId: {
      type: String,
      default: null,
    },
  },

  emits: ["new-chat", "select-conversation"],

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
}
</style>
