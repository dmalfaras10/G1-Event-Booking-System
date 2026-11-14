<script setup>
import { ref, computed } from 'vue'
import { eventsData } from '../data/eventsData.js'

const props = defineProps({
	events: {
		type: Array,
		default: () => eventsData
	}
})

const emit = defineEmits(['buy-ticket', 'view-event'])

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
	emit('view-event', event)
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

				<ul class="navbar-nav mx-auto mb-3 mb-lg-0 gap-1">
					<li class="navbar-nav-item nav-item">
						<router-link class="navbar-nav-link nav-link active" to="/">
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
					<a href="#" class="btn navbar-btn-register">
						<i class="bi bi-person-plus me-1"></i>Register
					</a>
					<a href="#" class="btn navbar-btn-login">
						<i class="bi bi-box-arrow-in-right me-1"></i>Login
					</a>
				</div>
			</div>
		</div>
	</nav>
</template>