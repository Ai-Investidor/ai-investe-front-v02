<template>
  <aside
    ref="sidebar"
    class="OSidebar"
    level="0"
    @mouseenter="GLOBAL.debounce(50, handleMouseEnter, 'sideTime')()"
    @mouseleave="GLOBAL.debounce(10, handleMouseLeave, 'sideTime')()">
    <header v-if="showHeader" class="OSidebar-header">
      <RouterLink :to="{ name: 'home' }">
        <MenuLogo />
      </RouterLink>

      <OButton
        v-if="isSmallScreen"
        secondary
        rounded
        icon="close"
        icon-size="1.25rem"
        class="!p-0 !size-32 !text-primary dark:!border-primary-30"
        @click="closeMenu" />
    </header>

    <ul class="Nv0-ul flex flex-col h-full">
      <MenuLi
        v-for="(Nv0, index) in menuAfterPermission"
        :key="Nv0.title + index"
        :data="Nv0"
        :to="(Nv0.submenu || Nv0.dropdownList?.length) ? undefined : pathTo(Nv0)"
        :show-header="showHeader"
        :exact="true"
        @nv0-click="() => handleClick(true)"
        @click="(e) => Nv0HandleClick(e, Nv0)">
        <div v-if="Nv0.icon" class="flex-shrink-0 min-w-32 pl-10">
          <OIcon :name="Nv0.icon" size="26px" />
        </div>

        <div class="flex-1 Nv0-text">
          <p class="one-line">{{ Nv0.title }}</p>
        </div>

        <div v-if="Nv0.submenu || Nv0.dropdownList?.length" class="flex-shrink-0 opacity-50">
          <OIcon name="navigate_next" size="1rem" />
        </div>
      </MenuLi>
    </ul>
  </aside>
  <Teleport to="body">
    <span
      v-if="menuControl.menuState.value.open"
      class="OSidebar-deep"
      @click="() => handleClick(false)"></span>
  </Teleport>
</template>

<script>
import MenuLi from 'components/MenuMultiLevel/CMenuLi.vue'
import MenuLogo from 'components/MenuMultiLevel/CMenuLogo.vue'
import OIcon from 'components/Icon/OIcon.vue'
import OButton from 'components/Button/OButton.vue'

import GLOBAL from 'utils/GLOBAL'
import logoAnimation from 'utils/animation/logo'

export default {
  name: 'CMenuMultiLevel',

  components: {
    MenuLi,
    MenuLogo,
    OIcon,
    OButton,
  },

  inject: {
    // Renomeia para evitar conflito com a prop 'menu' (array de itens)
    injectedUser: { from: 'user' },
    menuControl: { from: 'menu' },
  },

  props: {
    menu: { type: Array, default: () => [] },
  },

  data() {
    return {
      GLOBAL,
      showHeader: true,
      isSmallScreen: window.innerWidth < 1180,
    }
  },

  computed: {
    state() {
      return this.menuControl.menuState
    },

    menuAfterPermission() {
      return this.menu.filter((i) => {
        if (!this.injectedUser?.value?.is_staff && i.permissions === 'staff') return false
        return i
      })
    },
  },

  watch: {
    showHeader(val) {
      if (!val) {
        document.body.classList.add('showHeader')
        this._animate = logoAnimation('.header-top')
        this._animate.logoAnimationToNDT.play().progress(1)
      } else {
        document.body.classList.remove('showHeader')
      }
    },

    'state.value.open'(open) {
      if (open) {
        document.body.classList.add('sidebar-open')
      } else {
        document.body.classList.remove('sidebar-open')
        this.state.value.hover = false
        this.toggleActiveOnLis()
      }
    },

    'state.value.hover'(hover) {
      if (hover) {
        if (!this.isSmallScreen) document.body.classList.add('sidebar-active')
        this._animate.logoAnimationToNovadata.play().timeScale(1.1)
      } else {
        document.body.classList.remove('sidebar-active')
        this._animate.logoAnimationToNovadata.reverse()
      }
    },
  },

  mounted() {
    this._animate = logoAnimation('.OSidebar')
    this._animate.logoAnimationToNDT.play().progress(1)
    setTimeout(() => {
      this.state.value.passive = false
    }, 300)

    window.animaa = this._animate

    this._resizeHandler = () => {
      this.isSmallScreen = window.innerWidth < 1180
    }
    window.addEventListener('resize', this._resizeHandler)
  },

  unmounted() {
    this.state.value = {
      hover: false,
      open: false,
      passive: true,
    }
    this._animate.logoAnimationToNDT.seek()
    this._animate.logoAnimationToNovadata.seek(0)
    window.removeEventListener('resize', this._resizeHandler)
  },

  beforeRouteLeave() {
    this.state.value = {
      hover: false,
      open: false,
      passive: false,
    }
  },

  beforeRouteUpdate() {
    this.state.value.open = false
  },

  methods: {
    pathTo(i) {
      const params = i.params || {}
      return { name: i.name, ...params }
    },

    closeMenu() {
      this.menuControl.closeMenu()
    },

    handleMouseEnter() {
      if (this.state.value.passive) return
      this.state.value.hover = true
    },

    handleMouseLeave() {
      if (this.state.value.open || this.state.value.passive) return
      this.state.value.hover = false
    },

    handleClick(val) {
      if (this.state.value.passive) return
      this.state.value.open = val
    },

    Nv0HandleClick({ currentTarget }, Nv0) {
      const hasSubmenu = Nv0.submenu || Nv0.dropdownList?.length
      if (hasSubmenu) {
        this.state.value.open = true
        this.toggleActiveOnLis(currentTarget)
      } else {
        GLOBAL.debounce(0, this.handleClick, 'sideTime')(false)
        this.toggleActiveOnLis(currentTarget)
      }
    },

    toggleActiveOnLis(current) {
      document
        .querySelectorAll('.Nv0-ul > li')
        .forEach((i) => i.classList.remove('active'))
      if (current) current.classList.add('active')
    },
  },
}
</script>

