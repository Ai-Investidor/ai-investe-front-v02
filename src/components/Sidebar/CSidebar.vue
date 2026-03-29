<template>
  <q-drawer
    v-model="isOpen"
    show-if-above
    :mini="isMini"
    :width="240"
    :mini-width="64"
    class="app-sidebar"
  >
    <!-- Logo -->
    <div class="sidebar-logo" :class="{ 'sidebar-logo--mini': isMini }">
      <div class="sidebar-logo__icon">
        <q-icon name="svguse:icons/icons.svg#icon-logo" size="20px" color="white" />
      </div>
      <span v-if="!isMini" class="sidebar-logo__name text-title-sm">AI.INVEST</span>
    </div>

    <!-- Scroll area -->
    <div class="sidebar-body">
      <!-- Main navigation -->
      <nav class="sidebar-nav">
        <div
          v-for="item in NavigationSideMenuMain"
          :key="item.key"
          class="sidebar-nav__item"
          :class="{
            'sidebar-nav__item--active': isActive(item),
            'sidebar-nav__item--highlight': item.highlight && !isActive(item),
            'sidebar-nav__item--mini': isMini,
          }"
          @click="navigate(item)"
        >
          <div class="sidebar-nav__icon-wrap">
            <q-icon :name="item.icon" size="20px" />
            <span v-if="isMini && item.badge" class="sidebar-nav__dot" />
          </div>

          <span v-if="!isMini" class="sidebar-nav__label text-paragraph-md">
            {{ item.label }}
          </span>

          <span v-if="!isMini && item.badge" class="sidebar-nav__badge">
            {{ item.badge }}
          </span>

          <q-tooltip
            v-if="isMini"
            anchor="center right"
            self="center left"
            :offset="[12, 0]"
            class="sidebar-tooltip"
          >
            {{ item.label }}
          </q-tooltip>
        </div>
      </nav>

      <!-- Section label -->
      <div v-if="!isMini" class="sidebar-section-label text-paragraph-sm">
        Conta
      </div>

      <!-- Bottom navigation -->
      <nav class="sidebar-nav">
        <div
          v-for="item in NavigationSideMenuBottom"
          :key="item.key"
          class="sidebar-nav__item"
          :class="{
            'sidebar-nav__item--active': isActive(item),
            'sidebar-nav__item--mini': isMini,
          }"
          @click="navigate(item)"
        >
          <div class="sidebar-nav__icon-wrap">
            <q-icon :name="item.icon" size="20px" />
            <span v-if="isMini && item.badge" class="sidebar-nav__dot sidebar-nav__dot--accent" />
          </div>

          <span v-if="!isMini" class="sidebar-nav__label text-paragraph-md">
            {{ item.label }}
          </span>

          <span v-if="!isMini && item.badge" class="sidebar-nav__badge sidebar-nav__badge--neutral">
            {{ item.badge }}
          </span>

          <q-tooltip
            v-if="isMini"
            anchor="center right"
            self="center left"
            :offset="[12, 0]"
            class="sidebar-tooltip"
          >
            {{ item.label }}
          </q-tooltip>
        </div>
      </nav>
    </div>

    <!-- Footer: logout -->
    <div class="sidebar-footer" :class="{ 'sidebar-footer--mini': isMini }">
      <div class="sidebar-divider" />
      <div
        class="sidebar-nav__item sidebar-nav__item--logout"
        :class="{ 'sidebar-nav__item--mini': isMini }"
        @click="onLogout"
      >
        <div class="sidebar-nav__icon-wrap">
          <q-icon name="logout" size="20px" />
        </div>
        <span v-if="!isMini" class="sidebar-nav__label text-paragraph-md">Sair</span>
        <q-tooltip
          v-if="isMini"
          anchor="center right"
          self="center left"
          :offset="[12, 0]"
          class="sidebar-tooltip"
        >
          Sair
        </q-tooltip>
      </div>
    </div>
  </q-drawer>
</template>

<script>
import {
  NavigationSideMenuMain,
  NavigationSideMenuBottom,
} from "src/constants/menus";

