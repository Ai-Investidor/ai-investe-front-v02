<template>
  <div class="flex mb-6 animate-fadeIn justify-end">
    <div
      class="flex items-start gap-4 max-w-[80%] lg:max-w-[70%] flex-row-reverse"
    >
      <!-- Avatar -->
      <q-avatar size="32px" class="flex-shrink-0 bg-primary overflow-hidden">
        <img
          v-if="avatar"
          :src="avatar"
          alt="Avatar"
          class="w-full h-full object-cover"
        />
        <q-icon v-else name="person" size="1.4rem" color="dark" />
      </q-avatar>

      <!-- Mensagem -->
      <div class="chat-bubble-user flex flex-col gap-4 flex-1">
        <div class="text-paragraph-1 whitespace-pre-wrap break-words">
          {{ message }}
        </div>

        <!-- Timestamp -->
        <div v-if="timestamp" class="flex items-center gap-4">
          <q-icon name="schedule" size="1.4rem" alt="" color="primary" />
          <span class="text-paragraph-3 text-white" style="opacity: 0.55">
            {{ formatTime(timestamp) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CChatMessageUser",

  props: {
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: [Date, String],
      default: null,
    },
    avatar: {
      type: String,
      default: "",
    },
  },

  methods: {
    formatTime(date) {
      if (!date) return "";
      const d = new Date(date);
      return d.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>
