<template>
  <div class="event-page">
    <!-- ============ LEFT COLUMN: EVENT CONTENT ============ -->
    <div class="event-content">

      <!-- Hero banner (switches when a thumbnail below is clicked) -->
      <div class="banner">
        <div class="banner-media">
          <img v-if="heroImages[activeImage]?.src" :key="activeImage" :src="heroImages[activeImage].src" :alt="heroImages[activeImage].alt || event.name" class="banner-img">
        </div>
        <div class="badge-row">
          <span class="badge badge-magenta">15% Off with Gold VIP</span>
          <span class="badge badge-dark">Includes Sky-Deck Lounge Access</span>
        </div>
        <div class="banner-strip">
          <div class="strip-left">
            <i class="bi bi-water"></i> Palace Pool Deck — Open Air
            <span class="strip-sep">|</span>
            <span class="strip-detail">Line-array delay towers · 103 dB(A)</span>
          </div>
          <div class="strip-right">
            <i class="bi bi-ticket-perforated"></i> {{ totalSeatsLeft }} {{ totalSeatsLeft === 1 ? 'Seat' : 'Seats' }} Left
          </div>
        </div>
      </div>

      <!-- Gallery thumbnails (click to switch the hero banner) -->
      <div class="thumb-row">
        <div v-for="(img, i) in heroImages" :key="i"
             :class="['thumb', { active: activeImage === i }]"
             @click="activeImage = i">
        </div>
      </div>

      <span class="event-kicker"><i class="bi bi-moon-stars-fill"></i> Manila After Dark Series // Volume I</span>
      <h1 class="event-title">{{ event.name }}</h1>

      <!-- Meta row: 4 quick facts in a single panel -->
      <div class="meta-grid">
        <div class="meta-card">
          <div class="meta-label">Date &amp; Evening</div>
          <div class="meta-value"><i class="bi bi-calendar-event"></i> {{ dateLong }}</div>
          <div class="meta-sub">Gates &amp; pool deck open at {{ doorsOpen }}</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Show Start</div>
          <div class="meta-value"><i class="bi bi-clock"></i> {{ time24 }} Sharp</div>
          <div class="meta-sub">DJ Kaito warm-up from {{ warmUpTime }}</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Venue</div>
          <div class="meta-value"><i class="bi bi-geo-alt"></i> {{ event.venueName }}</div>
          <div class="meta-sub">{{ event.address }}</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Dress Code</div>
          <div class="meta-value"><i class="bi bi-sunglasses"></i> Noir Cocktail</div>
          <div class="meta-sub">Pool deck closes at 22:00</div>
        </div>
      </div>

      <!-- Program notes & repertoire -->
      <div class="event-section">
        <div class="section-head">
          <h2 class="section-title">Event Details</h2>
        </div>
        <p class="lead">{{ event.description }}</p>
        <p class="lead">
          Headlining the night is DJ Kaito, whose live modular patches are answered in real time by the Nocturne Philharmonic — a single continuous set with no interval, built to move from ambient strings to peak-time house without a break.
        </p>
      </div>

      <!-- Featured artist -->
      <div class="event-section">
        <div class="section-head">
          <h2 class="section-title">Featured Artist</h2>
        </div>
        <div class="artist-profile">
          <div class="artist-name">{{ event.artist }}</div>
          <p class="lead">{{ event.artistDescription }}</p>
        </div>
      </div>

    </div>

    <!-- ============ RIGHT COLUMN: BOOKING PANEL ============ -->
    <div class="booking-panel">
      <div class="booking-card">

        <!-- Allocation header -->
        <div class="allocation">
          <span class="alloc-badge">Patron Allocation</span>
          <span class="alloc-badge alloc-active">Founder Allocation Active</span>
        </div>

        <!-- Price range -->
        <div class="price-range">
          <span class="price-big">{{ priceRange }}</span>
          <span class="price-sub">/ attendee</span>
        </div>
        <p class="price-note">All admissions include one Sky-Deck drink voucher and a commemorative wristband.</p>

        <!-- Tier selector title -->
        <div class="tier-title">
          <span class="tier-label">Select Your Access Tier</span>
        </div>

        <!-- Ticket tiers -->
        <div class="tiers">
          <div v-for="tier in tiers" :key="tier.id"
               :class="['tier-card', { selected: selectedTierId === tier.id }]"
               @click="selectTier(tier)">
            <input type="radio" :name="eventId" :id="tier.id"
                   :checked="selectedTierId === tier.id" @change="selectTier(tier)" class="tier-radio">
            <div class="tier-body">
              <div class="tier-name-row">
                <span class="tier-name">{{ tier.name }}</span>
                <span class="tier-price">{{ peso(tier.price) }}</span>
              </div>
              <p class="tier-desc">{{ tier.desc }}</p>
              <span v-if="tier.badge" class="tier-badge">{{ tier.badge }}</span>
            </div>
          </div>
        </div>

        <!-- Attendees -->
        <div class="attendees">
          <label class="att-label">Attendees</label>
          <div class="att-control">
            <button class="att-btn" :disabled="!selectedTier || qty <= 1" @click="changeQty(-1)">−</button>
            <span class="att-qty">{{ qty }}</span>
            <button class="att-btn" :disabled="!selectedTier || qty >= maxQty" @click="changeQty(1)">+</button>
          </div>
          <span class="att-note">Max 6 seats per patron order</span>
        </div>

        <!-- Sold-out guard -->
        <div v-if="allSoldOut" class="alert alert-danger mt-3">
          <i class="bi bi-exclamation-triangle-fill"></i> All seating tiers are currently sold out.
        </div>

        <!-- Perks included with the selected seating tier -->
        <div class="addons-section">
          <h4 class="addons-title">Included With Your Seating</h4>
          <ul v-if="selectedTier" class="perks-list">
            <li v-for="perk in selectedTier.perks" :key="perk" class="perk-item">{{ perk }}</li>
          </ul>
          <p v-else class="perks-empty">Select a seating tier to see what is included.</p>
        </div>

        <!-- Order summary: dynamic line items derived from user selection -->
        <div class="order-summary">
          <div v-if="selectedTier" class="order-line">
            <span class="order-line-name">Pass Allocation ({{ selectedTier.name }} × {{ qty }})</span>
            <span class="order-line-price">{{ peso(tiersSubtotal) }}</span>
          </div>
          <div v-if="serviceFee > 0" class="order-line">
            <span class="order-line-name">Concierge &amp; Facilities Surcharge (10%)</span>
            <span class="order-line-price">{{ peso(serviceFee) }}</span>
          </div>
          <div v-if="!selectedTier" class="order-empty">
            Select a seating tier to see your order summary.
          </div>
          <div class="order-divider"></div>
          <!-- TOTAL INVESTMENT left, Taxes Included right, big total below -->
          <div class="order-total-header">
            <span class="order-total-label">TOTAL INVESTMENT</span>
            <span class="order-tax-right">Taxes Included</span>
          </div>
          <span class="order-total-big">{{ peso(orderTotal) }}</span>
        </div>

        <!-- Checkout -->
        <button class="btn btn-gold w-100 checkout-btn" :disabled="!canCheckout" @click="goToPayment">
          {{ canCheckout ? 'Proceed to Secure Checkout' : 'Select seating to continue' }}
        </button>
        <p class="secure-note">256-Bit Encrypted Concession Handoff · 100% Verified</p>

      </div>

      <!-- Special Patron Accommodations (completely separate from booking card) -->
      <div class="patron-accom">
        <div class="accom-row">
          <span class="accom-icon">🎟️</span>
          <div class="accom-text">
            <div class="accom-title">Special Patron Accommodations?</div>
            <div class="accom-sub">Speak directly with Head Concierge Vivienne at ext. 408 for ADA seating or dietary requests.</div>
          </div>
        </div>
      </div>

    </div>

    <!-- Seat selection sits between tier choice and checkout -->
    <SeatSelection
      v-if="step === 'seats'"
      :event-name="eventName"
      :venue="venueName"
      :when="dateLong + ' · ' + time24"
      :tier="selectedTier"
      :tiers="tiers"
      :qty="qty"
      :initial-seats="selectedSeats"
      @close="closeSeats"
      @confirm="onSeatsConfirmed"
    />

    <!-- Checkout steps live in components/BookingCheckout.vue -->
    <BookingCheckout
      v-if="step === 'payment'"
      :event-name="eventName"
      :venue="venueName"
      :when="dateLong + ' · ' + time24"
      :tier-name="selectedTier?.name"
      :tier-id="selectedTierId || ''"
      :qty="qty"
      :seats="selectedSeats"
      :subtotal="(selectedTier?.price || 0) * qty"
      :service-fee="serviceFee"
      :total="orderTotal"
      :currency="'₱'"
      :code-prefix="'G1-NNS'"
      @close="step = 'seats'"
      @reset="resetFlow"
    />
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import BookingCheckout from '../components/BookingCheckout.vue'
import SeatSelection from '../components/SeatSelection.vue'

