<template>
  <div class="event-page">
    <!-- ============ LEFT COLUMN: EVENT CONTENT ============ -->
    <div class="event-content">

      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="#">Performances</a><span class="crumb-sep">/</span>
        <a href="#">Nightlife &amp; DJ</a><span class="crumb-sep">/</span>
        <span class="crumb-current">Gold Champagne NYE Gala</span>
      </nav>

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
        <div class="meta-card">
          <div class="meta-label">Dress Attire</div>
          <div class="meta-value"><i class="bi bi-suit-diamond"></i> Gold &amp; Black Tie</div>
          <div class="meta-sub">No open-toe footwear</div>
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
          Ring in 2027 poolside by Manila Bay inside the glass dome, with international headliners, a live pyro symphony and unlimited vintage bubbly from doors to the last set.
        </p>
        <p class="lead">
          The countdown is scored live: an eighteen-piece ensemble plays under the fireworks, cued to the bay, while the resident DJs keep the cove floor moving until 03:00.
        </p>
      </section>

      <!-- Curated Movement Schedule (part of Program Notes & Repertoire) -->
      <section v-if="activeTab === 'program'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Countdown Programme</h2>
          <span class="intermission">Doors 21:00 · Pyro 00:00</span>
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
          <h2 class="section-title">Headliners</h2>
          <span class="artist-profiles">All Headliners Confirmed</span>
        </div>
        <div class="lineup-grid">
          <div class="lineup-card">
            <div class="lineup-name">Headline DJ</div>
            <div class="lineup-detail">International guest DJ, headline set at 22:45 on the cove floor.</div>
            <div class="lineup-count">1 Artist</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Pyro Symphony</div>
            <div class="lineup-detail">Eighteen-piece ensemble performing live under the fireworks.</div>
            <div class="lineup-count">18 Players</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Resident DJs</div>
            <div class="lineup-detail">Three resident DJs across the cove floor and the pool deck.</div>
            <div class="lineup-count">3 DJs</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Percussion</div>
            <div class="lineup-detail">Live djembe and drumline for the countdown itself.</div>
            <div class="lineup-count">8 Players</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Hosts</div>
            <div class="lineup-detail">Bilingual hosts for the countdown and the midnight toast.</div>
            <div class="lineup-count">2 Hosts</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Production</div>
            <div class="lineup-detail">Pyro, laser and LED dome show, cued live to the orchestra.</div>
            <div class="lineup-count">Full Crew</div>
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
          <span class="price-big">₱12,000 — ₱45,000</span>
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

const eventId = 'evt-006'
const eventName = '2027 Gold Champagne NYE Gala'
const venueName = 'Okada Manila Cove'
const dateLong = 'Thu, Dec 31, 2026'
const dateShort = 'Thu, Dec 31'
const time24 = '21:00'

const tiers = ref([
  { id: 'tier_bronze', name: 'Bronze — Cove Floor', price: 12000, capacity: 0,
    desc: 'Standing access to the cove floor and pool deck.', badge: 'Sold Out' },
  { id: 'tier_silver', name: 'Silver — Dome Lounge', price: 25000, capacity: 0,
    desc: 'Reserved lounge inside the glass dome with full table service.', badge: 'Sold Out' },
  { id: 'tier_gold', name: 'Gold — Private Villa', price: 45000, capacity: 0,
    desc: 'Private poolside villa with butler, chef and a magnum service.', badge: 'Sold Out' },
])

const addons = ref([
  { name: 'Waitlist Priority Upgrade', price: 2500, desc: 'Priority position on the VIP waitlist for released seats.', selected: false },
  { name: 'Private Car & Chauffeur', price: 3500, desc: 'Round-trip chauffeur from Makati or BGC.', selected: false },
])

const movements = ref([
  { work: 'Opening — Manila All-Star DJs', detail: 'House and pop warm-up on the cove floor · 90 Minutes', tempo: '21:00' },
  { work: 'Headline Set — International Guest DJ', detail: 'Live set with the Pyro Symphony · 75 Minutes', tempo: '22:45' },
  { work: 'Countdown & Pyrotechnics', detail: 'Manila Bay fireworks, synchronized to the orchestra · 15 Minutes', tempo: '23:45' },
  { work: 'After-Party — Until Late', detail: 'Poolside after-party with the resident DJs · Until 03:00', tempo: '00:15' },
])

// ---- Tab panels ----
const activeTab = ref('program')

// ---- Hero gallery ----
// TODO: put your image paths here — src '' keeps the gradient placeholder until filled in.
const heroImages = ref([
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80', alt: 'Fireworks over Manila Bay' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80', alt: 'Glass dome at midnight' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80', alt: 'Poolside countdown crowd' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80', alt: 'Champagne toast on the deck' },
])
const activeImage = ref(0)

const artists = ref([
  { name: 'Aurelia Vance', bio: 'A headline DJ with a decade-long Ibiza residency and a reputation for sets that run from ambient to peak-time without a visible seam. This is her first Manila New Year’s Eve.' },
  { name: 'Marco Villanueva', bio: 'Marco conducts the Pyro Symphony, an eighteen-piece ensemble assembled each December to play live under the Manila Bay fireworks — a job that requires split-second cueing and no nerves.' },
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