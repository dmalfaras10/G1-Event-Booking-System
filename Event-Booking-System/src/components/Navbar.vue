<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { eventsData } from '../data/eventsData.js'
import { useGlobalStore} from '../stores/global.js';

const { user } = useGlobalStore();
const router = useRouter()

const props = defineProps({
	events: {
		type: Array,
		default: () => eventsData
	}
})

const searchQuery = ref('')
const isSearchOpen = ref(false)

const filteredEvents = computed(() => {
	if (!searchQuery.value.trim()) return []
	const query = searchQuery.value.toLowerCase().trim()
	return props.events.filter(event => 
		event.eventName.toLowerCase().includes(query) ||
		event.eventCategory.toLowerCase().includes(query) ||
		event.artistName.toLowerCase().includes(query) ||
		event.venueName.toLowerCase().includes(query) ||
		event.location.toLowerCase().includes(query)
	)
})

const handleSelectEvent = (event) => {
	searchQuery.value = ''
	isSearchOpen.value = false
	router.push({ name: 'EventDetails', params: { id: event._id } })
}
</script>

<template>
	<nav class="navbar navbar-expand-lg navbar-dark navbar-main sticky-top">
		<div class="container">
			<!-- Brand Logo & Search Bar Group on Left -->
			<div class="d-flex align-items-center gap-3 position-relative">
				<router-link class="navbar-brand d-flex align-items-center gap-2 m-0" to="/">
					<span class="navbar-brand-emblem">
						<i class="bi bi-vinyl-fill"></i>
					</span>
					<span class="navbar-brand-text">G<span class="navbar-brand-hyphen">-</span>ONE</span>
				</router-link>
				<!-- Search Bar -->
				<div class="navbar-search-form d-none d-md-block">
					<div class="navbar-search-wrapper" :class="{ 'active': isSearchOpen && searchQuery.trim() }">
						<i class="bi bi-search navbar-search-icon"></i>
						<input
							type="search"
							v-model="searchQuery"
							@focus="isSearchOpen = true"
							class="form-control navbar-search-input"
							placeholder="Search events, artists..."
							aria-label="Search events"
						/>
						<span class="navbar-search-shortcut">⌘K</span>
					</div>
					<!-- Search Results Live Dropdown -->
					<div v-if="isSearchOpen && searchQuery.trim()" class="navbar-search-dropdown shadow-lg rounded-4 overflow-hidden">
						<div v-if="filteredEvents.length > 0" class="list-group list-group-flush">
							<button
								v-for="event in filteredEvents"
								:key="event._id"
								type="button"
								class="list-group-item list-group-item-action navbar-search-result-item d-flex align-items-center gap-3 p-3"
								@click="handleSelectEvent(event)"
							>
								<img :src="event.eventImage" :alt="event.eventName" class="navbar-result-thumb rounded-3 object-fit-cover" />
								<div class="flex-grow-1 text-start overflow-hidden">
									<h6 class="mb-0 text-truncate navbar-result-title fw-bold">{{ event.eventName }}</h6>
								</div>
							</button>
						</div>
						<div v-else class="p-3 text-center text-muted small">
							<i class="bi bi-search mb-1 d-block fs-4 opacity-50"></i>
							No matching events found for "{{ searchQuery }}"
						</div>
					</div>
				</div>
			</div>
			<!-- Mobile Toggler -->
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#mainNav"
				aria-controls="mainNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<!-- Navigation Links & Actions -->
			<div class="collapse navbar-collapse" id="mainNav">
				<!-- Mobile Search Bar -->
				<div class="navbar-search-form d-md-none my-3 position-relative">
					<div class="navbar-search-wrapper">
						<i class="bi bi-search navbar-search-icon"></i>
						<input
							type="search"
							v-model="searchQuery"
							@focus="isSearchOpen = true"
							class="form-control navbar-search-input"
							placeholder="Search events, artists..."
							aria-label="Search events"
						/>
					</div>
					<div v-if="isSearchOpen && searchQuery.trim()" class="navbar-search-dropdown shadow-lg rounded-4 overflow-hidden mt-1">
						<div v-if="filteredEvents.length > 0" class="list-group list-group-flush">
							<button
								v-for="event in filteredEvents"
								:key="event._id"
								type="button"
								class="list-group-item list-group-item-action navbar-search-result-item d-flex align-items-center gap-3 p-3"
								@click="handleSelectEvent(event)"
							>
								<img :src="event.eventImage" :alt="event.eventName" class="navbar-result-thumb rounded-3 object-fit-cover" />
								<div class="flex-grow-1 text-start overflow-hidden">
									<h6 class="mb-0 text-truncate navbar-result-title fw-bold">{{ event.eventName }}</h6>
								</div>
							</button>
						</div>
						<div v-else class="p-3 text-center text-muted small">
							No matching events found for "{{ searchQuery }}"
						</div>
					</div>
				</div>
				<!-- Main Navigation  -->
				<ul class="navbar-nav mx-auto mb-3 mb-lg-0 gap-1">
					<li class="navbar-nav-item nav-item">
						<router-link class="navbar-nav-link nav-link" to="/">
							<i class="bi bi-house-door me-1"></i>Home
						</router-link>
					</li>
					<li class="navbar-nav-item nav-item">
						<router-link class="navbar-nav-link nav-link" to="/events">
							<i class="bi bi-calendar-event me-1"></i>Events
						</router-link>
					</li>
					<li class="navbar-nav-item nav-item">
						<a class="navbar-nav-link nav-link" href="#">
							<i class="bi bi-gem navbar-text-gold me-1"></i>VIP
						</a>
					</li>
					<li class="navbar-nav-item nav-item">
						<a class="navbar-nav-link nav-link" href="#">
							<i class="bi bi-info-circle me-1"></i>About
						</a>
					</li>
					<li class="navbar-nav-item nav-item">
						<a class="navbar-nav-link nav-link" href="#">
							<i class="bi bi-envelope me-1"></i>Contact
						</a>
					</li>
				</ul>
				<!-- Auth Buttons -->
				<div class="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2">
					<template v-if="!user.email">
						<router-link to="/register" class="btn navbar-btn-register">
							<i class="bi bi-person-plus me-1"></i>Register
						</router-link>
						<router-link to="/login" class="btn navbar-btn-login">
							<i class="bi bi-box-arrow-in-right me-1"></i>Login
						</router-link>
					</template>

					<!-- Logged-in User Dropdown -->
					<div class="dropdown" v-else>
						<button
							class="btn navbar-btn-login dropdown-toggle d-flex align-items-center justify-content-center gap-2 w-100"
							type="button"
							id="userMenuDropdown"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<i class="bi bi-person-circle"></i>
							<span>{{ user.firstName || user.email }}</span>
						</button>
						<ul class="dropdown-menu dropdown-menu-end navbar-user-dropdown shadow-lg rounded-4 mt-2" aria-labelledby="userMenuDropdown">
							<li>
								<router-link class="dropdown-item d-flex align-items-center gap-2" to="/profile">
									<i class="bi bi-person"></i>My Profile
								</router-link>
							</li>
							<li>
								<router-link class="dropdown-item d-flex align-items-center gap-2" to="/tickets">
									<i class="bi bi-ticket-perforated"></i>My Ticket
								</router-link>
							</li>
							<li><hr class="dropdown-divider" /></li>
							<li>
								<router-link class="dropdown-item dropdown-item-logout d-flex align-items-center gap-2" to="/logout">
									<i class="bi bi-box-arrow-right"></i>Logout
								</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<style scoped>
