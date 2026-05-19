<template>
  <q-drawer
    v-model="isOpen"
    show-if-above
    :width="isMobile ? 240 : 53"
    :breakpoint="1023"
    class="h-full sidebar-gradient overflow-hidden"
  >
    <div class="flex flex-col h-full">

      <!-- Logo — alinhado com a altura do header -->
      <div class="flex items-center shrink-0 h-15" :class="isMobile ? 'justify-between px-4' : 'justify-center'">
        <router-link to="/" @click="isMobile && (isOpen = false)">
          <img :src="IconLogoSmall" class="h-8 w-auto object-contain" alt="AI Invest" />
        </router-link>
        <button v-if="isMobile" type="button" class="close-btn" @click="isOpen = false">
          <q-icon name="close" size="18px" />
        </button>
      </div>

      <div class="sidebar-divider" />

      <!-- Ícones de nav — preenchem o restante verticalmente -->
      <nav class="flex-1 flex flex-col gap-2 py-4" :class="isMobile ? 'px-3' : 'items-center px-2'">

        <!-- IA Chat -->
        <button
          type="button"
          class="sidebar-btn"
          :class="[{ 'sidebar-btn--active': chatSidebarOpen }, isMobile && 'sidebar-btn--mobile']"
          aria-label="IA Chat"
          @click="navigateToChat"
        >
          <img :src="IconChat" class="w-4 h-4 object-contain" aria-hidden="true" />
          <span v-if="isMobile" class="sidebar-label">IA Chat</span>
          <q-tooltip v-else anchor="center right" self="center left" :offset="[12, 0]" class="sidebar-tooltip">
            IA Chat
          </q-tooltip>
        </button>

        <!-- Alertas -->
        <button
          type="button"
          class="sidebar-btn"
          :class="[{ 'sidebar-btn--active': notificationsOpen }, isMobile && 'sidebar-btn--mobile']"
          aria-label="Alertas"
        >
          <div class="relative">
            <q-icon name="notifications" size="16px" />
            <span class="sidebar-badge" />
          </div>
          <span v-if="isMobile" class="sidebar-label">Alertas</span>
          <q-tooltip v-else anchor="center right" self="center left" :offset="[12, 0]" class="sidebar-tooltip">
            Alertas
          </q-tooltip>
          <q-menu
            anchor="top right"
            self="top left"
            :offset="[12, 0]"
            class="notifications-menu"
            @show="notificationsOpen = true"
            @hide="notificationsOpen = false"
          >
            <div class="notifications-menu__content">
              <div class="notifications-menu__header">
                <span class="notifications-menu__title">Notificações</span>
                <span class="notifications-menu__badge">3</span>
              </div>
              <q-separator class="notifications-menu__separator" />
              <div v-for="n in placeholderNotifications" :key="n.id" class="notifications-menu__item">
                <div class="notifications-menu__item-icon">
                  <q-icon :name="n.icon" size="16px" />
                </div>
                <div class="notifications-menu__item-body">
                  <p class="notifications-menu__item-title">{{ n.title }}</p>
                  <p class="notifications-menu__item-desc">{{ n.desc }}</p>
                  <p class="notifications-menu__item-time">{{ n.time }}</p>
                </div>
                <span v-if="n.unread" class="notifications-menu__unread-dot" />
              </div>
              <q-separator class="notifications-menu__separator" />
              <button type="button" class="notifications-menu__see-all">Ver todas as notificações</button>
            </div>
          </q-menu>
        </button>

        <!-- Portfólio -->
        <button
          type="button"
          class="sidebar-btn"
          :class="isMobile && 'sidebar-btn--mobile'"
          aria-label="Portfólio"
        >
          <img :src="IconCards" class="w-4 h-4 object-contain" aria-hidden="true" />
          <span v-if="isMobile" class="sidebar-label">Portfólio</span>
          <q-tooltip v-else anchor="center right" self="center left" :offset="[12, 0]" class="sidebar-tooltip">
            Portfólio
          </q-tooltip>
        </button>

      </nav>
    </div>
  </q-drawer>
</template>

<script>
import { useUiStore } from "@stores/ui.store";
import IconLogoSmall from "@assets/imgs/logo-small.svg";
import IconChat from "@assets/icons/icon-chat.svg";
import IconCards from "@assets/icons/icon-cards.svg";

