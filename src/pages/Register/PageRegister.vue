<template>
  <div class="flex justify-center items-center w-full h-screen bg-[#E6E8E9]">
    <div class="w-full max-w-[468px]">
      <div
        class="bg-light rounded-xl shadow-md p-8 md:p-10 animate-fadeIn border border-border-light"
      >
        <div class="text-center mb-8">
          <h1 class="text-title-xl text-primary-dark mb-2! text-start">Crie sua Conta</h1>

          <p class="text-paragraph-md text-light-text-secondary text-start">
            Preencha os dados abaixo para criar sua conta.
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
          <div class="relative">
            <c-input
              outlined
              id="nome"
              type="text"
              autocomplete="name"
              label="seu nome"
              class="w-full"
            />
          </div>

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

          <div class="relative">
            <c-input
              outlined
              id="telefone"
              type="tel"
              autocomplete="tel"
              label="seu telefone"
              class="w-full"
            />
          </div>

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

          <div class="relative">
            <c-input
              id="password_confirm"
              outlined
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              label="Confirme sua senha"
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

          <c-button
            label="Entrar na conta"
            class="w-full! bg-primary dark:bg-primary-dark! text-white text-paragraph-md"
          />
        </form>

        <div class="flex justify-center items-center mt-8">
          <router-link
            to="/login"
            class="text-paragraph-sm text-light-text-secondary hover:text-primary transition-colors"
            @click.prevent
          >
            Já tem uma conta? <span class="text-primary text-primary-dark">Faça login</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CButton from 'src/components/Button/CButton.vue'
import CInput from 'src/components/Input/CInput.vue'
import { ref } from 'vue'

const showPassword = ref(false)

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}
</script>

<style lang="sass" scoped></style>
