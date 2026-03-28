<template>
  <div
    class="pricing-card flex flex-col gap-12 p-24 rounded-8"
    :class="{
      'pricing-card--current': current,
      'pricing-card--featured': featured,
    }"
  >
    <div class="flex items-center justify-between">
      <span class="text-caps-2 text-primary">{{ tier }}</span>
      <OBadge v-if="current" color="0,186,97">
        <template #content>Atual</template>
      </OBadge>
      <OBadge v-else-if="featured" color="13,94,240">
        <template #content>Popular</template>
      </OBadge>
    </div>

    <h3 class="text-headline-2 text-surface-950 dark:text-white">{{ name }}</h3>

    <div class="flex items-baseline gap-16">
      <span class="text-title-3 text-surface-950 dark:text-white font-bold">
        {{ formattedPrice }}
      </span>
      <span class="text-paragraph-4 text-surface-500 dark:text-white/40">
        /{{ intervalLabel }}
      </span>
    </div>

    <p v-if="description" class="text-paragraph-4 text-surface-500 dark:text-white/60">
      {{ description }}
    </p>

    <ul v-if="features?.length" class="flex flex-col gap-24 mt-16 flex-1">
      <li
        v-for="(feat, i) in features"
        :key="i"
        class="flex items-start gap-8 text-paragraph-4 text-surface-500 dark:text-white/70"
      >
        <OIcon name="check_circle" class="text-green-500 shrink-0 mt-1" size="14px" />
        {{ feat }}
      </li>
    </ul>

    <div class="mt-auto pt-12">
      <slot name="action" />
    </div>
  </div>
</template>

<script>
import OIcon from 'components/Icon/OIcon.vue'
import OBadge from 'components/Badge/CBadge.vue'

export default {
  name: 'CPricingCard',

  components: {
    OIcon,
    OBadge,
  },

  props: {
    tier: { type: String, default: '' },
    name: { type: String, default: '' },
    formattedPrice: { type: String, default: 'R$ 0,00' },
    intervalLabel: { type: String, default: 'mes' },
    description: { type: String, default: '' },
    features: { type: Array, default: () => [] },
    current: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
  },
}
</script>

<style scoped>
.pricing-card {
  background: #ffffff;
  border: 1px solid color-mix(in srgb, var(--p-text-color) 8%, transparent);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.pricing-card:hover {
  border-color: color-mix(in srgb, var(--p-primary-color) 20%, transparent);
}

.pricing-card--featured {
  border-color: color-mix(in srgb, var(--p-primary-color) 40%, transparent);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--p-primary-color) 8%, transparent);
}

.pricing-card--current {
  border-color: color-mix(in srgb, var(--p-primary-color) 30%, transparent);
  background: color-mix(in srgb, var(--p-primary-color) 3%, transparent);
}

.body--dark .pricing-card {
  background: var(--p-surface-500);
  border-color: rgba(255, 255, 255, 0.05);
}

.body--dark .pricing-card:hover {
  border-color: color-mix(in srgb, var(--p-primary-color) 30%, transparent);
}

.body--dark .pricing-card--featured {
  border-color: color-mix(in srgb, var(--p-primary-color) 40%, transparent);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--p-primary-color) 10%, transparent);
}

.body--dark .pricing-card--current {
  border-color: color-mix(in srgb, var(--p-primary-color) 30%, transparent);
  background: color-mix(in srgb, var(--p-primary-color) 5%, transparent);
}
</style>
