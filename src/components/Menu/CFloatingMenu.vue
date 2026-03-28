<template>
  <Popover ref="popoverRef" class="floating-menu-popover">
    <div
      class="bg-white dark:!bg-surface-600 border border-solid border-black/10 shadow-[0_4px_28px_0px_rgba(9,18,28,0.12)] rounded-lg overflow-hidden">
      <div class="flex flex-col">
        <div
          v-for="option in options"
          :key="option.label"
          class="w-full p-0 min-h-0 cursor-pointer hover:bg-surface-50 dark:hover:bg-white/5"
          @click="handleOptionClick(option)">
          <div
            class="w-full flex flex-row flex-nowrap !justify-start items-center gap-12 text-left py-[13px] px-12 text-paragraph-3 text-surface-950 rounded-lg"
            :class="option.class">
            <OIcon v-if="option.icon" :name="option.icon" class="w-20 h-20" />
            {{ option.label }}
          </div>
        </div>
      </div>
    </div>
  </Popover>
</template>

<script>
import Popover from 'primevue/popover'
import OIcon from 'components/Icon/OIcon.vue'

export default {
  name: 'CFloatingMenu',

  components: {
    Popover,
    OIcon,
  },

  props: {
    options: {
      type: Array,
      default: () => [{ icon: '', label: 'Opcao', class: '', action: () => {} }],
    },
  },

  methods: {
    handleOptionClick(option) {
      option.action?.()
      this.$refs.popoverRef?.hide()
    },

    toggle(event) {
      this.$refs.popoverRef?.toggle(event)
    },

    show(event) {
      this.$refs.popoverRef?.show(event)
    },

    hide() {
      this.$refs.popoverRef?.hide()
    },
  },
}
</script>
