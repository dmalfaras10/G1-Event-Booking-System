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
          <span class="badge badge-magenta">Silver &amp; Gold Priority</span>
          <span class="badge badge-dark">Includes 1 Rare Single Malt Pairing</span>
        </div>
        <div class="banner-strip">
          <div class="strip-left">
            <i class="bi bi-cup-hot"></i> The Spirits Library — Listening Room
            <span class="strip-sep">|</span>
            <span class="strip-detail">80 seats · No amplification</span>
          </div>
          <div class="strip-right">
            <i class="bi bi-ticket-perforated"></i> 14 Seats Left
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

      <span class="event-kicker"><i class="bi bi-moon-stars-fill"></i> Makati Speakeasy Series // Volume III</span>
      <h1 class="event-title">
        Midnight Saxophone Salon: An 80-Seat Bebop Session at The Spirits Library
      </h1>

      <!-- Meta row: 4 quick facts in a single panel -->
      <div class="meta-grid">
        <div class="meta-card">
          <div class="meta-label">Date &amp; Evening</div>
          <div class="meta-value"><i class="bi bi-calendar-event"></i> Sat, Dec 12, 2026</div>
          <div class="meta-sub">Members’ door from 21:00</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">First Set</div>
          <div class="meta-value"><i class="bi bi-clock"></i> 21:30 Sharp</div>
          <div class="meta-sub">Two sets · one jam session</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Venue</div>
          <div class="meta-value"><i class="bi bi-geo-alt"></i> The Spirits Library</div>
          <div class="meta-sub">Makati City</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Dress Code</div>
          <div class="meta-value"><i class="bi bi-person-badge"></i> Speakeasy Smart</div>
          <div class="meta-sub">No phones on the floor</div>
        </div>
      </div>

      <!-- Section tabs (switch the content panel below) -->
      <div class="section-tabs">
        <span :class="['tab', { active: activeTab === 'program' }]" @click="activeTab = 'program'"><i class="bi bi-music-note-list"></i> Event Details</span>
        <span :class="['tab', { active: activeTab === 'lineup' }]" @click="activeTab = 'lineup'"><i class="bi bi-people"></i> Performer Lineup</span>
      </div>

      <!-- Tab panel: Program Notes & Repertoire -->
      <section v-if="activeTab === 'program'" class="event-section">
        <p class="lead">
          An intimate eighty-seat speakeasy jazz session behind an unmarked door on Chino Roces, where brass standards are played acoustically at conversational volume and the bar never closes.
        </p>
        <p class="lead">
          The Harlem Speakeasy Quartet plays two sets with a guest on muted trumpet, then hands the room over for a late jam session — sign up at the bar, and the quartet will call you up.
        </p>
      </section>

      <!-- Curated Movement Schedule (part of Program Notes & Repertoire) -->
      <section v-if="activeTab === 'program'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Set List &amp; Session Times</h2>
          <span class="intermission">Two sets · one jam session</span>
        </div>
        <div class="movements">
          <div v-for="(m, i) in movements" :key="i" class="movement-row">
            <div class="movement-num">{{ roman(i) }}</div>
            <div class="movement-main">
              <div class="movement-work">{{ m.work }}</div>
              <div class="movement-detail">{{ m.detail }}</div>
            </div>
            <div class="movement-tempo">{{ m.tempo }}</div>
          </div>
        </div>
      </section>

      <!-- Tab panel: Orchestra Lineup (placeholder content) -->
      <section v-else-if="activeTab === 'lineup'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">The Quartet</h2>
          <span class="artist-profiles">4 Players · 1 Guest</span>
        </div>
        <div class="lineup-grid">
          <div class="lineup-card">
            <div class="lineup-name">Tenor &amp; Bari Sax</div>
            <div class="lineup-detail">Tenor and baritone saxophones carrying the hard-bop lead lines.</div>
            <div class="lineup-count">1 Player</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Alto Sax &amp; Flute</div>
            <div class="lineup-detail">Alto sax doubling on flute for the ballad set.</div>
            <div class="lineup-count">1 Player</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Upright Bass</div>
            <div class="lineup-detail">Acoustic bass, no pickup, played pizzicato throughout.</div>
            <div class="lineup-count">1 Player</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Drums</div>
            <div class="lineup-detail">Brushes only for the first set; sticks after the single malt pour.</div>
            <div class="lineup-count">1 Player</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Piano</div>
            <div class="lineup-detail">Upright piano, lid closed, played only for the late jam session.</div>
            <div class="lineup-count">1 Player</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Guest</div>
            <div class="lineup-detail">Muted trumpet sitting in for Set II and the jam.</div>
            <div class="lineup-count">1 Guest</div>
          </div>
        </div>
      </section>

      <!-- Resident Virtuosos & Maestro -->
      <section class="event-section">
        <div class="section-head">
          <h2 class="section-title">Featured Artists</h2>
          <span class="artist-profiles">Artist Profiles</span>
        </div>
        <div class="artist-grid">
          <div v-for="(a, i) in artists" :key="i" class="artist-card">
            <div class="artist-name">{{ a.name }}</div>
            <p class="artist-bio">{{ a.bio }}</p>
          </div>
        </div>
      </section>

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
          <span class="price-big">₱2,800 — ₱6,500</span>
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

