<script setup>
import { ref, computed } from 'vue'

// --- STATE FOR SEARCH, FILTERS & VIEW MODE ---
const searchQuery = ref('')
const selectedCategory = ref('All')
const selectedLocation = ref('All')
const selectedVenue = ref('All')
const selectedGenre = ref('All')
const selectedMonth = ref('All')
const selectedDate = ref('All')
const maxPrice = ref(15000)
const sortBy = ref('date-asc')
const viewMode = ref('grid') // 'grid' or 'agenda'
const activeAnnouncementIndex = ref(0)

// --- ANNOUNCEMENTS & PROMOTIONS DATA ---
const announcements = ref([
  {
    id: 1,
    type: 'PROMO',
    icon: 'bi-gem',
    title: 'Gold & Silver VIP Presale Now Open',
    message: 'Members enjoy up to 20% automatic checkout discounts and priority seat locks on all November & December shows.',
    ctaText: 'View VIP Plans'
  },
  {
    id: 2,
    type: 'ANNOUNCEMENT',
    icon: 'bi-megaphone-fill',
    title: 'Additional Seats Released: Neon Noir Symphony',
    message: 'Due to high demand at The Palace Pool Club (Nov 21), 25 additional Silver Sky-Deck seats are now open for booking.',
    ctaText: 'Filter Nov Events'
  },
  {
    id: 3,
    type: 'HOLIDAY OFFER',
    icon: 'bi-stars',
    title: 'Early Bird Holiday Bundle',
    message: 'Book 4 or more Bronze or Silver tier tickets on December Gala events to receive complimentary lounge drink vouchers.',
    ctaText: 'See Dec Events'
  }
])

