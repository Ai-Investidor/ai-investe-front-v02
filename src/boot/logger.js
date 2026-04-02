import { defineBoot } from '@quasar/app-vite/wrappers'

const isDevelopment = import.meta.env?.DEV

export const Logger = {
  info: (message) => {
    if (isDevelopment) {
      console.info(
        `%c INFO %c ${message}`,
        'background: #3498db; color: white; border-radius: 3px; font-size: .8rem; font-weight: bold;',
        'font-size: .9rem; color: #3498db;',
      )
    }
  },
  error: (message) => {
    if (isDevelopment) {
      console.error(
        `%c ERRO %c ${message}`,
        'background: #e74c3c; color: white; border-radius: 3px; font-size: .8rem; font-weight: bold;',
        'font-size: .9rem; color: #e74c3c; font-weight: bold;',
      )
    }
  },
}

export default defineBoot(({ app }) => {
  app.config.globalProperties.$logger = Logger
})