// ---------------------------------------------------------------------------
// Mock payload — same shape as the documents in src/data/mockEvents.js (the
// admin event-listing schema) so this page can later be pointed at a store or
// API response without rewriting the template:
//   id, image, name, artist, artistDescription, category, description,
//   date, status, venueName, address, venueCapacity,
//   tickets[{ ticketType, ticketDescription, ticketPerks, perksInput, price,
//             seatSection, seatRow, quantity,
//             seats[{ seatRow, seatNumber, code, status }] }]
// ---------------------------------------------------------------------------
const buildSeats = (row, count, soldIndices = [], holdIndices = []) =>
  Array.from({ length: count }, (_, i) => {
    const num = i + 1
    let status = 'available'
    if (soldIndices.includes(num)) status = 'sold'
    else if (holdIndices.includes(num)) status = 'hold'
    return { seatRow: row, seatNumber: num, code: `${row}-${num}`, status }
  })

const POSTER_IMAGE = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80'

const event = {
  id: 1,
  image: POSTER_IMAGE,
  name: 'Neon Noir Symphony: Manila Edition',
  artist: 'Nocturne Philharmonic & DJ Kaito',
  artistDescription:
    'A collaborative powerhouse pairing Manila’s progressive 24-piece chamber orchestra with Tokyo-based electronic producer DJ Kaito — one continuous bill that moves from ambient strings to peak-time house without a break.',
  category: 'Live Concert',
  description:
    'An immersive nocturnal audiovisual takeover on the Palace pool deck, where a 24-piece string ensemble and deep melodic synth sets trade the same stage from dusk until the last light leaves the water.',
  date: '2026-11-21T20:00:00',
  status: 'Upcoming',
  venueName: 'The Palace Pool Club',
  address: 'BGC, Taguig',
  venueCapacity: 120,
  tickets: [
    {
      ticketType: 'Bronze — Pool Deck General Admission',
      ticketDescription: 'Standing room around the pool deck with full sight lines to the stage, DJ booth and delay towers.',
      ticketPerks: ['Pool Deck Standing Access', 'Sky-Deck Drink Voucher', 'Commemorative Wristband'],
      perksInput: 'Pool Deck Standing Access, Sky-Deck Drink Voucher, Commemorative Wristband',
      price: 4800.0,
      seatSection: 'Pool Deck GA',
      seatRow: 'B',
      quantity: 24,
      seats: buildSeats('B', 24, [1, 2, 3, 4, 5], [6])
    },
    {
      ticketType: 'Silver — Sky-Deck Lounge',
      ticketDescription: 'Elevated sky-deck with a dedicated bar, lounge seating and a private balcony rail above the crowd.',
      ticketPerks: ['Sky-Deck Lounge Access', 'Dedicated Bar Lane', 'Reserved Balcony Rail'],
      perksInput: 'Sky-Deck Lounge Access, Dedicated Bar Lane, Reserved Balcony Rail',
      price: 7500.0,
      seatSection: 'Sky-Deck Lounge',
      seatRow: 'C',
      quantity: 30,
      seats: buildSeats('C', 30, [1, 2, 3, 4], [5])
    },
    {
      ticketType: 'Gold — Noir VIP Cabana',
      ticketDescription: 'Private four-seat cabana with butler service, bottle service and a poolside daybed reserved for the night.',
      ticketPerks: ['Private Cabana for Four', 'Butler & Bottle Service', 'Poolside Daybed'],
      perksInput: 'Private Cabana for Four, Butler & Bottle Service, Poolside Daybed',
      price: 12000.0,
      seatSection: 'VIP Deck',
      seatRow: 'A',
      quantity: 10,
      seats: buildSeats('A', 10, [1, 2, 3], [4])
    }
  ]
}

