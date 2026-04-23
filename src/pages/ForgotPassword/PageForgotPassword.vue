<template>
  <div class="flex flex-col gap-6 animate-fade-up">
    <!-- ── Estado: Formulário ─────────────────────── -->
    <template v-if="!sent">
      <!-- Ícone visual -->
      <div
        class="flex items-center justify-center size-14 rounded-[14px] bg-primary/10"
        aria-hidden="true"
      >
        <q-icon name="lock_reset" size="28px" color="primary" />
      </div>

      <!-- Heading -->
      <div class="flex flex-col gap-2">
        <h1 class="text-title-xl text-primary-dark">Esqueceu sua senha?</h1>
        <p class="text-paragraph-md text-light-text-secondary">
          Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>
      </div>

      <!-- Form -->
      <form
        class="flex flex-col gap-4"
        @submit.prevent="handleSubmit"
        novalidate
      >
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
        />

        <CButton
          type="submit"
          unelevated
          no-caps
          color="primary"
          :loading="loading"
          label="Enviar link de redefinição"
          aria-label="Enviar link de redefinição de senha"
          class="w-full h-11"
        />
      </form>

      <!-- Back to login -->
      <p class="text-paragraph-sm text-center text-light-text-secondary">
        Lembrou a senha?
        <router-link
          to="/login"
          class="font-semibold text-primary no-underline transition-colors hover:text-primary-dark"
        >
          Fazer login
        </router-link>
      </p>
    </template>

    <!-- ── Estado: Confirmação ────────────────────── -->
    <template v-else>
      <!-- Ícone de sucesso -->
      <div
        class="flex items-center justify-center size-14 rounded-[14px] bg-success/10 animate-icon-pop"
        aria-hidden="true"
      >
        <q-icon name="mark_email_read" size="32px" color="primary" />
      </div>

      <!-- Heading -->
      <div class="flex flex-col gap-2">
        <h1 class="text-title-lg text-primary-dark">E-mail enviado!</h1>
        <p class="text-paragraph-md text-light-text-secondary">
          Enviamos um link de redefinição para
          <strong class="font-semibold text-primary-dark break-all">{{ email }}</strong
          >. Verifique sua caixa de entrada — o link expira em 15 minutos.
        </p>
      </div>

      <!-- Actions -->
      <div class="flex flex-col gap-3">
        <CButton
          unelevated
          outline
          no-caps
          :loading="loading"
          label="Reenviar e-mail"
          aria-label="Reenviar e-mail de redefinição"
          class="w-full h-11 !border-border-light !text-primary transition-colors hover:!bg-primary/6 hover:!border-primary"
          @click="handleResend"
        />
      </div>

      <!-- Back to login -->
      <p class="text-paragraph-sm text-center text-light-text-secondary">
        <router-link
          to="/login"
          class="font-semibold text-primary no-underline transition-colors hover:text-primary-dark"
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

