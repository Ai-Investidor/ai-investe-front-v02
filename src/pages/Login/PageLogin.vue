<template>
  <div class="flex justify-center items-center w-full h-screen bg-[#E6E8E9]">
    <div class="w-full max-w-[468px]">
      <div
        class="bg-light rounded-xl shadow-md p-8 md:p-10 animate-fadeIn border border-border-light"
      >
        <div class="text-center mb-8">
          <div class="flex items-center justify-center gap-[32px] mb-4">
            <div
              class="w-[40px] h-[40px] bg-primary-dark rounded-lg flex items-center justify-center"
            >
              <q-icon
                name="svguse:icons/icons.svg#icon-logo"
                class="text-white"
                size="20px"
              />
            </div>
            <span class="text-headline-xl text-primary-dark">AI.INVEST</span>
          </div>

          <h1 class="text-title-xl text-primary-dark mb-2! text-start">
            Fazer login
          </h1>

          <p class="text-paragraph-md text-light-text-secondary text-start">
            Seja bem-vindo(a)! Insira seu e-mail e senha para entrar em sua
            conta.
          </p>
        </div>

        <!-- Botão Google Login -->
        <c-button
          icon="svguse:icons/icons.svg#icon-google"
          color="neutral-100"
          text-color="black"
          label="Fazer Login com o Google"
          class="text-paragraph-md w-full!"
        />

        <!-- Formulário -->
        <form class="space-y-4 mt-8">
          <!-- Campo Email -->
          <div>
            <div class="relative">
              <c-input
                outlined
                id="email"
                type="email"
                autocomplete="email"
                label="seu @email.com"
                class="w-full"
              />
            </div>
          </div>

          <!-- Campo Senha -->
          <div>
            <div class="relative">
              <c-input
                id="password"
                outlined
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                label="sua senha"
                class="w-full"
              >
                <template v-slot:append>
                  <q-icon
                    name="visibility"
                    @click="togglePasswordVisibility"
                    class="cursor-pointer hover:text-primary"
                  />
                </template>
              </c-input>
            </div>
          </div>

          <!-- Link Esqueceu Senha -->
          <div>
            <router-link
              to="/esqueceu-senha"
              class="text-paragraph-sm text-light-text-secondary hover:text-primary transition-colors"
              @click.prevent
            >
              Esqueceu sua senha?
            </router-link>
          </div>

          <c-button
            label="Criar na conta"
            class="w-full! bg-primary dark:bg-primary-dark! text-white text-paragraph-md"
          />
        </form>

        <router-link
          to="/cadastro"
          class="flex items-center justify-center text-paragraph-sm text-light-text-secondary hover:text-primary transition-colors mt-4"
          @click.prevent
        >
          Não tem uma conta ? Crie uma
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import CButton from "src/components/Button/CButton.vue";
import CInput from "src/components/Input/CInput.vue";

export default {
  name: "PageLogin",

  components: {
    CButton,
    CInput,
  },

  data() {
    return {
      showPassword: false,
    };
  },

  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style lang="sass" scoped></style>
