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
    <section class="hero-section py-5 px-3 px-md-4 px-lg-5">
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

<style scoped>
/* Home Page - Hero Start */

.hero-section {
    position: relative;
}

.hero-carousel-wrapper {
    background-color: var(--bg-primary);
    border: 1px solid var(--border-subtle);
    box-shadow: 
        0 24px 60px rgba(0, 0, 0, 0.8),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
    position: relative;
}

.hero-carousel-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
        90deg,
        transparent 0%,
        var(--gold-muted) 30%,
        var(--gold-accent) 50%,
        var(--gold-muted) 70%,
        transparent 100%
    );
    z-index: 5;
    opacity: 0.85;
}

.hero-slide {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 520px;
    display: flex;
    align-items: center;
    position: relative;
    transform: scale(1);
    transition: transform 6.5s ease-out;
}

.carousel-item.active .hero-slide {
    transform: scale(1.04);
}

.hero-overlay {
    position: absolute;
    inset: 0;
    background: 
        radial-gradient(
            circle at 80% 35%,
            rgba(158, 28, 78, 0.14) 0%,
            transparent 55%
        ),
        linear-gradient(
            95deg,
            var(--bg-primary) 0%,
            rgba(11, 11, 12, 0.92) 38%,
            rgba(11, 11, 12, 0.55) 70%,
            rgba(11, 11, 12, 0.25) 100%
        ),
        linear-gradient(
            0deg,
            var(--bg-primary) 0%,
            transparent 35%
        );
    z-index: 1;
}

.hero-content {
    padding-left: 5.5rem !important;
    padding-right: 5.5rem !important;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    background: rgba(20, 20, 22, 0.78);
    border: 1px solid rgba(243, 198, 79, 0.35);
    color: var(--gold-accent);
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.42rem 0.95rem;
    border-radius: 50rem;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
}

.hero-status-badge {
    display: inline-flex;
    align-items: center;
    background: rgba(20, 20, 22, 0.85);
    border: 1px solid var(--border-subtle);
    color: var(--text-main);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 0.42rem 0.85rem;
    border-radius: 50rem;
    backdrop-filter: blur(10px);
}

.hero-status-badge.hero-status-urgent {
    background-color: var(--magenta-badge);
    border-color: rgba(255, 255, 255, 0.18);
    color: var(--text-main);
    box-shadow: 0 0 18px rgba(158, 28, 78, 0.55);
}

.hero-title {
    color: var(--text-main);
    letter-spacing: -0.025em;
    line-height: 1.12;
    text-shadow: 0 4px 24px rgba(0, 0, 0, 0.65);
}

.hero-meta {
    color: var(--text-main);
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.9;
}

.hero-meta-divider {
    color: var(--gold-muted);
}

.hero-text-gold {
    color: var(--gold-accent);
}

.hero-description {
    color: var(--text-muted);
    font-size: 1.02rem;
    line-height: 1.65;
    max-width: 60ch;
}

.hero-btn-gold {
    position: relative;
    overflow: hidden;
    background: linear-gradient(
        135deg,
        var(--gold-accent) 0%,
        var(--gold-accent-hover) 100%
    );
    border: 1px solid var(--gold-accent);
    color: var(--bg-primary);
    font-weight: 700;
    font-size: 0.94rem;
    letter-spacing: 0.01em;
    border-radius: 0.7rem;
    box-shadow: 0 6px 22px rgba(243, 198, 79, 0.22);
    transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
}

.hero-btn-gold::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 65%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.45),
        transparent
    );
    transform: skewX(-22deg);
    transition: left 0.55s ease;
}

.hero-btn-gold:hover:not(:disabled)::after {
    left: 140%;
}

.hero-btn-gold:hover:not(:disabled) {
    background: var(--gold-accent-hover);
    border-color: var(--gold-accent-hover);
    color: var(--bg-primary);
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(243, 198, 79, 0.35);
}

.hero-btn-gold:disabled {
    background: var(--bg-surface);
    border-color: var(--border-subtle);
    color: var(--text-muted);
    box-shadow: none;
    opacity: 0.85;
    cursor: not-allowed;
}

.hero-btn-surface {
    background-color: rgba(20, 20, 22, 0.82);
    border: 1px solid var(--border-subtle);
    color: var(--text-main);
    font-weight: 600;
    font-size: 0.94rem;
    border-radius: 0.7rem;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: background-color 0.22s ease, border-color 0.22s ease, color 0.22s ease, transform 0.22s ease;
}

.hero-btn-surface:hover {
    background-color: var(--bg-surface-hover);
    border-color: var(--gold-muted);
    color: var(--gold-accent);
    transform: translateY(-2px);
}

.hero-control {
    width: 4.5rem;
    opacity: 0.75;
    z-index: 4;
    transition: opacity 0.2s ease;
}

.hero-carousel-wrapper:hover .hero-control {
    opacity: 1;
}

.hero-btn-slider-ctrl {
    width: 2.65rem;
    height: 2.65rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(20, 20, 22, 0.82);
    border: 1px solid var(--border-subtle);
    color: var(--text-main);
    border-radius: 50%;
    backdrop-filter: blur(8px);
    transition: all 0.22s ease;
}

.hero-control:hover .hero-btn-slider-ctrl {
    background-color: var(--bg-surface-hover);
    border-color: var(--gold-accent);
    color: var(--gold-accent);
    box-shadow: 0 0 16px rgba(243, 198, 79, 0.25);
    transform: scale(1.06);
}

.hero-indicators {
    margin-bottom: 1.35rem;
    gap: 0.45rem;
    z-index: 4;
}

.hero-indicators [data-bs-target] {
    width: 1.5rem;
    height: 0.25rem;
    border-radius: 999px;
    background-color: var(--text-muted);
    opacity: 0.35;
    border: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-indicators [data-bs-target]:hover {
    opacity: 0.7;
}

.hero-indicators .active {
    width: 2.75rem;
    background-color: var(--gold-accent);
    opacity: 1;
    box-shadow: 0 0 10px rgba(243, 198, 79, 0.5);
}

@media (max-width: 991.98px) {
    .hero-control {
        display: none !important;
    }

    .hero-content {
        padding-left: 2.5rem !important;
        padding-right: 2.5rem !important;
    }
}

@media (max-width: 767.98px) {
    .hero-slide {
        min-height: 440px;
    }

    .hero-content {
        padding-left: 1.5rem !important;
        padding-right: 1.5rem !important;
        padding-bottom: 3.25rem !important;
    }

    .hero-overlay {
        background: linear-gradient(
            0deg,
            var(--bg-primary) 12%,
            rgba(11, 11, 12, 0.86) 55%,
            rgba(11, 11, 12, 0.45) 100%
        );
    }
}

/* Home Page - Hero End */    
</style>