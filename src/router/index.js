import { createRouter, createWebHashHistory } from 'vue-router'
import HeroPage from '../views/HeroPage.vue'
import PetPage from '../views/PetPage.vue'
import SkillPage from '../views/SkillPage.vue'
import Equipment from '../views/EquipmentPage.vue'
import Home from '../views/HomePage.vue'
import Summon from '../views/SummonPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroPage
  },
  {
    path: '/summon',
    name: 'Summon',
    component: Summon
  },
  {
    path: '/pets',
    name: 'Pets',
    component: PetPage
  },
  {
    path: '/skills',
    name: 'Skills',
    component: SkillPage
  },
  {
    path: '/equipment',
    name: 'Equipment',
    component: Equipment
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router