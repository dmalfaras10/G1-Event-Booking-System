<template>
  <div class="event-page">
    <!-- ============ LEFT COLUMN: EVENT CONTENT ============ -->
    <div class="event-content">

      <!-- Hero banner (switches when a thumbnail below is clicked) -->
      <div class="banner">
        <div class="banner-media">
          <img v-if="heroImages[activeImage]?.src" :key="activeImage" :src="heroImages[activeImage].src" class="banner-img" alt="">
        </div>
        <div class="badge-row">
          <span class="badge badge-magenta">Silver &amp; Gold Priority</span>
          <span class="badge badge-dark">Includes 1 Rare Single Malt Pairing</span>
        </div>
        <div class="banner-strip">
          <div class="strip-left">
            <i class="bi bi-cup-hot"></i> {{ venueName }} — Listening Room
            <span class="strip-sep">|</span>
            <span class="strip-detail">{{ venueCapacity }} seats · No amplification</span>
          </div>
          <div class="strip-right">
            <i class="bi bi-ticket-perforated"></i> {{ totalSeatsLeft }} Seats Left
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

      <span class="event-kicker"><i class="bi bi-moon-stars-fill"></i> Makati Speakeasy Series // Volume III</span>
      <h1 class="event-title">{{ eventTitle }}</h1>

      <!-- Meta row: 4 quick facts in a single panel -->
      <div class="meta-grid">
        <div class="meta-card">
          <div class="meta-label">Date &amp; Evening</div>
          <div class="meta-value"><i class="bi bi-calendar-event"></i> {{ dateLong }}</div>
          <div class="meta-sub">Members’ door from 21:00</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">First Set</div>
          <div class="meta-value"><i class="bi bi-clock"></i> {{ time24 }} Sharp</div>
          <div class="meta-sub">Two sets · one jam session</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Venue</div>
          <div class="meta-value"><i class="bi bi-geo-alt"></i> {{ venueName }}</div>
          <div class="meta-sub">{{ venueAddress }}</div>
        </div>
      </div>

      <!-- Program notes & repertoire -->
      <div class="event-section">
        <div class="section-head">
          <h2 class="section-title">Event Details</h2>
        </div>
        <p class="lead">
          {{ mockEvent.description }}
        </p>
        <p class="lead">
          The Harlem Speakeasy Quartet plays two sets with a guest on muted trumpet, then hands the room over for a late jam session — sign up at the bar, and the quartet will call you up.
        </p>
      </div>

      <!-- Featured artist -->
      <div class="event-section">
        <div class="section-head">
          <h2 class="section-title">Featured Artist</h2>
        </div>
        <div class="artist-profile">
          <div class="artist-name">{{ mockEvent.artist }}</div>
          <p class="lead">{{ mockEvent.artistDescription }}</p>
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
          <span class="price-big">{{ peso(minPrice) }} — {{ peso(maxPrice) }}</span>
          <span class="price-sub">/ attendee</span>
        </div>
        <p class="price-note">Every admission includes one rare single malt pour and a listening-room programme.</p>

        <!-- Tier selector title -->
        <div class="tier-title">
          <span class="tier-label">Select Your Banquette</span>
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
      :code-prefix="'G1-MSA'"
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
// Mock event — same shape as src/data/mockEvents.js (the schema AdminEventListing
// reads), so the listing, the admin table and this page stay in sync.
// id 4 → route /events/evt-004.
// ---------------------------------------------------------------------------
const buildSeats = (row, count, soldIndices = [], holdIndices = []) =>
  Array.from({ length: count }, (_, i) => {
    const num = i + 1
    let status = 'available'
    if (soldIndices.includes(num)) status = 'sold'
    else if (holdIndices.includes(num)) status = 'hold'
    return { seatRow: row, seatNumber: num, code: `${row}-${num}`, status }
  })

