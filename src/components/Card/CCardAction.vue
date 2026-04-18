<template>
  <button
    type="button"
    class="flex! items-start gap-2.5 p-5 rounded-xl h-min w-full cursor-pointer text-left card-action-glass"
    @click="$emit('click', $event)"
  >
    <q-icon
      :name="icon"
      :color="iconColor"
      size="20px"
      class="shrink-0 !mt-0.5"
      aria-hidden="true"
    />

    <div>
      <div class="flex items-center gap-2">
        <p
          class="text-base font-medium tracking-ui leading-[1.3] text-dark-text"
        >
          {{ title }}
        </p>
      </div>

      <p class="text-paragraph-3 text-dark-text-muted">{{ description }}</p>
    </div>
  </button>
</template>

<script>
export default {
  name: "CCardAction",

  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    iconColor: {
      type: String,
      default: "var(--color-primary)",
    },
  },

  emits: ["click"],
};
</script>
