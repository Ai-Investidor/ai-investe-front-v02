import { ref } from 'vue'
import OSelectPaginated from 'components/Select/CSelectPaginated.vue'

// URLs disponíveis na API
const URLS = {
  teste: 'usuario',
}

/**
 * Select com paginação que busca dados da API.
 *
 * ⚠️ **Importante**: Para funcionar, é necessário que a API esteja rodando
 * e que você esteja autenticado. Clique em "Fazer Login" no painel acima.
 * @type { import('@storybook/vue3-vite').Meta
 */
export default {
  title: 'Components/Select/OSelectPaginated',
  component: OSelectPaginated,
  parameters: {
    auth: true, // Habilita o painel de autenticação
    docs: {
      description: {
        component: `
Select com busca paginada que consome uma API REST.
Ideal para selects com muitos itens onde não é viável carregar todos de uma vez.

### Características
- Busca inicial com limite configurável
- Scroll infinito para carregar mais itens
- Debounce na busca
- Suporte a filtros adicionais

### ⚠️ Autenticação
Este componente precisa de autenticação para funcionar.
Use o painel de login no topo da story.
        `,
      },
    },
  },
  argTypes: {
    apiUrl: {
      control: 'text',
      description: 'URL da API para buscar os dados',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      description: 'Label do select',
    },
    optionValue: {
      control: 'text',
      description: 'Campo do objeto que será usado como value',
      table: {
        defaultValue: { summary: 'id' },
      },
    },
    optionLabel: {
      control: 'text',
      description: 'Campo do objeto que será usado como label',
    },
    queryParam: {
      control: 'text',
      description: 'Parâmetro de busca na URL',
      table: {
        defaultValue: { summary: 'search' },
      },
    },
    initialLimit: {
      control: 'number',
      description: 'Quantidade inicial de itens por página',
      table: {
        defaultValue: { summary: '15' },
      },
    },
  },
}

// Template base
const Template = (args) => ({
  components: { OSelectPaginated },
  setup() {
    const selected = ref(null)
    return { args, selected }
  },
  args: {
    optionValue: 'id',
    optionLabel: 'first_name',
    queryParam: 'search',
    initialLimit: 15,
  },
  template: `
    <div class="p-24">
      <OSelectPaginated 
        v-bind="args" 
        v-model="selected"
      />
      <p class="mt-16 text-paragraph-3 text-surface-500">
        Selecionado: {{ selected || 'Nenhum' }}
      </p>
    </div>
  `,
})

/**
 * Exemplo buscando usuários da API.
 * Configure a URL conforme seu endpoint.
 */
export const BuscaUsuarios = Template.bind({})
BuscaUsuarios.args = {
  apiUrl: URLS.teste, // Ajuste para seu endpoint
  label: 'Selecione um usuário',
}

/**
 * Exemplo com transformação dos dados.
 * Útil quando a API retorna dados em formato diferente.
 */
export const ComTransformacao = (args) => ({
  components: { OSelectPaginated },
  setup() {
    const selected = ref(null)

    // Transforma os dados da API
    const transformOptions = (items) => {
      return items.map((item) => ({
        ...item,
        nome: `${item.nome} (ID: ${item.id})`, // Customiza o label
      }))
    }

    return { args, selected, transformOptions }
  },
  template: `
    <div class="p-24">
      <OSelectPaginated 
        v-bind="args"
        v-model="selected"
        :transform-options="transformOptions"
      />
    </div>
  `,
})
ComTransformacao.args = {
  apiUrl: URLS.teste,
  label: 'Usuário com ID no label',
  optionValue: 'id',
  optionLabel: 'first_name',
}

/**
 * Exemplo com filtros adicionais.
 * Adiciona parâmetros extras à requisição.
 */
export const ComFiltrosAdicionais = Template.bind({})
ComFiltrosAdicionais.args = {
  apiUrl: URLS.teste,
  label: 'Usuários ativos',
  optionValue: 'id',
  optionLabel: 'first_name',
  adictionalFilters: {
    ativo: true,
    ordenar: 'first_name',
  },
}
