<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { eventsData } from '../data/eventsData.js'

const router = useRouter()

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

const featuredEvents = computed(() => props.events.slice(0, 6))

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

const goToEventDetails = (eventId) => {
  router.push({ name: 'EventDetails', params: { id: eventId } })
}
</script>

<<template>
	<section class="featured-section py-5 px-3 px-md-4 px-lg-5" data-bs-theme="dark">
		<!-- Section Header & Carousel Controls -->
		<div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end mb-4 gap-3 animate-fade-in">
			<div>
				<span class="text-uppercase small fw-bold featured-eyebrow">
					<i class="bi bi-fire me-1"></i>Spotlight Highlights
				</span>
				<h3 class="featured-title fw-bold mb-0 mt-1">Featured Experiences</h3>
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
			class="carousel slide carousel-fade"
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
							v-for="(event, eventIndex) in slideGroup"
							:key="event._id"
							class="col-md-6 col-lg-4 animate-slide-up"
							:style="{ animationDelay: `${eventIndex * 0.1}s` }"
						>
							<article class="card featured-card h-100 rounded-4 overflow-hidden d-flex flex-column shadow-sm">
								<!-- Card Media Header -->
								<div
									class="position-relative overflow-hidden ratio ratio-16x9 featured-media-wrapper"
									role="button"
									tabindex="0"
									@click="goToEventDetails(event._id)"
								>
									<img
										:src="event.eventImage"
										:alt="event.eventName"
										class="card-img-top object-fit-cover featured-img"
										loading="lazy"
									/>
									<!-- Top-Left Date Badge -->
									<div class="p-3 d-flex align-items-start justify-content-start z-1">
										<span class="badge featured-date-badge py-2 px-3 rounded-pill">
											<i class="bi bi-calendar3 me-1"></i>
											{{ event.dateBadge }}
										</span>
									</div>
								</div>
								<!-- Card Body -->
								<div class="card-body p-4 d-flex flex-column flex-grow-1">
									<div class="d-flex justify-content-between align-items-center mb-2">
										<span class="badge featured-category-badge text-uppercase fw-semibold">
											{{ event.eventCategory }}
										</span>
										<span class="featured-genre small">{{ event.genre }}</span>
									</div>

									<h4
										class="h5 fw-bold mb-1 featured-card-title"
										role="button"
										@click="goToEventDetails(event._id)"
									>
										{{ event.eventName }}
									</h4>

									<p class="featured-artist small mb-3">
										{{ event.artistName }}
									</p>

									<div class="featured-meta small mb-4">
										<div class="mb-1">
											<i class="bi bi-geo-alt-fill me-1"></i>
											{{ event.venueName }}, {{ event.location }}
										</div>
										<div>
											<i class="bi bi-clock me-1"></i>
											{{ event.dayOfWeek }} &bull; {{ event.timeFormatted }}
										</div>
									</div>
									<!-- Card Footer: Pricing & Actions -->
									<div class="mt-auto pt-3 featured-divider d-flex align-items-center justify-content-between gap-2">
										<div>
											<small class="featured-starting-label d-block text-uppercase">Starting at</small>
											<span class="fs-5 fw-bold featured-price">{{ formatPrice(event.startingPrice) }}</span>
										</div>

										<div class="d-flex align-items-center gap-2">
											<button
												type="button"
												class="btn featured-btn-outline"
												title="View Details"
												aria-label="View Details"
												@click="goToEventDetails(event._id)"
											>
												<i class="bi bi-compass"></i>
											</button>

											<button
												type="button"
												class="btn featured-btn-buy fw-semibold px-3 py-2"
												:disabled="event.remainingTickets === 0"
												@click="goToEventDetails(event._id)"
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

<style scoped>
.featured-eyebrow,
.featured-meta i,
.featured-date-badge i {
	color: var(--gold-accent);
}

.featured-title {
	color: var(--text-main);
}

.featured-btn-ctrl {
	background-color: var(--bg-surface);
	border: 1px solid var(--border-subtle);
	color: var(--text-main);
	width: 40px;
	height: 40px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-btn-ctrl:hover {
	background-color: var(--bg-surface-hover);
	border-color: var(--gold-muted);
	color: var(--gold-accent);
	transform: translateY(-2px);
}

.featured-card {
	background-color: var(--bg-surface);
	border: 1px solid var(--border-subtle);
	transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-card:hover {
	border-color: var(--gold-muted);
	transform: translateY(-6px);
	box-shadow: 0 12px 30px -10px rgba(243, 198, 79, 0.15) !important;
}

.featured-media-wrapper {
	background-color: var(--bg-surface-hover);
}

.featured-img {
	transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.featured-card:hover .featured-img {
	transform: scale(1.06);
}

.featured-date-badge {
	background-color: rgba(11, 11, 12, 0.75);
	backdrop-filter: blur(6px);
	-webkit-backdrop-filter: blur(6px);
	color: var(--text-main);
	border: 1px solid var(--border-subtle);
	transition: border-color 0.3s ease;
}

.featured-card:hover .featured-date-badge {
	border-color: var(--gold-muted);
}

.featured-category-badge {
	background-color: var(--magenta-badge);
	color: var(--text-main);
	transition: filter 0.2s ease;
}

.featured-category-badge:hover {
	filter: brightness(1.15);
}

.featured-genre {
	color: var(--text-muted);
}

.featured-card-title {
	color: var(--text-main);
	transition: color 0.2s ease;
}

.featured-card-title:hover {
	color: var(--gold-accent);
}

.featured-artist,
.featured-meta {
	color: var(--text-muted);
}

.featured-divider {
	border-top: 1px solid var(--border-subtle);
}

.featured-starting-label {
	color: var(--text-muted);
	font-size: 0.75rem;
}

.featured-price {
	color: var(--text-main);
}

.featured-btn-outline {
	background-color: transparent;
	border: 1px solid var(--border-subtle);
	color: var(--text-main);
	transition: all 0.2s ease;
}

.featured-btn-outline:hover {
	background-color: var(--bg-surface-hover);
	border-color: var(--gold-muted);
	color: var(--gold-accent);
}

.featured-btn-buy {
	background-color: var(--gold-accent);
	border-color: var(--gold-accent);
	color: #000000;
	transition: all 0.2s ease;
}

.featured-btn-buy:hover {
	background-color: var(--gold-accent-hover);
	border-color: var(--gold-accent-hover);
	color: #000000;
	transform: translateY(-1px);
}

.featured-btn-buy:disabled {
	background-color: var(--bg-surface-hover);
	border-color: var(--border-subtle);
	color: var(--text-muted);
	transform: none;
}

/* Keyframe Animations */
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes slideUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-in {
	animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-up {
	animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	opacity: 0;
}
</style>

