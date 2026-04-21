<template>
  <div class="relative flex-1! min-h-0! flex! flex-col!">
    <div
      ref="listRef"
      class="chat-message-list flex-1 min-h-0 overflow-y-auto px-4 md:px-8 lg:px-16 py-6"
      @scroll="onScroll"
    >
      <q-infinite-scroll
        ref="infiniteScroll"
        scroll-target=".chat-message-list"
        :reverse="true"
        :offset="80"
        @load="onLoadMore"
      >
        <template #loading>
          <div class="flex justify-center py-8">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>

        <CChatMessage
          v-for="msg in messages"
          :key="msg.id"
          :message="msg.text"
          :sender="msg.sender"
          :timestamp="msg.timestamp"
        />

        <CChatMessage v-if="isTyping" message="" sender="ai" :is-typing="true" />

        <div ref="bottomRef" />
      </q-infinite-scroll>
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
    hasMoreMessages: {
      type: Boolean,
      default: false,
    },
    conversationId: {
      type: String,
      default: null,
    },
    onLoadMoreMessages: {
      type: Function,
      default: null,
    },
  },

  data() {
    return {
      showScrollButton: false,
      scrollEndTimer: null,
    };
  },

  watch: {
    messages: {
      handler() {
        if (this._isLoadingMore) return;
        this.scrollToBottom();
      },
      deep: true,
    },
    isTyping() {
      this.scrollToBottom();
    },
    conversationId: {
      handler() {
        this._isLoadingMore = false;
        this.$nextTick(() => {
          const el = this.$refs.listRef;
          if (el) el.scrollTop = el.scrollHeight;
          if (this.$refs.infiniteScroll) {
            this.$refs.infiniteScroll.reset();
          }
        });
      },
    },
  },

  methods: {
    async onLoadMore(index, done) {
      if (!this.onLoadMoreMessages || !this.hasMoreMessages) {
        done(true);
        return;
      }

      const el = this.$refs.listRef;
      const prevScrollHeight = el?.scrollHeight ?? 0;
      this._isLoadingMore = true;

      await this.onLoadMoreMessages();

      await this.$nextTick();
      if (el) el.scrollTop = el.scrollHeight - prevScrollHeight;
      this._isLoadingMore = false;

      done(!this.hasMoreMessages);
    },

    onScroll() {
      const el = this.$refs.listRef;
      if (!el) return;

      this.showScrollButton = false;

      clearTimeout(this.scrollEndTimer);
      this.scrollEndTimer = setTimeout(() => {
        const distanceFromBottom =
          el.scrollHeight - el.scrollTop - el.clientHeight;
        this.showScrollButton = distanceFromBottom > 120;
      }, 150);
    },

    /** Chamável externamente via $refs: this.$refs.messageList.scrollToBottom() */
    scrollToBottom() {
      this.showScrollButton = false;
      clearTimeout(this.scrollEndTimer);
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
</style>
