<template>
  <div
    ref="listRef"
    class="flex-1 overflow-y-auto px-4 md:px-8 lg:px-16 py-6"
  >
    <CChatMessage
      v-for="msg in messages"
      :key="msg.id"
      :message="msg.text"
      :sender="msg.sender"
      :timestamp="msg.timestamp"
    />

    <CChatMessage
      v-if="isTyping"
      message=""
      sender="ai"
      :is-typing="true"
    />

    <div ref="bottomRef" />
  </div>
</template>

<script>
import CChatMessage from 'components/Chat/CChatMessage.vue'

export default {
  name: 'CChatMessageList',

  components: {
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

  watch: {
    messages: {
      handler() {
        this.scrollToBottom()
      },
      deep: true,
    },
    isTyping() {
      this.scrollToBottom()
    },
  },

  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.bottomRef) {
          this.$refs.bottomRef.scrollIntoView({ behavior: 'smooth' })
        }
      })
    },
  },
}
</script>

<style scoped>
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