// --- MOCK EVENTS DATA ---
const events = ref([
  {
    _id: 'evt-001',
    eventName: 'Neon Noir Symphony: Manila Edition',
    artistName: 'Nocturne Philharmonic & DJ Kaito',
    eventCategory: 'Live Concert',
    genre: 'Electronic & Orchestral',
    venueName: 'The Palace Pool Club',
    location: 'BGC, Taguig',
    eventStartDateTime: '2026-11-21T20:00:00',
    dateBadge: 'NOV 21',
    dayOfWeek: 'SAT',
    dayNumber: '21',
    monthShort: 'NOV',
    monthKey: '2026-11',
    timeFormatted: '8:00 PM PHT',
    startingPrice: 4800,
    availabilityStatus: 'Selling Fast', // Available | Selling Fast | Low Stock | Sold Out
    remainingTickets: 18,
    allocatedPercent: 85,
    promoBanner: '15% Off with Gold VIP',
    announcement: 'Includes Sky-Deck Lounge Access',
    eventImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
    eventDescription: 'Experience an immersive nocturnal audiovisual takeover blending a 24-piece live string ensemble with deep melodic synth sets.'
  },
  {
    _id: 'evt-002',
    eventName: 'Solitary Harmonics: Acoustic Piano Night',
    artistName: 'Nils Frahm & Guests',
    eventCategory: 'Classical & Gala',
    genre: 'Classical & Ambient',
    venueName: 'Samsung Performing Arts Theater',
    location: 'Makati City',
    eventStartDateTime: '2026-11-28T19:30:00',
    dateBadge: 'NOV 28',
    dayOfWeek: 'SAT',
    dayNumber: '28',
    monthShort: 'NOV',
    monthKey: '2026-11',
    timeFormatted: '7:30 PM PHT',
    startingPrice: 3600,
    availabilityStatus: 'Available',
    remainingTickets: 64,
    allocatedPercent: 52,
    promoBanner: 'Early Bird Promo',
    announcement: 'Doors open at 6:30 PM for acoustic check',
    eventImage: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80',
    eventDescription: 'An intimate three-hour improvisational performance on grand upright piano and vintage analog modular synthesizers.'
  },
  {
    _id: 'evt-003',
    eventName: 'Winter Masquerade at The Fort',
    artistName: 'Manila Chamber Quintet',
    eventCategory: 'Classical & Gala',
    genre: 'Orchestral Fusion',
    venueName: 'Shangri-La Grand Ballroom',
    location: 'BGC, Taguig',
    eventStartDateTime: '2026-12-05T19:00:00',
    dateBadge: 'DEC 05',
    dayOfWeek: 'SAT',
    dayNumber: '05',
    monthShort: 'DEC',
    monthKey: '2026-12',
    timeFormatted: '7:00 PM PHT',
    startingPrice: 8500,
    availabilityStatus: 'Low Stock',
    remainingTickets: 7,
    allocatedPercent: 94,
    promoBanner: 'Complimentary Champagne',
    announcement: 'Strict Black Tie & Mask Dress Code',
    eventImage: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80',
    eventDescription: 'Step into an evening of velvet elegance, Vivaldi Recomposed under candlelight, and curated four-course dinner pairings.'
  },
  {
    _id: 'evt-004',
    eventName: 'Midnight Saxophone Salon',
    artistName: 'The Harlem Speakeasy Quartet',
    eventCategory: 'Jazz & Lounge',
    genre: 'Jazz & Bebop',
    venueName: 'The Spirits Library',
    location: 'Makati City',
    eventStartDateTime: '2026-12-12T21:30:00',
    dateBadge: 'DEC 12',
    dayOfWeek: 'SAT',
    dayNumber: '12',
    monthShort: 'DEC',
    monthKey: '2026-12',
    timeFormatted: '9:30 PM PHT',
    startingPrice: 2800,
    availabilityStatus: 'Selling Fast',
    remainingTickets: 14,
    allocatedPercent: 82,
    promoBanner: 'Silver & Gold Priority',
    announcement: 'Includes 1 Rare Single Malt Pairing',
    eventImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=900&q=80',
    eventDescription: 'An intimate 80-seat speakeasy jazz session featuring brass standards, private banquette service, and late-night jam sessions.'
  },
  {
    _id: 'evt-005',
    eventName: 'Velvet Indie Sessions: Where Time Goes',
    artistName: 'The Coastal Drift Collective',
    eventCategory: 'Live Concert',
    genre: 'Indie Rock',
    venueName: 'Solaire Theatre',
    location: 'Pasay City',
    eventStartDateTime: '2026-12-19T20:00:00',
    dateBadge: 'DEC 19',
    dayOfWeek: 'SAT',
    dayNumber: '19',
    monthShort: 'DEC',
    monthKey: '2026-12',
    timeFormatted: '8:00 PM PHT',
    startingPrice: 3000,
    availabilityStatus: 'Available',
    remainingTickets: 95,
    allocatedPercent: 40,
    promoBanner: '10% Bronze Member Perks',
    announcement: 'Vinyl merch booth opens at 6:00 PM',
    eventImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
    eventDescription: 'Warm analog guitars and nostalgic indie rock anthems performed live in an acoustically engineered theater setting.'
  },
  {
    _id: 'evt-006',
    eventName: '2027 Gold Champagne NYE Gala',
    artistName: 'International Guest DJs & Pyro Symphony',
    eventCategory: 'Nightlife & DJ',
    genre: 'House & Pop',
    venueName: 'Okada Manila Cove',
    location: 'Pasay City',
    eventStartDateTime: '2026-12-31T21:00:00',
    dateBadge: 'DEC 31',
    dayOfWeek: 'THU',
    dayNumber: '31',
    monthShort: 'DEC',
    monthKey: '2026-12',
    timeFormatted: '9:00 PM PHT',
    startingPrice: 12000,
    availabilityStatus: 'Sold Out',
    remainingTickets: 0,
    allocatedPercent: 100,
    promoBanner: 'Waitlist Open for VIP',
    announcement: 'Midnight Manila Bay Pyrotechnics Show',
    eventImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
    eventDescription: 'Ring in 2027 poolside by Manila Bay inside the glass dome with international headliners and unlimited vintage bubbly.'
  }
])

// --- FILTER OPTIONS COMPUTED FROM DATA ---
const categories = ['All', 'Live Concert', 'Classical & Gala', 'Jazz & Lounge', 'Nightlife & DJ']
const locations = computed(() => ['All', ...new Set(events.value.map(e => e.location))])
const venues = computed(() => ['All', ...new Set(events.value.map(e => e.venueName))])
const genres = computed(() => ['All', ...new Set(events.value.map(e => e.genre))])

const months = [
  { label: 'All Months', value: 'All' },
  { label: 'November 2026', value: '2026-11' },
  { label: 'December 2026', value: '2026-12' }
]

// Interactive calendar dates derived from events
const calendarDates = computed(() => {
  return events.value.map(e => ({
    dateIso: e.eventStartDateTime.split('T')[0],
    dayOfWeek: e.dayOfWeek,
    dayNumber: e.dayNumber,
    monthShort: e.monthShort,
    monthKey: e.monthKey,
    eventName: e.eventName
  }))
})

