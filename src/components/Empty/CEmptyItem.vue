<template>
  <div
    class="text-paragraph-2 text-center m-auto !h-full flex-1 flex flex-col justify-center select-none min-h-[80px]">
    <img
      ref="iconRef"
      :src="icons[randonIndex]"
      alt="imagem vazia de deserto"
      class="w-[180px] h-auto mx-auto opacity-80 dark:opacity-40" />
    <p ref="textRef" class="opacity-40 mt-24">{{ text }}</p>
  </div>
</template>

<script>
import icon1 from 'assets/image/emptyDesert.svg'
import icon2 from 'assets/image/space_illustration.svg'
import { gsap } from 'gsap'

export default {
  name: 'CEmptyItem',

  props: {
    text: {
      type: String,
      default: 'Nada para exibir no momento',
    },
  },

  data() {
    return {
      icons: [icon1, icon2],
      randonIndex: 0,
    }
  },

  mounted() {
    this.randonIndex = Math.floor(Math.random() * this.icons.length)

    gsap.fromTo(
      this.$refs.iconRef,
      { opacity: 0, y: -20, scale: 0.8 },
      { opacity: 0.8, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }
    )

    gsap.fromTo(
      this.$refs.textRef,
      { opacity: 0, y: 10 },
      { opacity: 0.4, y: 0, duration: 0.4, delay: 0.2, ease: 'power2.out' }
    )
  },
}
</script>

<style lang="scss" scoped></style>
