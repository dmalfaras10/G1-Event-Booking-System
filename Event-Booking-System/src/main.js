import { createApp, h } from 'vue'
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
import EventDetailsPage1 from './pages/EventDetailsPage1.vue'
import EventDetailsPage2 from './pages/EventDetailsPage2.vue'
import EventDetailsPage3 from './pages/EventDetailsPage3.vue'
import EventDetailsPage4 from './pages/EventDetailsPage4.vue'
import EventDetailsPage5 from './pages/EventDetailsPage5.vue'
import EventDetailsPage6 from './pages/EventDetailsPage6.vue'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import LogoutPage from './pages/LogoutPage.vue'
import ForgotPassword from './pages/ForgotPassword.vue'
import ErrorPage from './pages/ErrorPage.vue'
import AboutContactPage from './pages/AboutContactPage.vue';
import UserProfile from './pages/UserProfile.vue'
// Admin Side
import AdminEventListing from './pages/AdminEventListing.vue';
import AdminUserBookings from './pages/AdminUserBookings.vue';
import AdminSubscriptionsPage from './pages/AdminSubscriptionsPage.vue';

// Each event page is referenced by the id set in its own script (evt-001 … evt-006)
const eventDetailsPages = {
  'evt-001': EventDetailsPage1,
  'evt-002': EventDetailsPage2,
  'evt-003': EventDetailsPage3,
  'evt-004': EventDetailsPage4,
  'evt-005': EventDetailsPage5,
  'evt-006': EventDetailsPage6,
}

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/profile', name: 'Profile', component: UserProfile, meta: { fullWidth: true }},
  { path: '/forgot-password', name: 'Forgot-Password', component: ForgotPassword },
  { path: '/logout', name: 'logout', component: LogoutPage},
  { path: '/event/event-details1', name: 'event-details', component: EventDetailsPage },
  { path: '/events', name: 'EventListings',  component: EventListingsPage},
  { path: '/events/:id', name: 'EventDetails', props: true, component: {
    props: ['id'],
    setup: (props) => () => h(eventDetailsPages[props.id] || EventDetailsPage)
  }},
  { path: '/about', name: 'About', component: AboutContactPage},
  { path: '/contact', name: 'Contact', component: AboutContactPage},
  { path: '/AdminEventList', name: 'AdminEventListing', component: AdminEventListing},
  { path: '/AdminUserBookings', name: 'AdminUserBookings', component: AdminUserBookings},
  { path: '/AdminSubscriptions', name: 'AdminSubscriptions', component: AdminSubscriptionsPage},
  { path: '/:pathMatch(.*)*', name: 'not-found', component: ErrorPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name === 'About' || to.name === 'Contact') {
      return false
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'instant' }
  },
})

createApp(App).use(router).use(createPinia()).mount('#app')