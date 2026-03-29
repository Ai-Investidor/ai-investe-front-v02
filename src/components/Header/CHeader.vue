<template>
  <q-header class="app-header">
    <div class="app-header__inner">
      <!-- Left: toggle + page title -->
      <div class="app-header__left">
        <!--
            <button class="app-header__toggle" aria-label="Alternar sidebar" @click="onToggle">
            <q-icon name="menu" size="20px" />
            </button>
        -->
        <div class="app-header__breadcrumb">
          <span class="app-header__page-title text-title-sm">{{
            currentPageTitle
          }}</span>
          <span class="app-header__page-date text-paragraph-sm">{{
            currentDate
          }}</span>
        </div>
      </div>

      <!-- Right: search + actions + user -->
      <div class="app-header__right">
        <!-- Search -->
        <!--
        <div class="app-header__search">
          <q-icon name="search" size="16px" class="app-header__search-icon" />
          <input
            v-model="searchQuery"
            class="app-header__search-input text-paragraph-sm"
            placeholder="Buscar ativos, notícias..."
            aria-label="Buscar"
          />
          <span class="app-header__search-kbd">⌘K</span>
        </div>

        -->

        <!-- Notifications -->
        <button class="app-header__action" aria-label="Notificações">
          <q-icon name="notifications_none" size="20px" />
          <span class="app-header__action-badge">3</span>
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 6]"
            >Notificações</q-tooltip
          >
        </button>

        <!-- Theme toggle -->
        <button
          class="app-header__action"
          aria-label="Alternar tema"
          @click="onToggleDark"
        >
          <q-icon
            :name="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
            size="18px"
          />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 6]">
            {{ $q.dark.isActive ? "Modo claro" : "Modo escuro" }}
          </q-tooltip>
        </button>

        <!-- Divider -->
        <div class="app-header__divider" />

        <!-- User profile -->
        <div class="app-header__user">
          <div class="app-header__avatar">
            <span class="text-paragraph-sm">JD</span>
          </div>
          <div class="app-header__user-info">
            <span class="app-header__user-name text-paragraph-sm"
              >Jefferson Dev</span
            >
            <span class="app-header__user-role text-paragraph-sm"
              >Pro Investor</span
            >
          </div>
          <q-icon
            name="keyboard_arrow_down"
            size="16px"
            class="app-header__chevron"
          />
        </div>
      </div>
    </div>
  </q-header>
</template>

<script>
export default {
  name: "CHeader",

  props: {
    sidebarMini: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["toggle:sidebar"],

  data() {
    return {
      searchQuery: "",
    };
  },

  computed: {
    currentPageTitle() {
      const titles = {
        "/": "Dashboard",
        "/portfolio": "Portfólio",
        "/mercados": "Mercados",
        "/ia-chat": "IA Chat",
        "/analises": "Análises",
        "/alertas": "Alertas",
        "/configuracoes": "Configurações",
      };
      return titles[this.$route.path] || "Dashboard";
    },

    currentDate() {
      return new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },

  methods: {
    onToggle() {
      this.$emit("toggle:sidebar");
    },

    onToggleDark() {
      this.$q.dark.toggle();
    },
  },
};
</script>

<style scoped>
/* ── Root ────────────────────────────────────────── */
.app-header {
  height: 4.8rem;
  background-color: #111d2d;
  border-bottom: 1px solid rgba(51, 150, 254, 0.13);
  box-shadow: none !important;
}

.app-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 24px;
  gap: 16px;
}

/* ── Left ────────────────────────────────────────── */
.app-header__left {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.app-header__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  flex-shrink: 0;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.app-header__toggle:hover {
  background-color: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.9);
}

.app-header__breadcrumb {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.app-header__page-title {
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-header__page-date {
  color: rgba(255, 255, 255, 0.38);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
}

/* ── Right ───────────────────────────────────────── */
.app-header__right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* ── Search ──────────────────────────────────────── */
.app-header__search {
  display: none;
  align-items: center;
  gap: 8px;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(51, 150, 254, 0.12);
  border-radius: 10px;
  padding: 0 12px;
  height: 36px;
  width: 240px;
  transition:
    border-color 0.2s,
    background-color 0.2s;
  cursor: text;
}

.app-header__search:focus-within {
  background-color: rgba(51, 150, 254, 0.08);
  border-color: rgba(51, 150, 254, 0.35);
}

.app-header__search-icon {
  color: rgba(255, 255, 255, 0.35);
  flex-shrink: 0;
}

.app-header__search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.85);
  min-width: 0;
}

.app-header__search-input::placeholder {
  color: rgba(255, 255, 255, 0.32);
}

.app-header__search-kbd {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.25);
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 1px 5px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── Action buttons ──────────────────────────────── */
.app-header__action {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.app-header__action:hover {
  background-color: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.9);
}

.app-header__action-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 16px;
  height: 16px;
  border-radius: 99px;
  background-color: #3396fe;
  color: #ffffff;
  font-size: 0.625rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  border: 1.5px solid #111d2d;
  line-height: 1;
}

/* ── Divider ─────────────────────────────────────── */
.app-header__divider {
  width: 1px;
  height: 24px;
  background-color: rgba(51, 150, 254, 0.15);
  margin: 0 4px;
}

/* ── User profile ────────────────────────────────── */
.app-header__user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.app-header__user:hover {
  background-color: rgba(255, 255, 255, 0.06);
}

.app-header__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3396fe 0%, #0c376c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 0 0 2px rgba(51, 150, 254, 0.25);
}

.app-header__user-info {
  display: none;
  flex-direction: column;
  gap: 1px;
}

.app-header__user-name {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  white-space: nowrap;
}

.app-header__user-role {
  color: rgba(255, 255, 255, 0.38);
  white-space: nowrap;
}

.app-header__chevron {
  color: rgba(255, 255, 255, 0.35);
  display: none;
}

/* ── Responsive ──────────────────────────────────── */
@media (min-width: 600px) {
  .app-header__search {
    display: flex;
  }
}

@media (min-width: 1024px) {
  .app-header__user-info {
    display: flex;
  }

  .app-header__chevron {
    display: block;
  }
}
</style>