// --- FILTERED & SORTED EVENTS ---
const filteredEvents = computed(() => {
  return events.value
    .filter(evt => {
      const q = searchQuery.value.trim().toLowerCase()
      const matchesSearch =
        !q ||
        evt.eventName.toLowerCase().includes(q) ||
        evt.artistName.toLowerCase().includes(q) ||
        evt.venueName.toLowerCase().includes(q) ||
        evt.location.toLowerCase().includes(q) ||
        evt.genre.toLowerCase().includes(q)

      const matchesCategory =
        selectedCategory.value === 'All' || evt.eventCategory === selectedCategory.value
      const matchesLocation =
        selectedLocation.value === 'All' || evt.location === selectedLocation.value
      const matchesVenue =
        selectedVenue.value === 'All' || evt.venueName === selectedVenue.value
      const matchesGenre =
        selectedGenre.value === 'All' || evt.genre === selectedGenre.value
      const matchesMonth =
        selectedMonth.value === 'All' || evt.monthKey === selectedMonth.value
      const matchesDate =
        selectedDate.value === 'All' ||
        evt.eventStartDateTime.startsWith(selectedDate.value)
      const matchesPrice = evt.startingPrice <= maxPrice.value

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesVenue &&
        matchesGenre &&
        matchesMonth &&
        matchesDate &&
        matchesPrice
      )
    })
    .sort((a, b) => {
      if (sortBy.value === 'price-asc') return a.startingPrice - b.startingPrice
      if (sortBy.value === 'price-desc') return b.startingPrice - a.startingPrice
      if (sortBy.value === 'date-desc') {
        return new Date(b.eventStartDateTime) - new Date(a.eventStartDateTime)
      }
      return new Date(a.eventStartDateTime) - new Date(b.eventStartDateTime)
    })
})

// --- HELPER FUNCTIONS ---
const formatPrice = (value) => {
  return '₱' + Number(value).toLocaleString('en-PH')
}

const getAvailabilityBadgeClass = (status) => {
  switch (status) {
    case 'Available':
      return 'badge-available'
    case 'Selling Fast':
      return 'badge-selling-fast'
    case 'Low Stock':
      return 'badge-low-stock'
    case 'Sold Out':
      return 'badge-sold-out'
    default:
      return 'badge-available'
  }
}

const toggleCalendarDate = (dateIso) => {
  selectedDate.value = selectedDate.value === dateIso ? 'All' : dateIso
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
  selectedLocation.value = 'All'
  selectedVenue.value = 'All'
  selectedGenre.value = 'All'
  selectedMonth.value = 'All'
  selectedDate.value = 'All'
  maxPrice.value = 15000
  sortBy.value = 'date-asc'
}

const cycleAnnouncement = (direction) => {
  const total = announcements.value.length
  activeAnnouncementIndex.value =
    (activeAnnouncementIndex.value + direction + total) % total
}
</script>

