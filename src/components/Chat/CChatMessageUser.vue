<template>
  <div class="flex items-start w-full max-w-[956px] mx-auto mb-[25px] animate-fadeIn">

    <!-- Gutter esquerdo — espaçador simétrico, 44px fixo -->
    <div class="flex-shrink-0 w-11" />

    <!-- Coluna central — preenche os 900px restantes, bubble alinhado à direita -->
    <div class="flex-1 min-w-0 flex justify-end">
      <div class="chat-bubble-user flex flex-col gap-4 max-w-[80%] lg:max-w-[70%]">
        <!-- Previews de imagens anexadas -->
        <div v-if="imageFiles.length > 0" class="flex flex-wrap gap-2">
          <img
            v-for="(file, i) in imageFiles"
            :key="i"
            :src="file.previewUrl"
            :alt="file.name"
            class="max-h-48 max-w-full rounded-lg object-contain border border-white/10 cursor-pointer"
            @click="openPreview(file.previewUrl)"
          />
        </div>

        <div v-if="message" class="text-paragraph-1 whitespace-pre-wrap break-words">{{ message }}</div>

        <div v-if="timestamp" class="flex items-center gap-4">
          <q-icon name="schedule" size="1.4rem" color="primary" />
          <span class="text-paragraph-3 text-white" style="opacity: 0.55">
            {{ formatTime(timestamp) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Gutter direito — avatar do usuário fora do quadrante central, 44px fixo -->
    <div class="flex-shrink-0 w-11 flex justify-start pl-3 pt-1">
      <q-avatar size="32px" class="flex-shrink-0 bg-primary overflow-hidden">
        <img v-if="avatar" :src="avatar" alt="Avatar" class="w-full h-full object-cover" />
        <q-icon v-else name="person" size="1.4rem" color="dark" />
      </q-avatar>
    </div>

  </div>
</template>

<script>
export default {
  name: "CChatMessageUser",

  props: {
    message: { type: String, default: "" },
    timestamp: { type: [Date, String], default: null },
    avatar: { type: String, default: "" },
    files: { type: Array, default: () => [] },
  },

  computed: {
    imageFiles() {
      return (this.files ?? []).filter((f) => f.previewUrl);
    },
  },

  methods: {
    openPreview(url) {
      window.open(url, "_blank");
    },

    formatTime(date) {
      if (!date) return "";
      const d = new Date(date);
      return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    },
  },
};
</script>
