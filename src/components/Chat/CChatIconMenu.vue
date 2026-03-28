<template>
  <aside class="w-[75px] bg-dark-card border-r border-border-dark flex flex-col items-center justify-between h-full">
    <div class="w-full">
      <div class="w-full flex items-center justify-center py-[22.5px]">
        <div class="w-[32px] h-[32px] bg-primary rounded-lg flex items-center justify-center">
          <svg width="15" height="15" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.00001 15.6667L13.5 1.00005V10.3334H21L8.50001 25V15.6667H1.00001Z" stroke="white"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <div
        class="w-full border-t border-b border-border-dark flex flex-col items-center justify-center gap-[24px] py-[14px]">
        <button type="button" class="w-[32px] h-[32px] rounded-lg flex items-center justify-center transition-colors"
          :class="activeRoute === 'chat' ? 'bg-primary-dark2' : 'hover:bg-dark-elevated'"
          @click="$emit('navigate', 'chat')">
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM4 7H16V9H4V7ZM12 12H4V10H12V12ZM16 6H4V4H16V6Z"
              fill="white" />
          </svg>

        </button>

        <button type="button" class="w-[32px] h-[32px] rounded-lg flex items-center justify-center transition-colors"
          :class="activeRoute === 'wallet' ? 'bg-primary-dark2' : 'hover:bg-dark-elevated'"
          @click="$emit('navigate', 'wallet')">
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 20C2.9 20 1.95833 19.5104 1.175 18.5312C0.391667 17.5521 0 16.375 0 15V5C0 3.625 0.391667 2.44792 1.175 1.46875C1.95833 0.489584 2.9 0 4 0H16C17.1 0 18.0417 0.489584 18.825 1.46875C19.6083 2.44792 20 3.625 20 5V15C20 16.375 19.6083 17.5521 18.825 18.5312C18.0417 19.5104 17.1 20 16 20H4ZM4 5H16C16.3667 5 16.7167 5.05208 17.05 5.15625C17.3833 5.26042 17.7 5.42708 18 5.65625V5C18 4.3125 17.8043 3.72417 17.413 3.235C17.0217 2.74583 16.5507 2.50083 16 2.5H4C3.45 2.5 2.97933 2.745 2.588 3.235C2.19667 3.725 2.00067 4.31333 2 5V5.65625C2.3 5.42708 2.61667 5.26042 2.95 5.15625C3.28333 5.05208 3.63333 5 4 5ZM2.15 9.0625L13.275 12.4375C13.425 12.4792 13.575 12.4792 13.725 12.4375C13.875 12.3958 14.0167 12.3125 14.15 12.1875L17.625 8.5625C17.4417 8.25 17.2083 7.995 16.925 7.7975C16.6417 7.6 16.3333 7.50083 16 7.5H4C3.56667 7.5 3.18767 7.64083 2.863 7.9225C2.53833 8.20417 2.30067 8.58417 2.15 9.0625Z"
              fill="white" />
          </svg>

        </button>

        <button type="button" class="w-[32px] h-[32px] rounded-lg flex items-center justify-center transition-colors"
          :class="activeRoute === 'analysis' ? 'bg-primary-dark2' : 'hover:bg-dark-elevated'"
          @click="$emit('navigate', 'analysis')">
          <svg width="18" height="16" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8.78L18.24 1.45L19.97 2.45L14.74 11.5L8.23 7.75L3.46 16H20V18H0V0H2V14.54L7.5 5L14 8.78Z"
              fill="white" />
          </svg>

        </button>
      </div>
    </div>

    <div class="w-full flex flex-col items-center justify-center gap-[14px] py-[14px]">
      <div class="flex flex-col items-center gap-[8px]">
        <svg width="14" height="14" class="text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>

        <button type="button" class="w-[36px] h-[20px] rounded-full transition-colors relative"
          :class="isDark ? 'bg-primary-dark2' : 'bg-dark-elevated'" @click="$emit('toggle-theme')">
          <div class="absolute top-[2px] w-[16px] h-[16px] bg-light rounded-full transition-transform"
            :class="isDark ? 'left-[18px]' : 'left-[2px]'"></div>
        </button>

        <svg width="14" height="14" class="text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </div>

      <button type="button" class="w-[32px] h-[32px] flex items-center justify-center text-dark-text-secondary hover:text-dark-text transition-colors"
        @click="$emit('open-settings')">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <button type="button"
        class="w-[36px] h-[36px] bg-primary rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
        @click="$emit('open-profile')">
        <svg width="15" height="15" class="text-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'CChatIconMenu',

  props: {
    activeRoute: {
      type: String,
      default: 'chat',
    },
    isDark: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['toggle-theme', 'open-settings', 'open-profile', 'navigate'],
}
</script>
