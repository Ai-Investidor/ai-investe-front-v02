import TextIcon from 'components/Text/CTextIcon.vue'
// template tag for use vscode extension lit-html,

/**
 * Args - define as (props)
 */
const args = {
  // size: 'md',
  text: 'Adicionar Complemento',
  icon: 'favorite',
}

/**
 *  Arg Types - permite definir e documentar os tipos de args (props)
 */

const argTypes = {
  // size: {
  //   control: { type: 'select' },  // https://storybook.js.org/docs/vue/essentials/controls#annotation
  //   options: ['sm', 'md', 'lg'],
  //   table: {
  //     type: {
  //       summary: 'sm | md | lg',
  //     },
  //   },
  // },
  // slot: {
  //   table: { type: { summary: 'Slots tal' } },
  //   control: { type: null },
  // },
}

/**
 *  Parameters
 */
const parameters = { docs: {} }

/*
 * Default Metadata Storie
 * Component Story Format  https://storybook.js.org/docs/vue/api/csf
 * https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
 */

/**
 * Titulo usado geralmente nos cards
 *
 */
export default {
  title: 'Components/Text/TextIcon',
  component: TextIcon,
  tags: ['autodocs'],
  // Autodocs gerada automaticamente para o component https://storybook.js.org/docs/7.0/vue/writing-docs/docs-page
  args, // https://storybook.js.org/docs/vue/writing-stories/args
  argTypes, // https://storybook.js.org/docs/vue/api/argtypes
  parameters, // https://storybook.js.org/docs/vue/writing-stories/parameters
  //
  // https://storybook.js.org/docs/vue/api/csf#custom-render-functions
  // render: (args) => ({
  //   components: {
  //     TextIcon,
  //   },
  //   setup() {
  //     return {
  //       args,
  //     }
  //   },
  //   template: html`<TextIcon v-bind="args" />`,
  // }),
}

/*
 * Stories 🐸
 * https://storybook.js.org/docs/vue/writing-stories/introduction#defining-stories
 */
export const Default = {}
