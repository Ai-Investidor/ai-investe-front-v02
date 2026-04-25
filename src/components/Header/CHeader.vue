<template>
  <q-header
    class="flex items-stretch shrink-0 h-20.75 bg-dark-card! border-b border-border-dark"
  >
    <div class="flex items-center justify-between w-full px-7.5 max-sm:px-4">
      <div class="flex items-center gap-3 min-w-0">
        <button
          v-if="$q.screen.lt.md"
          type="button"
          class="flex items-center justify-center shrink-0 size-10 text-dark-text-secondary bg-transparent border-none rounded-md cursor-pointer transition-colors hover:bg-white/7 hover:text-dark-text"
          aria-label="Abrir menu"
          @click="onOpenSidebar"
        >
          <q-icon name="menu" size="22px" />
        </button>
        <span class="text-title-3 text-white truncate">
          {{ nameCurrentRoute }}
        </span>
      </div>

      <!-- Direita: ações + info do usuário -->
      <div class="flex items-center gap-1">
        <!-- Notificações -->
        <button
          v-if="$q.screen.gt.sm"
          class="relative flex items-center justify-center size-9 text-dark-text-secondary cursor-pointer rounded-md transition-colors hover:bg-white/7 hover:text-dark-text"
          aria-label="Notificações"
        >
          <q-icon name="notifications_none" size="20px" />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 6]">
            Notificações
          </q-tooltip>
        </button>

        <!-- Alternar tema -->
        <button
          v-if="$q.screen.gt.sm"
          class="relative flex items-center justify-center size-9 text-dark-text-secondary cursor-pointer rounded-md transition-colors hover:bg-white/7 hover:text-dark-text"
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
        <div
          class="flex items-center gap-2.5 px-3.5 border-l border-border-dark cursor-pointer transition-opacity hover:opacity-85"
        >
          <div
            class="flex items-center justify-center shrink-0 size-10 overflow-hidden rounded-full bg-linear-to-br from-primary to-primary-dark2"
          >
            <img
              v-if="userAvatar"
              :src="userAvatar"
              :alt="userDisplayName"
              class="size-full object-cover"
            />
            <span
              v-else
              class="text-sm font-bold leading-none text-dark-text select-none"
            >
              {{ userInitials }}
            </span>
          </div>
          <div class="flex flex-col items-start gap-0.5 max-sm:hidden">
            <span
              class="font-display text-2xl leading-normal font-regular text-dark-text truncate max-w-40 max-sm:max-w-20"
            >
              {{ userDisplayName }}
            </span>
            <span
              class="font-display text-2xs leading-normal font-regular text-dark-text-secondary whitespace-nowrap"
            >
              PRO INVESTING
            </span>
          </div>
          <q-icon
            name="keyboard_arrow_down"
            size="20px"
            class="text-dark-text-muted shrink-0 max-sm:hidden"
          />

          <q-menu
            anchor="bottom right"
            self="top right"
            :offset="[0, 12]"
            class="profile-menu"
          >
            <div class="profile-menu__content">
              <!-- Info do usuário -->
              <div class="profile-menu__user">
                <div class="profile-menu__avatar">
                  <img
                    v-if="userAvatar"
                    :src="userAvatar"
                    :alt="userDisplayName"
                    class="size-full object-cover"
                  />
                  <span v-else class="profile-menu__initials">
                    {{ userInitials }}
                  </span>
                </div>
                <div class="profile-menu__info">
                  <span class="profile-menu__name">{{ userMenuName }}</span>
                  <span class="profile-menu__email">{{ userEmail }}</span>
                </div>
              </div>

              <q-separator class="profile-menu__separator" />

              <!-- Perfil -->
              <q-item
                v-close-popup
                clickable
                class="profile-menu__item"
                @click="onProfile"
              >
                <div class="profile-menu__item-row">
                  <q-icon name="svguse:icons/icons.svg#icon-profile" size="24px" />
                  <span>Perfil</span>
                </div>
              </q-item>

              <q-separator class="profile-menu__separator" />

              <!-- Sair -->
              <q-item
                v-close-popup
                clickable
                class="profile-menu__item profile-menu__item--danger"
                @click="onLogout"
              >
                <div class="profile-menu__item-row">
                  <q-icon name="svguse:icons/icons.svg#icon-logout" size="24px" />
                  <span>Sair da conta</span>
                </div>
              </q-item>
            </div>
          </q-menu>
        </div>
      </div>
    </div>
  </q-header>
</template>

<script>
import { useAuthStore } from "@stores/auth.store";
import { useUiStore } from "@stores/ui.store";
import { useRouter } from "vue-router";
import useAuth from "@composables/useAuth";

export default {
  name: "CHeader",

  emits: ["toggle:sidebar"],

  setup() {
    const auth = useAuth();
    return { uiStore: useUiStore(), auth };
  },

  computed: {
    userAvatar() {
      const authStore = useAuthStore();
      return authStore.userAvatar || "";
    },

    userDisplayName() {
      const authStore = useAuthStore();
      if (authStore.userFullName) return authStore.userFullName.toUpperCase();
      if (authStore.userEmail) return authStore.userEmail.split("@")[0].toUpperCase();
      return "USER NAME";
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

    userEmail() {
      const authStore = useAuthStore();
      return authStore.userEmail || "";
    },

    userMenuName() {
      const authStore = useAuthStore();
      if (authStore.userFullName) return authStore.userFullName;
      if (authStore.userEmail) return authStore.userEmail.split("@")[0];
      return "Usuário";
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

    onOpenSidebar() {
      this.uiStore.openMainSidebar();
    },

    onProfile() {
      this.$router.push("/perfil");
    },

    async onLogout() {
      await this.auth.logout();
    },
  },
};
</script>

<style>
/* global — q-menu usa teleport fora do componente */
.profile-menu.q-menu {
  background: #0d2b50 !important;
  border: 0.5px solid rgba(51, 150, 254, 0.2) !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
  width: 400px !important;
  max-width: 400px !important;
  overflow: hidden !important;
}

.profile-menu__content {
  padding: 4px;
  display: flex;
  flex-direction: column;
}

.profile-menu__user {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
}

.profile-menu__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #3396fe, #0c376c);
  border: 1px solid #3396fe;
  flex-shrink: 0;
}

.profile-menu__initials {
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
  user-select: none;
}

.profile-menu__info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.profile-menu__name {
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-menu__email {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-menu__separator {
  background: rgba(51, 150, 254, 0.12) !important;
  margin: 0 10px;
}

.profile-menu__item.q-item {
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.85) !important;
  font-size: 14px;
  font-weight: 500;
  min-height: 44px;
  margin: 2px 4px;
  transition: background 0.15s;
}

.profile-menu__item.q-item:hover {
  background: rgba(51, 150, 254, 0.1) !important;
  color: #ffffff !important;
}

.profile-menu__item--danger.q-item {
  color: rgba(255, 255, 255, 0.85) !important;
}

.profile-menu__item--danger.q-item:hover {
  background: rgba(239, 68, 68, 0.12) !important;
  color: #ef4444 !important;
}

.profile-menu__item-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  color: inherit;
}

</style>
