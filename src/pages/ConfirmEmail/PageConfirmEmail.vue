<template>
  <div class="flex justify-center items-center w-full h-screen bg-[#E6E8E9]">
    <div class="w-full max-w-[468px]">
      <div
        class="bg-light rounded-xl shadow-md p-8 md:p-10 animate-fadeIn border border-border-light"
      >
        <div class="text-center mb-8">
          <h1 class="text-title-xl text-primary-dark mb-2! text-start">E-mail enviado!</h1>

          <p class="text-paragraph-md text-light-text-secondary text-start">
            Sua senha foi redefinida com sucesso! Verifique seu e-mail e faça seu login.
          </p>
        </div>

        <c-button
          label="Fazer login"
          class="w-full! bg-primary dark:bg-primary-dark! text-white text-paragraph-md"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CButton from 'src/components/Button/CButton.vue'
</script>

<style lang="sass" scopen></style>
