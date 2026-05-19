<template>
  <button
    type="button"
    class="card-action-banner"
    @click="$emit('click', $event)"
  >
    <q-icon
      :name="icon"
      size="16px"
      class="card-action-icon shrink-0"
      aria-hidden="true"
    />

    <div class="card-action-text">
      <p class="card-action-title">{{ title }}</p>
      <p class="card-action-desc">{{ description }}</p>
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
  },

  emits: ["click"],
};
</script>

<style scoped>
.card-action-banner {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  height: 76px;
  padding: 12px 16px 18px;
  border-radius: 8px;
  border: 1px solid rgba(64, 64, 64, 0.25);
  background: linear-gradient(135deg, #000000 0%, #151515 100%);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.card-action-banner:hover {
  border-color: #e1ff06;
  box-shadow: 0 0 10px rgba(225, 255, 6, 0.15);
}

.card-action-icon {
  color: #e1ff06;
  margin-top: 1px;
}

.card-action-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.card-action-title {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif;
  font-size: 12px;
  font-weight: 510;
  line-height: 16px;
  letter-spacing: 0.04em;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-action-desc {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif;
  font-size: 12px;
  font-weight: 274;
  line-height: 130%;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.5);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