const eventId = 'evt-004'
const eventName = 'Midnight Saxophone Salon'
const venueName = 'The Spirits Library'
const dateLong = 'Sat, Dec 12, 2026'
const dateShort = 'Sat, Dec 12'
const time24 = '21:30'

const tiers = ref([
  { id: 'tier_bronze', name: 'Bronze — Bar Stool', price: 2800, capacity: 14,
    desc: 'A stool at the back bar with full sight lines to the quartet.', badge: null },
  { id: 'tier_silver', name: 'Silver — Banquette Seat', price: 4500, capacity: 12,
    desc: 'A seat at an east-wall banquette with full table service.', badge: 'Includes Single Malt Pour' },
  { id: 'tier_gold', name: 'Gold — Private Booth', price: 6500, capacity: 4,
    desc: 'Private booth for four with a dedicated pour from the back-bar reserve.', badge: 'Most Requested' },
])

const addons = ref([
  { name: 'Late Jam Session Sign-Up', price: 800, desc: 'A guaranteed slot in the 23:30 jam with the quartet.', selected: false },
  { name: 'Rare Single Malt Flight', price: 1600, desc: 'Three additional 25 ml pours from the back-bar reserve.', selected: false },
])

const movements = ref([
  { work: 'Set I — Brass Standards', detail: 'Bop standards, tenor and alto sax, upright bass · 40 Minutes', tempo: '21:30' },
  { work: 'Single Malt Pour No. 1', detail: 'Rare 18-year single malt, poured at the table', tempo: '22:15' },
  { work: 'Set II — Ballads & Blues', detail: 'Slow-tempo quartet with muted trumpet · 35 Minutes', tempo: '22:30' },
  { work: 'Late Jam Session', detail: 'Open to the room — sign up at the bar · 30 Minutes', tempo: '23:30' },
])

// ---- Tab panels ----
const activeTab = ref('program')

// ---- Hero gallery ----
// TODO: put your image paths here — src '' keeps the gradient placeholder until filled in.
const heroImages = ref([
  { src: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=900&q=80', alt: 'Dimly lit speakeasy bar' },
  { src: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=900&q=80', alt: 'Saxophone under a single lamp' },
  { src: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=900&q=80', alt: 'Back-bar single malt reserve' },
  { src: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=900&q=80', alt: 'Banquette seating along the wall' },
])
const activeImage = ref(0)

const artists = ref([
  { name: 'Cornelius “Chip” Barnes', bio: 'A tenor player who came up in the Harlem loft scene and recorded for Blue Note in the late seventies. He now leads the Speakeasy Quartet on an annual Manila residency.' },
  { name: 'Dolores Reyes', bio: 'A Manila Conservatory faculty pianist who has spent a decade in the city’s listening rooms, known for an upright-only style that never once touches a keyboard with amplification.' },
])

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
const ROMANS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
const roman = (i) => ROMANS[i] ?? (i + 1)

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