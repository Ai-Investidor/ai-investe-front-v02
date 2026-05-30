<template>
  <button
    type="button"
    class="flex items-center flex-nowrap! gap-2 w-full max-w-full min-w-0 px-2 py-2 rounded-button border-0 cursor-pointer text-left transition-colors duration-200 shrink-0 hover:bg-dark-elevated"
    :class="{
      'bg-dark-elevated': active,
    }"
    :aria-label="`Abrir conversa: ${label}`"
    @click="$emit('select', conversation.session_id)"
  >
    <!-- Ícone dinâmico: paperclip se tiver anexo, balão se não tiver -->
    <template v-if="hasAttachment">
      <svg
        class="size-4 shrink-0 transition-colors"
        :class="
          active
            ? 'text-white hover:bg-red-500'
            : 'text-dark-text-muted  hover:text-primary'
        "
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59699 21.9983 8.005 21.9983C6.41301 21.9983 4.88578 21.3658 3.76 20.24C2.63422 19.1142 2.00167 17.587 2.00167 15.995C2.00167 14.403 2.63422 12.8758 3.76 11.75L12.33 3.18C13.0806 2.42925 14.0991 2.00763 15.16 2.00763C16.2209 2.00763 17.2394 2.42925 17.99 3.18C18.7408 3.93063 19.1624 4.94913 19.1624 6.01C19.1624 7.07087 18.7408 8.08937 17.99 8.84L9.41 17.41C9.03444 17.7856 8.52556 17.9961 7.995 17.9961C7.46444 17.9961 6.95556 17.7856 6.58 17.41C6.20444 17.0344 5.99389 16.5256 5.99389 15.995C5.99389 15.4644 6.20444 14.9556 6.58 14.58L15.07 6.1"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </template>
    <template v-else>
      <svg
        class="size-4 shrink-0 transition-colors"
        :class="active ? 'text-white' : 'text-dark-text-muted'"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </template>

    <span
      class="text-paragraph-3 truncate min-w-0 transition-colors"
      :class="active ? 'text-white' : 'text-dark-text'"
    >
      {{ label }}
    </span>
  </button>
</template>

<script>
export default {
  name: "CChatConversationItem",

  props: {
    conversation: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    fallbackTitle: {
      type: String,
      default: "Nova Conversa",
    },
  },

  emits: ["select"],

  computed: {
    label() {
      return this.conversation.title ?? this.fallbackTitle;
    },
    hasAttachment() {
      return !!(
        this.conversation.has_attachment || this.conversation.attachment
      );
    },
  },
};
</script>
