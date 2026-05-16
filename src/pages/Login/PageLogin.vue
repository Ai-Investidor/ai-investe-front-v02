<template>
  <div class="login-card">
    <!-- Logo -->
    <div class="login-logo" aria-label="AI.INVEST">
      <svg
        width="207"
        height="48"
        viewBox="0 0 207 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M90.6836 0.173837L75.1055 47.083H59.7188L75.2969 0.173837H90.6836Z"
          stroke="white"
          stroke-width="0.347479"
        />
        <path
          d="M86.3975 0.173837L70.8193 47.083H55.4326L71.0107 0.173837H86.3975Z"
          stroke="white"
          stroke-width="0.347479"
        />
        <path
          d="M81.4746 0.173837L65.8965 47.083H50.5098L66.0879 0.173837H81.4746Z"
          stroke="white"
          stroke-width="0.347479"
        />
        <path
          d="M47.2572 47.2572H31.5048L41.9291 15.7524H26.1768L15.7524 47.2572H2.06568e-06L15.6366 9.03784e-06H62.8937L47.2572 47.2572Z"
          fill="white"
        />
        <path
          d="M78.588 9.03784e-06H94.3404L78.6459 47.2572H62.8936L78.588 9.03784e-06Z"
          fill="white"
        />
        <path
          d="M110.226 30.8682V14.9861H114.118V30.8682H110.226ZM117.401 30.8682V14.9861H121.108L130.522 25.4382V14.9861H134.451V30.8682H130.596L121.312 20.5643V30.8682H117.401ZM143.742 30.8682L136.959 14.9861H141.055L145.707 25.883L150.358 14.9861H154.454L147.671 30.8682H143.742ZM157.161 30.8496V14.9861H169.597V18.0995H161.035V21.3426H167.688V24.456H161.035V27.7362H169.597V30.8496H157.161ZM180.158 31.3129C177.489 31.3129 175.408 30.7632 173.913 29.6636C172.418 28.564 171.67 27.0011 171.67 24.9749V24.1595H175.562V24.9749C175.562 26.1363 175.933 26.9641 176.674 27.4582C177.415 27.9524 178.577 28.1995 180.158 28.1995C181.221 28.1995 182.085 28.1378 182.753 28.0142C183.778 27.8289 184.396 27.5324 184.606 27.1247C184.692 26.9517 184.736 26.649 184.736 26.2166V25.8645C184.711 25.7162 184.686 25.6174 184.661 25.568C184.587 25.4197 184.39 25.2714 184.068 25.1232C183.821 24.9996 183.512 24.8884 183.142 24.7896C182.611 24.6166 181.937 24.456 181.122 24.3078C180.726 24.2336 180.016 24.1163 178.991 23.9557C177.533 23.6962 176.643 23.5294 176.322 23.4553C175.395 23.2576 174.617 23.0043 173.987 22.6955C172.442 21.9542 171.67 20.7496 171.67 19.0817C171.67 18.4392 171.782 17.8709 172.004 17.3767C172.239 16.8825 172.566 16.4748 172.986 16.1536C173.419 15.82 173.888 15.542 174.395 15.3196C174.913 15.0973 175.506 14.9305 176.174 14.8193C176.853 14.7081 177.496 14.634 178.101 14.5969C178.719 14.5475 179.386 14.5228 180.102 14.5228C181.004 14.5228 181.845 14.5722 182.623 14.671C183.414 14.7575 184.18 14.9243 184.921 15.1714C185.674 15.4061 186.311 15.715 186.83 16.098C187.361 16.4686 187.781 16.9567 188.09 17.562C188.411 18.1551 188.572 18.8346 188.572 19.6006V20.416H184.698V19.6006C184.698 18.8099 184.21 18.2663 183.234 17.9698C182.53 17.7597 181.486 17.6547 180.102 17.6547C179.077 17.6547 178.262 17.6918 177.656 17.7659C176.643 17.8894 176.013 18.0995 175.766 18.396C175.63 18.569 175.562 18.7975 175.562 19.0817C175.562 19.4523 175.63 19.7118 175.766 19.86C175.852 19.9465 176.062 20.0515 176.396 20.1751C176.495 20.2122 176.6 20.2492 176.711 20.2863C176.822 20.311 176.933 20.3357 177.045 20.3604C177.168 20.3851 177.249 20.4037 177.286 20.416C177.78 20.5396 178.632 20.7063 179.843 20.9164C181.066 21.1264 181.882 21.2685 182.289 21.3426C184.587 21.8121 186.15 22.3434 186.978 22.9364C187.608 23.4059 188.04 23.9186 188.275 24.4746C188.51 25.0182 188.627 25.6483 188.627 26.3648C188.627 29.6636 185.804 31.3129 180.158 31.3129ZM196.334 30.8682V18.0995H190.7V14.949H205.841V18.0995H200.207V30.8682H196.334Z"
          fill="white"
        />
      </svg>
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
            style="color: rgba(214, 214, 214, 0.6)"
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
          <path
            d="M2 8L8 2M8 2H3M8 2V7"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
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
  background: linear-gradient(to right, #000000, var(--color-dark-card));
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
  max-width: 462px;

  position: absolute;

  left: -40%;
  top: 50%;

  transform: translateY(-50%);

  z-index: 999 !important;
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
