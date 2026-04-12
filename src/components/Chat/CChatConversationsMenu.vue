<template>
  <aside
    v-show="open"
    class="conversations-menu"
  >
    <!-- Header: Ai.invest — chat -->
    <div class="conversations-menu__header">
      <span class="conversations-menu__brand">Ai.invest</span>
      <span class="conversations-menu__brand-sep"> — </span>
      <span class="conversations-menu__brand-page">chat</span>
    </div>

    <!-- Botão Novo Chat -->
    <div class="conversations-menu__new-chat-wrapper">
      <button
        class="conversations-menu__new-chat-btn"
        @click="$emit('new-chat')"
      >
        <span class="conversations-menu__new-chat-icon">+</span>
        <span class="conversations-menu__new-chat-label">Novo Chat</span>
      </button>
    </div>

    <!-- Lista de conversas -->
    <div
      ref="conversationsList"
      class="conversations-menu__list"
    >
      <p class="conversations-menu__list-label">
        Conversas recentes
      </p>

      <button
        v-for="conversation in conversations"
        :key="conversation.id"
        type="button"
        class="conversations-menu__item"
        :class="{
          'conversations-menu__item--active':
            conversation.session_id === activeConversationId,
        }"
        :aria-label="`Abrir conversa: ${conversation.title || 'Nova Conversa'}`"
        @click="$emit('select-conversation', conversation.session_id)"
      >
        <svg
          class="conversations-menu__item-icon"
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

        <div class="conversations-menu__item-text">
          <p class="conversations-menu__item-title">
            {{ conversation.title ?? "Nova Conversa" }}
          </p>
          <p class="conversations-menu__item-date">
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
/* ── Root ─────────────────────────────────────────── */
.conversations-menu {
  width: 281px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-dark-card);
  border-right: 1px solid var(--color-border-dark);
  overflow: hidden;
}

/* ── Header: brand ───────────────────────────────── */
.conversations-menu__header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 21px 30px;
  border-bottom: 1px solid var(--color-border-dark);
  flex-shrink: 0;
}

.conversations-menu__brand,
.conversations-menu__brand-sep,
.conversations-menu__brand-page {
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-regular);
  line-height: normal;
  letter-spacing: 0;
  color: var(--color-dark-text);
  white-space: nowrap;
}

/* ── New Chat button ─────────────────────────────── */
.conversations-menu__new-chat-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 30px;
  border-bottom: 1px solid var(--color-border-dark);
  flex-shrink: 0;
}

.conversations-menu__new-chat-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 23px;
  border-radius: var(--radius-button);
  border: 1px solid rgba(51, 150, 254, 0.35);
  background: linear-gradient(
    -7.59deg,
    rgba(50, 149, 255, 0.05) 1%,
    rgba(50, 149, 255, 0.45) 100%
  );
  color: var(--color-dark-text);
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    opacity 0.18s ease;
}

.conversations-menu__new-chat-btn:hover {
  opacity: 0.85;
}

.conversations-menu__new-chat-icon {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-light);
  line-height: 1;
  flex-shrink: 0;
}

.conversations-menu__new-chat-label {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--tracking-ui);
  white-space: nowrap;
}

/* ── Conversations list ──────────────────────────── */
.conversations-menu__list {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 14px 30px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.conversations-menu__list-label {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-ui);
  color: var(--color-dark-text);
  margin-bottom: 8px;
  flex-shrink: 0;
}

/* ── Conversation item ───────────────────────────── */
.conversations-menu__item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: var(--radius-button);
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  color: var(--color-dark-text);
  transition: background-color 0.18s ease;
  flex-shrink: 0;
}

.conversations-menu__item:hover {
  background-color: var(--color-dark-elevated);
}

.conversations-menu__item--active {
  background-color: var(--color-dark-elevated);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.conversations-menu__item-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--color-dark-text-secondary);
}

.conversations-menu__item-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  min-width: 0;
}

.conversations-menu__item-title {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-ui);
  color: var(--color-dark-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.conversations-menu__item-date {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-2xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-ui);
  color: var(--color-dark-text-secondary);
}

/* ── Scrollbar ───────────────────────────────────── */
.conversations-menu__list::-webkit-scrollbar {
  width: 3px;
}
.conversations-menu__list::-webkit-scrollbar-track {
  background: transparent;
}
.conversations-menu__list::-webkit-scrollbar-thumb {
  background: var(--color-border-dark);
  border-radius: var(--radius-full);
}
</style>
