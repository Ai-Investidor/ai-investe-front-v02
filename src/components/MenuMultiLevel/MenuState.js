import { ref, watch } from 'vue'

const body = document.body

const state = ref({
  open: false,
  hover: false,
  passive: true,
})

function openMenu() {
  state.value = {
    open: true,
    hover: true,
    passive: false,
  }
}

function closeMenu() {
  state.value = {
    open: false,
    hover: false,
    passive: false,
  }
}

function handleCloseMenu(v) {
  const el = v.target
  const clickInsideSidebar = Boolean(el.closest('.OSidebar'))
  const isBtnOpen = Boolean(el.closest('.OSidebar-open'))

  if (!clickInsideSidebar && !isBtnOpen) closeMenu()
}

watch(state, (v) => {
  v.open
    ? body.addEventListener('click', handleCloseMenu)
    : body.removeEventListener('click', handleCloseMenu)
})

export { state, openMenu, closeMenu }
