<template>
  <CChatMessageAI
    v-if="sender === 'ai'"
    :message="message"
    :timestamp="timestamp"
    :is-typing="isTyping"
  />
  <CChatMessageUser
    v-else
    :message="message"
    :timestamp="timestamp"
    :avatar="avatar"
    :files="files"
  />
</template>

<script>
import CChatMessageAI from "@components/Chat/CChatMessageAI.vue";
import CChatMessageUser from "@components/Chat/CChatMessageUser.vue";

export default {
  name: "CChatMessage",

  components: {
    CChatMessageAI,
    CChatMessageUser,
  },

  props: {
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
      validator: (value) => ["user", "ai"].includes(value),
    },
    timestamp: {
      type: [Date, String],
      default: null,
    },
    isTyping: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    files: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
