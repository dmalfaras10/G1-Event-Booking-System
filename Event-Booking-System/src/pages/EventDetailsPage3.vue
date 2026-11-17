<template>
  <div class="event-page">
    <!-- ============ LEFT COLUMN: EVENT CONTENT ============ -->
    <div class="event-content">

      <!-- Hero banner (switches when a thumbnail below is clicked) -->
      <div class="banner">
        <div class="banner-media">
          <!-- TODO: fill in the src values in heroImages (script) — banner auto-switches on thumb click -->
          <img v-if="heroImages[activeImage]?.src" :key="activeImage" :src="heroImages[activeImage].src" class="banner-img" alt="">
        </div>
        <div class="badge-row">
          <span class="badge badge-magenta">Complimentary Champagne</span>
        </div>
        <div class="banner-strip">
          <div class="strip-left">
            <i class="bi bi-stars"></i> {{ venueName }} — Candlelit
            <span class="strip-sep">|</span>
            <span class="strip-detail">{{ event.venueCapacity }} covers · Four-course service</span>
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
          <!-- TODO: thumbnails render automatically once src is set in heroImages -->
        </div>
      </div>

      <span class="event-kicker"><i class="bi bi-snow"></i> {{ event.category }} // Masquerade IV</span>
      <h1 class="event-title">
        {{ eventName }}: Vivaldi Recomposed at {{ venueName }}
      </h1>

      <!-- Meta row: 4 quick facts in a single panel -->
      <div class="meta-grid">
        <div class="meta-card">
          <div class="meta-label">Date &amp; Evening</div>
          <div class="meta-value"><i class="bi bi-calendar-event"></i> {{ dateLong }}</div>
          <div class="meta-sub">Champagne reception at 18:30</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Curtain</div>
          <div class="meta-value"><i class="bi bi-clock"></i> {{ time24 }} Sharp</div>
          <div class="meta-sub">Mask check from 18:00</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Venue</div>
          <div class="meta-value"><i class="bi bi-bank2"></i> {{ venueName }}</div>
          <div class="meta-sub">{{ address }}</div>
        </div>
      </div>

      <!-- Program notes & repertoire -->
      <div class="event-section">
        <div class="section-head">
          <h2 class="section-title">Event Details</h2>
        </div>
        <p class="lead">
          {{ event.description }}
        </p>
        <p class="lead">
          The {{ event.artist }} performs on gut strings and period bows at baroque pitch, with a 1920s bandoneón joining for the Piazzolla. Masks are worn until the midnight toast and provided at the cloakroom.
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
          <span class="price-big">{{ peso(priceRange.min) }} — {{ peso(priceRange.max) }}</span>
          <span class="price-sub">/ attendee</span>
        </div>
        <p class="price-note">Every admission includes the four-course dinner, vintage Champagne reception and a souvenir mask.</p>

        <!-- Tier selector title -->
        <div class="tier-title">
          <span class="tier-label">Select Your Table</span>
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
      :code-prefix="'G1-WMG'"
      @close="step = 'seats'"
      @reset="resetFlow"
    />
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import BookingCheckout from '../components/BookingCheckout.vue'
import SeatSelection from '../components/SeatSelection.vue'

const eventId = 'evt-003'

// ---------------------------------------------------------------------------
// Mock record — same shape as src/data/mockEvents.js (and therefore the
// AdminEventListing table + EventModal form):
//   id, image, name, artist, artistDescription, category, description, date,
//   status, venueName, address, venueCapacity, tickets[]
//   tickets[]: ticketType, ticketDescription, ticketPerks, perksInput, price,
//              seatSection, seatRow, quantity, seats[]
//   seats[]:   seatRow, seatNumber, code, status ('available' | 'hold' | 'sold')
// ---------------------------------------------------------------------------

const buildSeats = (row, count, soldIndices = [], holdIndices = []) => (
  Array.from({ length: count }, (_, i) => {
    const num = i + 1
    let status = 'available'
    if (soldIndices.includes(num)) status = 'sold'
    else if (holdIndices.includes(num)) status = 'hold'
    return { seatRow: row, seatNumber: num, code: `${row}-${num}`, status }
  })
)

