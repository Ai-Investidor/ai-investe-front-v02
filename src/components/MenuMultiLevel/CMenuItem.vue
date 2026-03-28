<template>
  <!-- Sliding background indicator -->
  <li ref="indicatorRef" class="menu-indicator"></li>

  <template v-for="item in menuList()" :key="item.title">
    <li v-if="item.show" ref="itemRefs">
      <div
        v-if="item.dropdownList.length"
        class="relative">
        <button
          class="text-paragraph-3 !px-10 menu-item flex items-center gap-16"
          :class="{
            'menu-item--active': isItemActive(item),
            'reduce-size':
              (screenWidth > 600 && screenWidth < 1440) ||
              (screenWidth > 1180 && visibleItems.length > 9),
          }"
          @click="toggleDropdown(item)">
          <OIcon :name="item.icon" class="dark:[--opacity:0.6] [--color1:var(--p-primary-color)] text-primary" />
          <span class="menu-item_titulo text-surface-500">{{ item.title }}</span>
          <OIcon name="expand_more" class="text-surface-500" size="16px" />
        </button>

        <div
          v-if="openDropdownItem === item.title"
          class="absolute top-full left-0 mt-16 bg-white dark:bg-surface-600 border border-black/10 dark:border-white/10 rounded-lg shadow-lg z-50 min-w-[200px] py-16">
          <RouterLink
            v-for="dropdownItem in item.dropdownList"
            :key="dropdownItem.title"
            :to="{ name: dropdownItem.name, query: dropdownItem.query }"
            class="flex items-center px-16 py-8 text-paragraph-3 cursor-pointer hover:bg-surface-50 dark:hover:bg-white/5"
            :class="{ 'opacity-50 pointer-events-none': dropdownItem.disabled }"
            @click="openDropdownItem = null">
            <p>{{ dropdownItem.title }}</p>
          </RouterLink>
        </div>
      </div>

      <RouterLink
        v-else
        :to="{ name: item.name, query: item.query }"
        class="text-paragraph-3 !px-14 menu-item flex items-center gap-16"
        :class="{
          'menu-item--active': $route.name === item.name,
          'reduce-size':
            (screenWidth > 600 && screenWidth < 1440) ||
            (screenWidth > 1180 && visibleItems.length > 9),
        }">
        <OIcon :name="item.icon" class="dark:[--opacity:0.6] [--color1:var(--p-primary-color)] text-primary" />
        <span class="menu-item_titulo text-surface-500">{{ item.title }}</span>
      </RouterLink>
    </li>
  </template>
</template>

<script>
import OIcon from 'components/Icon/OIcon.vue'
import menuList from 'utils/menuList'

export default {
  name: 'CMenuItem',

  components: {
    OIcon,
  },

  emits: ['open:dropdown', 'close:dropdown'],

  data() {
    return {
      openDropdownItem: null,
      screenWidth: window.innerWidth,
    }
  },

  computed: {
    visibleItems() {
      return menuList().filter((i) => i.show)
    },
  },

  watch: {
    '$route.fullPath'() {
      this.initIndicator()
      this.openDropdownItem = null
    },
  },

  mounted() {
    this.initIndicator()
    window.addEventListener('resize', this.onResize)
    document.addEventListener('click', this.onOutsideClick)
  },

  unmounted() {
    window.removeEventListener('resize', this.onResize)
    document.removeEventListener('click', this.onOutsideClick)
  },

  methods: {
    menuList,

    isItemActive(item) {
      const matchParent =
        this.$route.meta.parent &&
        item.dropdownList.some((d) => d.parent === this.$route.meta.parent)
      return matchParent || this.$route.name === item.name
    },

    toggleDropdown(item) {
      if (this.openDropdownItem === item.title) {
        this.openDropdownItem = null
        this.$emit('close:dropdown')
      } else {
        this.openDropdownItem = item.title
        this.$emit('open:dropdown')
      }
    },

    getActiveEl() {
      const itemRefs = this.$refs.itemRefs
      if (!Array.isArray(itemRefs)) return null
      return itemRefs.find((li) => li?.querySelector('.menu-item--active'))
    },

    updateIndicator() {
      const activeEl = this.getActiveEl()
      const indicator = this.$refs.indicatorRef
      if (!indicator) return

      if (!activeEl) {
        indicator.style.opacity = '0'
        return
      }

      const btn = activeEl.querySelector('.menu-item')
      if (!btn) return

      const btnRect = btn.getBoundingClientRect()
      const liRect = activeEl.getBoundingClientRect()
      const offsetInLi = btnRect.left - liRect.left

      indicator.style.opacity = '1'
      indicator.style.width = `${btn.offsetWidth}px`
      indicator.style.transform = `translate(${activeEl.offsetLeft + offsetInLi}px, -50%)`
    },

    async initIndicator() {
      await this.$nextTick()
      setTimeout(this.updateIndicator, 50)
    },

    onResize() {
      this.screenWidth = window.innerWidth
      this.updateIndicator()
    },

    onOutsideClick(e) {
      if (this.openDropdownItem && !e.target.closest('.relative')) {
        this.openDropdownItem = null
        this.$emit('close:dropdown')
      }
    },
  },
}
</script>

<style scoped lang="scss">
.menu-indicator {
  position: absolute;
  top: 50%;
  left: 0;
  height: 42px;
  background-color: color-mix(in srgb, var(--p-primary-color) 10%, transparent);
  border-radius: 8px;
  pointer-events: none;
  opacity: 0;
  transform: translateY(-50%);
  transition:
    transform 0.3s cubic-bezier(0, 0.55, 0.45, 1),
    width 0.35s ease,
    opacity 0.2s ease;
  z-index: 0;
  will-change: transform, width, opacity;
  .body--dark & {
    background-color: var(--p-primary-color);
  }
}

:deep(.menu-item) {
  position: relative;
  z-index: 1;
  margin-left: 1rem;
  border-radius: 8px !important;
  font-weight: 500;
  --color1: var(--p-primary-color);
  background: transparent !important;
  text-decoration: none;
  cursor: pointer;
  padding: 8px;

  &.reduce-size {
    margin-left: 8px;
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;

    &:hover,
    &.menu-item--active {
      .menu-item_titulo {
        opacity: 1;
        max-width: max-content;
      }
    }
  }

  &:hover,
  &.menu-item--active {
    color: var(--p-primary-color);
    .menu-item_titulo {
      color: var(--p-primary-color);
    }
  }

  @media (max-width: 1550px) {
    margin-left: 0.5rem;
  }
}

.menu-item--active {
  .body--dark & {
    * {
      color: #ffffff !important;
      --color1: #ffffff;
    }
  }
}
</style>
