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
		<div class="container d-flex justify-content-between align-items-center">
			
			<!-- Mobile/Tablet Layout Header Row: [Toggler] [Centered Brand] [Right User/Auth] -->
			<div class="d-flex d-lg-none w-100 align-items-center justify-content-between position-relative">
				<!-- 1. Hamburger Toggler on Left -->
				<button
					class="navbar-toggler border-0 p-1"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#mainNav"
					aria-controls="mainNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>

				<!-- 2. Brand Logo at Center -->
				<router-link 
					class="navbar-brand d-flex align-items-center gap-2 m-0 position-absolute start-50 translate-middle-x" 
					:to="user?.isAdmin ? '' : '/'"
					:class="{ 'disabled-brand': user?.isAdmin }"
					@click.prevent="user?.isAdmin && $event.preventDefault()"
				>
					<span class="navbar-brand-emblem">
						<i class="bi bi-vinyl-fill"></i>
					</span>
					<span class="navbar-brand-text" :class="{ 'admin-brand-text': user?.isAdmin }">
						<template v-if="user?.isAdmin">
							G-ONE <span class="navbar-brand-hyphen">Admin</span>
						</template>
						<template v-else>
							G<span class="navbar-brand-hyphen">-</span>ONE
						</template>
					</span>
				</router-link>

				<!-- 3. User Dropdown / Auth on Right (Only shown when logged in on mobile/tablet) -->
				<div class="d-flex align-items-center gap-2" v-if="user.email">
					<div class="dropdown">
						<button
							class="btn navbar-user-icon-btn d-flex align-items-center justify-content-center p-0"
							type="button"
							id="mobileUserMenuDropdown"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							aria-label="User menu"
						>
							<div class="user-avatar-inner d-flex align-items-center justify-content-center">
								<i class="bi bi-person"></i>
							</div>
						</button>
						<ul class="dropdown-menu dropdown-menu-end navbar-user-dropdown shadow-lg rounded-4 mt-2" aria-labelledby="mobileUserMenuDropdown">
							<li>
								<router-link class="dropdown-item d-flex align-items-center gap-2" to="/profile">
									<i class="bi bi-person"></i>My Profile
								</router-link>
							</li>
							<li>
								<router-link class="dropdown-item d-flex align-items-center gap-2" to="/MyTickets">
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

			<!-- Desktop Layout (lg and up): Normal left-to-right flow -->
			<div class="d-none d-lg-flex align-items-center gap-3 position-relative">
				<router-link 
					class="navbar-brand d-flex align-items-center gap-2 m-0" 
					:to="user?.isAdmin ? '' : '/'"
					:class="{ 'disabled-brand': user?.isAdmin }"
					@click.prevent="user?.isAdmin && $event.preventDefault()"
				>
					<span class="navbar-brand-emblem">
						<i class="bi bi-vinyl-fill"></i>
					</span>
					<span class="navbar-brand-text" :class="{ 'admin-brand-text': user?.isAdmin }">
						<template v-if="user?.isAdmin">
							G-ONE <span class="navbar-brand-hyphen">Admin</span> Panel
						</template>
						<template v-else>
							G<span class="navbar-brand-hyphen">-</span>ONE
						</template>
					</span>
				</router-link>
				<!-- Desktop Search Bar -->
				<div class="navbar-search-form" v-if="!user.isAdmin">
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
					<!-- Desktop Search Results Live Dropdown -->
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

			<!-- Navigation Links & Desktop Auth Actions -->
			<div class="collapse navbar-collapse" id="mainNav">
				<!-- Mobile & Tablet Search Bar (Inside Collapsible Menu) -->
				<div class="navbar-search-form d-lg-none my-3 position-relative w-100" v-if="!user.isAdmin">
					<div class="navbar-search-wrapper w-100" :class="{ 'active': isSearchOpen && searchQuery.trim() }">
						<i class="bi bi-search navbar-search-icon"></i>
						<input
							type="search"
							v-model="searchQuery"
							@focus="isSearchOpen = true"
							class="form-control navbar-search-input w-100"
							placeholder="Search events, artists, venues..."
							aria-label="Search events"
						/>
					</div>
					<!-- Mobile/Tablet Search Results Dropdown -->
					<div v-if="isSearchOpen && searchQuery.trim()" class="navbar-mobile-search-dropdown shadow-lg rounded-4 overflow-hidden mt-2">
						<div class="mobile-dropdown-header px-3 py-2 small text-muted border-bottom border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
							<span>Search Results</span>
							<span class="badge bg-dark text-gold border border-warning border-opacity-25">{{ filteredEvents.length }} found</span>
						</div>
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
									<p class="mb-0 small text-muted text-truncate">{{ event.venueName }} • {{ event.location }}</p>
								</div>
								<i class="bi bi-chevron-right text-muted opacity-50 small"></i>
							</button>
						</div>
						<div v-else class="p-4 text-center text-muted small">
							<i class="bi bi-search mb-2 d-block fs-3 opacity-50 text-gold"></i>
							No matching events found for "<span class="text-white">{{ searchQuery }}</span>"
						</div>
					</div>
				</div>

				<!-- Main Navigation Links -->
				<ul class="navbar-nav mx-auto mb-3 mb-lg-0 gap-1">
					<li class="navbar-nav-item nav-item">
						<router-link class="navbar-nav-link nav-link" to="/" v-if="!user.isAdmin">
							<i class="bi bi-house-door me-1"></i>Home
						</router-link>
					</li>
					<template v-if="user.isAdmin">
						<li class="navbar-nav-item nav-item">
							<router-link class="navbar-nav-link nav-link" to="/adminEventList">
								<i class="bi bi-shield-check me-1"></i>Admin Events
							</router-link>
						</li>
						<li class="navbar-nav-item nav-item">
							<router-link class="navbar-nav-link nav-link" to="/adminUserBookings">
								<i class="bi bi-receipt me-1"></i>User Bookings
							</router-link>
						</li>
						<li class="navbar-nav-item nav-item">
							<router-link class="navbar-nav-link nav-link" to="/adminSubscriptions">
								<i class="bi bi-gem me-1"></i>Subscriptions
							</router-link>
						</li>
					</template>
					<li v-else class="navbar-nav-item nav-item">
						<router-link class="navbar-nav-link nav-link" to="/events" v-if="!user.isAdmin">
							<i class="bi bi-calendar-event me-1"></i>Events
						</router-link>
					</li>
					<li class="navbar-nav-item nav-item">
						<router-link class="navbar-nav-link nav-link" to="/vip" v-if="!user.isAdmin">
							<i class="bi bi-gem navbar-text-gold me-1"></i>VIP
						</router-link>
					</li>
					<li class="navbar-nav-item nav-item">
						<router-link class="navbar-nav-link nav-link" to="/about" v-if="!user.isAdmin">
							<i class="bi bi-info-circle me-1"></i>About
						</router-link>
					</li>
					<li class="navbar-nav-item nav-item">
						<router-link class="navbar-nav-link nav-link" to="/contact" v-if="!user.isAdmin">
							<i class="bi bi-envelope me-1"></i>Contact
						</router-link>
					</li>
				</ul>

				<!-- Desktop Auth Buttons & User Dropdown -->
				<div class="d-none d-lg-flex flex-row align-items-center gap-2">
					<template v-if="!user.email">
						<router-link to="/register" class="btn navbar-btn-register">
							<i class="bi bi-person-plus me-1"></i>Register
						</router-link>
						<router-link to="/login" class="btn navbar-btn-login">
							<i class="bi bi-box-arrow-in-right me-1"></i>Login
						</router-link>
					</template>

					<div class="dropdown" v-else>
						<button
							class="btn navbar-user-icon-btn d-flex align-items-center justify-content-center p-0"
							type="button"
							id="desktopUserMenuDropdown"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							aria-label="User menu"
						>
							<div class="user-avatar-inner d-flex align-items-center justify-content-center">
								<i class="bi bi-person"></i>
							</div>
						</button>
						<ul class="dropdown-menu dropdown-menu-end navbar-user-dropdown shadow-lg rounded-4 mt-2" aria-labelledby="desktopUserMenuDropdown">
							<li>
								<router-link class="dropdown-item d-flex align-items-center gap-2" to="/profile">
									<i class="bi bi-person"></i>My Profile
								</router-link>
							</li>
							<li>
								<router-link class="dropdown-item d-flex align-items-center gap-2" to="/MyTickets">
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

				<!-- Mobile Bottom Auth Links (Shown inside expanded menu if logged out) -->
				<div class="d-flex d-lg-none flex-column gap-2 mt-3 pt-3 border-top border-secondary border-opacity-25" v-if="!user.email">
					<router-link to="/register" class="btn navbar-btn-register w-100 text-center">
						<i class="bi bi-person-plus me-1"></i>Register
					</router-link>
					<router-link to="/login" class="btn navbar-btn-login w-100 text-center">
						<i class="bi bi-box-arrow-in-right me-1"></i>Login
					</router-link>
				</div>
			</div>
		</div>
	</nav>
</template>