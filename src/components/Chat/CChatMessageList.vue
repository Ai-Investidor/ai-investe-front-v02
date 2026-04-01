<template>
  <div class="relative flex-1 min-h-0 flex flex-col">
    <div
      ref="listRef"
      class="flex-1 min-h-0 overflow-y-auto px-4 md:px-8 lg:px-16 py-6"
      @scroll="onScroll"
    >
      <CChatMessage
        v-for="msg in messages"
        :key="msg.id"
        :message="msg.text"
        :sender="msg.sender"
        :timestamp="msg.timestamp"
      />

      <CChatMessage v-if="isTyping" message="" sender="ai" :is-typing="true" />

      <div ref="bottomRef" />
    </div>

    <transition name="fade">
      <CButton
        v-if="showScrollButton"
        icon="keyboard_arrow_down"
        round
        unelevated
        class="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 shadow-md"
        color="primary"
        @click="scrollToBottom"
      />
    </transition>
  </div>
</template>

<script>
import CButton from "../Button/CButton.vue";
import CChatMessage from "components/Chat/CChatMessage.vue";

export default {
  name: "CChatMessageList",

  components: {
    CButton,
    CChatMessage,
  },

  props: {
    messages: {
      type: Array,
      required: true,
    },
    isTyping: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showScrollButton: false,
      _scrollEndTimer: null,
    };
  },

  watch: {
    messages: {
      handler() {
        this.scrollToBottom();
      },
      deep: true,
    },
    isTyping() {
      this.scrollToBottom();
    },
  },

  methods: {
    onScroll() {
      const el = this.$refs.listRef;
      if (!el) return;

      // Esconde imediatamente enquanto está scrollando
      this.showScrollButton = false;

      clearTimeout(this._scrollEndTimer);
      this._scrollEndTimer = setTimeout(() => {
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        this.showScrollButton = distanceFromBottom > 120;
      }, 150);
    },

    /** Chamável externamente via $refs: this.$refs.messageList.scrollToBottom() */
    scrollToBottom() {
      this.showScrollButton = false;
      clearTimeout(this._scrollEndTimer);
      this.$nextTick(() => {
        const el = this.$refs.listRef;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
      });
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

div {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #30363d;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #484f58;
}
</style>
