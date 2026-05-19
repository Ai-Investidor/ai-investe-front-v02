<template>
  <q-header class="flex items-stretch shrink-0 h-15 header-bg">

    <!-- LEFT: Menu toggle -->
    <div class="flex items-center shrink-0 px-3 gap-2">
      <button
        type="button"
        class="menu-toggle-btn"
        :class="{ 'is-open': chatSidebarOpen }"
        aria-label="Mostrar/ocultar conversas"
        @click="toggleChatSidebar"
      >
        <img :src="IconMenuToggle" alt="" aria-hidden="true" />
      </button>

      <!-- Hamburger Menu (mobile only) -->
      <button
        v-if="isMobile"
        type="button"
        class="flex items-center justify-center size-8 rounded-button bg-dark-card border border-border-dark text-dark-text cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Menu de navegação"
      >
        <q-icon name="menu" size="20px" />
        <q-menu anchor="top left" self="top left" :offset="[0, 8]" class="header-mobile-menu">
          <div class="header-mobile-menu__content">
            <!-- Navigation section -->
            <q-item
              v-close-popup
              clickable
              class="header-mobile-menu__item"
              @click="navigateToChat"
            >
              <q-item-section side>
                <img :src="IconChat" class="w-4 h-4 object-contain" />
              </q-item-section>
              <q-item-section>IA Chat</q-item-section>
            </q-item>

            <q-item
              v-close-popup
              clickable
              class="header-mobile-menu__item"
            >
              <q-item-section side>
                <q-icon name="notifications" size="16px" />
              </q-item-section>
              <q-item-section>Alertas</q-item-section>
            </q-item>

            <q-item
              v-close-popup
              clickable
              class="header-mobile-menu__item"
            >
              <q-item-section side>
                <img :src="IconCards" class="w-4 h-4 object-contain" />
              </q-item-section>
              <q-item-section>Portfólio</q-item-section>
            </q-item>

            <q-separator class="header-mobile-menu__separator" />

            <!-- Actions section -->
            <q-item
              v-close-popup
              clickable
              class="header-mobile-menu__item"
              @click="toggleConversations"
            >
              <q-item-section side>
                <q-icon name="visibility" size="16px" />
              </q-item-section>
              <q-item-section>{{ chatSidebarOpen ? 'Ocultar' : 'Mostrar' }} conversas</q-item-section>
            </q-item>
          </div>
        </q-menu>
      </button>
    </div>

    <!-- RIGHT: Breadcrumb + Search (centrado) + User -->
    <div class="relative flex-1 flex items-center justify-between bg-transparent px-4">
      <!-- Breadcrumb -->
      <div class="flex items-center min-w-0 max-sm:hidden">

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
        class="absolute left-[48.5%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] pointer-events-none max-sm:hidden"
      >
        <div
          class="flex items-center w-full h-9 bg-dark border border-border-input rounded-lg overflow-hidden pointer-events-auto"
        >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Pesquisar histórico"
            class="header-search-input"
          />
          <button
            type="button"
            class="shrink-0 h-8 mx-1 px-3 rounded-md bg-search-btn text-light-text text-paragraph-4 font-medium cursor-pointer transition-opacity hover:opacity-80"
            @click="onSearch"
          >
            Buscar
          </button>
        </div>
      </div>

      <!-- Mobile Search Button -->
      <button
        v-if="isMobile"
        type="button"
        class="hidden max-sm:flex items-center justify-center size-8 rounded-button bg-dark-card border border-border-dark text-dark-text cursor-pointer hover:opacity-80 transition-opacity absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        aria-label="Pesquisar"
      >
        <q-icon name="search" size="18px" />
        <q-menu anchor="bottom center" self="top center" :offset="[0, 8]" class="header-search-menu">
          <div class="header-search-menu__content">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Pesquisar histórico"
              class="header-search-menu__input"
              @keydown.enter="onSearch"
              autofocus
            />
            <button
              type="button"
              class="header-search-menu__button"
              @click="onSearch"
            >
              <q-icon name="search" size="16px" />
            </button>
          </div>
        </q-menu>
      </button>

      <div class="flex-1 max-sm:hidden" />

      <!-- User -->
      <div class="flex items-center gap-4 shrink-0">
        <div class="flex flex-col items-end max-sm:hidden">
          <span class="user-display-name truncate max-w-32">
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
import IconMenuToggle from "@assets/icons/icon-menu-toggle.svg";
import IconChat from "@assets/icons/icon-chat.svg";
import IconCards from "@assets/icons/icon-cards.svg";

