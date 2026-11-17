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
          <span class="badge badge-magenta">10% Bronze Member Perks</span>
          <span class="badge badge-dark">Vinyl merch booth opens at 18:00</span>
        </div>
        <div class="banner-strip">
          <div class="strip-left">
            <i class="bi bi-vinyl"></i> {{ venueName }} — {{ address }}
            <span class="strip-sep">|</span>
            <span class="strip-detail">{{ event.category }}</span>
          </div>
          <div class="strip-right">
            <i class="bi bi-ticket-perforated"></i> {{ totalAvailable }} Seats Available
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

      <span class="event-kicker"><i class="bi bi-stars"></i> Manila Velvet Sessions // Volume V</span>
      <h1 class="event-title">{{ eventTitle }}</h1>

      <!-- Meta row: 4 quick facts in a single panel -->
      <div class="meta-grid">
        <div class="meta-card">
          <div class="meta-label">Date &amp; Evening</div>
          <div class="meta-value"><i class="bi bi-calendar-event"></i> {{ dateLong }}</div>
          <div class="meta-sub">Merch booth opens at 18:00</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Show Start</div>
          <div class="meta-value"><i class="bi bi-clock"></i> {{ time24 }} Sharp</div>
          <div class="meta-sub">Support act from 19:15</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Venue</div>
          <div class="meta-value"><i class="bi bi-geo-alt"></i> {{ venueName }}</div>
          <div class="meta-sub">{{ address }}</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Dress Code</div>
          <div class="meta-value"><i class="bi bi-person-badge"></i> Come As You Are</div>
          <div class="meta-sub">Standing floor + seated balcony</div>
        </div>
      </div>

      <!-- Program notes & repertoire -->
      <div class="event-section">
        <div class="section-head">
          <h2 class="section-title">Event Details</h2>
        </div>
        <p class="lead">{{ event.description }}</p>
        <p class="lead">
          The Coastal Drift Collective bring a string quartet for the second set, a pedal steel player from Cebu, and a support slot from Paper Lanterns — all of it mixed for a seated room rather than a festival field.
        </p>
      </div>

      <!-- Featured artist -->
      <div class="event-section">
        <div class="section-head">
          <h2 class="section-title">Featured Artist</h2>
        </div>
        <div class="artist-profile">
          <div class="artist-name">{{ artist[0] }}</div>
          <p class="lead">{{ artist[1] }}</p>
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
          <span class="price-big">{{ priceRangeLabel }}</span>
          <span class="price-sub">/ attendee</span>
        </div>
        <p class="price-note">All admissions include one drink voucher and a digital programme.</p>

        <!-- Tier selector title -->
        <div class="tier-title">
          <span class="tier-label">Select Your Seating</span>
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
      :code-prefix="'G1-VIS'"
      @close="step = 'seats'"
      @reset="resetFlow"
    />
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import BookingCheckout from '../components/BookingCheckout.vue'
import SeatSelection from '../components/SeatSelection.vue'

// ---- Seat seed helper (mirrors src/data/mockEvents.js) ----
// Builds a full seats[] array for a ticket. Seats listed in `soldIndices` are
// marked sold, `holdIndices` are on hold, the rest stay available.
const buildSeats = (row, count, soldIndices = [], holdIndices = []) => {
  return Array.from({ length: count }, (_, i) => {
    const num = i + 1
    let status = 'available'
    if (soldIndices.includes(num)) status = 'sold'
    else if (holdIndices.includes(num)) status = 'hold'
    return {
      seatRow: row,
      seatNumber: num,
      code: `${row}-${num}`,
      status
    }
  })
}