const event = {
  id: 3,
  image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80',
  name: 'Winter Masquerade at The Fort',
  artist: 'Manila Chamber Quintet',
  artistDescription: 'Award-winning classical string ensemble celebrated across Southeast Asia for contemporary reinterpretations of Baroque masterpieces. Now in its ninth season, the five players perform on gut strings and period bows at baroque pitch (A = 415 Hz).',
  category: 'Classical & Gala',
  description: 'Step into an evening of velvet elegance at The Fort: Vivaldi’s Four Seasons recomposed for chamber quintet under candlelight, with a curated four-course dinner served between movements. A 1920s bandoneón joins the ensemble for Piazzolla’s Adiós Nonino, and the midnight toast is poured as the last candle is extinguished.',
  date: '2026-12-05T19:00:00',
  status: 'Upcoming',
  venueName: 'Shangri-La Grand Ballroom',
  address: 'BGC, Taguig',
  venueCapacity: 100,
  tickets: [
    {
      ticketType: 'Bronze — Ballroom Seat',
      ticketDescription: 'A seat at a shared round table of ten, with the full four-course menu.',
      ticketPerks: ['Four-course Dinner', 'Vintage Champagne Reception', 'Souvenir Mask'],
      perksInput: 'Four-course Dinner, Vintage Champagne Reception, Souvenir Mask',
      price: 8500,
      seatSection: 'Grand Ballroom',
      seatRow: 'B',
      quantity: 60,
      seats: [
        ...buildSeats('B', 30, [1, 2, 3, 4, 5, 6, 7, 8, 9], [10, 11]),
        ...buildSeats('C', 30, [4, 5, 6, 7], [8])
      ]
    },
    {
      ticketType: 'Silver — Private Table for Two',
      ticketDescription: 'Your own table for two, with dedicated service and a candle centrepiece.',
      ticketPerks: ['Table for Two', 'Dedicated Butler', 'Candle Centrepiece'],
      perksInput: 'Table for Two, Dedicated Butler, Candle Centrepiece',
      price: 14000,
      seatSection: 'Grand Tier',
      seatRow: 'D',
      quantity: 24,
      seats: buildSeats('D', 24, [1, 2, 3, 4, 5, 6], [7, 8])
    },
    {
      ticketType: 'Gold — Grand Balcony Box',
      ticketDescription: 'Private balcony box for four with a butler and a magnum of vintage Champagne.',
      ticketPerks: ['Private Balcony Box', 'Magnum of Vintage Champagne', 'Private Butler'],
      perksInput: 'Private Balcony Box, Magnum of Vintage Champagne, Private Butler',
      price: 22000,
      seatSection: 'Grand Balcony',
      seatRow: 'E',
      quantity: 16,
      seats: buildSeats('E', 16, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [13])
    }
  ]
}

// ---- Derived from the mock record (keeps the panel in step with the data) ----
const eventName = event.name
const venueName = event.venueName
const address = event.address

const eventDate = new Date(event.date)
const dateLong = eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
const dateShort = eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
const time24 = `${String(eventDate.getHours()).padStart(2, '0')}:${String(eventDate.getMinutes()).padStart(2, '0')}`

// Seats still on sale for a ticket tier (mockEvents stores the per-seat status).
const seatsLeft = (ticket) => (ticket.seats || []).filter(s => s.status === 'available').length

// The booking panel's tier cards are a view over event.tickets.
const tiers = computed(() => event.tickets.map((ticket, i) => ({
  id: `tier_${ticket.seatSection.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
  name: ticket.ticketType,
  desc: ticket.ticketDescription,
  perks: ticket.ticketPerks,
  price: ticket.price,
  quantity: ticket.quantity,
  seatSection: ticket.seatSection,
  seatRow: ticket.seatRow,
  capacity: seatsLeft(ticket),
  badge: i === 1 ? 'Best Value' : null,
})))

const priceRange = computed(() => {
  const prices = tiers.value.map(t => t.price)
  return { min: Math.min(...prices), max: Math.max(...prices) }
})

const totalSeatsLeft = computed(() => tiers.value.reduce((sum, t) => sum + t.capacity, 0))

// ---- Hero gallery ----
// TODO: put your image paths here — src '' keeps the gradient placeholder until filled in.
const heroImages = ref([
  { src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80', alt: 'Candlelit ballroom set for dinner' },
  { src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80', alt: 'Masked guests at the reception' },
  { src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80', alt: 'Chamber quintet in period dress' },
  { src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80', alt: 'Champagne service at the table' },
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