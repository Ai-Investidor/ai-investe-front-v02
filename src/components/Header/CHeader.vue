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
        </div>
      </div>
    </div>
  </q-header>
</template>

<script>
import { useAuthStore } from "@stores/auth.store";
import { useUiStore } from "@stores/ui.store";
import { useRouter } from "vue-router";

export default {
  name: "CHeader",

  emits: ["toggle:sidebar"],

  setup() {
    return { uiStore: useUiStore() };
  },

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

    onOpenSidebar() {
      this.uiStore.openMainSidebar();
    },
  },
};
</script>

<style scoped></style>
