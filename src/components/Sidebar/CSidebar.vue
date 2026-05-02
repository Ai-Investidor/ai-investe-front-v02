<template>
  <q-drawer
    v-model="isOpen"
    show-if-above
    :width="53"
    :breakpoint="1023"
    class="h-full bg-black overflow-hidden"
  >
    <div class="flex flex-col h-full pt-6 px-3">
      <!-- Navegação principal -->
      <nav class="flex flex-col items-center gap-6">
        <button
          v-for="item in navItems"
          :key="item.key"
          type="button"
          class="sidebar-btn"
          :class="{ 'sidebar-btn--active': isActive(item) }"
          :aria-label="item.label"
          @click="navigate(item)"
        >
          <div class="relative">
            <q-icon :name="item.icon" size="16px" />
            <span v-if="item.badge" class="sidebar-badge" />
          </div>
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

      <!-- Spacer -->
      <div class="flex-1" />

      <!-- Rodapé: logout -->
      <div class="flex flex-col items-center shrink-0 pb-3">
        <button
          class="sidebar-btn sidebar-btn--logout"
          aria-label="Sair"
          @click="onLogout"
        >
          <q-icon name="logout" size="16px" />
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
        {
          key: "alerts",
          label: "Alertas",
          icon: "notifications",
          route: null,
          badge: true,
        },
        {
          key: "portfolio",
          label: "Portfólio",
          icon: "analytics",
          route: null,
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
      return item.route && this.$route.path === item.route;
    },

    navigate(item) {
      if (!item.route) return;
      if (this.$route.path !== item.route) {
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

.sidebar-btn {
  @apply flex items-center justify-center h-7 w-full
         bg-gradient-to-r from-dark to-dark-card
         border border-border-dark rounded-button
         text-primary cursor-pointer shrink-0;
  box-shadow: 0px 2px 0px 0px #000;
  transition: opacity 0.18s ease;
}

.sidebar-btn:hover {
  opacity: 0.8;
}

.sidebar-btn--active {
  border-color: rgb(from var(--color-primary) r g b / 0.4);
}

.sidebar-btn--logout {
  @apply text-dark-text-muted;
}

.sidebar-btn--logout:hover {
  @apply text-error;
  opacity: 1;
}

.sidebar-badge {
  @apply absolute -top-1 -right-1 size-2 bg-primary rounded-full;
}

:deep(.sidebar-tooltip) {
  @apply text-xs bg-dark-card text-dark-text border border-border-dark rounded-md;
  padding: 5px 10px;
}
</style>
