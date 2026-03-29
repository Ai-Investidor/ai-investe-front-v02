<template>
  <q-card flat bordered class="c-card-action" @click="$emit('click', $event)">
    <q-card-section class="flex items-start gap-3 text-left">
      <q-icon :name="icon" size="20px" class="flex-shrink-0 mt-0.5" />
      <div>
        <p
          class="text-title-sm text-gray-200 group-hover:text-white transition-colors"
        >
          {{ title }}
        </p>
        <p class="text-paragraph-sm text-gray-500 mt-0.5 leading-relaxed">
          {{ description }}
        </p>
      </div>
    </q-card-section>
  </q-card>
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
  },

  emits: ["click"],
};
</script>

<style lang="scss" scoped>
.c-card-action {
  cursor: pointer;
  border-radius: 0.75rem;
  background-color: #161b22;
  border-color: #30363d;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    border-color: var(--q-primary);
    background-color: #1c2128;
  }
}
</style>
