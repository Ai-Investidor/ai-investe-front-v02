<template>
  <q-drawer
    v-model="isOpen"
    show-if-above
    :width="70"
    :breakpoint="1023"
    class="h-full bg-dark-card border-r border-border-dark overflow-hidden"
  >
    <div class="flex flex-col h-full">
      <!-- Logo -->
      <div class="flex items-center justify-center shrink-0 py-[21px]">
        <div
          class="flex items-center justify-center shrink-0 size-10 rounded-md bg-linear-to-br from-primary to-primary-dark2 shadow-[0_0_16px_rgba(51,150,254,0.28)]"
        >
          <q-icon
            name="svguse:icons/icons.svg#icon-logo"
            size="20px"
            color="white"
          />
        </div>
      </div>

      <!-- Navegação principal -->
      <nav
        class="flex flex-col items-center shrink-0 gap-8 py-4 border-y border-border-dark"
      >
        <button
          v-for="item in navItems"
          :key="item.key"
          type="button"
          class="sidebar-btn"
          :class="{ 'sidebar-btn--active': isActive(item) }"
          :aria-label="item.label"
          @click="navigate(item)"
        >
          <q-icon :name="item.icon" size="20px" />
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[12, 0]"
            class="sidebar-tooltip"
          >
            {{ item.label }}
          </q-tooltip>
        </button>
      </nav>

      <!-- Controles secundários -->
      <div
        class="flex flex-col items-center shrink-0 gap-8 py-4 border-b border-border-dark"
      >
        <button class="sidebar-btn" aria-label="Notificações">
          <q-icon name="notifications_none" size="20px" />
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[12, 0]"
            class="sidebar-tooltip"
          >
            Notificações
          </q-tooltip>
        </button>

        <!-- <button

          class="sidebar-btn"
          aria-label="Configurações"
          @click="navigate({ route: '/configuracoes' })"
        >
          <q-icon name="settings" size="20px" />
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[12, 0]"
            class="sidebar-tooltip"
          >
            Configurações
          </q-tooltip>
        </button> -->
      </div>

      <!-- Spacer -->
      <div class="flex-1" />

      <!-- Rodapé: logout -->
      <div class="flex items-center justify-center shrink-0 py-4">
        <button
          class="sidebar-btn hover:text-error!"
          aria-label="Sair"
          @click="onLogout"
        >
          <q-icon name="logout" size="20px" />
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[12, 0]"
            class="sidebar-tooltip"
          >
            Sair
          </q-tooltip>
        </button>
      </div>
    </div>
  </q-drawer>
</template>

<script>
import useAuth from "@composables/useAuth";
import { useUiStore } from "@stores/ui.store";

export default {
  name: "CSidebar",

  setup() {
    return { uiStore: useUiStore() };
  },

  data() {
    return {
      navItems: [
        {
          key: "ia-chat",
          label: "IA Chat",
          icon: "forum",
          route: "/ia-chat",
        },
      ],
    };
  },

  computed: {
    isOpen: {
      get() {
        return this.uiStore.sidebarOpen;
      },
      set(value) {
        this.uiStore.setMainSidebarOpen(value);
      },
    },
  },

  methods: {
    isActive(item) {
      return this.$route.path === item.route;
    },

    navigate(item) {
      if (item.route && this.$route.path !== item.route) {
        this.$router.push(item.route);
      }
      if (this.$q.screen.lt.md) {
        this.uiStore.closeMainSidebar();
      }
    },

    onLogout() {
      const { logout } = useAuth();
      logout();
    },
  },
};
</script>

<style scoped>
@reference "../../css/tailwind.css";

/* ── Sidebar button (nav items + controls) ───────── */
.sidebar-btn {
  @apply flex items-center justify-center shrink-0 size-10
         bg-transparent text-dark-text-muted
         rounded-md border-none cursor-pointer;
  transition:
    background-color 0.18s ease,
    color 0.18s ease;
}

.sidebar-btn:not(.sidebar-btn--active):hover {
  @apply bg-white/[0.07] text-dark-text-secondary;
}

.sidebar-btn--active {
  @apply bg-linear-to-br from-primary to-primary-dark2 text-dark-text;
}

.sidebar-btn--active:hover {
  opacity: 0.9;
}

/* ── Tooltip (Quasar portal — needs :deep) ───────── */
:deep(.sidebar-tooltip) {
  @apply text-xs bg-dark-card text-dark-text border border-border-dark rounded-md;
  padding: 5px 10px;
}
</style>
