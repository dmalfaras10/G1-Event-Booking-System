<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { categoriesData, announcementsData, eventsData } from '../data/eventsData.js'

const router = useRouter()

// --- DATA STATE ---
const categories = categoriesData
const announcements = ref(announcementsData)
const events = ref(eventsData)

// --- SEARCH, FILTER & VIEW STATE ---
const searchQuery = ref('')
const selectedCategory = ref('All')
const selectedLocation = ref('All')
const selectedVenue = ref('All')
const selectedGenre = ref('All')
const maxPrice = ref(15000)
const sortBy = ref('date-asc')
const viewMode = ref('grid') // 'grid' or 'agenda'
const activeAnnouncementIndex = ref(0)

// --- DATE RANGE PICKER STATE ---
const isDatePickerOpen = ref(false)
const datePickerRef = ref(null)
const minSelectableIso = '2026-11-13' // Dates before this show strikethrough
const baseCalendarDate = ref(new Date(2026, 10, 1)) // Nov 2026 (0-indexed month)

// Committed range used for filtering
const appliedStartDate = ref('')
const appliedEndDate = ref('')

// Draft range inside the open popover
const tempStartDate = ref('')
const tempEndDate = ref('')
const isSelectingEnd = ref(false)

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// --- CALENDAR GENERATION HELPERS ---
const toIsoDate = (year, month, day) => {
  const m = String(month + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

const formatToDDMMYYYY = (isoStr) => {
  if (!isoStr) return ''
  const [y, m, d] = isoStr.split('-')
  return `${m}-${d}-${y}`
}

const buildCalendarMonth = (year, month) => {
  const firstDayWeekIdx = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells = []

  // Leading days from previous month
  for (let i = firstDayWeekIdx - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i
    const prevDate = new Date(year, month - 1, dayNum)
    cells.push({
      key: `prev-${dayNum}`,
      dayNumber: dayNum,
      iso: toIsoDate(prevDate.getFullYear(), prevDate.getMonth(), dayNum),
      isCurrentMonth: false,
      isPast: true
    })
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = toIsoDate(year, month, d)
    cells.push({
      key: `curr-${iso}`,
      dayNumber: d,
      iso,
      isCurrentMonth: true,
      isPast: iso < minSelectableIso
    })
  }

  // Trailing days from next month to fill 42 cells (6 rows)
  const remaining = 42 - cells.length
  for (let n = 1; n <= remaining; n++) {
    const nextDate = new Date(year, month + 1, n)
    cells.push({
      key: `next-${n}`,
      dayNumber: n,
      iso: toIsoDate(nextDate.getFullYear(), nextDate.getMonth(), n),
      isCurrentMonth: false,
      isPast: false
    })
  }

  return {
    title: `${monthNamesShort[month]} ${year}`,
    cells
  }
}

const displayedCalendars = computed(() => {
  const y1 = baseCalendarDate.value.getFullYear()
  const m1 = baseCalendarDate.value.getMonth()
  const rightDate = new Date(y1, m1 + 1, 1)
  return [
    buildCalendarMonth(y1, m1),
    buildCalendarMonth(rightDate.getFullYear(), rightDate.getMonth())
  ]
})

const shiftCalendarMonths = (delta) => {
  baseCalendarDate.value = new Date(
    baseCalendarDate.value.getFullYear(),
    baseCalendarDate.value.getMonth() + delta,
    1
  )
}

const openDatePicker = () => {
  tempStartDate.value = appliedStartDate.value || minSelectableIso
  tempEndDate.value = appliedEndDate.value || tempStartDate.value
  isSelectingEnd.value = false
  isDatePickerOpen.value = !isDatePickerOpen.value
}

const selectCalendarDay = (cell) => {
  if (!cell.isCurrentMonth || cell.isPast) return

  if (!isSelectingEnd.value) {
    tempStartDate.value = cell.iso
    tempEndDate.value = cell.iso
    isSelectingEnd.value = true
  } else {
    if (cell.iso < tempStartDate.value) {
      tempEndDate.value = tempStartDate.value
      tempStartDate.value = cell.iso
    } else {
      tempEndDate.value = cell.iso
    }
    isSelectingEnd.value = false
  }
}

const isDaySelectedEndpoint = (cell) => {
  if (!cell.isCurrentMonth) return false
  return cell.iso === tempStartDate.value || cell.iso === tempEndDate.value
}

const isDayInRange = (cell) => {
  if (!cell.isCurrentMonth || !tempStartDate.value || !tempEndDate.value) return false
  return cell.iso > tempStartDate.value && cell.iso < tempEndDate.value
}

const tempRangeFooterText = computed(() => {
  if (!tempStartDate.value) return 'No date range selected'
  const start = formatToDDMMYYYY(tempStartDate.value)
  const end = formatToDDMMYYYY(tempEndDate.value || tempStartDate.value)
  return `${start} ~ ${end}`
})

const appliedRangeInputText = computed(() => {
  if (!appliedStartDate.value) return ''
  const start = formatToDDMMYYYY(appliedStartDate.value)
  const end = formatToDDMMYYYY(appliedEndDate.value || appliedStartDate.value)
  return `${start} ~ ${end}`
})

const clearDateRange = () => {
  tempStartDate.value = ''
  tempEndDate.value = ''
  appliedStartDate.value = ''
  appliedEndDate.value = ''
  isSelectingEnd.value = false
}

const cancelDateRange = () => {
  tempStartDate.value = appliedStartDate.value
  tempEndDate.value = appliedEndDate.value
  isSelectingEnd.value = false
  isDatePickerOpen.value = false
}

const applyDateRange = () => {
  appliedStartDate.value = tempStartDate.value
  appliedEndDate.value = tempEndDate.value || tempStartDate.value
  isSelectingEnd.value = false
  isDatePickerOpen.value = false
}

// Close popover when clicking outside
const handleClickOutside = (event) => {
  if (datePickerRef.value && !datePickerRef.value.contains(event.target)) {
    isDatePickerOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

// --- DROPDOWN FILTER OPTIONS ---
const locations = computed(() => ['All', ...new Set(events.value.map(e => e.location))])
const venues = computed(() => ['All', ...new Set(events.value.map(e => e.venueName))])
const genres = computed(() => ['All', ...new Set(events.value.map(e => e.genre))])

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
      const matchesPrice = evt.startingPrice <= maxPrice.value

      const eventDateIso = evt.eventStartDateTime.split('T')[0]
      const matchesDateRange =
        !appliedStartDate.value ||
        (eventDateIso >= appliedStartDate.value &&
          eventDateIso <= (appliedEndDate.value || appliedStartDate.value))

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesVenue &&
        matchesGenre &&
        matchesPrice &&
        matchesDateRange
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

// --- OTHER HELPERS & NAVIGATION ---
const formatPrice = (value) => '₱' + Number(value).toLocaleString('en-PH')

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

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
  selectedLocation.value = 'All'
  selectedVenue.value = 'All'
  selectedGenre.value = 'All'
  maxPrice.value = 15000
  sortBy.value = 'date-asc'
  clearDateRange()
}

const cycleAnnouncement = (direction) => {
  const total = announcements.value.length
  activeAnnouncementIndex.value = (activeAnnouncementIndex.value + direction + total) % total
}

const goToEventDetails = (eventId) => {
  router.push({ name: 'EventDetails', params: { id: eventId } })
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
                <span class="small text-secondary-light">
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

          <div class="d-flex align-items-center justify-content-end gap-2 flex-shrink-0">
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

      <!-- 2. PAGE HEADER & KEYWORD SEARCH BAR -->
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

      <!-- 3. CATEGORY PILLS, TICKETMASTER-STYLE DATE RANGE PICKER & FILTERS -->
      <section class="filter-panel rounded-4 p-3 p-md-4 mb-4">
        <div class="d-flex flex-column flex-xl-row align-items-xl-center justify-content-between gap-3 pb-3 border-bottom border-secondary border-opacity-25">
          <!-- Category Taxonomy Pills -->
          <div class="d-flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              class="btn btn-sm rounded-pill px-3 py-2 fw-semibold"
              :class="selectedCategory === cat ? 'btn-login' : 'btn-register'"
              @click="selectedCategory = cat"
            >
              {{ cat }}
            </button>
          </div>

          <!-- Ticketmaster-Style Date Range Picker + View Mode Icons -->
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <div ref="datePickerRef" class="position-relative date-range-wrapper">
              <div
                class="input-group input-group-sm date-range-trigger"
                :class="{ active: isDatePickerOpen || appliedStartDate }"
                @click="openDatePicker"
              >
                <span class="input-group-text date-trigger-icon">
                  <i class="bi bi-calendar3"></i>
                </span>
                <input
                  type="text"
                  readonly
                  class="form-control date-trigger-input shadow-none"
                  placeholder="Select date range"
                  :value="appliedRangeInputText"
                />
              </div>

              <!-- Dual-Month Calendar Popover -->
              <div v-if="isDatePickerOpen" class="date-range-popover rounded-3 shadow-lg p-3">
                <!-- Navigation Arrows -->
                <button
                  type="button"
                  class="btn btn-sm cal-nav-btn cal-nav-prev"
                  @click.stop="shiftCalendarMonths(-1)"
                  aria-label="Previous month"
                >
                  <i class="bi bi-chevron-left"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-sm cal-nav-btn cal-nav-next"
                  @click.stop="shiftCalendarMonths(1)"
                  aria-label="Next month"
                >
                  <i class="bi bi-chevron-right"></i>
                </button>

                <!-- Two Side-by-Side Months -->
                <div class="row g-4">
                  <div
                    v-for="cal in displayedCalendars"
                    :key="cal.title"
                    class="col-12 col-md-6"
                  >
                    <div class="text-center fw-bold text-white mb-2 cal-month-title">
                      {{ cal.title }}
                    </div>

                    <div class="cal-grid cal-weekdays mb-1">
                      <span
                        v-for="wd in weekDays"
                        :key="wd"
                        class="text-center fw-bold small text-secondary-light"
                      >
                        {{ wd }}
                      </span>
                    </div>

                    <div class="cal-grid">
                      <button
                        v-for="cell in cal.cells"
                        :key="cell.key"
                        type="button"
                        class="cal-day-btn"
                        :class="{
                          'cal-day-outside': !cell.isCurrentMonth,
                          'cal-day-past': cell.isCurrentMonth && cell.isPast,
                          'cal-day-selected': isDaySelectedEndpoint(cell),
                          'cal-day-in-range': isDayInRange(cell)
                        }"
                        :disabled="!cell.isCurrentMonth || cell.isPast"
                        @click.stop="selectCalendarDay(cell)"
                      >
                        {{ cell.dayNumber }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Popover Footer: Range Preview + Clear / Cancel / Apply -->
                <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2 pt-3 mt-3 border-top border-secondary border-opacity-25">
                  <span class="small fw-semibold text-warning">
                    {{ tempRangeFooterText }}
                  </span>

                  <div class="d-flex align-items-center gap-2 justify-content-end">
                    <button
                      type="button"
                      class="btn btn-sm btn-register px-3"
                      @click.stop="clearDateRange"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-cancel-range px-3"
                      @click.stop="cancelDateRange"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-login px-3"
                      @click.stop="applyDateRange"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Grid / Agenda View Switcher -->
            <div class="btn-group" role="group" aria-label="View toggle">
              <button
                type="button"
                class="btn btn-sm px-2.5"
                :class="viewMode === 'grid' ? 'btn-login' : 'btn-register'"
                @click="viewMode = 'grid'"
                title="Grid View"
              >
                <i class="bi bi-grid-fill"></i>
              </button>
              <button
                type="button"
                class="btn btn-sm px-2.5"
                :class="viewMode === 'agenda' ? 'btn-login' : 'btn-register'"
                @click="viewMode = 'agenda'"
                title="List View"
              >
                <i class="bi bi-list-ul"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Dropdown Filters: Location, Venue, Genre, Price, Sort -->
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

      <!-- 4A. EVENT LISTINGS: 3-COLUMN CARD GRID VIEW -->
      <section v-if="viewMode === 'grid' && filteredEvents.length > 0" class="mb-5">
        <div class="row g-4">
          <div
            v-for="event in filteredEvents"
            :key="event._id"
            class="col-md-6 col-lg-4"
          >
            <div class="card event-card h-100 rounded-4 overflow-hidden">
              <div class="position-relative">
                <img
                  :src="event.eventImage"
                  class="card-img-top event-card-img"
                  :alt="event.eventName"
                />

                <span
                  class="availability-badge"
                  :class="getAvailabilityBadgeClass(event.availabilityStatus)"
                >
                  <i class="bi bi-circle-fill me-1 extra-small"></i>
                  {{ event.availabilityStatus }}
                </span>

                <span class="event-date-badge">
                  <i class="bi bi-calendar3 me-1"></i>{{ event.dateBadge }}
                </span>

                <div class="card-promo-overlay px-3 py-1 d-flex justify-content-between align-items-center">
                  <span class="extra-small fw-semibold text-warning">
                    <i class="bi bi-lightning-charge-fill me-1"></i>{{ event.promoBanner }}
                  </span>
                  <span class="extra-small text-white">
                    <i class="bi bi-clock me-1"></i>{{ event.timeFormatted }}
                  </span>
                </div>
              </div>

              <div class="card-body d-flex flex-column p-4">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="event-category">{{ event.eventCategory }}</span>
                  <span class="extra-small text-secondary-light">{{ event.genre }}</span>
                </div>

                <h5
                  class="card-title fw-bold mb-1"
                  style="cursor: pointer;"
                  @click="goToEventDetails(event._id)"
                >
                  {{ event.eventName }}
                </h5>
                <p class="small text-warning mb-2 fw-medium">
                  <i class="bi bi-person-badge me-1"></i>{{ event.artistName }}
                </p>

                <p class="card-text small mb-3 line-clamp-2">
                  {{ event.eventDescription }}
                </p>

                <p class="card-text small mb-2">
                  <i class="bi bi-geo-alt me-1"></i>{{ event.venueName }} &bull;
                  <span class="text-white">{{ event.location }}</span>
                </p>

                <div class="announcement-chip rounded-2 px-2 py-1 mb-3 extra-small">
                  <i class="bi bi-info-circle text-warning me-1"></i>
                  {{ event.announcement }}
                </div>

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
                    @click="goToEventDetails(event._id)"
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

      <!-- 4B. EVENT LISTINGS: CALENDAR AGENDA LIST VIEW -->
      <section v-else-if="viewMode === 'agenda' && filteredEvents.length > 0" class="mb-5">
        <div class="d-flex flex-column gap-3">
          <div
            v-for="event in filteredEvents"
            :key="event._id"
            class="agenda-row rounded-4 p-3 p-md-4 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3"
          >
            <div class="d-flex align-items-center gap-3">
              <div class="agenda-date-box rounded-3 text-center d-flex flex-column justify-content-center flex-shrink-0">
                <span class="extra-small fw-bold text-warning text-uppercase">{{ event.dayOfWeek }}</span>
                <span class="fs-4 fw-bold text-white lh-1 my-1">{{ event.dayNumber }}</span>
                <span class="extra-small text-secondary-light">{{ event.monthShort }}</span>
              </div>

              <img
                :src="event.eventImage"
                :alt="event.eventName"
                class="agenda-thumb rounded-3 d-none d-sm-block flex-shrink-0"
              />

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
                <h5
                  class="fw-bold text-white mb-1"
                  style="cursor: pointer;"
                  @click="goToEventDetails(event._id)"
                >
                  {{ event.eventName }}
                </h5>
                <p class="small text-secondary-light mb-0">
                  <i class="bi bi-person-badge text-warning me-1"></i>{{ event.artistName }} &nbsp;|&nbsp;
                  <i class="bi bi-geo-alt text-warning me-1"></i>{{ event.venueName }}, {{ event.location }}
                </p>
              </div>
            </div>

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
                @click="goToEventDetails(event._id)"
              >
                <i class="bi bi-ticket-perforated me-1"></i>
                {{ event.availabilityStatus === 'Sold Out' ? 'Sold Out' : 'Select Seats' }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- EMPTY STATE -->
      <section v-else class="text-center py-5 my-4 filter-panel rounded-4">
        <i class="bi bi-calendar-x display-4 text-warning mb-3 d-block"></i>
        <h4 class="fw-bold text-white">No Matching Events Found</h4>
        <p class="text-secondary-light small mx-auto mb-4" style="max-width: 440px;">
          No events match your current search or selected date range. Try clearing your filters or adjusting your date range.
        </p>
        <button type="button" class="btn btn-login px-4 py-2" @click="resetFilters">
          <i class="bi bi-arrow-counterclockwise me-1"></i>Clear Filters &amp; View All
        </button>
      </section>

      <!-- 5. VIP MEMBERSHIP & PRESALE PROMOTION BANNER -->
      <section class="py-3">
        <div class="card event-card p-4 p-md-5 rounded-4 border-warning border-opacity-50 position-relative overflow-hidden">
          <div class="row align-items-center g-4">
            <div class="col-lg-8">
              <span class="hero-badge mb-2 d-inline-block p-2">
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

/* Ticketmaster-Style Date Range Picker */
.date-range-trigger {
  width: 255px;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid var(--border-subtle);
  background-color: var(--bg-primary);
  transition: all 0.2s ease;
}

.date-range-trigger:hover,
.date-range-trigger.active {
  border-color: var(--gold-accent);
  box-shadow: 0 0 0 2px rgba(243, 198, 79, 0.2);
}

.date-trigger-icon {
  background-color: var(--bg-surface);
  border: none;
  border-right: 1px solid var(--border-subtle);
  color: var(--gold-accent);
}

.date-trigger-input {
  background-color: transparent !important;
  border: none !important;
  color: var(--text-main) !important;
  font-size: 0.84rem;
  cursor: pointer;
}

.date-trigger-input::placeholder {
  color: var(--text-muted);
}

.date-range-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 560px;
  max-width: 92vw;
  background-color: var(--bg-surface);
  border: 1px solid rgba(243, 198, 79, 0.35);
  z-index: 1050;
}

.cal-month-title {
  font-size: 0.95rem;
}

.cal-nav-btn {
  position: absolute;
  top: 12px;
  color: var(--text-main);
  background: transparent;
  border: none;
}

.cal-nav-btn:hover {
  color: var(--gold-accent);
}

.cal-nav-prev {
  left: 12px;
}

.cal-nav-next {
  right: 12px;
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.cal-day-btn {
  height: 34px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--text-main);
  font-size: 0.82rem;
  font-weight: 500;
  transition: all 0.15s ease;
}

.cal-day-btn:hover:not(:disabled) {
  background-color: rgba(243, 198, 79, 0.2);
  color: var(--gold-accent);
}

.cal-day-outside {
  color: rgba(156, 163, 175, 0.3);
  cursor: default;
}

.cal-day-past {
  color: rgba(156, 163, 175, 0.45);
  text-decoration: line-through;
  cursor: not-allowed;
}

.cal-day-selected {
  background-color: var(--gold-accent) !important;
  color: #0b0b0c !important;
  font-weight: 700;
}

.cal-day-in-range {
  background-color: rgba(243, 198, 79, 0.16);
  color: var(--gold-accent);
  border-radius: 0;
}

.btn-cancel-range {
  background-color: #2b2b30;
  color: var(--text-main);
  border: 1px solid var(--border-subtle);
  font-size: 0.85rem;
}

.btn-cancel-range:hover {
  background-color: #38383f;
  color: #ffffff;
}

/* Shared Buttons & Badges */
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