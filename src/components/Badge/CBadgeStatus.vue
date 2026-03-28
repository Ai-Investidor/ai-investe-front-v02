<template>
  <Skeleton v-if="loading" width="4rem" height="1.25rem" border-radius="9999px" />
  <span
    v-if="statusCertificado"
    class="inline-flex items-center h-20 px-10 text-caps-3 rounded-full  dark:text-black"
    :style="{
      backgroundColor: `rgba(${setBadgeStatus(statusCertificado).color}, 1)`,
    }">
    {{setBadgeStatus(statusCertificado).text || statusCertificado }}
  </span>
</template>

<script>
import Skeleton from 'primevue/skeleton'
import { setBadgeStatus } from 'utils/GLOBAL'

export default {
  name: 'CBadgeStatus',

  components: {
    Skeleton,
  },

  props: {
    statusCertificado: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    setBadgeStatus,
  },
}
</script>

<style lang="scss" scoped></style>
