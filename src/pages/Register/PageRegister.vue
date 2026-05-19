<template>
  <div class="flex flex-col gap-6 animate-fade-up">
    <!-- Heading -->
    <div class="flex flex-col gap-2">
      <h1 class="text-title-xl text-primary-dark">Crie sua conta</h1>
      <p class="text-paragraph-md text-light-text-secondary">
        Comece gratuitamente. Não é necessário cartão de crédito.
      </p>
    </div>

    <!-- Google Register -->
    <CButton
      unelevated
      outline
      no-caps
      class="w-full h-11 !border-border-light !text-light-text transition-colors hover:!bg-neutral-100 hover:!border-neutral-300"
      aria-label="Cadastrar com o Google"
      :loading="loading"
      @click="handleGoogleRegister"
    >
      <template #default>
        <div class="flex items-center justify-center gap-2.5 w-full">
          <q-icon name="svguse:icons/icons.svg#icon-google" size="18px" />
          <span class="text-paragraph-md">Continuar com o Google</span>
        </div>
      </template>
    </CButton>

    <!-- Divider -->
    <div class="flex items-center gap-3" aria-hidden="true">
      <span class="flex-1 h-px bg-border-light"></span>
      <span class="text-paragraph-sm shrink-0 text-light-text-secondary whitespace-nowrap">ou</span>
      <span class="flex-1 h-px bg-border-light"></span>
    </div>

    <!-- Form -->
    <q-form
      ref="registerForm"
      class="flex flex-col gap-4"
      @submit.prevent="handleRegister"
      greedy
    >
      <CInput
        v-model="name"
        outlined
        dense
        type="text"
        label="Nome completo"
        autocomplete="name"
        aria-label="Nome completo"
        class="w-full"
        :rules="nameRules"
        lazy-rules
      />

      <CInput
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

      <CInput
        v-model="phone"
        outlined
        dense
        type="tel"
        label="Telefone"
        autocomplete="tel"
        inputmode="tel"
        aria-label="Telefone"
        mask="(##) #####-####"
        fill-mask
        unmasked-value
        hint="(11) 91234-5678"
        class="w-full"
        :rules="phoneRules"
        lazy-rules
      />

      <!-- Password row: two fields side by side on desktop -->
      <div class="flex flex-col gap-4 min-[480px]:flex-row min-[480px]:gap-3">
        <CInput
          v-model="password"
          outlined
          dense
          :type="showPassword ? 'text' : 'password'"
          label="Senha"
          autocomplete="new-password"
          aria-label="Senha"
          class="w-full min-[480px]:flex-1 min-[480px]:min-w-0"
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
              @click="togglePassword"
              @keyup.enter="togglePassword"
            />
          </template>
        </CInput>

        <CInput
          v-model="confirmPassword"
          outlined
          dense
          :type="showConfirmPassword ? 'text' : 'password'"
          label="Confirmar senha"
          autocomplete="new-password"
          aria-label="Confirmar senha"
          class="w-full min-[480px]:flex-1 min-[480px]:min-w-0"
          :rules="confirmPasswordRules"
          lazy-rules
        >
          <template #append>
            <q-icon
              :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer text-light-text-secondary transition-colors hover:text-primary"
              :aria-label="
                showConfirmPassword
                  ? 'Ocultar confirmação de senha'
                  : 'Mostrar confirmação de senha'
              "
              role="button"
              tabindex="0"
              @click="toggleConfirmPassword"
              @keyup.enter="toggleConfirmPassword"
            />
          </template>
        </CInput>
      </div>

      <!-- Terms note -->
      <p class="text-paragraph-sm -mt-1 text-light-text-secondary">
        Ao criar sua conta você concorda com nossos
        <router-link
          to="/termos"
          class="font-semibold text-primary no-underline transition-colors hover:text-primary-dark"
          >Termos de Uso</router-link
        >
        e
        <router-link
          to="/privacidade"
          class="font-semibold text-primary no-underline transition-colors hover:text-primary-dark"
          >Política de Privacidade</router-link
        >.
      </p>

      <!-- Submit -->
      <CButton
        type="submit"
        unelevated
        no-caps
        color="primary"
        :loading="loading"
        label="Criar conta grátis"
        aria-label="Criar conta grátis"
        class="w-full h-11 mt-1"
      />
    </q-form>

    <!-- Login link -->
    <p class="text-paragraph-sm text-center text-light-text-secondary">
      Já tem uma conta?
      <router-link
        to="/login"
        class="font-semibold text-primary no-underline transition-colors hover:text-primary-dark"
      >
        Fazer login
      </router-link>
    </p>
  </div>
</template>

<script>
import CButton from "@components/Button/CButton.vue";
import CInput from "@components/Input/CInput.vue";
import useAuth from "@composables/useAuth";
import { useAuthStore } from "@stores/auth.store";
import {
  nameRules,
  emailRules,
  phoneRules,
  passwordRules,
  confirmPasswordRules,
} from "@constants/rules";

export default {
  name: "PageRegister",

  components: { CButton, CInput },

  setup() {
    return {
      auth: useAuth(),
      authStore: useAuthStore(),
    };
  },

  data() {
    return {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      nameRules,
      emailRules,
      phoneRules,
      passwordRules,
    };
  },

  computed: {
    loading() {
      return this.authStore.loading;
    },

    confirmPasswordRules() {
      return confirmPasswordRules(this.password);
    },
  },

  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },

    async handleRegister() {
      const valid = await this.$refs.registerForm.validate();
      if (!valid) return;

      await this.auth.register(this.email, this.password);
    },

    async handleGoogleRegister() {
      await this.auth.loginWithGoogle();
    },
  },
};
</script>

