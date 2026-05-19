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
      class="flex-1 overflow-x-hidden! flex flex-col pb-3 pl-10! pr-2"
    >
      <!-- Mensagens anexadas -->
      <div
        class="overflow-y-auto overflow-x-hidden! border-l-2 border-border-pinned pl-2 flex flex-col gap-0.5 mb-2 dashed-border-left"
      >
        <div
          v-for="conversation in pinnedConversations"
          :key="`pinned-${conversation.id}`"
          class="max-w-40"
        >
          <CChatConversationItem
            :conversation="conversation"
            :active="conversation.session_id === activeConversationId"
            @select="$emit('select-conversation', $event)"
          />
        </div>
      </div>

      <!-- Mensagens não anexadas -->
      <!-- <div class="flex-1 flex flex-row gap-0.5 min-h-0 overflow-y-scroll!">
        <CChatConversationItem
          v-for="conversation in regularConversations"
          :key="`regular-${conversation.id}`"
          :conversation="conversation"
          :active="conversation.session_id === activeConversationId"
          @select="$emit('select-conversation', $event)"
        />
      </div> -->
    </div>

    <!-- Footer: plano do usuário -->
    <div class="shrink-0 px-4 py-3 border-t border-border-dark">
      <span class="text-paragraph-4 text-dark-text-muted">{{ userPlan }}</span>
    </div>
  </aside>
</template>

<script>
import { useAuthStore } from "@stores/auth.store";
import CChatSessionsInfo from "./CChatSessionsInfo.vue";
import CChatConversationItem from "./CChatConversationItem.vue";

export default {
  name: "CChatConversationsMenu",

  components: {
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
    activeConversationId: {
      type: String,
      default: null,
    },
  },

  emits: ["new-chat", "select-conversation"],

  computed: {
    pinnedConversations() {
      return this.conversations.map((c) => ({ ...c, has_attachment: false }));
    },
    regularConversations() {
      return this.conversations.map((c) => ({ ...c, has_attachment: false }));
    },
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
  background: linear-gradient(180deg, rgba(9, 10, 10, 1) 0%, rgba(0, 0, 0, 1) 100%);
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
