<template>
  <q-header class="flex items-stretch shrink-0 h-15 bg-dark">
    <div
      class="flex items-center shrink-0 bg-black rounded-br-2xl transition-all duration-250 w-59"
      :class="chatSidebarOpen ? 'pl-18 gap-11' : 'pl-3 gap-3'"
    >
      <transition name="logo" mode="out-in">
        <router-link
          v-if="chatSidebarOpen"
          key="logo-full"
          to="/"
          class="h-full cursor-pointer overflow-hidden max-w-24 max-h-15"
        >
          <q-img :src="IconLogo" fit="contain" class="w-full h-full" />
        </router-link>

        <router-link
          v-else
          key="logo-small"
          to="/"
          class="flex items-center cursor-pointer shrink-0"
        >
          <img :src="IconLogoSmall" class="h-9 w-auto object-contain" alt="" />
        </router-link>
      </transition>

      <button
        type="button"
        class="menu-toggle-btn"
        :class="{ 'is-open': chatSidebarOpen }"
        aria-label="Mostrar/ocultar conversas"
        @click="toggleChatSidebar"
      >
        <img :src="IconMenuToggle" alt="" aria-hidden="true" />
      </button>
    </div>

    <div class="flex-1 flex items-center justify-between bg-chat-bg px-4 gap-4">
      <!-- LEFT: Breadcrumb -->
      <div class="shrink-0 min-w-0">
        <q-breadcrumbs active-color="grey-5">
          <q-breadcrumbs-el icon="home" />
          <q-breadcrumbs-el
            :label="nameCurrentRoute"
            :to="$route.path"
            class="text-paragraph-3 truncate text-primary"
          />
        </q-breadcrumbs>
      </div>

      <!-- CENTER: Search -->
      <div
        class="flex items-center flex-1 max-w-96 mx-auto h-9 bg-dark border border-border-input rounded-md overflow-hidden max-sm:hidden"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Pesquisar histórico"
          class="header-search-input"
        />
        <button
          type="button"
          class="text-title-1! shrink-0 h-8 mx-1 px-3 rounded-md bg-search-btn text-light-text text-paragraph-4 font-medium cursor-pointer transition-opacity hover:opacity-80"
          @click="onSearch"
        >
          Buscar
        </button>
      </div>

      <!-- RIGHT: User -->
      <div class="flex items-center gap-4 shrink-0">
        <div class="flex flex-col items-end max-sm:hidden">
          <span class="text-paragraph-3 text-dark-text truncate max-w-32">
            {{ userDisplayName }}
          </span>
          <span class="text-paragraph-4 text-dark-text-muted whitespace-nowrap">
            {{ userPlan }}
          </span>
        </div>
        <div
          class="flex items-center justify-center shrink-0 size-8 rounded-full bg-primary overflow-hidden cursor-pointer transition-opacity hover:opacity-85"
        >
          <img
            v-if="userAvatar"
            :src="userAvatar"
            :alt="userDisplayName"
            class="size-full object-cover"
          />
          <span
            v-else
            class="text-title-4 font-bold text-dark leading-none select-none"
          >
            {{ userInitials }}
          </span>

          <q-menu
            anchor="bottom right"
            self="top right"
            :offset="[0, 12]"
            class="profile-menu"
          >
            <div class="profile-menu__content">
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
import IconLogo from "@assets/imgs/logo_invest.webp";
import IconLogoSmall from "@assets/imgs/logo-small.svg";
import IconMenuToggle from "@assets/icons/icon-menu-toggle.svg";

export default {
  name: "CHeader",

  setup() {
    const auth = useAuth();
    return { uiStore: useUiStore(), auth };
  },

  data() {
    return {
      searchQuery: "",
      IconLogo,
      IconLogoSmall,
      IconMenuToggle,
    };
  },

  computed: {
    userAvatar() {
      return useAuthStore().userAvatar || "";
    },

    userDisplayName() {
      const authStore = useAuthStore();
      if (authStore.userFullName) return authStore.userFullName.toUpperCase();
      if (authStore.userEmail) return authStore.userEmail.split("@")[0].toUpperCase();
      return "USER NAME";
    },

    userInitials() {
      const name = useAuthStore().userFullName || useAuthStore().userEmail || "";
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
      return useAuthStore().userEmail || "";
    },

    userMenuName() {
      const authStore = useAuthStore();
      if (authStore.userFullName) return authStore.userFullName;
      if (authStore.userEmail) return authStore.userEmail.split("@")[0];
      return "Usuário";
    },

    userPlan() {
      return useAuthStore().userPlan || "Plano X";
    },

    nameCurrentRoute() {
      return useRouter().currentRoute.value?.meta?.label || "Dashboard";
    },

    chatSidebarOpen() {
      return useUiStore().chatSidebarOpen;
    },
  },

  methods: {
    onSearch() {
      // TODO: implement search
    },

    toggleChatSidebar() {
      useUiStore().toggleChatSidebar();
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

<style scoped>
@reference "../../css/tailwind.css";

.header-search-input {
  @apply flex-1 h-full bg-transparent outline-none px-3;

  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-dark-text);
  line-height: 1.5;

  &::placeholder {
    color: var(--color-dark-text-placeholder);
  }
}

.menu-toggle-btn {
  @apply flex items-center justify-center bg-transparent border-none p-0 cursor-pointer shrink-0;
  transition: opacity 0.18s ease;
}

.menu-toggle-btn img {
  display: block;
  transition: transform 0.25s ease;
  transform: scaleX(-1);
}

.menu-toggle-btn.is-open img {
  transform: scaleX(1);
}

.menu-toggle-btn:hover {
  opacity: 0.7;
}

.logo-enter-active,
.logo-leave-active {
  transition: opacity 0.2s ease;
}

.logo-enter-from,
.logo-leave-to {
  opacity: 0;
}
</style>

<style>
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
