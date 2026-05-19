<template>
  <q-header class="flex items-stretch shrink-0 h-15 header-bg">

    <!-- LEFT: Menu toggle -->
    <div class="flex items-center shrink-0 px-3">
      <!-- Mobile: hamburger -->
      <button
        v-if="isMobile"
        type="button"
        class="flex items-center justify-center size-8 text-dark-text cursor-pointer hover:opacity-70 transition-opacity bg-transparent border-none"
        aria-label="Menu de navegação"
        @click="mobileMenuOpen = true; searchModalOpen = false"
      >
        <q-icon name="menu" size="22px" />
      </button>
      <!-- Desktop: toggle chat sidebar -->
      <button
        v-else
        type="button"
        class="menu-toggle-btn"
        :class="{ 'is-open': chatSidebarOpen }"
        aria-label="Mostrar/ocultar conversas"
        @click="toggleChatSidebar"
      >
        <img :src="IconMenuToggle" alt="" aria-hidden="true" />
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

      <!-- CENTER: Search (Desktop only) -->
      <div
        v-if="!isMobile"
        class="absolute left-[48.5%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] pointer-events-none"
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

      <div v-if="!isMobile" class="flex-1" />

      <!-- User -->
      <div class="flex items-center gap-4 shrink-0">
        <!-- Mobile Search Button (Lupinha) - Right side -->
        <button
          v-if="isMobile"
          type="button"
          class="flex items-center justify-center size-8 rounded-button bg-dark-card border border-border-dark text-dark-text cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Pesquisar"
          @click="searchModalOpen = true"
        >
          <q-icon name="search" size="18px" />
        </button>

        <div v-if="!isMobile" class="flex flex-col items-end max-sm:hidden">
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
            v-if="userAvatar && !avatarError"
            :src="userAvatar"
            :alt="userDisplayName"
            class="size-full object-cover"
            @error="avatarError = true"
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
            @show="searchModalOpen = false"
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

  <!-- Mobile Menu Drawer -->
  <transition name="fade">
    <div
      v-if="mobileMenuOpen"
      class="header-mobile-menu-backdrop"
      @click="mobileMenuOpen = false"
    />
  </transition>

  <transition name="slide-left">
    <div v-if="mobileMenuOpen" class="header-mobile-menu-drawer">
      <nav class="header-mobile-menu-drawer__nav">
        <!-- Chat -->
        <button
          type="button"
          class="header-mobile-menu-drawer__item"
          @click="navigateToChat(); mobileMenuOpen = false"
        >
          <img :src="IconChat" class="w-4 h-4 object-contain" />
          <span>Chat</span>
        </button>

        <!-- Notificações -->
        <button
          type="button"
          class="header-mobile-menu-drawer__item"
        >
          <div class="relative">
            <q-icon name="notifications" size="16px" class="text-primary" />
            <span class="header-mobile-menu-drawer__badge" />
          </div>
          <span>Notificações</span>
          <q-menu
            anchor="top right"
            self="top left"
            :offset="[12, 0]"
            class="notifications-menu"
          >
            <div class="notifications-menu__content">
              <div class="notifications-menu__header">
                <span class="notifications-menu__title">Notificações</span>
                <span class="notifications-menu__badge">3</span>
              </div>
              <div v-for="n in placeholderNotifications" :key="n.id" class="notifications-menu__item">
                <q-icon :name="n.icon" size="16px" class="notifications-menu__item-icon" />
                <span class="notifications-menu__item-title">{{ n.title }}</span>
                <span v-if="n.unread" class="notifications-menu__unread-dot" />
              </div>
              <div class="notifications-menu__divider" />
              <button type="button" class="notifications-menu__see-all">Ver todas</button>
            </div>
          </q-menu>
        </button>

        <!-- Portfólio -->
        <button
          type="button"
          class="header-mobile-menu-drawer__item"
        >
          <img :src="IconCards" class="w-4 h-4 object-contain" />
          <span>Portfólio</span>
        </button>

        <div class="header-mobile-menu-drawer__divider" />

        <!-- Toggle Conversas -->
        <button
          type="button"
          class="header-mobile-menu-drawer__item"
          @click="toggleConversations(); mobileMenuOpen = false"
        >
          <img :src="IconMenuToggle" class="w-3.5 h-3.5 object-contain" alt="" aria-hidden="true" />
          <span>{{ chatSidebarOpen ? 'Ocultar' : 'Mostrar' }} conversas</span>
        </button>
      </nav>

    </div>
  </transition>

  <!-- Search Modal (Mobile) -->
  <transition name="search-modal">
    <div v-if="searchModalOpen" class="search-modal-overlay">
      <div class="search-modal-content">
        <button
          type="button"
          class="search-modal-button"
          @click="onSearch"
        >
          <q-icon name="search" size="18px" />
        </button>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Pesquisar histórico"
          class="search-modal-input"
          @keydown.enter="onSearch"
          autofocus
        />
        <button
          type="button"
          class="search-modal-close"
          @click="searchModalOpen = false"
        >
          <q-icon name="close" size="18px" />
        </button>
      </div>
    </div>
  </transition>
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
      searchModalOpen: false,
      mobileMenuOpen: false,
      avatarError: false,
      IconMenuToggle,
      IconChat,
      IconCards,
      placeholderNotifications: [
        { id: 1, icon: "trending_up", title: "PETR4 subiu 3,2%", desc: "Petrobras atingiu seu maior valor em 30 dias.", time: "Agora mesmo", unread: true },
        { id: 2, icon: "notifications_active", title: "Alerta de preço ativado", desc: "VALE3 ultrapassou R$ 68,00.", time: "Há 15 minutos", unread: true },
        { id: 3, icon: "article", title: "Novo relatório disponível", desc: "Análise semanal do setor financeiro.", time: "Há 2 horas", unread: false },
      ],
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

  watch: {
    userAvatar() {
      this.avatarError = false;
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
  flex: 1;
  background: transparent;
  outline: none;
  padding: 12px;
  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  color: var(--color-dark-text);
}

.header-search-menu__input::placeholder {
  color: var(--color-dark-text-placeholder);
}

.header-search-menu__button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-dark-text);
  transition: opacity 0.2s ease;
}

