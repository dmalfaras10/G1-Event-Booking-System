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
            <i class="bi bi-vinyl"></i> Solaire Theatre — Main Hall
            <span class="strip-sep">|</span>
            <span class="strip-detail">Line array · 1,400 seats</span>
          </div>
          <div class="strip-right">
            <i class="bi bi-ticket-perforated"></i> 95 Seats Available
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
      <h1 class="event-title">
        Velvet Indie Sessions: Where Time Goes — The Coastal Drift Collective at Solaire Theatre
      </h1>

      <!-- Meta row: 4 quick facts in a single panel -->
      <div class="meta-grid">
        <div class="meta-card">
          <div class="meta-label">Date &amp; Evening</div>
          <div class="meta-value"><i class="bi bi-calendar-event"></i> Sat, Dec 19, 2026</div>
          <div class="meta-sub">Merch booth opens at 18:00</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Show Start</div>
          <div class="meta-value"><i class="bi bi-clock"></i> 20:00 Sharp</div>
          <div class="meta-sub">Support act from 19:15</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Venue</div>
          <div class="meta-value"><i class="bi bi-geo-alt"></i> Solaire Theatre</div>
          <div class="meta-sub">Pasay City</div>
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
        <p class="lead">
          Warm analog guitars and nostalgic indie rock anthems, performed live in an acoustically engineered theatre by a nine-piece collective that has spent three years turning Where Time Goes into a full-band record.
        </p>
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
          <span class="price-big">₱3,000 — ₱7,500</span>
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

        <!-- Add-ons -->
        <div class="addons-section">
          <h4 class="addons-title">Bespoke Concierge Add-ons</h4>
          <div v-for="(a, i) in addons" :key="i" class="addon-row">
            <label class="addon-label">
              <input type="checkbox" v-model="a.selected" class="addon-checkbox">
              <span class="addon-check"></span>
              <div class="addon-main">
                <div class="addon-name">{{ a.name }}</div>
                <div class="addon-price">+{{ peso(a.price) }} / seat</div>
              </div>
              <span class="addon-desc">{{ a.desc }}</span>
            </label>
          </div>
        </div>

        <!-- Order summary: dynamic line items derived from user selection -->
        <div class="order-summary">
          <div v-if="selectedTier" class="order-line">
            <span class="order-line-name">Pass Allocation ({{ selectedTier.name }} × {{ qty }})</span>
            <span class="order-line-price">{{ peso(tiersSubtotal) }}</span>
          </div>
          <div v-for="a in selectedAddons" :key="a.name" class="order-line">
            <span class="order-line-name">{{ a.name }} (× {{ qty }})</span>
            <span class="order-line-price">{{ peso(a.price * qty) }}</span>
          </div>
          <div v-if="serviceFee > 0" class="order-line">
            <span class="order-line-name">Concierge &amp; Facilities Surcharge (10%)</span>
            <span class="order-line-price">{{ peso(serviceFee) }}</span>
          </div>
          <div v-if="!selectedTier && selectedAddons.length === 0" class="order-empty">
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
      :add-ons="selectedAddons"
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

const eventId = 'evt-005'
const eventName = 'Velvet Indie Sessions: Where Time Goes'
const venueName = 'Solaire Theatre'
const dateLong = 'Sat, Dec 19, 2026'
const dateShort = 'Sat, Dec 19'
const time24 = '20:00'

const tiers = ref([
  { id: 'tier_bronze', name: 'Bronze — Balcony', price: 3000, capacity: 40,
    desc: 'Unreserved balcony seating with a full view of the stage.', badge: null },
  { id: 'tier_silver', name: 'Silver — Stalls Reserved', price: 5000, capacity: 30,
    desc: 'Reserved stalls seat, centre block, closest to the barricade.', badge: 'Best Value' },
  { id: 'tier_gold', name: 'Gold — Front Barricade + Soundcheck', price: 7500, capacity: 6,
    desc: 'Front-row barricade pass with early entry to the 17:30 soundcheck.', badge: 'Includes Soundcheck Access' },
])

const addons = ref([
  { name: 'Soundcheck Early Entry', price: 900, desc: 'Watch the 17:30 soundcheck from the barricade.', selected: false },
  { name: 'Signed Vinyl (Where Time Goes)', price: 1400, desc: 'Hand-numbered LP signed by the band, collected at the merch booth.', selected: false },
])

// ---- Hero gallery ----
// TODO: put your image paths here — src '' keeps the gradient placeholder until filled in.
const heroImages = ref([
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80', alt: 'Band on a theatre stage' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80', alt: 'Guitarist under warm stage light' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80', alt: 'Crowd in the stalls' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80', alt: 'Vinyl merch booth in the lobby' },
])
const activeImage = ref(0)

const artist = ref(['Elias Manalo', 'Elias writes the songs, sings them, and plays the loudest guitar in the room — a Cebu-raised songwriter whose Where Time Goes turned a bedroom demo into a national tour.'])

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
const selectedAddons = computed(() => addons.value.filter(a => a.selected))
const addonsSubtotal = computed(() => selectedAddons.value.reduce((s, a) => s + a.price * qty.value, 0))
const serviceFee = computed(() => Math.round((tiersSubtotal.value + addonsSubtotal.value) * 0.10))
const orderTotal = computed(() => tiersSubtotal.value + addonsSubtotal.value + serviceFee.value)

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
  addons.value.forEach(a => a.selected = false)
  holdExpired.value = false
}
</script>

<style scoped src="../assets/EventDetailsPage.css"></style>