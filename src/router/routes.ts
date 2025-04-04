export const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard/DashboardPage.vue')
  },
  // Status
  {
    path: '/status',
    name: 'status-list',
    component: () => import(/* webpackChunkName: "status" */ '@/pages/status/StatusListPage.vue')
  },
  {
    path: '/status/insert',
    name: 'status-insert',
    component: () => import(/* webpackChunkName: "status" */ '@/pages/status/StatusFormPage.vue')
  },
  {
    path: '/status/update/:id',
    name: 'status-update',
    component: () => import(/* webpackChunkName: "status" */ '@/pages/status/StatusFormPage.vue')
  },
  // Specialty
  {
    path: '/specialty',
    name: 'specialty-list',
    component: () =>
      import(/* webpackChunkName: "specialty" */ '@/pages/specialty/SpecialtyListPage.vue')
  },
  {
    path: '/specialty/insert',
    name: 'specialty-insert',
    component: () =>
      import(/* webpackChunkName: "specialty" */ '@/pages/specialty/SpecialtyFormPage.vue')
  },
  {
    path: '/specialty/update/:id',
    name: 'specialty-update',
    component: () =>
      import(/* webpackChunkName: "specialty" */ '@/pages/specialty/SpecialtyFormPage.vue')
  },
  // Paciente
  {
    path: '/paciente',
    name: 'paciente-list',
    component: () =>
      import(/* webpackChunkName: "paciente" */ '@/pages/paciente/PacienteListPage.vue')
  },
  {
    path: '/paciente/insert',
    name: 'paciente-insert',
    component: () =>
      import(/* webpackChunkName: "paciente" */ '@/pages/paciente/PacienteFormPage.vue')
  },
  {
    path: '/paciente/update/:id',
    name: 'paciente-update',
    component: () =>
      import(/* webpackChunkName: "paciente" */ '@/pages/paciente/PacienteFormPage.vue')
  }
]
