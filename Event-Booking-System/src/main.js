import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './assets/main.css'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import EventListingsPage from './pages/EventListingsPage.vue';
import EventDetailsPage from './pages/EventDetailsPage.vue'
import ErrorPage from './pages/ErrorPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/events',
    name: 'EventListings',
    component: EventListingsPage
  },
  {
    path: '/events/:id',
    name: 'EventDetails',
    component: EventDetailsPage,
    props: true
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: ErrorPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')