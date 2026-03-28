import { defineBoot } from '@quasar/app-vite/wrappers'
import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top-right',
  progress: true,
  timeout: 5000,
})

export const NotifyInfo = (message, options = {}) => {
  Notify.create({
    message,
    color: 'blue-9',
    textColor: 'white',
    icon: 'info',
    iconColor: 'white',
    ...options,
  })
}

export const NotifySuccess = (message, options = {}) => {
  Notify.create({
    message,
    color: 'positive',
    textColor: 'white',
    icon: 'check',
    iconColor: 'white',
    ...options,
  })
}

export const NotifyWarning = (message, options = {}) => {
  Notify.create({
    message,
    color: 'warning',
    textColor: 'white',
    icon: 'warning',
    iconColor: 'white',
    ...options,
  })
}

export const NotifyError = (message, options = {}) => {
  Notify.create({
    message,
    color: 'negative',
    textColor: 'white',
    icon: 'error',
    iconColor: 'white',
    ...options,
  })
}

export default defineBoot(({ app }) => {
  app.config.globalProperties.$notify = {
    info: NotifyInfo,
    success: NotifySuccess,
    warning: NotifyWarning,
    error: NotifyError,
  }
})
