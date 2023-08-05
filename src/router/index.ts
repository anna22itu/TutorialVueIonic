import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Tab2Page from '../views/Tab2.vue';
import Tab3Page from '../views/Tab3.vue';
import TabsPage from '../views/TabsPage.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: TabsPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage 
  },
  {
    path: '/tab2',
    name: 'Tab2',
    component: Tab2Page
  },
  {
    path: '/tab3',
    name: 'Tab3',
    component: Tab3Page
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