export default {
  name: "CHeader",

  setup() {
    const auth = useAuth();
    return { uiStore: useUiStore(), auth };
  },

  data() {
    return {
      searchQuery: "",
      IconMenuToggle,
      IconChat,
      IconCards,
    };
  },

  computed: {
    isMobile() {
      return this.$q.screen.lt.md;
    },

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

    navigateToChat() {
      if (this.$route.path === "/ia-chat") {
        this.toggleChatSidebar();
      } else {
        this.$router.push("/ia-chat");
      }
    },

    toggleConversations() {
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

.user-display-name {
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 0.005em;
  text-align: right;
  vertical-align: middle;
  color: var(--color-dark-text);
}

.header-bg {
  background: linear-gradient(135deg, rgba(9, 10, 10, 1) 0%, rgba(0, 0, 0, 1) 100%);
}

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

.header-search-menu__input {
  @apply flex-1 bg-transparent outline-none px-3 py-2;
  width: 100%;
  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  color: var(--color-dark-text);

  &::placeholder {
    color: var(--color-dark-text-placeholder);
  }
}

.header-search-menu__button {
  @apply flex items-center justify-center shrink-0 px-3 bg-transparent border-none cursor-pointer text-dark-text hover:opacity-70 transition-opacity;
}

</style>

<style>
.profile-menu.q-menu {
  background: var(--color-dark-card) !important;
  border: 0.5px solid var(--color-border-dark) !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
  width: 260px !important;
  max-width: 260px !important;
  overflow: hidden !important;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif;
}

.header-mobile-menu.q-menu {
  background: var(--color-dark-card) !important;
  border: 0.5px solid var(--color-border-dark) !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
  width: 200px !important;
  overflow: hidden !important;
}

.header-mobile-menu__content {
  padding: 4px;
  display: flex;
  flex-direction: column;
}

.header-mobile-menu__item.q-item {
  border-radius: 8px;
  color: var(--color-dark-text-secondary) !important;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif;
  font-size: 13px;
  font-weight: 274;
  letter-spacing: 0.04em;
  min-height: 40px;
  margin: 2px 4px;
  transition: background 0.15s;
}

.header-mobile-menu__item.q-item:hover {
  background: rgba(255, 255, 255, 0.05) !important;
  color: var(--color-dark-text) !important;
}

.header-mobile-menu__separator {
  background: var(--color-border-dark) !important;
  margin: 4px 0 !important;
}

.header-search-menu.q-menu {
  background: var(--color-dark-card) !important;
  border: 0.5px solid var(--color-border-dark) !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
  width: 280px !important;
  overflow: hidden !important;
}

.header-search-menu__content {
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.profile-menu__content {
  padding: 4px;
  display: flex;
  flex-direction: column;
}

.profile-menu__user {
  display: flex;
  align-items: center;
  gap: 12px;
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
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark2));
  border: 1px solid var(--color-primary);
  flex-shrink: 0;
}

.profile-menu__initials {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-dark-text);
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
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif;
  font-size: 14px;
  font-weight: 510;
  color: var(--color-dark-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.04em;
}

.profile-menu__email {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif;
  font-size: 11px;
  font-weight: 274;
  color: var(--color-dark-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.04em;
}

.profile-menu__separator {
  background: var(--color-border-dark) !important;
  margin: 0 10px;
}

.profile-menu__item.q-item {
  border-radius: 8px;
  color: var(--color-dark-text-secondary) !important;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif;
  font-size: 13px;
  font-weight: 274;
  letter-spacing: 0.04em;
  min-height: 40px;
  margin: 2px 4px;
  transition: background 0.15s;
}

.profile-menu__item.q-item:hover {
  background: rgba(255, 255, 255, 0.05) !important;
  color: var(--color-dark-text) !important;
}

.profile-menu__item--danger.q-item {
  color: var(--color-dark-text-secondary) !important;
}

.profile-menu__item--danger.q-item:hover {
  background: rgba(239, 68, 68, 0.1) !important;
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
