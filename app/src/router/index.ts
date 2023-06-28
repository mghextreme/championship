import { createRouter, createWebHistory } from 'vue-router'
import EventView from '../views/EventView.vue'
import ModalityView from '../views/ModalityView.vue'
import MatchView from '../views/MatchView.vue'

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
  },
  {
    path: '/match/:id',
    name: 'Match',
    component: MatchView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
