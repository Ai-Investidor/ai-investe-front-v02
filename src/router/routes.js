const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it

  {
    path: '/login',
    component: () => import('pages/Login/PageLogin.vue'),
    meta: { isPublic: true },
  },

  {
    path: '/cadastro',
    component: () => import('pages/Register/PageRegister.vue'),
    meta: { isPublic: true },
  },

  {
    path: '/esqueceu-senha',
    component: () => import('pages/ForgotPassword/PageForgotPassword.vue'),
    meta: { isPublic: true },
  },

  {
    path: '/confirmar-email',
    component: () => import('pages/ConfirmEmail/PageConfirmEmail.vue'),
    meta: { isPublic: true },
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
