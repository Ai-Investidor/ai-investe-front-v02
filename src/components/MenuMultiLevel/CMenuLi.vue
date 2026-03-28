<template>
  <!-- Nv0 li  -->
  <div v-if="data.separator" class="flex-[99999]"></div>

  <li
    v-else
    class="Nv0-li"
    :class="{ 'router-link-active': active }"
    @click="$emit('nv0-click')">
    <div class="flex items-center cursor-pointer relative">
      <slot>
        <!-- Nv0 Slot onde entra  o conteudo da li  -->
      </slot>
    </div>

    <!-- Submenus  ------------------------------>
    <ul
      v-if="haveSubmenu"
      class="submenu"
      :level="haveSubmenu[0].nivel">
      <li class="Nv1-li">
        <!-- Nv1 Header  -->
        <header v-if="showHeader" class="Nv1-header">
          <p class="text-title-4 one-line">{{ data.title }}</p>
          <OIcon :name="data.icon" size="24px" />
        </header>
      </li>
      <!-- Nv1 item  -->
      <li
        v-for="Nv1 in haveSubmenu"
        :key="Nv1.title"
        class="submenu-li cursor-pointer"
        @click="Nv1.name ? $router.push({ name: Nv1.name }) : undefined">
        <!-- Nv1 Content  -->
        <div class="flex items-center px-16 py-8">
          <div class="flex-1">
            <p class="one-line">{{ Nv1.title }}</p>
          </div>

          <!-- Button ADD && List -->
          <div
            v-if="Nv1.add || Nv1.list"
            class="flex-shrink-0 flex gap-16 flex-nowrap flex-row items-center">
            <o-button
              v-if="Nv1.list"
              v-tooltip.top="'Lista'"
              class="action-button"
              :to="Nv1.list"
              size="sm"
              tertiary>
              <OIcon name="svguse:/icons.svg#icon_list" size="1.25rem" />
            </o-button>

            <o-button
              v-if="Nv1.add"
              v-tooltip.top="'Adicionar'"
              class="action-button"
              :to="Nv1.add"
              size="sm"
              tertiary>
              <OIcon name="svguse:/icons.svg#icon_add" size="1.25rem" />
            </o-button>
          </div>

          <!-- Arrow  -->
          <div v-if="Nv1.submenu" class="flex-shrink-0 opacity-50">
            <OIcon name="navigate_next" size="1rem" />
          </div>
        </div>

        <!-- Submenu Nv2 -->
        <ul
          v-if="Nv1.submenu"
          class="submenu"
          :level="Nv1.submenu[0].nivel">
          <li class="Nv2-li">
            <!-- Header Nv2 -->
            <header v-if="showHeader" class="Nv2-header">
              <p class="text-title-4 one-line">{{ Nv1.title }}</p>
            </header>
          </li>
          <li
            v-for="Nv2 in Nv1.submenu"
            :key="Nv2.title"
            class="submenu-li cursor-pointer"
            @click.stop="Nv2.name ? $router.push({ name: Nv2.name }) : undefined">
            <div class="flex items-center px-16 py-8">
              <div class="flex-1">
                <p class="one-line">{{ Nv2.title }}</p>
              </div>
              <!-- Button ADD && List -->
              <div
                v-if="Nv2.add || Nv2.list"
                class="flex-shrink-0 flex gap-16 flex-nowrap flex-row items-center">
                <o-button
                  v-if="Nv2.list"
                  v-tooltip.top="'Lista'"
                  class="action-button"
                  :to="Nv2.list"
                  size="sm"
                  tertiary>
                  <OIcon name="svguse:/icons.svg#icon_list" size="1.25rem" />
                </o-button>

                <o-button
                  v-if="Nv2.add"
                  v-tooltip.top="'Adicionar'"
                  class="action-button"
                  :to="Nv2.add"
                  size="sm"
                  tertiary>
                  <OIcon name="svguse:/icons.svg#icon_add" size="1.25rem" />
                </o-button>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</template>

<script>
import OButton from 'components/Button/OButton.vue'
import OIcon from 'components/Icon/OIcon.vue'

export default {
  name: 'CMenuLi',

  components: {
    OButton,
    OIcon,
  },

  props: {
    data: { type: Object, default: () => ({}) },
    showHeader: { type: Boolean, default: true },
  },

  emits: ['nv0-click'],

  data() {
    return {
      haveSubmenu:
        this.data.submenu ||
        (this.data.dropdownList?.length
          ? this.data.dropdownList.map((i) => ({ ...i, nivel: 1 }))
          : null),
    }
  },

  computed: {
    active() {
      const itemName = this.data?.name
      if (!itemName) return false
      if (this.$route.name === itemName) return true
      const submenuNames = (this.data.submenu || this.data.dropdownList || [])
        .map((i) => i.name)
        .filter(Boolean)
      return submenuNames.includes(this.$route.name)
    },
  },
}
</script>

<style lang="sass">
.OSidebar li
  position: relative
  user-select: none
  font-size: 0.875rem
  line-height: 1.25rem
  color: var(--p-text-color)

  .body--dark &
    color: rgba(255, 255, 255, 0.9) !important

  .submenu
    display: none
    flex-direction: column
    height: 100vh
    top: var(--sidebar-top)
    position: fixed
    width: var(--Nv1-sidebar-width)
    border-left: var(--Nv0-sidebar-border)
    transform: translate3d(0,0,0)

    &[level="1"]
      left: calc(var(--Nv1-sidebar-width) - 1px)
      z-index: var(--Nv1-sidebar-z-index)
      background: var(--Nv1-sidebar-bg)

    &[level="2"]
      left: calc((var(--Nv1-sidebar-width)) - 1px)
      z-index: var(--Nv2-sidebar-z-index)
      background: var(--Nv2-sidebar-bg)
      top: 0

  .Nv1-li,
  .Nv2-li
    margin-bottom: 2rem

  .Nv1-header
    display: flex
    align-items: center
    gap:.5rem
    border-bottom: var(--Nv0-sidebar-border)
    padding: 1rem
    height: var(--sidebar-header-height)
    justify-content: space-between
    position: relative

    //ornamento verde Nv1
    &::after
      content:''
      display: block
      position: absolute
      top: 0
      bottom: 0
      margin: auto 0
      left: 0
      background: var(--p-primary-color)
      height: 1.5rem
      width:3px
      border-radius: 0 8px 8px 0

  .Nv2-header
    display: flex
    align-items: center
    gap:.5rem
    border-bottom: var(--Nv0-sidebar-border)
    padding: 1rem
    height: var(--sidebar-header-height)
    justify-content: space-between
    position: relative

  //Button Add and List
  .action-button
    width: 2rem !important
    height: 2rem !important
    padding: 0 !important

//Dark
.body--dark .action-button
      background: rgba(255, 255, 255, 0.05) !important


//ativa os submenu no hover e active
.sidebar-active .OSidebar,
.sidebar-open .OSidebar
  .Nv0-li:hover,
  li:not(.Nv0-li):hover,
  li.active
    > .submenu
      display: flex
      animation: show .25s var(--Nv0-sidebar-transition) both 0.05s

@keyframes show
  0%
    opacity: 0
    transform: translateX(-10px)
  100%
    opacity: 1
    transform: translateX(0px)
</style>
