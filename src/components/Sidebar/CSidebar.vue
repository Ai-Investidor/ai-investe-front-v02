<template>
  <aside class="icon-sidebar">

    <!-- Logo -->
    <div class="icon-sidebar__logo">
      <div class="icon-sidebar__logo-icon">
        <q-icon
          name="svguse:icons/icons.svg#icon-logo"
          size="20px"
          color="white"
        />
      </div>
    </div>

    <!-- Navegação principal -->
    <nav class="icon-sidebar__nav">
      <button
        v-for="item in navItems"
        :key="item.key"
        type="button"
        class="icon-sidebar__nav-item"
        :class="{ 'icon-sidebar__nav-item--active': isActive(item) }"
        :aria-label="item.label"
        @click="navigate(item)"
      >
        <q-icon :name="item.icon" size="20px" />
        <q-tooltip
          anchor="center right"
          self="center left"
          :offset="[12, 0]"
          class="icon-sidebar__tooltip"
        >
          {{ item.label }}
        </q-tooltip>
      </button>
    </nav>

    <!-- Controles secundários -->
    <div class="icon-sidebar__secondary">
      <button
        class="icon-sidebar__control"
        aria-label="Notificações"
      >
        <q-icon name="notifications_none" size="20px" />
        <q-tooltip
          anchor="center right"
          self="center left"
          :offset="[12, 0]"
          class="icon-sidebar__tooltip"
        >
          Notificações
        </q-tooltip>
      </button>

      <button
        class="icon-sidebar__control"
        aria-label="Configurações"
        @click="navigate({ route: '/configuracoes' })"
      >
        <q-icon name="settings" size="20px" />
        <q-tooltip
          anchor="center right"
          self="center left"
          :offset="[12, 0]"
          class="icon-sidebar__tooltip"
        >
          Configurações
        </q-tooltip>
      </button>
    </div>

    <!-- Rodapé: logout -->
    <div class="icon-sidebar__footer">
      <button
        class="icon-sidebar__control"
        aria-label="Sair"
        @click="onLogout"
      >
        <q-icon name="logout" size="20px" />
        <q-tooltip
          anchor="center right"
          self="center left"
          :offset="[12, 0]"
          class="icon-sidebar__tooltip"
        >
          Sair
        </q-tooltip>
      </button>
    </div>

  </aside>
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
/* ── Root ─────────────────────────────────────────── */
.icon-sidebar {
  width: 75px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-dark-card);
  border-right: 1px solid var(--color-border-dark);
  overflow: hidden;
}

/* ── Logo ────────────────────────────────────────── */
.icon-sidebar__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 21px 0;
  flex-shrink: 0;
}

.icon-sidebar__logo-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 16px rgba(51, 150, 254, 0.28);
  flex-shrink: 0;
}

/* ── Nav ─────────────────────────────────────────── */
.icon-sidebar__nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  padding: 14px 0;
  border-top: 1px solid var(--color-border-dark);
  border-bottom: 1px solid var(--color-border-dark);
  flex-shrink: 0;
}

.icon-sidebar__nav-item {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  color: var(--color-dark-text-muted);
  transition:
    background-color 0.18s ease,
    color 0.18s ease;
  flex-shrink: 0;
}

.icon-sidebar__nav-item:hover {
  background-color: rgba(255, 255, 255, 0.07);
  color: var(--color-dark-text-secondary);
}

.icon-sidebar__nav-item--active {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark2) 100%);
  color: var(--color-dark-text);
}

.icon-sidebar__nav-item--active:hover {
  opacity: 0.9;
}

/* ── Secondary controls ──────────────────────────── */
.icon-sidebar__secondary {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  padding: 34px 0 0;
  flex-shrink: 0;
}

/* ── Footer ──────────────────────────────────────── */
.icon-sidebar__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 0;
  border-top: 1px solid var(--color-border-dark);
  margin-top: auto;
  flex-shrink: 0;
}

/* ── Control buttons (notif, settings, logout) ───── */
.icon-sidebar__control {
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

.icon-sidebar__control:hover {
  background-color: rgba(255, 255, 255, 0.07);
  color: var(--color-dark-text-secondary);
}

/* ── Tooltip override ────────────────────────────── */
:deep(.icon-sidebar__tooltip) {
  font-size: var(--font-size-xs);
  background-color: var(--color-dark-card);
  color: var(--color-dark-text);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-md);
  padding: 5px 10px;
}
</style>
