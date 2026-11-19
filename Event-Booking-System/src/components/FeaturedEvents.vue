<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { eventsData } from "../data/eventsData.js";

const router = useRouter();

const props = defineProps({
  events: {
    type: Array,
    default: () => eventsData,
  },
  carouselId: {
    type: String,
    default: "featuredEventsCarousel",
  },
  itemsPerSlide: {
    type: Number,
    default: 3,
  },
});

const featuredEvents = computed(() => props.events.slice(0, 6));

const featuredSlides = computed(() => {
  const chunks = [];
  for (let i = 0; i < featuredEvents.value.length; i += props.itemsPerSlide) {
    chunks.push(featuredEvents.value.slice(i, i + props.itemsPerSlide));
  }
  return chunks;
});

const formatPrice = (price) => {
  return `₱${Number(price).toLocaleString("en-PH")}`;
};

const goToEventDetails = (eventId) => {
  router.push({ name: "EventDetails", params: { id: eventId } });
};
</script>

<
<template>
  <section
    class="featured-section py-5 px-3 px-md-4 px-lg-5"
    data-bs-theme="dark">
    <!-- Section Header & Carousel Controls -->
    <div
      class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end mb-4 gap-3 animate-fade-in">
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
          aria-label="Previous featured events">
          <i class="bi bi-chevron-left"></i>
        </button>
        <button
          class="btn featured-btn-ctrl"
          type="button"
          :data-bs-target="`#${carouselId}`"
          data-bs-slide="next"
          aria-label="Next featured events">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
    <!-- Bootstrap Carousel Slider -->
    <div
      v-if="featuredSlides.length > 0"
      :id="carouselId"
      class="carousel slide carousel-fade"
      data-bs-ride="false">
      <div class="carousel-inner py-2">
        <div
          v-for="(slideGroup, slideIndex) in featuredSlides"
          :key="`featured-slide-${slideIndex}`"
          class="carousel-item"
          :class="{ active: slideIndex === 0 }">
          <div class="row g-4">
            <div
              v-for="(event, eventIndex) in slideGroup"
              :key="event._id"
              class="col-md-6 col-lg-4 animate-slide-up"
              :style="{ animationDelay: `${eventIndex * 0.1}s` }">
              <article
                class="card featured-card h-100 rounded-4 overflow-hidden d-flex flex-column shadow-sm">
                <!-- Card Media Header -->
                <div
                  class="position-relative overflow-hidden ratio ratio-16x9 featured-media-wrapper"
                  role="button"
                  tabindex="0"
                  @click="goToEventDetails(event._id)">
                  <img
                    :src="event.eventImage"
                    :alt="event.eventName"
                    class="card-img-top object-fit-cover featured-img"
                    loading="lazy" />
                  <!-- Top-Left Date Badge -->
                  <div
                    class="p-3 d-flex align-items-start justify-content-start z-1">
                    <span
                      class="badge featured-date-badge py-2 px-3 rounded-pill">
                      <i class="bi bi-calendar3 me-1"></i>
                      {{ event.dateBadge }}
                    </span>
                  </div>
                </div>
                <!-- Card Body -->
                <div class="card-body p-4 d-flex flex-column flex-grow-1">
                  <div
                    class="d-flex justify-content-between align-items-center mb-2">
                    <span
                      class="badge featured-category-badge text-uppercase fw-semibold">
                      {{ event.eventCategory }}
                    </span>
                    <span class="featured-genre small">{{ event.genre }}</span>
                  </div>

                  <h4
                    class="h5 fw-bold mb-1 featured-card-title"
                    role="button"
                    @click="goToEventDetails(event._id)">
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
                  <div
                    class="mt-auto pt-3 featured-divider d-flex align-items-center justify-content-between gap-2">
                    <div>
                      <small
                        class="featured-starting-label d-block text-uppercase"
                        >Starting at</small
                      >
                      <span class="fs-5 fw-bold featured-price">{{
                        formatPrice(event.startingPrice)
                      }}</span>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                      <button
                        type="button"
                        class="btn featured-btn-outline"
                        title="View Details"
                        aria-label="View Details"
                        @click="goToEventDetails(event._id)">
                        <i class="bi bi-compass"></i>
                      </button>

                      <button
                        type="button"
                        class="btn featured-btn-buy fw-semibold px-3 py-2"
                        :disabled="event.remainingTickets === 0"
                        @click="goToEventDetails(event._id)">
                        <i
                          :class="
                            event.remainingTickets === 0
                              ? 'bi bi-bell me-1'
                              : 'bi bi-ticket-perforated-fill me-1'
                          "></i>
                        {{
                          event.remainingTickets === 0
                            ? "Sold Out"
                            : "Get Tickets"
                        }}
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
