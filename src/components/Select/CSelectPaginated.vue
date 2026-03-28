<template>
  <OSelect
    ref="selectRef"
    :options="options"
    :optionValue="optionValue"
    :optionLabel="optionLabel"
    :label="label"
    :placeholder="placeholder"
    :loading="loading && options.length === 0"
    :showClear="showClear"
    :modelValue="modelValue"
    :filter="true"
    filterMatchMode="contains"
    :resetFilterOnHide="true"
    @update:modelValue="onSelect"
    @filter="onFilter"
    @show="onShow"
    @hide="onHide"
    v-bind="$attrs">
    <template #empty>
      <div v-if="!loading" class="py-24">
        <EmptyItem />
      </div>
      <div v-else class="flex justify-center py-16">
        <BaseSpinner />
      </div>
    </template>

    <template #footer>
      <div
        v-if="loadingMore"
        class="flex items-center justify-center py-8 gap-8 text-surface-500">
        <BaseSpinner />
      </div>
    </template>

    <template #dropdownicon>
      <span class="material-symbols-rounded text-[18px]">expand_more</span>
    </template>

    <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps || {}" />
    </template>
  </OSelect>
</template>

<script>
import { api } from 'boot/axios'
import EmptyItem from 'components/Empty/CEmptyItem.vue'
import OSelect from 'components/Select/CSelect.vue'
import { stringifyUrl } from 'utils/GLOBAL'
import BaseSpinner from 'components/Spinner/CSpinner.vue'

export default {
  name: 'CSelectPaginated',

  components: {
    EmptyItem,
    OSelect,
    BaseSpinner,
  },

  props: {
    apiUrl: { type: String, required: true },
    modelValue: { type: [String, Number, Object, Array], default: null },
    showClear: { type: Boolean, default: true },
    label: { type: String, default: null },
    placeholder: { type: String, default: null },
    optionValue: { type: String, default: 'id' },
    optionLabel: { type: String, default: 'nome' },
    inputDebounce: { type: Number, default: 300 },
    queryParam: { type: String, default: 'search' },
    limitParam: { type: String, default: 'page_size' },
    transformOptions: { type: Function, default: (v) => v },
    adictionalFilters: { type: Object, default: () => ({}) },
    initialLimit: { type: Number, default: 20 },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      options: [],
      selectedOption: null,
      loading: false,
      loadingMore: false,
      nextUrl: null,
      hasActiveSearch: false,
    }
  },

  watch: {
    adictionalFilters: {
      deep: true,
      handler() {
        this.fetchOptions()
      },
    },
  },

  async mounted() {
    await this.fetchSelectedOption()
    this.fetchOptions()
  },

  unmounted() {
    this.cleanupScroll()
    this.cancelPendingRequest()
    if (this._debounceTimer) clearTimeout(this._debounceTimer)
  },

  methods: {
    ensureSelectedInList(list) {
      if (!this.selectedOption) return list
      const val = this.selectedOption[this.optionValue]
      const exists = list.some((item) => item[this.optionValue] === val)
      return exists ? list : [this.selectedOption, ...list]
    },

    onSelect(value) {
      if (value == null) {
        this.selectedOption = null
      } else {
        const found = this.options.find((item) => item[this.optionValue] === value)
        if (found) this.selectedOption = found
      }
      this.$emit('update:modelValue', value)
    },

    cancelPendingRequest() {
      if (this._abortController) {
        this._abortController.abort()
        this._abortController = null
      }
    },

    createAbortController() {
      this.cancelPendingRequest()
      this._abortController = new AbortController()
      return this._abortController.signal
    },

    buildUrl(extraQuery = {}) {
      return stringifyUrl({
        url: this.apiUrl,
        query: {
          [this.limitParam]: this.initialLimit,
          ...this.adictionalFilters,
          ...extraQuery,
        },
      })
    },

    parseNextUrl(url) {
      if (!url) return null
      const urlObj = new URL(url)
      return url.replace(urlObj.origin, '')
    },

    async fetchOptions(query = null) {
      if (this.loading) this.cancelPendingRequest()
      this.loading = true

      const signal = this.createAbortController()
      const url = this.buildUrl(query ? { [this.queryParam]: query } : {})

      try {
        const response = await api.get(url, { signal })
        const data = response?.data
        const results = data?.results ?? data ?? []

        this.options = this.ensureSelectedInList(
          this.transformOptions(Array.isArray(results) ? results : [])
        )
        this.nextUrl = this.parseNextUrl(data?.next)
      } catch (error) {
        if (error.name === 'CanceledError' || error.name === 'AbortError') return
        console.error('OSelectPaginated: erro ao buscar dados:', error)
        this.options = []
      } finally {
        this.loading = false
      }
    },

    onFilter(event) {
      const searchText = event.value ?? ''

      if (this._debounceTimer) clearTimeout(this._debounceTimer)

      this.hasActiveSearch = !!searchText

      this._debounceTimer = setTimeout(() => {
        this.fetchOptions(searchText || null)
      }, this.inputDebounce)
    },

    onHide() {
      this.cleanupScroll()
      if (this._debounceTimer) clearTimeout(this._debounceTimer)
      if (this.hasActiveSearch) {
        this.hasActiveSearch = false
        this.fetchOptions()
      }
    },

    async loadMore() {
      if (!this.nextUrl || this.loadingMore) return
      this.loadingMore = true

      try {
        const url = stringifyUrl({
          url: this.nextUrl.replace('/api', ''),
          query: this.adictionalFilters,
        })

        const { data } = await api.get(url)

        if (data?.results?.length > 0) {
          this.options = [
            ...this.options,
            ...this.transformOptions(data.results),
          ]
        }
        this.nextUrl = this.parseNextUrl(data?.next)
      } catch (error) {
        console.error('Erro ao carregar mais:', error)
      } finally {
        this.loadingMore = false
      }
    },

    onDropdownScroll(e) {
      const target = e.target
      if (!target) return
      const nearBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 50
      if (nearBottom) this.loadMore()
    },

    onShow() {
      setTimeout(() => {
        const overlays = document.querySelectorAll('.p-select-overlay')
        const overlay = overlays[overlays.length - 1]
        if (!overlay) return
        this._scrollPanel = overlay.querySelector('.p-select-list-container')
        if (this._scrollPanel) {
          this._scrollPanel.addEventListener('scroll', this.onDropdownScroll)
        }
      }, 50)
    },

    cleanupScroll() {
      if (this._scrollPanel) {
        this._scrollPanel.removeEventListener('scroll', this.onDropdownScroll)
        this._scrollPanel = null
      }
    },

    async fetchSelectedOption() {
      if (this.modelValue == null) return
      try {
        const { data } = await api.get(`${this.apiUrl}${this.modelValue}/`)
        if (data) this.selectedOption = data
      } catch {
        // Item nao encontrado — ignora
      }
    },
  },
}
</script>
