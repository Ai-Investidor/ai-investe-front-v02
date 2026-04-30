<template>
  <div
    class="flex justify-between items-center gap-3 w-full! h-full! p-1 rounded-md bg-dark-surface"
  >
    <div
      class="flex-1 flex justify-center items-center flex-nowrap gap-2 h-12! p-1 rounded-[6px] bg-dark-card cursor-pointer"
    >
      <q-icon name="chat_bubble" size="1rem" color="primary" />
      <p class="text-primary text-paragraph-sm">CHATS</p>
      <q-chip dense color="primary" text-color="white" size=".6rem">
        50
      </q-chip>
    </div>

    <div
      class="flex-1 flex justify-center items-center gap-2 h-12! p-1 rounded-[6px] bg-dark-card cursor-pointer"
    >
      <q-icon name="delete" size="1rem" color="primary" />
      <p class="text-primary text-paragraph-sm">EXCLUIDOS</p>
      <q-chip dense color="primary" text-color="white" size=".6rem">
        50
      </q-chip>
    </div>
  </div>
</template>

<script>
export default {
  name: "CChatSessionsInfo",

  data() {
    return {};
  },
};
</script>

<style lang="sass" scoped></style>