.search-modal-overlay {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  padding: 8px 12px;
  border-bottom: 0.5px solid var(--color-border-dark);
  backdrop-filter: blur(8px);
}

.search-modal-content {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--color-dark);
  border: 1px solid var(--color-border-input);
  border-radius: 10px;
  padding: 0;
  overflow: hidden;
}

.search-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-dark-text-muted);
  transition: color 0.2s ease;
}

.search-modal-close:hover {
  color: var(--color-dark-text);
}

.search-modal-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  background: var(--color-dark);
  border: 1px solid var(--color-border-input);
  border-radius: 8px;
  overflow: hidden;
}

.search-modal-input {
  flex: 1;
  background: transparent;
  outline: none;
  padding: 12px;
  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  color: var(--color-dark-text);
}

.search-modal-input::placeholder {
  color: var(--color-dark-text-placeholder);
}

.search-modal-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-dark-text);
  transition: opacity 0.2s ease;
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

.header-mobile-menu__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 6px;
  height: 6px;
  background: var(--color-primary);
  border-radius: 50%;
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

/* Mobile Menu Drawer */
.header-mobile-menu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
}

.header-mobile-menu-drawer {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 180px;
  background: linear-gradient(180deg, rgba(14, 14, 14, 1) 0%, rgba(0, 0, 0, 1) 100%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  border-right: 0.5px solid var(--color-border-dark);
  padding: 8px;
  gap: 4px;
}

.header-mobile-menu-drawer__close {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  width: 24px;
  height: 24px;
  background: rgba(255,255,255,0.06);
  border: 0.5px solid var(--color-border-dark);
  border-radius: 6px;
  cursor: pointer;
  color: var(--color-dark-text-muted);
  transition: opacity 0.2s ease;
  margin-top: 4px;
}

.header-mobile-menu-drawer__close:hover {
  color: var(--color-dark-text);
}

.header-mobile-menu-drawer__nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.header-mobile-menu-drawer__item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  background: linear-gradient(to right, var(--color-dark), var(--color-dark-card));
  border: 1px solid var(--color-border-dark);
  border-radius: 8px;
  color: var(--color-dark-text);
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif;
  font-size: 12px;
  font-weight: 274;
  letter-spacing: 0.04em;
  transition: all 0.18s ease;
}

.header-mobile-menu-drawer__item:hover {
  border-color: rgb(from var(--color-primary) r g b / 0.3);
}

.header-mobile-menu-drawer__badge {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 6px;
  height: 6px;
  background: var(--color-primary);
  border-radius: 50%;
}

.header-mobile-menu-drawer__divider {
  height: 0.5px;
  background: var(--color-border-dark);
  margin: 6px 0;
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

/* Search Modal Transitions */
.search-modal-enter-active,
.search-modal-leave-active {
  transition: opacity 0.3s ease;
}

.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
}

.search-modal-enter-active .search-modal-content,
.search-modal-leave-active .search-modal-content {
  transition: transform 0.3s ease;
}

.search-modal-enter-from .search-modal-content,
.search-modal-leave-to .search-modal-content {
  transform: scale(0.95);
}

/* Mobile Menu Drawer Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

</style>
