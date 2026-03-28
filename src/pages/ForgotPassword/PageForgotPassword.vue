<template>
  <div class="forgot-form">
    <!-- ── Estado: Formulário ─────────────────────── -->
    <template v-if="!sent">
      <!-- Ícone visual -->
      <div class="forgot-form__icon-wrap" aria-hidden="true">
        <q-icon name="lock_reset" size="28px" color="primary" />
      </div>

      <!-- Heading -->
      <div class="forgot-form__header">
        <h1 class="text-title-xl forgot-form__title">Esqueceu sua senha?</h1>
        <p class="text-paragraph-md forgot-form__subtitle">
          Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>
      </div>

      <!-- Form -->
      <form
        class="forgot-form__fields"
        @submit.prevent="handleSubmit"
        novalidate
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
          class="forgot-form__input"
        />

        <c-button
          type="submit"
          unelevated
          no-caps
          color="primary"
          :loading="loading"
          label="Enviar link de redefinição"
          aria-label="Enviar link de redefinição de senha"
          class="forgot-form__submit-btn"
        />
      </form>

      <!-- Back to login -->
      <p class="text-paragraph-sm forgot-form__back">
        Lembrou a senha?
        <router-link
          to="/login"
          class="forgot-form__link forgot-form__link--emphasis"
        >
          Fazer login
        </router-link>
      </p>
    </template>

    <!-- ── Estado: Confirmação ────────────────────── -->
    <template v-else>
      <!-- Ícone de sucesso -->
      <div class="forgot-form__success-icon" aria-hidden="true">
        <q-icon name="mark_email_read" size="32px" color="primary" />
      </div>

      <!-- Heading -->
      <div class="forgot-form__header">
        <h1 class="text-title-lg forgot-form__title">E-mail enviado!</h1>
        <p class="text-paragraph-md forgot-form__subtitle">
          Enviamos um link de redefinição para
          <strong class="forgot-form__email-highlight">{{ email }}</strong
          >. Verifique sua caixa de entrada — o link expira em 15 minutos.
        </p>
      </div>

      <!-- Actions -->
      <div class="forgot-form__success-actions">
        <c-button
          unelevated
          outline
          no-caps
          :loading="loading"
          label="Reenviar e-mail"
          aria-label="Reenviar e-mail de redefinição"
          class="forgot-form__resend-btn"
          @click="handleResend"
        />
      </div>

      <!-- Back to login -->
      <p class="text-paragraph-sm forgot-form__back">
        <router-link
          to="/login"
          class="forgot-form__link forgot-form__link--emphasis"
        >
          Voltar ao login
        </router-link>
      </p>
    </template>
  </div>
</template>

<script>
import CButton from "components/Button/CButton.vue";
import CInput from "components/Input/CInput.vue";

export default {
  name: "PageForgotPassword",

  components: { CButton, CInput },

  data() {
    return {
      email: "",
      loading: false,
      sent: false,
    };
  },

  methods: {
    async handleSubmit() {
      if (!this.email) return;
      this.loading = true;
      // TODO: integrar com serviço de autenticação
      await new Promise((resolve) => setTimeout(resolve, 800));
      this.loading = false;
      this.sent = true;
    },

    async handleResend() {
      this.loading = true;
      // TODO: integrar com serviço de autenticação
      await new Promise((resolve) => setTimeout(resolve, 800));
      this.loading = false;
    },
  },
};
</script>

<style scoped>
/* ── Form root ───────────────────────────────────── */
.forgot-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: forgotFadeUp 0.35s cubic-bezier(0.25, 0.8, 0.5, 1) both;
}

@keyframes forgotFadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Icon wrap (form state) ──────────────────────── */
.forgot-form__icon-wrap {
  width: 56px;
  height: 56px;
  background-color: var(--color-primary-light, rgba(51, 150, 254, 0.1));
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(51, 150, 254, 0.1);
}

/* ── Success icon ────────────────────────────────── */
.forgot-form__success-icon {
  width: 56px;
  height: 56px;
  background-color: rgba(16, 185, 129, 0.1);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: forgotIconPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: 0.1s;
}

@keyframes forgotIconPop {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ── Header ──────────────────────────────────────── */
.forgot-form__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.forgot-form__title {
  color: var(--color-primary-dark);
}

.forgot-form__subtitle {
  color: var(--color-light-text-secondary);
  line-height: 1.6;
}

.forgot-form__email-highlight {
  color: var(--color-primary-dark);
  font-weight: 600;
  word-break: break-all;
}

/* ── Fields ──────────────────────────────────────── */
.forgot-form__fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.forgot-form__input {
  width: 100%;
}

/* ── Submit button ───────────────────────────────── */
.forgot-form__submit-btn {
  width: 100%;
  height: 44px;
}

/* ── Success actions ─────────────────────────────── */
.forgot-form__success-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.forgot-form__resend-btn {
  width: 100%;
  height: 44px;
  border-color: var(--color-border-light) !important;
  color: var(--color-primary) !important;
  transition:
    background-color var(--transition-hover),
    border-color var(--transition-hover);
}

.forgot-form__resend-btn:hover {
  background-color: rgba(51, 150, 254, 0.06) !important;
  border-color: var(--color-primary) !important;
}

/* ── Links ───────────────────────────────────────── */
.forgot-form__link {
  color: var(--color-light-text-secondary);
  text-decoration: none;
  transition: color var(--transition-hover);
}

.forgot-form__link:hover {
  color: var(--color-primary);
}

.forgot-form__link--emphasis {
  color: var(--color-primary);
  font-weight: 600;
}

.forgot-form__link--emphasis:hover {
  color: var(--color-primary-dark);
}

/* ── Back link ───────────────────────────────────── */
.forgot-form__back {
  text-align: center;
  color: var(--color-light-text-secondary);
}
</style>
