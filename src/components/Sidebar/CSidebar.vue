<template>
  <q-drawer
    permanent
    :mini="true"
    :mini-width="75"
    :width="75"
    class="app-sidebar"
  >
    <!-- Topo: logo + nav + controles secundários -->
    <div class="sidebar-top">

      <!-- Logo -->
      <div class="sidebar-logo">
        <div class="sidebar-logo__icon">
          <q-icon
            name="svguse:icons/icons.svg#icon-logo"
            size="20px"
            color="white"
          />
        </div>
      </div>

      <!-- Itens de navegação -->
      <nav class="sidebar-nav">
        <div
          v-for="item in navItems"
          :key="item.key"
          class="sidebar-nav__item"
          :class="{ 'sidebar-nav__item--active': isActive(item) }"
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
        </div>
      </nav>

      <!-- Controles secundários: notificações + configurações -->
      <div class="sidebar-secondary">
        <button class="sidebar-control" aria-label="Notificações">
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

        <button
          class="sidebar-control"
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
        </button>
      </div>

    </div>

    <!-- Rodapé: logout -->
    <div class="sidebar-footer">
      <button class="sidebar-control" aria-label="Sair" @click="onLogout">
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

  </q-drawer>
</template>

<script>
import useAuth from "@composables/useAuth";

export default {
  name: "CSidebar",

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
          key: "portfolio",
          label: "Portfólio",
          icon: "account_balance_wallet",
          route: "/portfolio",
        },
        {
          key: "analytics",
          label: "Análises",
          icon: "show_chart",
          route: "/analises",
        },
      ],
    };
  },

  methods: {
    isActive(item) {
      return this.$route.path === item.route;
    },

    navigate(item) {
      if (item.route && this.$route.path !== item.route) {
        this.$router.push(item.route);
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
/* ── Drawer override ─────────────────────────────── */
:deep(.q-drawer) {
  background-color: var(--color-dark-card);
  border-right: 1px solid var(--color-border-dark) !important;
}

:deep(.q-drawer__content) {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* ── Top section ─────────────────────────────────── */
.sidebar-top {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

/* ── Logo ────────────────────────────────────────── */
.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 21px 0;
  flex-shrink: 0;
}

.sidebar-logo__icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark2) 100%);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 16px rgba(51, 150, 254, 0.28);
}

/* ── Nav ─────────────────────────────────────────── */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  padding: 14px 0;
  border-top: 1px solid var(--color-border-dark);
  border-bottom: 1px solid var(--color-border-dark);
  flex-shrink: 0;
}

.sidebar-nav__item {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-dark-text-muted);
  transition:
    background-color 0.18s ease,
    color 0.18s ease;
  flex-shrink: 0;
}

.sidebar-nav__item:hover {
  background-color: rgba(255, 255, 255, 0.07);
  color: var(--color-dark-text-secondary);
}

.sidebar-nav__item--active {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark2) 100%);
  color: var(--color-dark-text);
}

.sidebar-nav__item--active:hover {
  opacity: 0.9;
}

/* ── Secondary controls ──────────────────────────── */
.sidebar-secondary {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  padding: 34px 0 0;
  flex-shrink: 0;
}

/* ── Footer ──────────────────────────────────────── */
.sidebar-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 0;
  border-top: 1px solid var(--color-border-dark);
  margin-top: auto;
  flex-shrink: 0;
}

/* ── Control buttons ─────────────────────────────── */
.sidebar-control {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-dark-text-muted);
  background: transparent;
  border: none;
  transition:
    background-color 0.18s ease,
    color 0.18s ease;
}

.sidebar-control:hover {
  background-color: rgba(255, 255, 255, 0.07);
  color: var(--color-dark-text-secondary);
}

/* ── Tooltip override ────────────────────────────── */
:deep(.sidebar-tooltip) {
  font-size: var(--font-size-xs);
  background-color: var(--color-dark-card);
  color: var(--color-dark-text);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-md);
  padding: 5px 10px;
}
</style>
