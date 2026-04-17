<template>
  <div class="flex flex-col gap-6 animate-fade-up">
    <!-- Heading -->
    <div class="flex flex-col gap-2">
      <h1 class="text-title-xl text-primary-dark">Bem-vindo de volta</h1>
      <p class="text-paragraph-md text-light-text-secondary">
        Acesse sua conta para continuar investindo com inteligência.
      </p>
    </div>

    <!-- Google Login -->
    <c-button
      unelevated
      outline
      no-caps
      class="w-full h-11 !border-border-light !text-light-text transition-colors hover:!bg-neutral-100 hover:!border-neutral-300"
      aria-label="Fazer login com o Google"
      :loading="loadingGoogle"
      @click="handleGoogleLogin"
    >
      <template #default>
        <div class="flex items-center justify-center gap-2.5 w-full">
          <q-icon name="svguse:icons/icons.svg#icon-google" size="18px" />
          <span class="text-paragraph-md">Continuar com o Google</span>
        </div>
      </template>
    </c-button>

    <!-- Divider -->
    <div class="flex items-center gap-3" aria-hidden="true">
      <span class="flex-1 h-px bg-border-light"></span>
      <span class="text-paragraph-sm shrink-0 text-light-text-secondary whitespace-nowrap">ou</span>
      <span class="flex-1 h-px bg-border-light"></span>
    </div>

    <!-- Form -->
    <q-form
      ref="loginForm"
      class="flex flex-col gap-4"
      @submit.prevent="handleLogin"
      greedy
    >
      <c-input
        v-model="email"
        outlined
        dense
        type="email"
        label="E-mail"
        autocomplete="email"
        inputmode="email"
        aria-label="E-mail"
        class="w-full"
        :rules="emailRules"
        lazy-rules
      />

      <c-input
        v-model="password"
        outlined
        dense
        :type="showPassword ? 'text' : 'password'"
        label="Senha"
        autocomplete="current-password"
        aria-label="Senha"
        class="w-full"
        :rules="passwordRules"
        lazy-rules
      >
        <template #append>
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer text-light-text-secondary transition-colors hover:text-primary"
            :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
            role="button"
            tabindex="0"
            @click="togglePasswordVisibility"
            @keyup.enter="togglePasswordVisibility"
          />
        </template>
      </c-input>

      <!-- Forgot password -->
      <div class="flex justify-end -mt-2">
        <router-link
          to="/esqueceu-senha"
          class="text-paragraph-sm text-light-text-secondary no-underline transition-colors hover:text-primary"
        >
          Esqueceu sua senha?
        </router-link>
      </div>

      <!-- Submit -->
      <c-button
        type="submit"
        unelevated
        no-caps
        color="primary"
        :loading="loading"
        class="w-full h-11 mt-2"
        label="Entrar"
        aria-label="Entrar na conta"
      />
    </q-form>

    <!-- Register link -->
    <p class="text-paragraph-sm text-center text-light-text-secondary">
      Não tem uma conta?
      <router-link
        to="/cadastro"
        class="font-semibold text-primary no-underline transition-colors hover:text-primary-dark"
      >
        Criar conta grátis
      </router-link>
    </p>
  </div>
</template>

<script>
import CButton from "@components/Button/CButton.vue";
import CInput from "@components/Input/CInput.vue";
import useAuth from "@composables/useAuth";
import { useAuthStore } from "@stores/auth.store";
import { emailRules, passwordRules } from "@constants/rules";

export default {
  name: "PageLogin",

  components: { CButton, CInput },

  setup() {
    return {
      auth: useAuth(),
      authStore: useAuthStore(),
    };
  },

  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      emailRules,
      passwordRules,
    };
  },

  computed: {
    loading() {
      return this.authStore.loading;
    },
  },

  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    async handleLogin() {
      const valid = await this.$refs.loginForm.validate();
      if (!valid) return;

      await this.auth.login(this.email, this.password);
    },

    async handleGoogleLogin() {
      await this.auth.loginWithGoogle();
    },
  },
};
</script>

