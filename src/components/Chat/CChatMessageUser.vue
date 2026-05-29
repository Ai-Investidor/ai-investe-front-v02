<template>
  <div class="flex items-start w-full max-w-[956px] mx-auto mb-[25px] animate-fadeIn">

    <!-- Gutter esquerdo — espaçador simétrico, 44px fixo -->
    <div class="flex-shrink-0 w-11" />

    <!-- Coluna central — preenche os 900px restantes, bubble alinhado à direita -->
    <div class="flex-1 min-w-0 flex justify-end">
      <div class="chat-bubble-user flex flex-col gap-3 max-w-[80%] lg:max-w-[70%]">
        <!-- Arquivos anexados: imagens e documentos no mesmo scroll horizontal -->
        <div
          v-if="allFiles.length > 0"
          ref="thumbRow"
          class="thumb-row"
          @mousedown="onDragStart"
        >
          <template v-for="(file, i) in allFiles" :key="i">
            <!-- Imagem -->
            <button
              v-if="file.previewUrl"
              type="button"
              class="image-thumb"
              @click="openLightbox(imageIndexOf(i))"
            >
              <img
                :src="file.previewUrl"
                :alt="file.name"
                class="w-full h-full object-cover"
                draggable="false"
              />
            </button>

            <!-- Documento -->
            <div
              v-else
              class="doc-card"
              :title="file.name"
            >
              <q-icon :name="docIcon(file.type)" size="26px" class="text-primary" />
              <span class="doc-card__name">{{ file.name }}</span>
              <span class="doc-card__size">{{ formatSize(file.size) }}</span>
            </div>
          </template>
        </div>

        <div v-if="message" class="text-paragraph-1 whitespace-pre-wrap break-words">{{ message }}</div>

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
      dragState: null,
    };
  },

  computed: {
    allFiles() {
      return this.files ?? [];
    },
    imageFiles() {
      return this.allFiles.filter((f) => f.previewUrl);
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

    onDragStart(e) {
      const el = this.$refs.thumbRow;
      if (!el) return;
      this.dragState = { startX: e.pageX, scrollLeft: el.scrollLeft, moved: false };
      el.classList.add("is-dragging");

      const onMove = (ev) => {
        if (!this.dragState) return;
        const dx = ev.pageX - this.dragState.startX;
        if (Math.abs(dx) > 4) this.dragState.moved = true;
        el.scrollLeft = this.dragState.scrollLeft - dx;
      };

      const onUp = (ev) => {
        if (this.dragState?.moved) ev.stopImmediatePropagation();
        el.classList.remove("is-dragging");
        this.dragState = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp, true);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp, true);
    },

    imageIndexOf(globalIndex) {
      let imgCount = 0;
      for (let i = 0; i < globalIndex; i++) {
        if (this.allFiles[i]?.previewUrl) imgCount++;
      }
      return imgCount;
    },

    docIcon(type) {
      if (type === "application/pdf") return "picture_as_pdf";
      if (type.includes("word") || type.includes("document")) return "description";
      if (type.includes("sheet") || type.includes("excel") || type.includes("csv")) return "table_chart";
      if (type.includes("presentation") || type.includes("powerpoint")) return "slideshow";
      return "insert_drive_file";
    },

    formatSize(bytes) {
      if (!bytes) return "";
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
.doc-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  padding: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-decoration: none;
  cursor: default;
  overflow: hidden;
}

.doc-card__name {
  font-size: 10px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
}

.doc-card__size {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.4);
}

.thumb-row {
  display: flex;
  flex-direction: row;
  gap: 8px;
  overflow-x: auto;
  overflow-y: visible;
  width: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: grab;
  user-select: none;
}

.thumb-row::-webkit-scrollbar {
  display: none;
}

.thumb-row.is-dragging {
  cursor: grabbing;
}

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
