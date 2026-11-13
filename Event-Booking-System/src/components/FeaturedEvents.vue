<script setup>
import { computed } from 'vue'
import { eventsData } from '../data/eventsData.js'

const props = defineProps({
	events: {
		type: Array,
		default: () => eventsData
	},
	carouselId: {
		type: String,
		default: 'featuredEventsCarousel'
	},
	itemsPerSlide: {
		type: Number,
		default: 3
	}
})

const emit = defineEmits(['buy-ticket', 'view-event'])

// Enforce max 6 featured events
const featuredEvents = computed(() => props.events.slice(0, 6))

// Chunk featured events into groups for carousel slides
const featuredSlides = computed(() => {
	const chunks = []
	for (let i = 0; i < featuredEvents.value.length; i += props.itemsPerSlide) {
		chunks.push(featuredEvents.value.slice(i, i + props.itemsPerSlide))
	}
	return chunks
})

const formatPrice = (price) => {
	return `₱${Number(price).toLocaleString('en-PH')}`
}
</script>

<template>
	<section class="featured-section py-5 px-3 px-md-4 px-lg-5">
		<!-- Section Header & Carousel Controls -->
		<div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end mb-4 gap-3">
			<div>
				<span class="text-uppercase small fw-bold featured-eyebrow">
					<i class="bi bi-fire me-1 featured-text-gold"></i>Spotlight Highlights
				</span>
				<h3 class="featured-section-title fw-bold mb-0 mt-1">Featured Experiences</h3>
			</div>

			<div v-if="featuredSlides.length > 1" class="d-flex gap-2">
				<button
					class="btn featured-btn-ctrl"
					type="button"
					:data-bs-target="`#${carouselId}`"
					data-bs-slide="prev"
					aria-label="Previous featured events"
				>
					<i class="bi bi-chevron-left"></i>
				</button>
				<button
					class="btn featured-btn-ctrl"
					type="button"
					:data-bs-target="`#${carouselId}`"
					data-bs-slide="next"
					aria-label="Next featured events"
				>
					<i class="bi bi-chevron-right"></i>
				</button>
			</div>
		</div>
		<!-- Bootstrap Carousel Slider -->
		<div
			v-if="featuredSlides.length > 0"
			:id="carouselId"
			class="carousel slide"
			data-bs-ride="false"
		>
			<div class="carousel-inner py-2">
				<div
					v-for="(slideGroup, slideIndex) in featuredSlides"
					:key="`featured-slide-${slideIndex}`"
					class="carousel-item"
					:class="{ active: slideIndex === 0 }"
				>
					<div class="row g-4">
						<div
							v-for="event in slideGroup"
							:key="event._id"
							class="col-md-6 col-lg-4"
						>
							<article class="card featured-card h-100 rounded-4 overflow-hidden d-flex flex-column">
								<!-- Card Media Header -->
								<div
									class="featured-media-wrapper position-relative overflow-hidden"
									role="button"
									tabindex="0"
									@click="emit('view-event', event)"
									@keydown.enter="emit('view-event', event)"
								>
									<img
										:src="event.eventImage"
										:alt="event.eventName"
										class="card-img-top featured-card-img"
										loading="lazy"
									/>
									<div class="featured-card-overlay"></div>
									<!-- Top-Left Date Badge -->
									<span class="featured-date-badge">
										<i class="bi bi-calendar3 featured-text-gold me-1"></i>
										{{ event.dateBadge }}
									</span>
								</div>
								<!-- Card Body -->
								<div class="card-body p-4 d-flex flex-column flex-grow-1">
									<div class="d-flex justify-content-between align-items-center mb-1">
										<span class="featured-category">{{ event.eventCategory }}</span>
										<span class="featured-genre small">{{ event.genre }}</span>
									</div>

									<h4
										class="featured-title fw-bold mb-1"
										role="button"
										@click="emit('view-event', event)"
									>
										{{ event.eventName }}
									</h4>

									<p class="featured-artist small mb-3">
										{{ event.artistName }}
									</p>

									<div class="featured-meta small mb-4">
										<div class="mb-1">
											<i class="bi bi-geo-alt-fill featured-text-gold me-1"></i>
											{{ event.venueName }}, {{ event.location }}
										</div>
										<div>
											<i class="bi bi-clock featured-text-gold me-1"></i>
											{{ event.dayOfWeek }} &bull; {{ event.timeFormatted }}
										</div>
									</div>
									<!-- Card Footer: Pricing & Actions -->
									<div class="mt-auto pt-3 featured-footer-divider d-flex align-items-center justify-content-between gap-2">
										<div>
											<small class="featured-starting-label d-block text-uppercase">Starting at</small>
											<span class="featured-price-val fw-bold">{{ formatPrice(event.startingPrice) }}</span>
										</div>

										<div class="d-flex align-items-center gap-2">
											<button
												type="button"
												class="btn featured-btn-details"
												title="View Details"
												aria-label="View Details"
												@click="emit('view-event', event)"
											>
												<i class="bi bi-compass"></i>
											</button>

											<button
												type="button"
												class="btn featured-btn-buy px-3 py-2"
												:disabled="event.remainingTickets === 0"
												@click="emit('buy-ticket', event)"
											>
												<i
													:class="
														event.remainingTickets === 0
															? 'bi bi-bell me-1'
															: 'bi bi-ticket-perforated-fill me-1'
													"
												></i>
												{{ event.remainingTickets === 0 ? 'Sold Out' : 'Get Tickets' }}
											</button>
										</div>
									</div>
								</div>
							</article>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