export default {
  name: "CSidebar",

  setup() {
    return { uiStore: useUiStore() };
  },

  data() {
    return {
      notificationsOpen: false,
      IconLogoSmall,
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
    isOpen: {
      get() { return this.uiStore.sidebarOpen; },
      set(value) { this.uiStore.setMainSidebarOpen(value); },
    },
    chatSidebarOpen() {
      return this.uiStore.chatSidebarOpen;
    },
  },

  methods: {
    navigateToChat() {
      if (this.$route.path === "/ia-chat") {
        this.uiStore.toggleChatSidebar();
      } else {
        this.$router.push("/ia-chat");
      }
      if (this.isMobile) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style scoped>
@reference "../../css/tailwind.css";

.sidebar-divider {
  @apply border-t border-border-dark mx-2 shrink-0;
}

.sidebar-btn {
  @apply flex items-center justify-center h-7 w-full
         bg-gradient-to-r from-dark to-dark-card
         border border-border-dark rounded-button
         text-primary cursor-pointer shrink-0;
  box-shadow: 0px 2px 0px 0px #000;
  transition: border-color 0.18s ease, background 0.18s ease;
}

.sidebar-btn:hover {
  border-color: rgb(from var(--color-primary) r g b / 0.3);
}

.sidebar-btn--active {
  border-color: rgb(from var(--color-primary) r g b / 0.6);
  background: rgba(225, 255, 6, 0.05);
}

.sidebar-btn--mobile {
  @apply justify-between px-3;
}

.sidebar-label {
  @apply text-sm font-medium text-dark-text;
}

.sidebar-badge {
  @apply absolute -top-1 -right-1 size-2 bg-primary rounded-full;
}

:deep(.sidebar-tooltip) {
  @apply text-xs bg-dark-card text-dark-text border border-border-dark rounded-md;
  padding: 5px 10px;
}

.close-btn {
  @apply flex items-center justify-center p-0 bg-transparent border-none cursor-pointer text-dark-text transition-opacity hover:opacity-70;
}
</style>

<style>
.notifications-menu.q-menu {
  background: var(--color-dark-card) !important;
  border: 0.5px solid var(--color-border-dark) !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
  width: 300px !important;
  overflow: hidden !important;
}
.notifications-menu__content { display: flex; flex-direction: column; }
.notifications-menu__header { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px 10px; }
.notifications-menu__title { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif; font-size: 13px; font-weight: 510; color: var(--color-dark-text); letter-spacing: 0.04em; }
.notifications-menu__badge { font-size: 11px; font-weight: 510; color: var(--color-dark); background: var(--color-primary); border-radius: 999px; padding: 1px 7px; line-height: 1.6; }
.notifications-menu__separator { background: var(--color-border-dark) !important; margin: 0 !important; }
.notifications-menu__item { display: flex; align-items: flex-start; gap: 10px; padding: 12px 16px; position: relative; cursor: pointer; transition: background 0.15s; }
.notifications-menu__item:hover { background: rgba(255, 255, 255, 0.04); }
.notifications-menu__item-icon { display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; background: rgba(225, 255, 6, 0.1); color: var(--color-primary); flex-shrink: 0; margin-top: 1px; }
.notifications-menu__item-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
.notifications-menu__item-title { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif; font-size: 12px; font-weight: 510; color: var(--color-dark-text); letter-spacing: 0.04em; }
.notifications-menu__item-desc { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif; font-size: 11px; font-weight: 274; color: var(--color-dark-text-secondary); letter-spacing: 0.04em; line-height: 1.4; }
.notifications-menu__item-time { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif; font-size: 10px; font-weight: 274; color: var(--color-dark-text-muted); letter-spacing: 0.04em; margin-top: 2px; }
.notifications-menu__unread-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--color-primary); flex-shrink: 0; margin-top: 6px; }
.notifications-menu__see-all { width: 100%; padding: 12px 16px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif; font-size: 12px; font-weight: 274; color: var(--color-primary); letter-spacing: 0.04em; text-align: center; background: transparent; border: none; cursor: pointer; transition: background 0.15s; }
.notifications-menu__see-all:hover { background: rgba(255, 255, 255, 0.04); }
</style>
