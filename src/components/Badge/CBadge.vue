<template>
  <Tag
    v-bind="filteredAttrs"
    :pt="tagPt"
    :class="{
      '!rounded-full !h-20 cursor-pointer': $attrs.small,
    }">
    <template v-if="$attrs.badge" #icon>
      <span
        class="shrink-0 w-8 h-8 rounded-full inline-block mr-16"
        :style="{ background: `rgba(${$attrs.badgeColor || $attrs.color}, 1)` }" />
    </template>
    <slot name="content" />
  </Tag>
</template>

<script>
import Tag from 'primevue/tag'

export default {
  name: 'CBadge',

  components: {
    Tag,
  },

  inheritAttrs: false,

  computed: {
    filteredAttrs() {
      // eslint-disable-next-line no-unused-vars
      const { color, bg, badge, badgeColor, small, size, ...rest } = this.$attrs
      return rest
    },

    tagPt() {
      const color = this.$attrs.color || this.$attrs.bg
      const isDark = this.$q.dark.isActive
      return {
        root: {
          style: `
            color: ${isDark ? 'rgba(255, 255, 255, 0.9)' : `rgba(${color}, 1)`};
            background: ${isDark ? `rgba(${color}, 0.2)` : `rgba(${color}, 0.09)`};
            border: none;
            font-size: ${this.$attrs.size === 'lg' ? '14px' : '12px'};
            padding: 0.125rem 0.5rem;
            border-radius: 9999px;
          `,
        },
      }
    },
  },
}
</script>