// ---- Event record (same shape as src/data/mockEvents.js) ----
// id, image, name, artist, artistDescription, category, description, date,
// status, venueName, address, venueCapacity, and a tickets[] array whose entries
// carry ticketType, ticketDescription, ticketPerks, perksInput, price,
// seatSection, seatRow, quantity and a full seats[] array.
const event = {
  id: 5,
  image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
  name: 'Velvet Indie Sessions: Where Time Goes',
  artist: 'The Coastal Drift Collective',
  artistDescription: 'Five-piece indie dream-pop and alt-rock band known for lush, reverb-drenched guitar arrangements, pedal-steel textures and poetic storytelling.',
  category: 'Live Concert',
  description: 'Warm analog guitars and nostalgic indie rock anthems performed live in an acoustically engineered theatre, with a string quartet joining the ensemble for the second set.',
  date: '2026-12-19T20:00:00',
  status: 'Upcoming',
  venueName: 'Solaire Theatre',
  address: 'Pasay City',
  venueCapacity: 160,
  tickets: [
    {
      ticketType: 'Bronze — Balcony',
      ticketDescription: 'Unreserved balcony seating with a full, elevated view of the stage.',
      ticketPerks: ['Full Stage View', 'Digital Programme', 'One Drink Voucher'],
      perksInput: 'Full Stage View, Digital Programme, One Drink Voucher',
      price: 3000,
      seatSection: 'Balcony',
      seatRow: 'B',
      quantity: 40,
      seats: buildSeats('B', 40, [1, 2, 3, 4, 5, 6, 7], [8, 9, 10])
    },
    {
      ticketType: 'Silver — Stalls Reserved',
      ticketDescription: 'Reserved centre-block stalls seat, closest to the barricade, with priority bar service.',
      ticketPerks: ['Reserved Centre Seat', 'Priority Bar Lane', 'One Drink Voucher', 'Digital Programme'],
      perksInput: 'Reserved Centre Seat, Priority Bar Lane, One Drink Voucher, Digital Programme',
      price: 5000,
      seatSection: 'Stalls',
      seatRow: 'C',
      quantity: 30,
      seats: buildSeats('C', 30, [1, 2, 10, 11, 12], [13, 14])
    },
    {
      ticketType: 'Gold — Front Barricade + Soundcheck',
      ticketDescription: 'Front-row barricade pass with early entry to the 17:30 soundcheck and a signed poster.',
      ticketPerks: ['Front-Barricade Access', '17:30 Soundcheck Entry', 'Signed Poster', 'One Drink Voucher'],
      perksInput: 'Front-Barricade Access, 17:30 Soundcheck Entry, Signed Poster, One Drink Voucher',
      price: 7500,
      seatSection: 'Front Barricade',
      seatRow: 'A',
      quantity: 6,
      seats: buildSeats('A', 6, [1], [])
    }
  ]
}

// ---- Values derived from the event record ----
const eventId = 'evt-' + String(event.id).padStart(3, '0')
const eventName = event.name
const venueName = event.venueName
const address = event.address

// Parse the ISO date once so every date/time label stays in sync with `event`.
const eventDate = new Date(event.date)
const dateLong = eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
const dateShort = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
const time24 = eventDate.toTimeString().slice(0, 5)

// Booking tiers are projected from event.tickets. `capacity` is the number of
// seats still available (status === 'available') so the panel, the attendee
// stepper and the seat map all agree on what is left to sell.
const tiers = ref(event.tickets.map((t, i) => ({
  id: 'tier_' + t.seatSection.toLowerCase().replace(/[^a-z]+/g, '_'),
  name: t.ticketType,
  price: t.price,
  capacity: t.seats.filter(s => s.status === 'available').length,
  desc: t.ticketDescription,
  perks: t.ticketPerks || [],
  badge: /soundcheck/i.test(t.ticketType) ? 'Includes Soundcheck Access' : (i === 1 ? 'Best Value' : null),
})))

const eventTitle = `${event.name} — ${event.artist} at ${event.venueName}`
const totalAvailable = computed(() => tiers.value.reduce((sum, t) => sum + t.capacity, 0))

// ---- Hero gallery ----
// TODO: put your image paths here — src '' keeps the gradient placeholder until filled in.
const heroImages = ref([
  { src: event.image, alt: `${event.artist} on the ${event.venueName} stage` },
  { src: event.image, alt: 'Guitarist under warm stage light' },
  { src: event.image, alt: 'The stalls and balcony from the sound desk' },
  { src: event.image, alt: 'Vinyl merch booth in the lobby' },
])
const activeImage = ref(0)

const artist = ref([event.artist, event.artistDescription])

const peso = (v) => '₱' + Number(v).toLocaleString('en-PH')

// Price range label shown in the booking header, derived from the tier prices.
const priceRangeLabel = computed(() => {
  const prices = tiers.value.map(t => t.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  return min === max ? peso(min) : `${peso(min)} — ${peso(max)}`
})

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