/* Navbar Start */

.navbar-main {
    background-color: rgba(20, 20, 22, 0.85);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border-subtle);
    padding: 0.9rem 0;
    transition: background-color 0.3s ease;
}

.navbar-main .navbar-brand {
    color: var(--text-main);
    font-weight: 800;
    font-size: 1.45rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition: transform 0.2s ease;
}

.navbar-main .navbar-brand:hover {
    color: var(--text-main);
    transform: translateY(-1px);
}

.navbar-brand-emblem {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: linear-gradient(135deg, rgba(243, 198, 79, 0.2), rgba(243, 198, 79, 0.05));
    border: 1px solid rgba(243, 198, 79, 0.35);
    color: var(--gold-accent);
    font-size: 1.1rem;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.navbar-main .navbar-brand:hover .navbar-brand-emblem {
    box-shadow: 0 0 15px rgba(243, 198, 79, 0.35);
    transform: rotate(15deg);
}

.navbar-brand-hyphen {
    color: var(--gold-accent);
}

.navbar-main .navbar-toggler {
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    padding: 0.45rem 0.65rem;
}

.navbar-main .navbar-toggler:focus {
    box-shadow: 0 0 0 2px rgba(243, 198, 79, 0.25);
    border-color: var(--gold-accent);
}

.navbar-main .navbar-nav-link {
    position: relative;
    color: var(--text-muted);
    font-size: 0.925rem;
    font-weight: 500;
    padding: 0.55rem 0.95rem !important;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.navbar-main .navbar-nav-link:hover,
.navbar-main .navbar-nav-link:focus {
    color: var(--gold-accent);
    background-color: rgba(243, 198, 79, 0.08);
    font-weight: 600;
}

.navbar-text-gold {
    color: var(--gold-accent);
}

.navbar-search-form {
    width: 230px;
    position: relative;
}

@media (min-width: 1200px) {
    .navbar-search-form {
        width: 280px;
    }
}

.navbar-search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--bg-primary);
    border: 1px solid var(--border-subtle);
    border-radius: 50rem;
    padding: 0.25rem 0.85rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.navbar-search-icon {
    color: var(--text-muted);
    font-size: 0.8rem;
    margin-right: 0.5rem;
    transition: color 0.2s ease;
}

.navbar-search-input,
.navbar-search-input:focus,
.navbar-search-input:active {
    background-color: transparent !important;
    border: none !important;
    color: var(--text-main) !important;
    font-size: 0.825rem;
    padding: 0.2rem 0;
    box-shadow: none !important;
    outline: none !important;
    caret-color: var(--gold-accent);
}

.navbar-search-input:-webkit-autofill,
.navbar-search-input:-webkit-autofill:hover,
.navbar-search-input:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--text-main) !important;
    -webkit-box-shadow: 0 0 0px 1000px var(--bg-primary) inset !important;
    transition: background-color 5000s ease-in-out 0s;
}