// ---- Hero gallery (first slide is the event poster) ----
const heroImages = ref([
  { src: POSTER_IMAGE, alt: 'Palace pool deck at night' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80', alt: 'Crowd under the neon rig' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80', alt: 'Light rig over the pool deck' },
  { src: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=900&q=80', alt: 'String section on stage' },
])
const activeImage = ref(0)

// ---- Derived event facts (everything below reads from `event`) ----
const hhmm = (d) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`

const eventId = 'evt-' + String(event.id).padStart(3, '0')
const eventName = event.name
const venueName = event.venueName

const eventDate = new Date(event.date)
const dateLong = eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
const dateShort = eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
const time24 = hhmm(eventDate)
const doorsOpen = hhmm(new Date(eventDate.getTime() - 60 * 60 * 1000))
const warmUpTime = hhmm(new Date(eventDate.getTime() - 45 * 60 * 1000))

// ---- Ticket tiers --------------------------------------------------------
// The booking UI (and SeatSelection) speak in "tiers" with id/name/price/
// capacity, while the payload speaks in "tickets" with seats[]. `capacity` is
// the number of seats still on sale, derived from the seat statuses so sold or
// held seats in the mock data immediately shrink the allocation.
const seatsAvailable = (ticket) => (ticket.seats || []).filter(s => s.status === 'available').length

const tiers = computed(() =>
  event.tickets.map((ticket, i) => ({
    id: `tier_${i + 1}`,
    name: ticket.ticketType,
    price: Number(ticket.price) || 0,
    capacity: seatsAvailable(ticket),
    desc: ticket.ticketDescription,
    badge: (ticket.ticketPerks && ticket.ticketPerks[0]) || null,
    seatSection: ticket.seatSection,
    seatRow: ticket.seatRow,
    perks: ticket.ticketPerks || []
  }))
)

// ---- Booking state ----
const step = ref('select')
const selectedTierId = ref(null)
const qty = ref(1)
const selectedSeats = ref([])
const holdExpired = ref(false)

// ---- Computed ----
const selectedTier = computed(() => tiers.value.find(t => t.id === selectedTierId.value))
const allSoldOut = computed(() => tiers.value.every(t => t.capacity === 0))
const canCheckout = computed(() => !!selectedTier.value && qty.value > 0 && selectedTier.value.capacity > 0 && !holdExpired.value)

// ---- Attendees ----
// Per-order cap from the UI note. The effective max is the smaller of the tier's
// remaining capacity and this per-order cap, so the note and the +/- buttons agree.
const MAX_SEATS_PER_ORDER = 6
const maxQty = computed(() => Math.min(selectedTier.value?.capacity ?? MAX_SEATS_PER_ORDER, MAX_SEATS_PER_ORDER))

const tiersSubtotal = computed(() => (selectedTier.value ? selectedTier.value.price * qty.value : 0))
const serviceFee = computed(() => Math.round(tiersSubtotal.value * 0.10))
const orderTotal = computed(() => tiersSubtotal.value + serviceFee.value)

// ---- Formatters ----
const peso = (v) => '₱' + Number(v).toLocaleString('en-PH')

// ---- Derived pricing & availability (all read from the ticket tiers) ----
const priceRange = computed(() => {
  const prices = tiers.value.map(t => t.price).filter(p => p > 0)
  if (!prices.length) return '—'
  const low = Math.min(...prices)
  const high = Math.max(...prices)
  return low === high ? peso(low) : `${peso(low)} — ${peso(high)}`
})
const totalSeatsLeft = computed(() => tiers.value.reduce((sum, t) => sum + t.capacity, 0))

// ---- Actions ----
function selectTier(t) {
  if (t.capacity === 0) return
  selectedTierId.value = t.id
  qty.value = Math.min(qty.value, maxQty.value)
}
function changeQty(d) {
  if (!selectedTier.value) return
  const next = qty.value + d
  if (next < 1 || next > maxQty.value) return
  qty.value = next
}

function goToPayment() {
  if (!canCheckout.value) return
  step.value = 'seats'
}

function onSeatsConfirmed(seats) {
  selectedSeats.value = seats
  step.value = 'payment'
}

function closeSeats() {
  step.value = 'select'
  selectedSeats.value = []
}

function resetFlow() {
  step.value = 'select'
  selectedSeats.value = []
  selectedTierId.value = null
  qty.value = 1
  holdExpired.value = false
}
</script>

<style scoped src="../assets/EventDetailsPage.css"></style>