<template>
  <main class="main-wrapper py-4 py-md-5">
    <div class="container">

      <!-- 1. EVENT ANNOUNCEMENTS & SPECIAL PROMOTIONS BANNER -->
      <section class="mb-4">
        <div class="promo-ticker-bar rounded-4 p-3 p-md-4 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
          <div class="d-flex align-items-start align-items-md-center gap-3">
            <div class="promo-icon-box rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
              <i :class="['bi', announcements[activeAnnouncementIndex].icon, 'fs-4']"></i>
            </div>
            <div>
              <div class="d-flex align-items-center gap-2 mb-1">
                <span class="hero-badge py-1 px-2">
                  {{ announcements[activeAnnouncementIndex].type }}
                </span>
                <span class="small text-muted">
                  {{ activeAnnouncementIndex + 1 }} / {{ announcements.length }}
                </span>
              </div>
              <h6 class="fw-bold mb-1 text-white">
                {{ announcements[activeAnnouncementIndex].title }}
              </h6>
              <p class="small mb-0 text-secondary-light">
                {{ announcements[activeAnnouncementIndex].message }}
              </p>
            </div>
          </div>

          <div class="d-flex align-items-center justify-content-between justify-content-lg-end gap-2 flex-shrink-0">
            <button
              type="button"
              class="btn btn-slider-ctrl btn-sm"
              @click="cycleAnnouncement(-1)"
              aria-label="Previous announcement"
            >
              <i class="bi bi-chevron-left"></i>
            </button>
            <button
              type="button"
              class="btn btn-slider-ctrl btn-sm"
              @click="cycleAnnouncement(1)"
              aria-label="Next announcement"
            >
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- 2. PAGE HEADER & SEARCH BAR -->
      <section class="mb-4">
        <div class="row align-items-end g-3">
          <div class="col-lg-6">
            <span class="text-uppercase small fw-bold browse-lineup-title">
              <i class="bi bi-stars me-1"></i>Curated Sanctuary Calendar
            </span>
            <h1 class="display-6 fw-bold mb-1 text-white">Explore Event Listings</h1>
            <p class="text-secondary-light small mb-0">
              Discover live concerts, orchestral galas, and intimate lounge sessions across Metro Manila.
            </p>
          </div>

          <div class="col-lg-6">
            <div class="input-group search-input-group">
              <span class="input-group-text bg-transparent border-0 text-warning ps-3">
                <i class="bi bi-search"></i>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control bg-transparent border-0 text-white shadow-none"
                placeholder="Search by event, artist, venue, city, or genre..."
              />
              <button
                v-if="searchQuery"
                class="btn btn-link text-secondary-light text-decoration-none"
                type="button"
                @click="searchQuery = ''"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. CATEGORY PILLS & VIEW TOGGLE BAR -->
      <section class="filter-panel rounded-4 p-3 p-md-4 mb-4">
        <div class="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 pb-3 border-bottom border-secondary border-opacity-25">
          <!-- Category Taxonomy Pills -->
          <div class="d-flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              class="btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all"
              :class="selectedCategory === cat ? 'btn-login' : 'btn-register'"
              @click="selectedCategory = cat"
            >
              {{ cat }}
            </button>
          </div>

          <!-- View Switcher (Grid vs Agenda) & Month Quick Filter -->
          <div class="d-flex align-items-center gap-2 align-self-start align-self-lg-center">
            <select
              v-model="selectedMonth"
              class="form-select form-select-sm dark-select"
              aria-label="Filter by month"
            >
              <option v-for="m in months" :key="m.value" :value="m.value">
                {{ m.label }}
              </option>
            </select>

            <div class="btn-group view-toggle-group" role="group" aria-label="View toggle">
              <button
                type="button"
                class="btn btn-sm"
                :class="viewMode === 'grid' ? 'btn-login' : 'btn-register'"
                @click="viewMode = 'grid'"
                title="Card Grid View"
              >
                <i class="bi bi-grid-3x3-gap-fill"></i>
              </button>
              <button
                type="button"
                class="btn btn-sm"
                :class="viewMode === 'agenda' ? 'btn-login' : 'btn-register'"
                @click="viewMode = 'agenda'"
                title="Calendar Agenda View"
              >
                <i class="bi bi-calendar3-week"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Multi-Criteria Dropdown Filters: Location, Venue, Genre, Price, Sort -->
        <div class="row g-3 pt-3 align-items-end">
          <div class="col-6 col-md-4 col-lg-2">
            <label class="form-label small text-secondary-light mb-1">
              <i class="bi bi-geo-alt text-warning me-1"></i>Location
            </label>
            <select v-model="selectedLocation" class="form-select form-select-sm dark-select">
              <option v-for="loc in locations" :key="loc" :value="loc">
                {{ loc === 'All' ? 'All Cities' : loc }}
              </option>
            </select>
          </div>

          <div class="col-6 col-md-4 col-lg-3">
            <label class="form-label small text-secondary-light mb-1">
              <i class="bi bi-building text-warning me-1"></i>Venue
            </label>
            <select v-model="selectedVenue" class="form-select form-select-sm dark-select">
              <option v-for="v in venues" :key="v" :value="v">
                {{ v === 'All' ? 'All Venues' : v }}
              </option>
            </select>
          </div>

          <div class="col-6 col-md-4 col-lg-2">
            <label class="form-label small text-secondary-light mb-1">
              <i class="bi bi-music-note-beamed text-warning me-1"></i>Genre
            </label>
            <select v-model="selectedGenre" class="form-select form-select-sm dark-select">
              <option v-for="g in genres" :key="g" :value="g">
                {{ g === 'All' ? 'All Genres' : g }}
              </option>
            </select>
          </div>

          <div class="col-6 col-md-6 col-lg-3">
            <div class="d-flex justify-content-between small mb-1">
              <span class="text-secondary-light">
                <i class="bi bi-tag text-warning me-1"></i>Max Price
              </span>
              <span class="fw-bold text-warning">{{ formatPrice(maxPrice) }}</span>
            </div>
            <input
              v-model.number="maxPrice"
              type="range"
              class="form-range gold-range"
              min="2500"
              max="15000"
              step="500"
            />
          </div>

          <div class="col-12 col-md-6 col-lg-2">
            <label class="form-label small text-secondary-light mb-1">
              <i class="bi bi-sort-down text-warning me-1"></i>Sort By
            </label>
            <select v-model="sortBy" class="form-select form-select-sm dark-select">
              <option value="date-asc">Date: Soonest</option>
              <option value="date-desc">Date: Latest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <!-- 4. INTERACTIVE CALENDAR DATE DISCOVERY STRIP -->
        <div class="pt-3 mt-3 border-top border-secondary border-opacity-25">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="small fw-semibold text-secondary-light">
              <i class="bi bi-calendar-event text-warning me-1"></i>Interactive Date Discovery (Click a date to filter):
            </span>
            <button
              v-if="selectedDate !== 'All'"
              type="button"
              class="btn btn-link btn-sm text-warning p-0 text-decoration-none"
              @click="selectedDate = 'All'"
            >
              Show All Dates
            </button>
          </div>

          <div class="d-flex gap-2 overflow-auto pb-1 calendar-strip">
            <button
              v-for="d in calendarDates"
              :key="d.dateIso"
              type="button"
              class="calendar-date-pill rounded-3 p-2 text-center flex-shrink-0"
              :class="{ active: selectedDate === d.dateIso }"
              @click="toggleCalendarDate(d.dateIso)"
            >
              <span class="d-block extra-small text-uppercase fw-bold date-pill-day">
                {{ d.dayOfWeek }}
              </span>
              <span class="d-block fs-5 fw-bold text-white lh-1 my-1">
                {{ d.dayNumber }}
              </span>
              <span class="d-block extra-small text-secondary-light">
                {{ d.monthShort }}
              </span>
            </button>
          </div>
        </div>
      </section>

      <!-- RESULTS COUNT & RESET LINK -->
      <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <span class="small text-secondary-light">
          Showing <strong class="text-white">{{ filteredEvents.length }}</strong> of
          {{ events.length }} curated events
        </span>
        <button
          type="button"
          class="btn btn-register btn-sm py-1 px-3"
          @click="resetFilters"
        >
          <i class="bi bi-arrow-counterclockwise me-1"></i>Reset All Filters
        </button>
      </div>

      <!-- 5A. EVENT LISTINGS: 3-COLUMN CARD GRID VIEW -->
      <section v-if="viewMode === 'grid' && filteredEvents.length > 0" class="mb-5">
        <div class="row g-4">
          <div
            v-for="event in filteredEvents"
            :key="event._id"
            class="col-md-6 col-lg-4"
          >
            <div class="card event-card h-100 rounded-4 overflow-hidden">
              <!-- Image + Availability Badge + Date Badge -->
              <div class="position-relative">
                <img
                  :src="event.eventImage"
                  class="card-img-top event-card-img"
                  :alt="event.eventName"
                />

                <!-- Top-Left Real-Time Availability Badge -->
                <span
                  class="availability-badge"
                  :class="getAvailabilityBadgeClass(event.availabilityStatus)"
                >
                  <i class="bi bi-circle-fill me-1 extra-small"></i>
                  {{ event.availabilityStatus }}
                </span>

                <!-- Top-Right Date Badge (Matches mte repo style) -->
                <span class="event-date-badge">
                  <i class="bi bi-calendar3 me-1"></i>{{ event.dateBadge }}
                </span>

                <!-- Bottom Image Overlay Promo Tag -->
                <div class="card-promo-overlay px-3 py-1 d-flex justify-content-between align-items-center">
                  <span class="extra-small fw-semibold text-warning">
                    <i class="bi bi-lightning-charge-fill me-1"></i>{{ event.promoBanner }}
                  </span>
                  <span class="extra-small text-white">
                    <i class="bi bi-clock me-1"></i>{{ event.timeFormatted }}
                  </span>
                </div>
              </div>

              <!-- Card Body -->
              <div class="card-body d-flex flex-column p-4">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="event-category">{{ event.eventCategory }}</span>
                  <span class="extra-small text-secondary-light">{{ event.genre }}</span>
                </div>

                <h5 class="card-title fw-bold mb-1">{{ event.eventName }}</h5>
                <p class="small text-warning mb-2 fw-medium">
                  <i class="bi bi-person-badge me-1"></i>{{ event.artistName }}
                </p>

                <p class="card-text small mb-3 line-clamp-2">
                  {{ event.eventDescription }}
                </p>

                <!-- Venue & Location -->
                <p class="card-text small mb-2">
                  <i class="bi bi-geo-alt me-1"></i>{{ event.venueName }} &bull;
                  <span class="text-white">{{ event.location }}</span>
                </p>

                <!-- Event Announcement Notice -->
                <div class="announcement-chip rounded-2 px-2 py-1 mb-3 extra-small">
                  <i class="bi bi-info-circle text-warning me-1"></i>
                  {{ event.announcement }}
                </div>

                <!-- Seat Capacity Allocation Bar -->
                <div class="mb-3">
                  <div class="d-flex justify-content-between extra-small mb-1">
                    <span class="text-secondary-light">Allocated Capacity</span>
                    <span class="fw-semibold text-white">
                      {{
                        event.remainingTickets > 0
                          ? `${event.remainingTickets} seats left (${event.allocatedPercent}%)`
                          : '100% Claimed'
                      }}
                    </span>
                  </div>
                  <div class="progress dark-progress">
                    <div
                      class="progress-bar gold-progress-bar"
                      role="progressbar"
                      :style="{ width: event.allocatedPercent + '%' }"
                    ></div>
                  </div>
                </div>

                <!-- Price & CTA Footer -->
                <div class="mt-auto d-flex justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-25">
                  <div>
                    <small class="d-block card-starting-text">Starting at</small>
                    <span class="fw-bold card-price">
                      {{ formatPrice(event.startingPrice) }}
                    </span>
                  </div>

                  <button
                    type="button"
                    class="btn btn-sm px-3 py-2"
                    :class="event.availabilityStatus === 'Sold Out' ? 'btn-secondary disabled' : 'btn-login'"
                    :disabled="event.availabilityStatus === 'Sold Out'"
                  >
                    <i
                      class="bi me-1"
                      :class="event.availabilityStatus === 'Sold Out' ? 'bi-slash-circle' : 'bi-ticket-perforated'"
                    ></i>
                    {{ event.availabilityStatus === 'Sold Out' ? 'Sold Out' : 'Get Tickets' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5B. EVENT LISTINGS: CALENDAR AGENDA ROW VIEW (Adapted from Stitch's 4-Row Schedule) -->
      <section v-else-if="viewMode === 'agenda' && filteredEvents.length > 0" class="mb-5">
        <div class="d-flex flex-column gap-3">
          <div
            v-for="event in filteredEvents"
            :key="event._id"
            class="agenda-row rounded-4 p-3 p-md-4 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3"
          >
            <div class="d-flex align-items-center gap-3">
              <!-- Date Box -->
              <div class="agenda-date-box rounded-3 text-center d-flex flex-column justify-content-center flex-shrink-0">
                <span class="extra-small fw-bold text-warning text-uppercase">{{ event.dayOfWeek }}</span>
                <span class="fs-4 fw-bold text-white lh-1 my-1">{{ event.dayNumber }}</span>
                <span class="extra-small text-secondary-light">{{ event.monthShort }}</span>
              </div>

              <!-- Thumbnail -->
              <img
                :src="event.eventImage"
                :alt="event.eventName"
                class="agenda-thumb rounded-3 d-none d-sm-block flex-shrink-0"
              />

              <!-- Event Summary -->
              <div>
                <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
                  <span class="badge bg-dark border border-secondary text-warning">
                    {{ event.timeFormatted }}
                  </span>
                  <span class="event-category">{{ event.eventCategory }} &bull; {{ event.genre }}</span>
                  <span
                    class="availability-badge position-static py-0 px-2"
                    :class="getAvailabilityBadgeClass(event.availabilityStatus)"
                  >
                    {{ event.availabilityStatus }}
                  </span>
                </div>
                <h5 class="fw-bold text-white mb-1">{{ event.eventName }}</h5>
                <p class="small text-secondary-light mb-0">
                  <i class="bi bi-person-badge text-warning me-1"></i>{{ event.artistName }} &nbsp;|&nbsp;
                  <i class="bi bi-geo-alt text-warning me-1"></i>{{ event.venueName }}, {{ event.location }}
                </p>
              </div>
            </div>

            <!-- Right Side Capacity, Price & Button -->
            <div class="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-end gap-4 pt-2 pt-lg-0 border-top border-lg-0 border-secondary border-opacity-25">
              <div class="text-lg-end">
                <span class="d-block extra-small text-secondary-light">{{ event.promoBanner }}</span>
                <span class="small fw-semibold text-white">
                  {{ event.remainingTickets > 0 ? `${event.remainingTickets} Seats Left` : 'Waitlist Only' }}
                </span>
              </div>

              <div class="text-lg-end">
                <small class="d-block card-starting-text">Starting at</small>
                <span class="fw-bold card-price">{{ formatPrice(event.startingPrice) }}</span>
              </div>

              <button
                type="button"
                class="btn btn-sm px-3 py-2"
                :class="event.availabilityStatus === 'Sold Out' ? 'btn-secondary disabled' : 'btn-login'"
                :disabled="event.availabilityStatus === 'Sold Out'"
              >
                <i class="bi bi-ticket-perforated me-1"></i>
                {{ event.availabilityStatus === 'Sold Out' ? 'Sold Out' : 'Select Seats' }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- EMPTY STATE (TSD Use Case 2 Alternate Flow 4a) -->
      <section v-else class="text-center py-5 my-4 filter-panel rounded-4">
        <i class="bi bi-calendar-x display-4 text-warning mb-3 d-block"></i>
        <h4 class="fw-bold text-white">No Matching Events Found</h4>
        <p class="text-secondary-light small mx-auto mb-4" style="max-width: 440px;">
          No events match your current search or filter criteria. Try clearing your filters or adjusting your maximum ticket price.
        </p>
        <button type="button" class="btn btn-login px-4 py-2" @click="resetFilters">
          <i class="bi bi-arrow-counterclockwise me-1"></i>Clear Filters &amp; View All
        </button>
      </section>

      <!-- 6. VIP MEMBERSHIP & PRESALE PROMOTION BANNER (Distilled from Stitch Showcase) -->
      <section class="py-3">
        <div class="card event-card p-4 p-md-5 rounded-4 border-warning border-opacity-50 position-relative overflow-hidden">
          <div class="row align-items-center g-4">
            <div class="col-lg-8">
              <span class="hero-badge mb-2 d-inline-block">
                <i class="bi bi-gem me-1"></i>VIP Membership Perks
              </span>
              <h3 class="fw-bold text-white mt-1 mb-2">
                Unlock Bronze, Silver &amp; Gold Presale Privileges
              </h3>
              <p class="text-secondary-light small mb-3">
                Subscribe to a Shapipy Membership tier to enjoy automatic ticket discounts at checkout, priority 48-hour presale access, and complimentary lounge hospitality on featured shows.
              </p>
              <div class="d-flex flex-wrap gap-4 pt-1">
                <div>
                  <span class="fs-5 fw-bold text-warning d-block">Up to 20%</span>
                  <span class="extra-small text-uppercase text-secondary-light">Ticket Discounts</span>
                </div>
                <div>
                  <span class="fs-5 fw-bold text-white d-block">48-Hour</span>
                  <span class="extra-small text-uppercase text-secondary-light">Early Presale Access</span>
                </div>
                <div>
                  <span class="fs-5 fw-bold text-warning d-block">Priority</span>
                  <span class="extra-small text-uppercase text-secondary-light">VIP Seat Selection</span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 text-lg-end">
              <a href="#" class="btn btn-login px-4 py-3 fw-bold">
                <i class="bi bi-award me-2"></i>Explore VIP Plans
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  </main>
</template>

<style scoped>
/* Inherits root variables from src/assets/main.css */
.main-wrapper {
  background:
    radial-gradient(circle at 85% 20%, rgba(158, 28, 78, 0.16), transparent 50%),
    radial-gradient(circle at 20% 50%, rgba(243, 198, 79, 0.08), transparent 50%),
    var(--bg-primary);
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
}

.text-secondary-light {
  color: var(--text-muted);
}

.extra-small {
  font-size: 0.72rem;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Announcements & Promo Banner */
.promo-ticker-bar {
  background: linear-gradient(90deg, rgba(20, 20, 22, 0.95) 0%, rgba(158, 28, 78, 0.18) 100%);
  border: 1px solid rgba(243, 198, 79, 0.3);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45);
}

.promo-icon-box {
  width: 48px;
  height: 48px;
  background-color: rgba(243, 198, 79, 0.12);
  border: 1px solid rgba(243, 198, 79, 0.35);
  color: var(--gold-accent);
}

/* Search & Filter Panel */
.search-input-group {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  padding: 0.25rem;
  transition: border-color 0.2s ease;
}

.search-input-group:focus-within {
  border-color: var(--gold-accent);
  box-shadow: 0 0 12px rgba(243, 198, 79, 0.2);
}

.search-input-group input::placeholder {
  color: var(--text-muted);
}

.filter-panel {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
}

.dark-select {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
}

.dark-select:focus {
  background-color: var(--bg-primary);
  border-color: var(--gold-accent);
  color: var(--text-main);
  box-shadow: none;
}

.gold-range::-webkit-slider-thumb {
  background: var(--gold-accent);
}

/* Interactive Calendar Strip */
.calendar-date-pill {
  min-width: 72px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all 0.2s ease;
}

.calendar-date-pill:hover,
.calendar-date-pill.active {
  background-color: rgba(243, 198, 79, 0.14);
  border-color: var(--gold-accent);
  transform: translateY(-2px);
}

.date-pill-day {
  color: var(--gold-accent);
}

/* Shared Buttons & Badges from mte repo */
.hero-badge {
  background-color: rgba(158, 28, 78, 0.25);
  border: 1px solid var(--magenta-badge);
  color: var(--gold-accent);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  border-radius: 50px;
}

.browse-lineup-title {
  color: var(--gold-accent);
  letter-spacing: 1.5px;
}

.btn-register {
  color: var(--text-main);
  background-color: transparent;
  border: 1px solid var(--border-subtle);
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.btn-register:hover {
  background-color: rgba(243, 198, 79, 0.1);
  border-color: var(--gold-accent);
  color: var(--gold-accent);
}

.btn-login {
  background-color: var(--gold-accent);
  color: #0b0b0c;
  border: 1px solid var(--gold-accent);
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.btn-login:hover {
  background-color: var(--gold-accent-hover);
  border-color: var(--gold-accent-hover);
  color: #0b0b0c;
  box-shadow: 0 0 14px rgba(243, 198, 79, 0.35);
}

.btn-slider-ctrl {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
  border-radius: 50%;
  transition: all 0.25s ease;
}

.btn-slider-ctrl:hover {
  border-color: var(--gold-accent);
  color: var(--gold-accent);
}

/* Event Cards */
.event-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.event-card:hover {
  transform: translateY(-6px);
  background-color: var(--bg-surface-hover);
  border-color: rgba(243, 198, 79, 0.45);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.55);
}

.event-card .position-relative {
  overflow: hidden;
}

.event-card-img {
  height: 220px;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.event-card:hover .event-card-img {
  transform: scale(1.06);
}

.event-date-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  background-color: var(--magenta-badge);
  color: var(--text-main);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
}

/* Real-time Availability Badges */
.availability-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.32rem 0.7rem;
  border-radius: 6px;
  backdrop-filter: blur(8px);
}

.badge-available {
  background-color: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.6);
  color: #6ee7b7;
}

.badge-selling-fast {
  background-color: rgba(243, 198, 79, 0.22);
  border: 1px solid var(--gold-accent);
  color: var(--gold-accent);
}

.badge-low-stock {
  background-color: rgba(158, 28, 78, 0.85);
  border: 1px solid #f43f5e;
  color: #ffe4e6;
}

.badge-sold-out {
  background-color: rgba(39, 39, 42, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-muted);
}

.card-promo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(11, 11, 12, 0.92) 100%);
}

.event-category {
  color: var(--gold-muted);
  font-size: 0.76rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.event-card .card-title {
  color: var(--text-main);
  font-size: 1.15rem;
  transition: color 0.2s ease;
}

.event-card:hover .card-title {
  color: var(--gold-accent);
}

.event-card .card-text {
  color: var(--text-muted);
}

.event-card .card-text i {
  color: var(--gold-accent);
}

.announcement-chip {
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
}

.dark-progress {
  height: 6px;
  background-color: var(--bg-primary);
  border-radius: 6px;
}

.gold-progress-bar {
  background: linear-gradient(90deg, var(--magenta-badge), var(--gold-accent));
}

.card-starting-text {
  color: var(--text-muted);
  font-size: 0.75rem;
}

.card-price {
  color: var(--gold-accent);
  font-size: 1.15rem;
  letter-spacing: 0.3px;
}

/* Agenda Row View */
.agenda-row {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  transition: all 0.25s ease;
}

.agenda-row:hover {
  background-color: var(--bg-surface-hover);
  border-color: rgba(243, 198, 79, 0.4);
}

.agenda-date-box {
  width: 64px;
  height: 64px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-subtle);
}

.agenda-thumb {
  width: 64px;
  height: 64px;
  object-fit: cover;
}
</style>