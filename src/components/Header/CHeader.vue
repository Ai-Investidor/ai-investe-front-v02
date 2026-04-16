<template>
  <q-header class="app-header">
    <div class="app-header__inner">
      <span class="text-title-3 text-white">
        {{ nameCurrentRoute }}
      </span>

      <!-- Direita: ações + info do usuário -->
      <div class="app-header__right">
        <!-- Notificações -->
        <button class="app-header__action" aria-label="Notificações">
          <q-icon name="notifications_none" size="20px" />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 6]">
            Notificações
          </q-tooltip>
        </button>

        <!-- Alternar tema -->
        <button
          class="app-header__action"
          :aria-label="$q.dark.isActive ? 'Modo claro' : 'Modo escuro'"
          @click="$q.dark.toggle()"
        >
          <q-icon
            :name="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
            size="18px"
          />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 6]">
            {{ $q.dark.isActive ? "Modo claro" : "Modo escuro" }}
          </q-tooltip>
        </button>

        <!-- Seção do usuário -->
        <div class="app-header__user">
          <div class="app-header__avatar">
            <img
              v-if="userAvatar"
              :src="userAvatar"
              :alt="userDisplayName"
              class="app-header__avatar-img"
            />
            <span v-else class="app-header__avatar-initials">{{
              userInitials
            }}</span>
          </div>
          <div class="app-header__user-info">
            <span class="app-header__user-name">{{ userDisplayName }}</span>
            <span class="app-header__user-role">PRO INVESTING</span>
          </div>
          <q-icon
            name="keyboard_arrow_down"
            size="20px"
            class="app-header__chevron"
          />
        </div>
      </div>
    </div>
  </q-header>
</template>

<script>
import { useAuthStore } from "@stores/auth.store";
import { useRouter } from "vue-router";

export default {
  name: "CHeader",

  emits: ["toggle:sidebar"],

  computed: {
    userAvatar() {
      const authStore = useAuthStore();
      return authStore.userAvatar || "";
    },

    userDisplayName() {
      const authStore = useAuthStore();
      return (
        authStore.userFullName ||
        authStore.userEmail ||
        "USER NAME"
      ).toUpperCase();
    },

    userInitials() {
      const authStore = useAuthStore();
      const name = authStore.userFullName || authStore.userEmail || "";
      return (
        name
          .split(" ")
          .slice(0, 2)
          .map((n) => n[0])
          .join("")
          .toUpperCase() || "U"
      );
    },

    nameCurrentRoute() {
      const router = useRouter();

      return router.currentRoute.value?.meta?.label || "Dashboard";
    },
  },

  methods: {
    onToggle() {
      this.$emit("toggle:sidebar");
    },
  },
};
</script>

<style scoped>
/* ── Root ─────────────────────────────────────────── */
.app-header {
  display: flex;
  align-items: stretch;
  background-color: var(--color-dark-card);
  border-bottom: 1px solid var(--color-border-dark);
  height: 83px;
  flex-shrink: 0;
}

.app-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 30px;
}

/* ── Left ─────────────────────────────────────────── */
.app-header__left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-header__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--color-dark-text-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
  flex-shrink: 0;
  transition:
    background-color var(--transition-hover),
    color var(--transition-hover);
}

.app-header__toggle:hover {
  background-color: rgba(255, 255, 255, 0.07);
  color: var(--color-dark-text);
}

.app-header__brand {
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-regular);
  line-height: normal;
  letter-spacing: 0;
  color: var(--color-dark-text);
  white-space: nowrap;
  user-select: none;
}

/* ── Right ────────────────────────────────────────── */
.app-header__right {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ── Action buttons ──────────────────────────────── */
.app-header__action {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--color-dark-text-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition:
    background-color var(--transition-hover),
    color var(--transition-hover);
}

.app-header__action:hover {
  background-color: rgba(255, 255, 255, 0.07);
  color: var(--color-dark-text);
}

/* ── User section ─────────────────────────────────── */
.app-header__user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border-left: 1px solid var(--color-border-dark);
  cursor: pointer;
  transition: opacity var(--transition-hover);
}

.app-header__user:hover {
  opacity: 0.85;
}

/* Avatar */
.app-header__avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-dark2) 100%
  );
}

.app-header__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.app-header__avatar-initials {
  color: var(--color-dark-text);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  line-height: 1;
  user-select: none;
}

/* User info */
.app-header__user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.app-header__user-name {
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-regular);
  line-height: normal;
  letter-spacing: 0;
  color: var(--color-dark-text);
  white-space: nowrap;
}

.app-header__user-role {
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xs);
  font-weight: var(--font-weight-regular);
  line-height: normal;
  letter-spacing: 0;
  color: var(--color-dark-text-secondary);
  white-space: nowrap;
}

.app-header__chevron {
  color: var(--color-dark-text-muted);
  flex-shrink: 0;
}

/* ── Tooltip override ────────────────────────────── */
:deep(.q-tooltip) {
  font-size: var(--font-size-xs);
  background-color: var(--color-dark-card);
  color: var(--color-dark-text);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-md);
  padding: 5px 10px;
}

/* ── Responsive ──────────────────────────────────── */
@media (max-width: 600px) {
  .app-header__user-info,
  .app-header__chevron {
    display: none;
  }

  .app-header__inner {
    padding: 0 16px;
  }
}
</style>
