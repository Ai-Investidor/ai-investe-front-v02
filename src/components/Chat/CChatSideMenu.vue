<template>
  <div class="flex shrink-0 h-full">
    <ChatIconMenu
      :activeRoute="activeRoute"
      :isDark="isDark"
      @toggle-theme="$emit('toggle-theme')"
      @open-settings="$emit('open-settings')"
      @open-profile="$emit('open-profile')"
      @navigate="$emit('navigate', $event)"
    />

    <ChatConversationsMenu
      :open="open"
      :conversations="conversations"
      :formatForDisplay="formatForDisplay"
      @new-chat="$emit('new-chat')"
      @select-conversation="$emit('select-conversation', $event)"
    />
  </div>
</template>

<script>
import ChatIconMenu from "@components/ChatIconMenu.vue";
import ChatConversationsMenu from "@components/ChatConversationsMenu.vue";

export default {
  name: "CChatSideMenu",

  components: {
    ChatIconMenu,
    ChatConversationsMenu,
  },

  props: {
    open: {
      type: Boolean,
      default: true,
    },
    activeRoute: {
      type: String,
      default: "chat",
    },
    isDark: {
      type: Boolean,
      default: true,
    },
    conversations: {
      type: Array,
      required: true,
    },
    formatForDisplay: {
      type: Function,
      required: true,
    },
  },

  emits: [
    "toggle-theme",
    "open-settings",
    "open-profile",
    "new-chat",
    "select-conversation",
    "navigate",
  ],
};
</script>
