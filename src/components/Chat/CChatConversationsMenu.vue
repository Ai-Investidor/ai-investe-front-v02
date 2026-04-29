<template>
  <aside
    v-show="open"
    class="flex flex-col shrink-0 h-full min-h-0 w-full max-w-64! bg-dark-card border-r border-border-dark overflow-hidden"
  >
    <!-- Botão Novo Chat -->
    <div
      class="flex items-center justify-center py-4 px-7 border-b border-border-dark shrink-0"
    >
      <button
        class="btn-new-chat-gradient flex items-center justify-center gap-2.5 w-full py-1.5 px-4 rounded-button border border-primary/35 text-dark-text cursor-pointer transition duration-200 hover:opacity-85"
        @click="$emit('new-chat')"
      >
        <span
          class="flex justify-center items-center text-xl font-light leading-none shrink-0 max-h-6"
          >+</span
        >
        <span class="text-xl font-regular tracking-ui whitespace-nowrap"
          >Novo Chat</span
        >
      </button>
    </div>

    <!-- Lista de conversas -->
    <div
      ref="conversationsList"
      class="flex! flex-col! flex-nowrap! min-h-0 overflow-y-scroll! gap-0.5 py-3.5 px-4"
    >
      <p class="text-paragraph-2 text-dark-text mb-3.5! shrink-0">
        Conversas recentes
      </p>

      <button
        v-for="conversation in conversations"
        :key="conversation.id"
        type="button"
        class="flex items-center flex-nowrap! gap-2.5 w-full p-2 rounded-button border-0 cursor-pointer text-left text-dark-text transition-colors duration-200 shrink-0 hover:bg-dark-elevated"
        :class="{
          'bg-dark-elevated ring-inset ring-1 ring-white/10':
            conversation.session_id === activeConversationId,
        }"
        :aria-label="`Abrir conversa: ${conversation.title || 'Nova Conversa'}`"
        @click="$emit('select-conversation', conversation.session_id)"
      >
        <svg
          class="size-[18px] shrink-0 text-dark-text-secondary"
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

        <div class="flex flex-col items-start gap-0.5 min-w-0 h-full">
          <p class="text-paragraph-2 text-dark-text truncate max-w-[180px]">
            {{ conversation.title ?? "Nova Conversa" }}
          </p>
          <p class="text-paragraph-4 text-dark-text-secondary">
            {{
              conversation.created_at
                ? formatDateBR(conversation.created_at)
                : "N/A"
            }}
          </p>
        </div>
      </button>
    </div>
  </aside>
</template>

<script>
import { formatDateBR } from "@utils/dates.util";

export default {
  name: "CChatConversationsMenu",

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

  watch: {
    conversations() {
      this.$nextTick(() => this.scrollToBottom());
    },
  },

  methods: {
    formatDateBR,

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
