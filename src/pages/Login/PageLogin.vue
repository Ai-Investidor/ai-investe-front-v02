<template>
  <div class="login-form">
    <!-- Heading -->
    <div class="login-form__header">
      <h1 class="text-title-lg login-form__title">Bem-vindo de volta</h1>
      <p class="text-paragraph-md login-form__subtitle">
        Acesse sua conta para continuar investindo com inteligência.
      </p>
    </div>

    <!-- Google Login -->
    <c-button
      unelevated
      outline
      no-caps
      class="login-form__google-btn"
      aria-label="Fazer login com o Google"
    >
      <template #default>
        <div class="login-form__google-btn-inner">
          <q-icon name="svguse:icons/icons.svg#icon-google" size="18px" />
          <span class="text-paragraph-md">Continuar com o Google</span>
        </div>
      </template>
    </c-button>

    <!-- Divider -->
    <div class="login-form__divider" aria-hidden="true">
      <span class="login-form__divider-line"></span>
      <span class="text-paragraph-sm login-form__divider-text">ou</span>
      <span class="login-form__divider-line"></span>
    </div>

    <!-- Form -->
    <form class="login-form__fields" @submit.prevent="handleLogin" novalidate>
      <c-input
        v-model="email"
        outlined
        dense
        type="email"
        label="E-mail"
        autocomplete="email"
        inputmode="email"
        aria-label="E-mail"
        class="login-form__input"
      />

      <c-input
        v-model="password"
        outlined
        dense
        :type="showPassword ? 'text' : 'password'"
        label="Senha"
        autocomplete="current-password"
        aria-label="Senha"
        class="login-form__input"
      >
        <template #append>
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            class="login-form__password-toggle"
            :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
            role="button"
            tabindex="0"
            @click="togglePasswordVisibility"
            @keyup.enter="togglePasswordVisibility"
          />
        </template>
      </c-input>

      <!-- Forgot password -->
      <div class="login-form__forgot">
        <router-link to="/esqueceu-senha" class="login-form__link text-paragraph-sm">
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
        class="login-form__submit-btn"
        label="Entrar"
        aria-label="Entrar na conta"
      />
    </form>

    <!-- Register link -->
    <p class="text-paragraph-sm login-form__register">
      Não tem uma conta?
      <router-link to="/cadastro" class="login-form__link login-form__link--emphasis">
        Criar conta grátis
      </router-link>
    </p>
  </div>
</template>

<script>
import CButton from "components/Button/CButton.vue";
import CInput from "components/Input/CInput.vue";

export default {
  name: "PageLogin",

  components: { CButton, CInput },

  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loading: false,
    };
  },

  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    handleLogin() {
      // TODO: integrar com serviço de autenticação
    },

    handleGoogleLogin() {
      // TODO: integrar com Google OAuth
    },
  },
};
</script>

<style scoped>
/* ── Form root ───────────────────────────────────── */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: loginFadeUp 0.35s cubic-bezier(0.25, 0.8, 0.5, 1) both;
}

@keyframes loginFadeUp {
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
.login-form__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.login-form__title {
  color: var(--color-primary-dark);
}

.login-form__subtitle {
  color: var(--color-light-text-secondary);
}

/* ── Google button ───────────────────────────────── */
.login-form__google-btn {
  width: 100%;
  border-color: var(--color-border-light) !important;
  color: var(--color-light-text) !important;
  height: 44px;
  transition: background-color var(--transition-hover), border-color var(--transition-hover);
}

.login-form__google-btn:hover {
  background-color: var(--color-neutral-100) !important;
  border-color: var(--color-neutral-300) !important;
}

.login-form__google-btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
}

/* ── Divider ─────────────────────────────────────── */
.login-form__divider {
  display: flex;
  align-items: center;
  gap: 12px;
}

.login-form__divider-line {
  flex: 1;
  height: 1px;
  background-color: var(--color-border-light);
}

.login-form__divider-text {
  color: var(--color-light-text-secondary);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── Fields ──────────────────────────────────────── */
.login-form__fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-form__input {
  width: 100%;
}

/* ── Password toggle ─────────────────────────────── */
.login-form__password-toggle {
  cursor: pointer;
  color: var(--color-light-text-secondary);
  transition: color var(--transition-hover);
}

.login-form__password-toggle:hover {
  color: var(--color-primary);
}

/* ── Forgot password ─────────────────────────────── */
.login-form__forgot {
  display: flex;
  justify-content: flex-end;
  margin-top: -8px;
}

/* ── Submit button ───────────────────────────────── */
.login-form__submit-btn {
  width: 100%;
  height: 44px;
  margin-top: 8px;
}

/* ── Links ───────────────────────────────────────── */
.login-form__link {
  color: var(--color-light-text-secondary);
  text-decoration: none;
  transition: color var(--transition-hover);
}

.login-form__link:hover {
  color: var(--color-primary);
}

.login-form__link--emphasis {
  color: var(--color-primary);
  font-weight: 600;
}

.login-form__link--emphasis:hover {
  color: var(--color-primary-dark);
}

/* ── Register ────────────────────────────────────── */
.login-form__register {
  text-align: center;
  color: var(--color-light-text-secondary);
}
</style>
