<template>
  <div class="login-card">
    <!-- Logo -->
    <div class="login-logo" aria-label="AI.INVEST">
      <q-icon
        name="svguse:icons/icons.svg#icon-logo"
        size="28px"
        class="text-white"
      />
      <span class="login-logo__text">INVEST</span>
    </div>

    <!-- Heading -->
    <p class="login-heading">Bem vindo de volta</p>

    <!-- Google Login -->
    <button
      type="button"
      class="google-btn"
      :class="{ 'google-btn--loading': loadingGoogle }"
      :disabled="loadingGoogle"
      aria-label="Fazer login com o Google"
      @click="handleGoogleLogin"
    >
      <q-icon
        v-if="!loadingGoogle"
        name="svguse:icons/icons.svg#icon-google"
        size="24px"
      />
      <q-spinner v-else color="white" size="20px" />
      <span>Continuar com Google</span>
    </button>

    <!-- Divider -->
    <div class="login-divider" aria-hidden="true">
      <span class="login-divider__line" />
      <span class="login-divider__label">ou</span>
      <span class="login-divider__line" />
    </div>

    <!-- Form -->
    <q-form
      ref="loginForm"
      class="login-form"
      greedy
      @submit.prevent="handleLogin"
    >
      <div class="input-pill-wrapper">
        <input
          v-model="email"
          type="email"
          class="input-pill"
          placeholder="Digite seu e-mail"
          autocomplete="email"
          inputmode="email"
          aria-label="E-mail"
        />
      </div>

      <div class="input-pill-wrapper">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          class="input-pill"
          placeholder="Digite sua senha"
          autocomplete="current-password"
          aria-label="Senha"
        />
        <button
          type="button"
          class="input-pill__toggle"
          :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
          @click="togglePasswordVisibility"
        >
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            size="18px"
            style="color: rgba(214,214,214,0.6)"
          />
        </button>
      </div>
    </q-form>

    <!-- Forgot password -->
    <p class="login-forgot">
      Esqueceu a senha?
      <router-link to="/esqueceu-senha" class="login-forgot__link">
        Clique aqui!
      </router-link>
    </p>

    <!-- Register CTA -->
    <router-link to="/cadastro" class="register-btn" aria-label="Criar conta">
      <span class="register-btn__text">Faça seu cadastro</span>
      <div class="register-btn__arrow" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 8L8 2M8 2H3M8 2V7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </router-link>
  </div>
</template>

<script>
import useAuth from "@composables/useAuth";
import { useAuthStore } from "@stores/auth.store";

export default {
  name: "PageLogin",

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
      loadingGoogle: false,
    };
  },

  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    async handleLogin() {
      if (!this.email || !this.password) return;
      await this.auth.login(this.email, this.password);
    },

    async handleGoogleLogin() {
      this.loadingGoogle = true;
      try {
        await this.auth.loginWithGoogle();
      } finally {
        this.loadingGoogle = false;
      }
    },
  },
};
</script>

<style scoped>
/* ── Card ────────────────────────────────────────── */
.login-card {
  background: linear-gradient(
    to right,
    #000000,
    var(--color-dark-card)
  );
  border: 1px solid var(--color-border-dark);
  box-shadow:
    42px 49px 31.9px rgba(0, 0, 0, 0.25),
    0px 2px 0px #000000;
  border-radius: var(--radius-button);
  padding: 40px 15px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  width: 100%;
}

/* ── Logo ────────────────────────────────────────── */
.login-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.login-logo__text {
  font-size: 18.5px;
  font-weight: 800;
  letter-spacing: 0.37px;
  color: #ffffff;
  text-transform: uppercase;
}

/* ── Heading ─────────────────────────────────────── */
.login-heading {
  font-size: 26px;
  font-weight: 300;
  line-height: 1.3;
  color: rgba(255, 255, 255, 0.55);
  text-align: center;
  margin: 0;
  width: 100%;
}

/* ── Google Button ───────────────────────────────── */
.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 46px;
  border: 1px solid #f6f6f6;
  border-radius: var(--radius-full);
  background: transparent;
  color: #f6f6f6;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.google-btn:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.06);
}

.google-btn--loading {
  opacity: 0.7;
  cursor: not-allowed;
}

/* ── Divider ─────────────────────────────────────── */
.login-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.login-divider__line {
  flex: 1;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.15);
}

.login-divider__label {
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  white-space: nowrap;
}

/* ── Form ────────────────────────────────────────── */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 26px;
  width: 100%;
}

/* ── Pill Input ──────────────────────────────────── */
.input-pill-wrapper {
  position: relative;
  width: 100%;
}

.input-pill {
  width: 100%;
  height: 42px;
  padding: 0 42px 0 14px;
  border: 1px solid #d6d6d6;
  border-radius: var(--radius-full);
  background: transparent;
  color: #f6f6f6;
  font-size: 12px;
  font-weight: 400;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.input-pill::placeholder {
  color: #d6d6d6;
}

.input-pill:focus {
  border-color: rgba(255, 255, 255, 0.5);
}

.input-pill__toggle {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Forgot password ─────────────────────────────── */
.login-forgot {
  font-size: 14px;
  font-weight: 400;
  color: #f6f6f6;
  text-align: center;
  margin: 0;
  width: 100%;
}

.login-forgot__link {
  font-weight: 700;
  color: #f6f6f6;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.login-forgot__link:hover {
  color: var(--color-primary);
}

/* ── Register CTA ────────────────────────────────── */
.register-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  padding: 0 7px 0 23px;
  background-color: #ffffff;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.register-btn:hover {
  opacity: 0.9;
}

.register-btn__text {
  font-size: 14px;
  font-weight: 500;
  color: #353232;
}

.register-btn__arrow {
  width: 32px;
  height: 32px;
  background-color: var(--color-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
</style>
