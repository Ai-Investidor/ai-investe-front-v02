<template>
  <button
    type="button"
    class="flex! items-start gap-2 p-4 rounded-md h-min w-full cursor-pointer text-left card-action-banner transition-all duration-200"
    @click="$emit('click', $event)"
  >
    <q-icon
      :name="icon"
      :color="iconColor"
      size="16px"
      class="shrink-0 mt-1"
      aria-hidden="true"
    />

    <div>
      <p class="text-title-2 text-dark-text">{{ title }}</p>
      <p class="text-paragraph-3 text-dark-text-subtle!">{{ description }}</p>
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
      default: "primary",
    },
  },

  emits: ["click"],
};
</script>
