import { createRouter, createWebHistory } from 'vue-router'
import EventView from '../views/EventView.vue'
import ModalityView from '../views/ModalityView.vue'

const routes = [
  {
    path: '/',
    name: 'Event',
    component: EventView
  },
  {
    path: '/modality/:id',
    name: 'Modality',
    component: ModalityView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