.navbar-search-input::-webkit-search-cancel-button {
    filter: invert(1) opacity(0.6);
    cursor: pointer;
}

.navbar-search-input::placeholder {
    color: var(--text-muted);
    opacity: 0.75;
}

.navbar-search-shortcut {
    font-size: 0.65rem;
    font-weight: 600;
    color: var(--text-muted);
    background-color: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--border-subtle);
    padding: 0.1rem 0.35rem;
    border-radius: 4px;
    margin-left: 0.4rem;
    letter-spacing: 0.5px;
    transition: border-color 0.2s ease, color 0.2s ease;
}

.navbar-search-wrapper:hover,
.navbar-search-wrapper:focus-within,
.navbar-search-wrapper.active {
    background-color: var(--bg-surface) !important;
    border-color: var(--gold-accent) !important;
    box-shadow: 0 0 14px rgba(243, 198, 79, 0.2);
}

.navbar-search-wrapper:hover .navbar-search-icon,
.navbar-search-wrapper:focus-within .navbar-search-icon {
    color: var(--gold-accent);
}

.navbar-search-wrapper:focus-within .navbar-search-shortcut {
    border-color: rgba(243, 198, 79, 0.35);
    color: var(--gold-accent);
}

.navbar-search-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    background-color: var(--bg-surface) !important;
    border: 1px solid var(--border-subtle);
    z-index: 1050;
    max-height: 360px;
    overflow-y: auto;
}

.navbar-search-result-item {
    background-color: transparent !important;
    color: var(--text-main) !important;
    border-color: var(--border-subtle) !important;
    border-left: 2px solid transparent !important;
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.navbar-search-result-item:hover,
.navbar-search-result-item:focus {
    background-color: rgba(243, 198, 79, 0.12) !important;
    border-left-color: var(--gold-accent) !important;
    color: var(--gold-accent) !important;
}

.navbar-search-result-item:hover .navbar-result-title,
.navbar-search-result-item:focus .navbar-result-title {
    color: var(--gold-accent);
}

.navbar-result-thumb {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border: 1px solid var(--border-subtle);
}

.navbar-result-title {
    font-size: 0.85rem;
    color: var(--text-main);
    transition: color 0.2s ease;
}

.navbar-btn-register {
    color: var(--text-main);
    background-color: var(--bg-surface-hover);
    border: 1px solid var(--border-subtle);
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1.1rem;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.navbar-btn-register:hover {
    background-color: rgba(243, 198, 79, 0.08);
    border-color: var(--gold-muted);
    color: var(--gold-accent);
}

.navbar-btn-login {
    background-color: var(--gold-accent);
    color: var(--bg-primary);
    border: 1px solid var(--gold-accent);
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.5rem 1.25rem;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.navbar-btn-login:hover {
    background-color: var(--gold-accent-hover);
    border-color: var(--gold-accent-hover);
    color: var(--bg-primary);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(243, 198, 79, 0.35);
}

.navbar-user-dropdown {
    background-color: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    padding: 0.5rem;
    min-width: 200px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.65);
}

.navbar-user-dropdown .dropdown-item {
    color: var(--text-main);
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.6rem 0.85rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.navbar-user-dropdown .dropdown-item i {
    color: var(--gold-accent);
    font-size: 1rem;
    transition: transform 0.2s ease;
}

.navbar-user-dropdown .dropdown-item:hover,
.navbar-user-dropdown .dropdown-item:focus {
    background-color: var(--bg-surface-hover);
    color: var(--gold-accent);
}

.navbar-user-dropdown .dropdown-item:hover i {
    transform: translateX(2px);
}

.navbar-user-dropdown .dropdown-item.router-link-active {
    background-color: rgba(243, 198, 79, 0.12);
    color: var(--gold-accent);
}

.navbar-user-dropdown .dropdown-divider {
    border-top: 1px solid var(--border-subtle);
    margin: 0.4rem 0;
}

.navbar-user-dropdown .dropdown-item-logout {
    color: #f87171;
}

.navbar-user-dropdown .dropdown-item-logout i {
    color: #f87171;
}

.navbar-user-dropdown .dropdown-item-logout:hover,
.navbar-user-dropdown .dropdown-item-logout:focus {
    background-color: rgba(158, 28, 78, 0.2);
    color: #fca5a5;
}

.navbar-user-dropdown .dropdown-item-logout:hover i {
    color: #fca5a5;
}

/* Navbar End */
</style>