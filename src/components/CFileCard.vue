<template>
  <div
    class="flex items-center min-w-72 max-w-72 gap-4 px-4 py-5 bg-[#161B22] border border-[#30363D] rounded-xl hover:border-primary relative"
  >
    <div class="flex justify-center items-center w-9 h-10 overflow-hidden">
      <img :src="fileIcon" alt="PDF Icon" class="object-fill" />
    </div>

    <p class="truncate text-md">{{ fileName }}</p>

    <button
      class="absolute top-1 right-2 hover:text-red-600"
      @click="$emit('click:close')"
    >
      &#128473;
    </button>
  </div>
</template>

<script>
import pdfIcon from '@assets/icons/pdf.png'
import csvIcon from '@assets/icons/csv.png'
import txtIcon from '@assets/icons/txt.png'
import xlsxIcon from '@assets/icons/xlsx.png'

export default {
  name: 'CFileCard',

  props: {
    file: {
      type: Object,
      required: true,
    },
  },

  emits: ['click:close'],

  data() {
    return {
      FILE_ICON_TYPE: {
        pdf: pdfIcon,
        csv: csvIcon,
        txt: txtIcon,
        xlsx: xlsxIcon,
      },
    }
  },

  computed: {
    fileName() {
      return this.file?.name
    },
    fileIcon() {
      const typeFile = this.file?.name?.split('.')[1]
      return typeFile ? (this.FILE_ICON_TYPE[typeFile] || this.FILE_ICON_TYPE.pdf) : this.FILE_ICON_TYPE.pdf
    },
  },
}
</script>

<style scoped></style>