const mockEvent = {
  id: 4,
  image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=900&q=80',
  name: 'Midnight Saxophone Salon',
  artist: 'The Harlem Speakeasy Quartet',
  artistDescription:
    'New York-trained bebop outfit that came up through the Harlem loft scene, pairing smoky 1940s tenor standards with late-night brass improvisation. Their annual Manila residency is limited to three rooms and never amplified.',
  category: 'Jazz & Lounge',
  description:
    'An intimate 80-seat speakeasy jazz session behind an unmarked door on Chino Roces, where brass standards are played acoustically at conversational volume, every admission includes one rare single malt pour, and the back bar never closes.',
  date: '2026-12-12T21:30:00',
  status: 'Upcoming',
  venueName: 'The Spirits Library',
  address: 'Makati City',
  venueCapacity: 80,
  tickets: [
    {
      ticketType: 'Bronze — Bar Stool',
      ticketDescription:
        'A backless stool at the long back bar with a clear sight line to the quartet and first call on the bartenders.',
      ticketPerks: ['Back-Bar Seat', 'Late Jam Session Sign-Up'],
      perksInput: 'Back-Bar Seat, Late Jam Session Sign-Up',
      price: 2800.00,
      seatSection: 'Back Bar',
      seatRow: 'B',
      quantity: 24,
      seats: buildSeats('B', 24, [1, 2, 3, 4, 5, 6, 7, 8], [9, 10]),
      badge: null
    },
    {
      ticketType: 'Silver — Banquette Seat',
      ticketDescription:
        'A cushioned seat at an east-wall banquette with full table service and one rare single malt pour from the back-bar reserve.',
      ticketPerks: ['1 Rare Single Malt Pairing', 'Dedicated Table Service'],
      perksInput: '1 Rare Single Malt Pairing, Dedicated Table Service',
      price: 4500.00,
      seatSection: 'East-Wall Banquette',
      seatRow: 'S',
      quantity: 20,
      seats: buildSeats('S', 20, [1, 2, 3, 4, 5, 6], [7, 8]),
      badge: 'Includes 1 Rare Single Malt Pairing'
    },
    {
      ticketType: 'Gold — Private Booth',
      ticketDescription:
        'A velvet booth for four in the back reserve, with a dedicated pour from the owner’s shelf, coat check and a signed listening-room programme.',
      ticketPerks: ['Private Booth for Four', 'Owner’s Reserve Pour', 'Coat Check'],
      perksInput: 'Private Booth for Four, Owner’s Reserve Pour, Coat Check',
      price: 6500.00,
      seatSection: 'Back-Reserve Booth',
      seatRow: 'G',
      quantity: 8,
      seats: buildSeats('G', 8, [1, 2, 3, 4], []),
      badge: 'Most Requested'
    }
  ]
}

// ---- Event identity (mirrors the props the seat/checkout modals expect) ----
const eventId = `evt-${String(mockEvent.id).padStart(3, '0')}`
const eventName = mockEvent.name
const venueName = mockEvent.venueName
const venueAddress = mockEvent.address
const venueCapacity = mockEvent.venueCapacity

const eventDate = new Date(mockEvent.date)
const dateLong = new Intl.DateTimeFormat('en-US', {
  weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
}).format(eventDate)
const dateShort = new Intl.DateTimeFormat('en-US', {
  weekday: 'short', month: 'short', day: 'numeric',
}).format(eventDate)
const time24 = `${String(eventDate.getHours()).padStart(2, '0')}:${String(eventDate.getMinutes()).padStart(2, '0')}`

// ---- Tiers: the booking panel only needs name / price / remaining capacity /
//      copy / badge, so each ticket is narrowed down to that shape. ----
const TIER_IDS = ['tier_bronze', 'tier_silver', 'tier_gold']
const availableSeats = (ticket) => ticket.seats.filter((s) => s.status === 'available').length

const tiers = computed(() =>
  mockEvent.tickets.map((ticket, i) => ({
    id: TIER_IDS[i] || `tier_${i + 1}`,
    name: ticket.ticketType,
    price: ticket.price,
    capacity: availableSeats(ticket),
    desc: ticket.ticketDescription,
    perks: ticket.ticketPerks || [],
    badge: ticket.badge || null
  }))
)

const minPrice = computed(() => Math.min(...mockEvent.tickets.map((t) => t.price)))
const maxPrice = computed(() => Math.max(...mockEvent.tickets.map((t) => t.price)))
const totalSeatsLeft = computed(() => tiers.value.reduce((sum, t) => sum + t.capacity, 0))
const eventTitle = computed(
  () => `${mockEvent.name}: An ${venueCapacity}-Seat Bebop Session at ${venueName}`
)

// ---- Hero gallery (first slide is the event's listing image) ----
const heroImages = ref([
  { src: mockEvent.image, alt: 'Dimly lit speakeasy bar' },
  { src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80', alt: 'Saxophone under a single lamp' },
  { src: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80', alt: 'Back-bar single malt reserve' },
  { src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80', alt: 'Banquette seating along the east wall' },
])
const activeImage = ref(0)

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