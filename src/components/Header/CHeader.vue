<template>
  <q-header class="flex items-stretc shrink-0 h-15 bg-dark">
    <div
      class="flex items-center gap-11 w-59 shrink-0 bg-black pl-18 rounded-br-2xl"
    >
      <router-link to="/" class="w-full h-full max-w-24 max-h-15">
        <q-img
          :src="IconLogo"
          fit="contain"
          class="w-full h-full cursor-pointer"
        />
      </router-link>

      <q-icon
        name="menu_open"
        size="1.2rem"
        class="cursor-pointer text-[#404040] hover:text-white"
      />
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
        </div>
      </div>
    </div>
  </q-header>
</template>

<script>
import { useAuthStore } from "@stores/auth.store";
import { useRouter } from "vue-router";
import IconLogo from "@assets/imgs/logo_invest.webp";

export default {
  name: "CHeader",

  data() {
    return {
      searchQuery: "",
      IconLogo,
    };
  },

  computed: {
    userAvatar() {
      return useAuthStore().userAvatar || "";
    },

    userDisplayName() {
      const authStore = useAuthStore();
      return authStore.userFullName || authStore.userEmail || "Usuário";
    },

    userInitials() {
      const name =
        useAuthStore().userFullName || useAuthStore().userEmail || "";
      return (
        name
          .split(" ")
          .slice(0, 2)
          .map((n) => n[0])
          .join("")
          .toUpperCase() || "U"
      );
    },

    userPlan() {
      return useAuthStore().userPlan || "Plano X";
    },

    nameCurrentRoute() {
      return useRouter().currentRoute.value?.meta?.label || "Dashboard";
    },
  },

  methods: {
    onSearch() {
      // TODO: implement search
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
</style>
