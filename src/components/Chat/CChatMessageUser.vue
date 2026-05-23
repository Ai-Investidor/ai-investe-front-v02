<template>
  <div class="flex items-start w-full max-w-[956px] mx-auto mb-[25px] animate-fadeIn">

    <!-- Gutter esquerdo — espaçador simétrico, 44px fixo -->
    <div class="flex-shrink-0 w-11" />

    <!-- Coluna central — preenche os 900px restantes, bubble alinhado à direita -->
    <div class="flex-1 min-w-0 flex justify-end">
      <div class="chat-bubble-user flex flex-col gap-3 max-w-[80%] lg:max-w-[70%]">
        <!-- Thumbnails de imagens anexadas -->
        <div v-if="imageFiles.length > 0" class="flex flex-wrap gap-2 justify-end">
          <button
            v-for="(file, i) in imageFiles"
            :key="i"
            type="button"
            class="image-thumb"
            @click="openLightbox(i)"
          >
            <img
              :src="file.previewUrl"
              :alt="file.name"
              class="w-full h-full object-cover"
            />
          </button>
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

    <!-- Lightbox inline -->
    <teleport to="body">
      <transition name="lightbox">
        <div
          v-if="lightboxIndex !== null"
          class="lightbox-overlay"
          @click.self="closeLightbox"
        >
          <!-- Botão fechar -->
          <button type="button" class="lightbox-close" @click="closeLightbox">
            <q-icon name="close" size="24px" />
          </button>

          <!-- Navegação anterior -->
          <button
            v-if="imageFiles.length > 1"
            type="button"
            class="lightbox-nav lightbox-nav--prev"
            @click="prevImage"
          >
            <q-icon name="chevron_left" size="32px" />
          </button>

          <!-- Imagem -->
          <img
            :src="imageFiles[lightboxIndex]?.previewUrl"
            :alt="imageFiles[lightboxIndex]?.name"
            class="lightbox-img"
            @click.stop
          />

          <!-- Navegação próxima -->
          <button
            v-if="imageFiles.length > 1"
            type="button"
            class="lightbox-nav lightbox-nav--next"
            @click="nextImage"
          >
            <q-icon name="chevron_right" size="32px" />
          </button>

          <!-- Contador -->
          <span v-if="imageFiles.length > 1" class="lightbox-counter">
            {{ lightboxIndex + 1 }} / {{ imageFiles.length }}
          </span>
        </div>
      </transition>
    </teleport>

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

  data() {
    return {
      lightboxIndex: null,
    };
  },

  computed: {
    imageFiles() {
      return (this.files ?? []).filter((f) => f.previewUrl);
    },
  },

  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },

  methods: {
    openLightbox(index) {
      this.lightboxIndex = index;
    },

    closeLightbox() {
      this.lightboxIndex = null;
    },

    prevImage() {
      this.lightboxIndex = (this.lightboxIndex - 1 + this.imageFiles.length) % this.imageFiles.length;
    },

    nextImage() {
      this.lightboxIndex = (this.lightboxIndex + 1) % this.imageFiles.length;
    },

    handleKeydown(e) {
      if (this.lightboxIndex === null) return;
      if (e.key === "Escape") this.closeLightbox();
      if (e.key === "ArrowLeft") this.prevImage();
      if (e.key === "ArrowRight") this.nextImage();
    },

    formatTime(date) {
      if (!date) return "";
      const d = new Date(date);
      return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    },
  },
};
</script>

<style scoped>
.image-thumb {
  width: 72px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
  flex-shrink: 0;
  background: none;
  padding: 0;
  transition: opacity 0.15s, border-color 0.15s;
}

.image-thumb:hover {
  opacity: 0.85;
  border-color: var(--color-primary);
}
</style>

<style>
/* Lightbox — fora do scoped pois usa teleport para body */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-img {
  max-width: 90vw;
  max-height: 88vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
}

.lightbox-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.15s;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.15s;
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightbox-nav--prev { left: 16px; }
.lightbox-nav--next { right: 16px; }

.lightbox-counter {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
