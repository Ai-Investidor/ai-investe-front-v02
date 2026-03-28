<template>
  <q-drawer v-model="openSidebar" show-if-above bordered mini mini-to-overlay>
    <q-list>
      <q-item
        clickable
        tag="a"
        href="/"
        class="item-logo justify-center border-b border-b-primary border-b-primary-dark"
      >
        <q-item-section avatar class="items-center">
          <div
            class="flex justify-center items-center size-8 dark:bg-primary rounded-md"
          >
            <q-icon name="svguse:icons/icons.svg#icon-logo" size="20px" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
import { NavigationSideMenu } from "src/constants/menus";

export default {
  name: "CSidebar",

  components: {},

  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:open"],

  data() {
    return {
      NavigationSideMenu,
    };
  },

  computed: {
    openSidebar: {
      get() {
        return this.open;
      },
      set(val) {
        this.$emit("update:open", val);
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.item-logo
  height: $layout-header-height
</style>
