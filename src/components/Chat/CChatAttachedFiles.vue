<template>
  <Swiper
    :modules="modules"
    :slides-per-view="'auto'"
    :space-between="8"
    :free-mode="true"
    :mousewheel="true"
    :watch-overflow="true"
    class="chat-attached-files w-full min-w-0 max-w-full"
  >
    <SwiperSlide
      v-for="(file, index) in files"
      :key="`${file.name}-${file.size}-${index}`"
      class="!w-auto"
    >
      <div
        class="flex items-center gap-2 py-1 pl-3 pr-1.5 bg-dark-card rounded-button text-dark-text text-paragraph-3 border border-border-dark"
      >
        <q-icon
          name="description"
          size="16px"
          class="text-dark-text-muted shrink-0"
        />
        <span class="truncate max-w-40">{{ file.name }}</span>
        <button
          type="button"
          class="flex items-center justify-center size-5 shrink-0 bg-transparent border-none rounded-full cursor-pointer text-dark-text-muted transition-colors hover:bg-white/10 hover:text-dark-text"
          :aria-label="`Remover ${file.name}`"
          @click="onRemove(index)"
        >
          <q-icon name="close" size="14px" />
        </button>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default {
  name: "CChatAttachedFiles",

  components: {
    Swiper,
    SwiperSlide,
  },

  props: {
    files: {
      type: Array,
      required: true,
    },
  },

  emits: ["remove"],

  data() {
    return {
      modules: [FreeMode, Mousewheel],
    };
  },

  methods: {
    onRemove(index) {
      this.$emit("remove", index);
    },
  },
};
</script>

<style scoped>
.chat-attached-files {
  padding: 0 0.5rem;
}
</style>