<style lang="sass">
@import "src/css/responsivo.sass"

:root
  --Nv0-sidebar-width: 5rem
  --Nv0-sidebar-width-open: 21.25rem
  --Nv0-sidebar-transition: ease-out
  // cubic-bezier(.4,0,.2,1)
  --Nv0-sidebar-border:1px solid color-mix(in srgb, var(--p-text-color) 10%, transparent)
  --Nv0-sidebar-z-index: 5010
  --Nv0-sidebar-overflow: hidden
  --Nv1-sidebar-width: 21.25rem
  --Nv1-sidebar-z-index: 9019
  --Nv2-sidebar-z-index: 9018
  --z-index-deep: 5000
  --sidebar-top:0
  --sidebar-header-height: 5.4375rem
  @include d(md)
    --Nv0-sidebar-width: 0rem

  @include d(sm)
    --Nv0-sidebar-width-open: 100%


.body--light
  --logo-color: #000
  --sidebar-bg: #ffffff
  --Nv1-sidebar-bg: #ffffff
  --Nv2-sidebar-bg: #ffffff

.body--dark
  --logo-color: white
  --sidebar-bg: var(--p-surface-700)
  --Nv1-sidebar-bg: var(--p-surface-600)
  --Nv2-sidebar-bg: var(--p-surface-500)
  --Nv0-sidebar-border:1px solid rgba(255, 255, 255, 0.05)

.OSidebar
  position: fixed
  height: 100vh
  left: 0
  top: var(--sidebar-top)
  width: var(--Nv0-sidebar-width)
  z-index: var(--Nv0-sidebar-z-index)
  background: var(--sidebar-bg)
  transition:.2s  var(--Nv0-sidebar-transition)
  border-right: var(--Nv0-sidebar-border)
  transition-property: width
  overflow: var(--Nv0-sidebar-overflow)
  display: flex
  flex-direction: column
  .showHeader &
    --sidebar-top:51px

  .sidebar-active &
    width: var(--Nv0-sidebar-width-open)
    --Nv0-sidebar-overflow: initial

  .sidebar-open &
    width: var(--Nv0-sidebar-width-open)

  @include d(md)
    p.one-line
      font-size: .875rem

// Header
.OSidebar-header
  padding: 1.5rem .5rem 1.5rem
  border-bottom: var(--Nv0-sidebar-border)
  height: var(--sidebar-header-height)

  @include d(md)
    display: flex
    align-items: center
    justify-content: space-between
    padding: .75rem .5rem

//itens
.Nv0-ul
  margin-top: 2rem
  flex-wrap: nowrap
  overflow-y: auto
  overflow-x: hidden
  @include d(md)
    margin-top: 1rem
    padding-bottom: 1rem

.Nv0-li
  white-space: nowrap
.Nv0-text
  opacity: 0
  transition: opacity .2s ease

.sidebar-active,
.sidebar-open
  .OSidebar
    .Nv0-text
      opacity: 1

// Fundo
.OSidebar-deep
  width: 100vw
  height: 100vh
  background: rgba(0,0,0,0.1)
  z-index: var(--z-index-deep)
  position: fixed
  cursor: pointer
  top: var(--sidebar-top)
  left: 0
  backdrop-filter: blur(10px)
</style>