export default {
  name: "CSidebar",

  props: {
    open: {
      type: Boolean,
      default: false,
    },
    mini: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:open", "update:mini"],

  data() {
    return {
      NavigationSideMenuMain,
      NavigationSideMenuBottom,
    };
  },

  computed: {
    isOpen: {
      get() {
        return this.open;
      },
      set(val) {
        this.$emit("update:open", val);
      },
    },

    isMini() {
      return this.mini;
    },
  },

  methods: {
    isActive(item) {
      return this.$route.path === item.route;
    },

    navigate(item) {
      if (this.$route.path !== item.route) {
        this.$router.push(item.route);
      }
    },

    onLogout() {
      // TODO: chamar composable de auth ao implementar
    },
  },
};
</script>

<style scoped>
/* ── Drawer override ─────────────────────────────── */
:deep(.q-drawer) {
  background-color: #020c16;
  border-right: 1px solid rgba(51, 150, 254, 0.13) !important;
  display: flex;
  flex-direction: column;
}

:deep(.q-drawer__content) {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* ── Logo ────────────────────────────────────────── */
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 4.8rem;
  padding: 0 20px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(51, 150, 254, 0.1);
  transition: padding 0.25s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.sidebar-logo--mini {
  justify-content: center;
  padding: 0;
}

.sidebar-logo__icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #3396fe 0%, #0c376c 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 16px rgba(51, 150, 254, 0.28);
}

.sidebar-logo__name {
  color: #ffffff;
  font-weight: 800;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

/* ── Body (scrollable center) ────────────────────── */
.sidebar-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  scrollbar-width: none;
}

.sidebar-body::-webkit-scrollbar {
  display: none;
}

/* ── Section label ───────────────────────────────── */
.sidebar-section-label {
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 16px 12px 6px;
  font-size: 0.65rem;
  font-weight: 600;
}

/* ── Nav group ───────────────────────────────────── */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* ── Nav item ────────────────────────────────────── */
.sidebar-nav__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  height: 44px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  border-left: 3px solid transparent;
  color: rgba(255, 255, 255, 0.5);
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
  user-select: none;
}

.sidebar-nav__item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.85);
}

.sidebar-nav__item--active {
  background-color: rgba(51, 150, 254, 0.12);
  color: #3396fe;
  border-left-color: #3396fe;
}

.sidebar-nav__item--active:hover {
  background-color: rgba(51, 150, 254, 0.16);
  color: #3396fe;
}

.sidebar-nav__item--highlight {
  color: rgba(255, 255, 255, 0.75);
}

.sidebar-nav__item--mini {
  justify-content: center;
  padding: 0;
  border-left: none;
  border-radius: 8px;
}

.sidebar-nav__item--mini.sidebar-nav__item--active {
  background-color: rgba(51, 150, 254, 0.14);
}

.sidebar-nav__item--logout {
  color: rgba(255, 255, 255, 0.35);
}

.sidebar-nav__item--logout:hover {
  background-color: rgba(239, 68, 68, 0.08);
  color: #ef4444;
}

/* ── Icon wrap ───────────────────────────────────── */
.sidebar-nav__icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

/* ── Label ───────────────────────────────────────── */
.sidebar-nav__label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
}

/* ── Badge (pill) ────────────────────────────────── */
.sidebar-nav__badge {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 99px;
  background: linear-gradient(90deg, #3396fe, #00a89b);
  color: #ffffff;
  white-space: nowrap;
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.sidebar-nav__badge--neutral {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.6);
}

/* ── Dot indicator (mini mode) ───────────────────── */
.sidebar-nav__dot {
  position: absolute;
  top: -3px;
  right: -5px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3396fe, #00a89b);
  border: 1.5px solid #020c16;
}

.sidebar-nav__dot--accent {
  background: #f59e0b;
}

/* ── Footer ──────────────────────────────────────── */
.sidebar-footer {
  flex-shrink: 0;
  padding: 0 8px 16px;
}

.sidebar-footer--mini {
  padding: 0 8px 16px;
}

.sidebar-divider {
  height: 1px;
  background-color: rgba(51, 150, 254, 0.1);
  margin: 8px 4px 12px;
}

/* ── Tooltip override ────────────────────────────── */
:deep(.sidebar-tooltip) {
  font-size: 0.8rem;
  background-color: #111d2d;
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(51, 150, 254, 0.2);
  border-radius: 6px;
  padding: 5px 10px;
}
</style>
