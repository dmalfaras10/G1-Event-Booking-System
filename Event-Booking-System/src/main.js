import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './assets/main.css'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import EventListingsPage from './pages/EventListingsPage.vue';
import EventDetailsPage from './pages/EventDetailsPage.vue'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import LogoutPage from './pages/LogoutPage.vue'
import ForgotPassword from './pages/ForgotPassword.vue'
import ErrorPage from './pages/ErrorPage.vue'

const routes = [

  { path: '/', name: 'home', component: HomePage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/forgot-password', name: 'Forgot-Password', component: ForgotPassword },
  { path: '/logout', name: 'logout', component: LogoutPage},
  { path: '/event/event-details1', name: 'event-details', component: EventDetailsPage },
  { path: '/events', name: 'EventListings',  component: EventListingsPage},
  { path: '/events/:id', name: 'EventDetails', component: EventDetailsPage, props: true},
  { path: '/:pathMatch(.*)*', name: 'not-found', component: ErrorPage }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).use(createPinia()).mount('#app') 
