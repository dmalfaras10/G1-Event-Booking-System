<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { eventsData } from '../data/eventsData.js'

const router = useRouter()

const props = defineProps({
    events: {
        type: Array,
        default: () => eventsData.slice(0, 3)
    },
    carouselId: {
        type: String,
        default: 'gOneHeroCarousel'
    },
    interval: {
        type: Number,
        default: 5500
    }
})

const featuredEvents = computed(() => props.events.slice(0, 3))

const handleSelectEvent = (event) => {
    router.push({ name: 'EventDetails', params: { id: event._id } })
}
</script>

<template>
    <section id="hero" class="hero-section pt-4 pb-2 px-3 px-md-4 px-lg-5">
        <div
            :id="carouselId"
            class="carousel slide carousel-fade hero-carousel-wrapper rounded-4 overflow-hidden"
            data-bs-ride="carousel"
            :data-bs-interval="interval"
        >
            <!-- Carousel Indicators -->
            <div class="carousel-indicators hero-indicators">
                <button
                    v-for="(event, index) in featuredEvents"
                    :key="`indicator-${event._id}`"
                    type="button"
                    :data-bs-target="`#${carouselId}`"
                    :data-bs-slide-to="index"
                    :class="{ active: index === 0 }"
                    :aria-current="index === 0 ? 'true' : undefined"
                    :aria-label="`Slide ${index + 1}`"
                ></button>
            </div>

            <!-- Carousel Slides -->
            <div class="carousel-inner">
                <div
                    v-for="(event, index) in featuredEvents"
                    :key="event._id"
                    class="carousel-item"
                    :class="{ active: index === 0 }"
                >
                    <div
                        class="hero-slide"
                        :style="{ backgroundImage: `url(${event.eventImage})` }"
                    >
                        <div class="hero-overlay"></div>

                        <div class="hero-content position-relative z-2 p-4 p-md-5 w-100">
                            <div class="col-lg-8 col-xl-7">
                                <!-- Meta & Ticket Inventory Badges -->
                                <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
                                    <span class="hero-badge">
                                        <i class="bi bi-star-fill me-1"></i>
                                        {{ event.eventCategory }} &bull; {{ event.dateBadge }}
                                    </span>

                                    <!-- Inventory status badge driven by remainingTickets -->
                                    <span
                                        class="hero-status-badge"
                                        :class="{ 'hero-status-urgent': event.remainingTickets <= 20 }"
                                    >
                                        <i :class="event.remainingTickets === 0 ? 'bi bi-x-circle-fill me-1' : 'bi bi-fire me-1'"></i>
                                        <template v-if="event.remainingTickets === 0">Sold Out</template>
                                        <template v-else-if="event.remainingTickets <= 20">Low Stock &bull; {{ event.remainingTickets }} left</template>
                                        <template v-else>Selling Fast &bull; {{ event.remainingTickets }} left</template>
                                    </span>
                                </div>

                                <!-- Title -->
                                <h1 class="hero-title display-5 fw-bold mb-3">
                                    {{ event.eventName }}
                                </h1>

                                <!-- Venue & Time Meta -->
                                <div class="hero-meta d-flex flex-wrap align-items-center gap-3 mb-3">
                                    <span>
                                        <i class="bi bi-geo-alt-fill me-1 hero-text-gold"></i>
                                        {{ event.venueName }}, {{ event.location }}
                                    </span>
                                    <span class="hero-meta-divider">&bull;</span>
                                    <span>
                                        <i class="bi bi-clock me-1 hero-text-gold"></i>
                                        {{ event.timeFormatted }}
                                    </span>
                                </div>

                                <!-- Description -->
                                <p class="hero-description lead mb-4">
                                    {{ event.eventDescription }}
                                </p>

                                <!-- Action Buttons (Disabled if remainingTickets === 0) -->
                                <div class="d-flex flex-wrap align-items-center gap-3">
                                    <button
                                        type="button"
                                        class="btn hero-btn-gold px-4 py-2"
                                        :disabled="event.remainingTickets === 0"
                                        @click="handleSelectEvent(event)"
                                    >
                                        <i class="bi bi-ticket-perforated-fill me-2"></i>
                                        Buy Tickets
                                    </button>

                                    <button
                                        type="button"
                                        class="btn hero-btn-surface px-4 py-2"
                                        @click="handleSelectEvent(event)"
                                    >
                                        <i class="bi bi-compass me-2"></i>
                                        Explore Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Carousel Controls -->
            <button
                class="carousel-control-prev hero-control"
                type="button"
                :data-bs-target="`#${carouselId}`"
                data-bs-slide="prev"
                aria-label="Previous slide"
            >
                <span class="hero-btn-slider-ctrl">
                    <i class="bi bi-chevron-left"></i>
                </span>
            </button>
            <button
                class="carousel-control-next hero-control"
                type="button"
                :data-bs-target="`#${carouselId}`"
                data-bs-slide="next"
                aria-label="Next slide"
            >
                <span class="hero-btn-slider-ctrl">
                    <i class="bi bi-chevron-right"></i>
                </span>
            </button>
        </div>
    </section>
</template>