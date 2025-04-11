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
  },
  {
    path: '/doctor',
    name: 'doctor-list',
    component: () => import(/* webpackChunkName: "doctor" */ '@/pages/doutor/DoutorListPage.vue')
  },
  {
    path: '/doctor/insert',
    name: 'doctor-insert',
    component: () => import(/* webpackChunkName: "doctor" */ '@/pages/doutor/DoutorFormPage.vue')
  },
  {
    path: '/doctor/update/:id',
    name: 'doctor-update',
    component: () => import(/* webpackChunkName: "doctor" */ '@/pages/doutor/DoutorFormPage.vue')
  },
  {
    path: '/appointment',
    name: 'appointment-list',
    component: () =>
      import(/* webpackChunkName: "Appointment" */ '@/pages/agenda/AgendaListPage.vue')
  },
  {
    path: '/appointment/insert',
    name: 'appointment-insert',
    component: () =>
      import(/* webpackChunkName: "Appointment" */ '@/pages/agenda/AgendaFormPage.vue')
  },
  {
    path: '/appointment/update/:id',
    name: 'appointment-update',
    component: () =>
      import(/* webpackChunkName: "Appointment" */ '@/pages/agenda/AgendaFormPage.vue')
  }
]
