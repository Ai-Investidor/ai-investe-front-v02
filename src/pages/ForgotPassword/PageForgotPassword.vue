<template>
  <div class="flex justify-center items-center w-full h-screen bg-[#E6E8E9]">
    <div class="w-full max-w-[468px]">
      <div
        class="bg-light rounded-xl shadow-md p-8 md:p-10 animate-fadeIn border border-border-light"
      >
        <div class="text-center mb-8">
          <h1 class="text-title-xl text-primary-dark mb-2! text-start">Esqueci minha senha</h1>

          <p class="text-paragraph-md text-light-text-secondary text-start">
            Preencha o campo abaixo que enviaremos uma nova senha para o seu e-mail.
          </p>
        </div>

        <!-- Formulário -->
        <form class="space-y-4 mt-8">
          <div class="relative">
            <c-input
              outlined
              id="email"
              type="email"
              autocomplete="email"
              label="@email.com"
              class="w-full"
            />
          </div>

          <div class="space-y-2!">
            <c-button
              label="Enviar email"
              class="w-full! bg-primary dark:bg-primary-dark! text-white text-paragraph-md"
            />

            <c-button
              label="Voltar ao Login"
              to="/login"
              class="w-full! bg-white text-paragraph-md"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import CButton from 'src/components/Button/CButton.vue'
import CInput from 'src/components/Input/CInput.vue'
</script>

<style lang="sass" scoped></style>
