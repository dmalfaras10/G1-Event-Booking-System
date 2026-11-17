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
          <span class="badge badge-magenta">Waitlist Open for VIP</span>
          <span class="badge badge-dark">Midnight Manila Bay Pyrotechnics Show</span>
        </div>
        <div class="banner-strip">
          <div class="strip-left">
            <i class="bi bi-stars"></i> Okada Manila Cove — Glass Dome
            <span class="strip-sep">|</span>
            <span class="strip-detail">Manila Bay · Pyro at midnight</span>
          </div>
          <div class="strip-right">
            <i class="bi bi-ticket-x"></i> Sold Out
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

      <span class="event-kicker"><i class="bi bi-stars"></i> Manila New Year’s Eve // Gala Edition</span>
      <h1 class="event-title">
        2027 Gold Champagne NYE Gala: Midnight by Manila Bay at Okada Manila Cove
      </h1>

      <!-- Meta row: 4 quick facts in a single panel -->
      <div class="meta-grid">
        <div class="meta-card">
          <div class="meta-label">Date &amp; Evening</div>
          <div class="meta-value"><i class="bi bi-calendar-event"></i> Thu, Dec 31, 2026</div>
          <div class="meta-sub">Doors 21:00 · Pyro at midnight</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Countdown</div>
          <div class="meta-value"><i class="bi bi-clock"></i> 21:00 → 00:00</div>
          <div class="meta-sub">Six hours of programming</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Venue</div>
          <div class="meta-value"><i class="bi bi-geo-alt"></i> Okada Manila Cove</div>
          <div class="meta-sub">Pasay City</div>
        </div>
      </div>

      <!-- Program notes & repertoire -->
      <div class="event-section">
        <div class="section-head">
          <h2 class="section-title">Event Details</h2>
        </div>
        <p class="lead">
          Ring in 2027 poolside by Manila Bay inside the glass dome, with international headliners, a live pyro symphony and unlimited vintage bubbly from doors to the last set.
        </p>
        <p class="lead">
          The countdown is scored live: an eighteen-piece ensemble plays under the fireworks, cued to the bay, while the resident DJs keep the cove floor moving until 03:00.
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
        <p class="price-note">Sold out — join the VIP waitlist to be contacted if seats are released.</p>

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
      :code-prefix="'G1-GCN'"
      @close="step = 'seats'"
      @reset="resetFlow"
    />
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import BookingCheckout from '../components/BookingCheckout.vue'
import SeatSelection from '../components/SeatSelection.vue'

// Event data based on mockEvents.js structure (Event ID: 6)
const eventId = 6
const eventName = '2027 Gold Champagne NYE Gala'
const artist = ref([
  'International Guest DJs & Pyro Symphony',
  'A curated lineup of Ibiza and Seoul festival headliners performing alongside a synchronized midnight fireworks score.'
])
const artistDescription = 'A curated lineup of Ibiza and Seoul festival headliners performing alongside a synchronized midnight fireworks score.'
const category = 'Nightlife & DJ'
const description = 'Ring in 2027 poolside by Manila Bay inside the glass dome with international headliners and unlimited vintage bubbly.'
const dateLong = 'Thu, Dec 31, 2026'
const dateShort = 'Thu, Dec 31'
const time24 = '21:00'
const status = 'Upcoming'

// Venue information
const venueName = 'Okada Manila Cove'
const address = 'Pasay City'
const venueCapacity = 200

// Build seats function (matching mockEvents.js)
const buildSeats = (row, count, soldIndices = [], holdIndices = []) => {
  return Array.from({ length: count }, (_, i) => {
    const num = i + 1
    let seatStatus = 'available'
    if (soldIndices.includes(num)) seatStatus = 'sold'
    else if (holdIndices.includes(num)) seatStatus = 'hold'
    return {
      seatRow: row,
      seatNumber: num,
      code: `${row}-${num}`,
      status: seatStatus
    }
  })
}

// Ticket tiers based on mockEvents.js structure (ALL SOLD OUT for this event)
const tiers = ref([
  {
    id: 'tier_gold_vip',
    ticketType: 'Gold VIP Dome Pass',
    name: 'Gold VIP Dome Pass',
    ticketDescription: 'Unlimited vintage bubbly and front-row pyrotechnics view.',
    desc: 'Unlimited vintage bubbly and front-row pyrotechnics view.',
    ticketPerks: ['Unlimited Vintage Bubbly', 'Midnight Pyro View', 'Valet Parking'],
    perks: ['Unlimited Vintage Bubbly', 'Midnight Pyro View', 'Valet Parking'],
    perksInput: 'Unlimited Vintage Bubbly, Midnight Pyro View, Valet Parking',
    price: 12000.00,
    seatSection: 'Dome VIP',
    seatRow: 'Z',
    capacity: 0, // All sold out
    quantity: 50,
    seats: buildSeats('Z', 50, Array.from({length: 50}, (_, i) => i + 1), []), // All 50 seats sold
    badge: 'Sold Out'
  }
])

// ---- Hero gallery ----
const heroImages = ref([
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80', alt: 'Fireworks over Manila Bay' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80', alt: 'Glass dome at midnight' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80', alt: 'Poolside countdown crowd' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80', alt: 'Champagne toast on the deck' },
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

// Price headline derived from the tiers, so it can't drift from the data.
const priceRangeLabel = computed(() => {
  const prices = tiers.value.map(t => t.price)
  if (!prices.length) return '—'
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  return min === max ? peso(min) : `${peso(min)} — ${peso(max)}`
})

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