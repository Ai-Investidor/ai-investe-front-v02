<template>
  <div class="register-form">

    <!-- Heading -->
    <div class="register-form__header">
      <h1 class="text-title-lg register-form__title">Crie sua conta</h1>
      <p class="text-paragraph-md register-form__subtitle">
        Comece gratuitamente. Não é necessário cartão de crédito.
      </p>
    </div>

    <!-- Google Register -->
    <c-button
      unelevated
      outline
      no-caps
      class="register-form__google-btn"
      aria-label="Cadastrar com o Google"
      @click="handleGoogleRegister"
    >
      <template #default>
        <div class="register-form__google-btn-inner">
          <q-icon name="svguse:icons/icons.svg#icon-google" size="18px" />
          <span class="text-paragraph-md">Continuar com o Google</span>
        </div>
      </template>
    </c-button>

    <!-- Divider -->
    <div class="register-form__divider" aria-hidden="true">
      <span class="register-form__divider-line"></span>
      <span class="text-paragraph-sm register-form__divider-text">ou</span>
      <span class="register-form__divider-line"></span>
    </div>

    <!-- Form -->
    <form class="register-form__fields" @submit.prevent="handleRegister" novalidate>

      <c-input
        v-model="name"
        outlined
        dense
        type="text"
        label="Nome completo"
        autocomplete="name"
        aria-label="Nome completo"
        class="register-form__input"
      />

      <c-input
        v-model="email"
        outlined
        dense
        type="email"
        label="E-mail"
        autocomplete="email"
        inputmode="email"
        aria-label="E-mail"
        class="register-form__input"
      />

      <!-- Password row: two fields side by side on desktop -->
      <div class="register-form__password-row">
        <c-input
          v-model="password"
          outlined
          dense
          :type="showPassword ? 'text' : 'password'"
          label="Senha"
          autocomplete="new-password"
          aria-label="Senha"
          class="register-form__input"
        >
          <template #append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="register-form__password-toggle"
              :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
              role="button"
              tabindex="0"
              @click="togglePassword"
              @keyup.enter="togglePassword"
            />
          </template>
        </c-input>

        <c-input
          v-model="confirmPassword"
          outlined
          dense
          :type="showConfirmPassword ? 'text' : 'password'"
          label="Confirmar senha"
          autocomplete="new-password"
          aria-label="Confirmar senha"
          class="register-form__input"
        >
          <template #append>
            <q-icon
              :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
              class="register-form__password-toggle"
              :aria-label="showConfirmPassword ? 'Ocultar confirmação de senha' : 'Mostrar confirmação de senha'"
              role="button"
              tabindex="0"
              @click="toggleConfirmPassword"
              @keyup.enter="toggleConfirmPassword"
            />
          </template>
        </c-input>
      </div>

      <!-- Terms note -->
      <p class="text-paragraph-sm register-form__terms">
        Ao criar sua conta você concorda com nossos
        <router-link to="/termos" class="register-form__link register-form__link--emphasis">Termos de Uso</router-link>
        e
        <router-link to="/privacidade" class="register-form__link register-form__link--emphasis">Política de Privacidade</router-link>.
      </p>

      <!-- Submit -->
      <c-button
        type="submit"
        unelevated
        no-caps
        color="primary"
        :loading="loading"
        label="Criar conta grátis"
        aria-label="Criar conta grátis"
        class="register-form__submit-btn"
      />

    </form>

    <!-- Login link -->
    <p class="text-paragraph-sm register-form__login">
      Já tem uma conta?
      <router-link to="/login" class="register-form__link register-form__link--emphasis">
        Fazer login
      </router-link>
    </p>

  </div>
</template>

<script>
import CButton from "components/Button/CButton.vue";
import CInput from "components/Input/CInput.vue";

export default {
  name: "PageRegister",

  components: { CButton, CInput },

  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      loading: false,
    };
  },

  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },

    handleRegister() {
      // TODO: integrar com serviço de autenticação
    },

    handleGoogleRegister() {
      // TODO: integrar com Google OAuth
    },
  },
};
</script>

<style scoped>
/* ── Form root ───────────────────────────────────── */
.register-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: registerFadeUp 0.35s cubic-bezier(0.25, 0.8, 0.5, 1) both;
}

@keyframes registerFadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Header ──────────────────────────────────────── */
.register-form__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.register-form__title {
  color: var(--color-primary-dark);
}

.register-form__subtitle {
  color: var(--color-light-text-secondary);
}

/* ── Google button ───────────────────────────────── */
.register-form__google-btn {
  width: 100%;
  border-color: var(--color-border-light) !important;
  color: var(--color-light-text) !important;
  height: 44px;
  transition: background-color var(--transition-hover), border-color var(--transition-hover);
}

.register-form__google-btn:hover {
  background-color: var(--color-neutral-100) !important;
  border-color: var(--color-neutral-300) !important;
}

.register-form__google-btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
}

/* ── Divider ─────────────────────────────────────── */
.register-form__divider {
  display: flex;
  align-items: center;
  gap: 12px;
}

.register-form__divider-line {
  flex: 1;
  height: 1px;
  background-color: var(--color-border-light);
}

.register-form__divider-text {
  color: var(--color-light-text-secondary);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── Fields ──────────────────────────────────────── */
.register-form__fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.register-form__input {
  width: 100%;
}

/* ── Password row ────────────────────────────────── */
.register-form__password-row {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 480px) {
  .register-form__password-row {
    flex-direction: row;
    gap: 12px;
  }

  .register-form__password-row .register-form__input {
    flex: 1;
    min-width: 0;
  }
}

/* ── Password toggle ─────────────────────────────── */
.register-form__password-toggle {
  cursor: pointer;
  color: var(--color-light-text-secondary);
  transition: color var(--transition-hover);
}

.register-form__password-toggle:hover {
  color: var(--color-primary);
}

/* ── Terms ───────────────────────────────────────── */
.register-form__terms {
  color: var(--color-light-text-secondary);
  line-height: 1.5;
  margin-top: -4px;
}

/* ── Submit button ───────────────────────────────── */
.register-form__submit-btn {
  width: 100%;
  height: 44px;
  margin-top: 4px;
}

/* ── Links ───────────────────────────────────────── */
.register-form__link {
  color: var(--color-light-text-secondary);
  text-decoration: none;
  transition: color var(--transition-hover);
}

.register-form__link:hover {
  color: var(--color-primary);
}

.register-form__link--emphasis {
  color: var(--color-primary);
  font-weight: 600;
}

.register-form__link--emphasis:hover {
  color: var(--color-primary-dark);
}

/* ── Login ───────────────────────────────────────── */
.register-form__login {
  text-align: center;
  color: var(--color-light-text-secondary);
}
</style>
