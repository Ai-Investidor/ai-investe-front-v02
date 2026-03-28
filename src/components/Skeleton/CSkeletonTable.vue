<template>
  <table class="w-full border-collapse">
    <thead>
      <tr>
        <th class="text-left p-8" style="width: 150px">
          <Skeleton width="100%" height="1rem" />
        </th>
        <th class="text-right p-8">
          <Skeleton width="100%" height="1rem" />
        </th>
        <th class="text-right p-8">
          <Skeleton width="100%" height="1rem" />
        </th>
        <th class="text-right p-8">
          <Skeleton width="100%" height="1rem" />
        </th>
        <th class="text-right p-8">
          <Skeleton width="100%" height="1rem" />
        </th>
        <th class="text-right p-8">
          <Skeleton width="100%" height="1rem" />
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="n in 5" :key="n">
        <td class="text-left p-8">
          <Skeleton width="85px" height="1rem" />
        </td>
        <td class="text-right p-8">
          <Skeleton width="50px" height="1rem" />
        </td>
        <td class="text-right p-8">
          <Skeleton width="35px" height="1rem" />
        </td>
        <td class="text-right p-8">
          <Skeleton width="65px" height="1rem" />
        </td>
        <td class="text-right p-8">
          <Skeleton width="25px" height="1rem" />
        </td>
        <td class="text-right p-8">
          <Skeleton width="85px" height="1rem" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Skeleton from 'primevue/skeleton'

export default {
  name: 'CSkeletonTable',

  components: {
    Skeleton,
  },
}
</script>
