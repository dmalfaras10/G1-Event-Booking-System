<template>
  <div class="event-page">
    <!-- ============ LEFT COLUMN: EVENT CONTENT ============ -->
    <div class="event-content">

      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="#">Performances</a><span class="crumb-sep">/</span>
        <a href="#">Classical &amp; Gala</a><span class="crumb-sep">/</span>
        <span class="crumb-current">Solitary Harmonics</span>
      </nav>

      <!-- Hero banner (switches when a thumbnail below is clicked) -->
      <div class="banner">
        <div class="banner-media">
          <!-- TODO: fill in the src values in heroImages (script) — banner auto-switches on thumb click -->
          <img v-if="heroImages[activeImage]?.src" :key="activeImage" :src="heroImages[activeImage].src" class="banner-img" alt="">
        </div>
        <div class="badge-row">
          <span class="badge badge-magenta">Early Bird Promo</span>
          <span class="badge badge-dark">Doors open at 18:30 for acoustic check</span>
        </div>
        <div class="banner-strip">
          <div class="strip-left">
            <i class="bi bi-soundwave"></i> Samsung Hall A — Shoebox Configuration
            <span class="strip-sep">|</span>
            <span class="strip-detail">RT60 = 1.4 s · 1,200 seats</span>
          </div>
          <div class="strip-right">
            <i class="bi bi-ticket-perforated"></i> 64 Seats Available
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

      <span class="event-kicker"><i class="bi bi-moon-stars"></i> Makati Acoustic Series // Volume II</span>
      <h1 class="event-title">
        Solitary Harmonics: An Intimate Piano Night at Samsung Performing Arts Theater
      </h1>

      <!-- Meta row: 4 quick facts in a single panel -->
      <div class="meta-grid">
        <div class="meta-card">
          <div class="meta-label">Date &amp; Evening</div>
          <div class="meta-value"><i class="bi bi-calendar-event"></i> Sat, Nov 28, 2026</div>
          <div class="meta-sub">Hall doors open at 18:30</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">First Note</div>
          <div class="meta-value"><i class="bi bi-clock"></i> 19:30 Sharp</div>
          <div class="meta-sub">Acoustic check from 18:30</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Venue</div>
          <div class="meta-value"><i class="bi bi-geo-alt"></i> Samsung Performing Arts Theater</div>
          <div class="meta-sub">Makati City</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Dress Code</div>
          <div class="meta-value"><i class="bi bi-person-badge"></i> Smart Casual</div>
          <div class="meta-sub">Unreserved cabaret seating</div>
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
          An intimate three-hour improvisational performance on a grand upright piano and vintage analog modular synthesizers, staged in the round with the audience seated on three sides of the instrument.
        </p>
        <p class="lead">
          Nils Frahm returns to Manila with a programme that is never the same twice: prepared piano, felt-damped upright and live modular patches, performed without a set list and without amplification of any kind.
        </p>
      </section>

      <!-- Curated Movement Schedule (part of Program Notes & Repertoire) -->
      <section v-if="activeTab === 'program'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Set List &amp; Running Order</h2>
          <span class="intermission">One interval at 20:40 (20 min)</span>
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
          <h2 class="section-title">Performers</h2>
          <span class="artist-profiles">6 Artists · No Conductor</span>
        </div>
        <div class="lineup-grid">
          <div class="lineup-card">
            <div class="lineup-name">Piano</div>
            <div class="lineup-detail">Nils Frahm on a Hamburg Steinway D-274 and a 1930s upright, both tuned to 432 Hz.</div>
            <div class="lineup-count">1 Pianist</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Modular Synthesizer</div>
            <div class="lineup-detail">Two vintage analog modular systems, patched live on stage with no pre-recorded backing.</div>
            <div class="lineup-count">2 Rigs</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Strings</div>
            <div class="lineup-detail">Hardanger fiddle and cello, acoustic and close-miked for the second half.</div>
            <div class="lineup-count">2 Players</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Tape &amp; Electronics</div>
            <div class="lineup-detail">Tape loops and field recordings from the 2019 Felt Room sessions.</div>
            <div class="lineup-count">1 Operator</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Lighting</div>
            <div class="lineup-detail">Follow-spot only — no LED wall, no haze, no moving heads.</div>
            <div class="lineup-count">Cue-Based</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Stage</div>
            <div class="lineup-detail">Cabaret seating is struck after the interval for the in-the-round finale.</div>
            <div class="lineup-count">In The Round</div>
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
          <span class="price-big">₱3,600 — ₱9,500</span>
          <span class="price-sub">/ attendee</span>
        </div>
        <p class="price-note">All admissions include one interval drink voucher and a printed set list.</p>

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

    <!-- Checkout steps live in components/BookingCheckout.vue -->
    <BookingCheckout
      v-if="step === 'payment'"
      :event-name="eventName"
      :venue="venueName"
      :when="dateLong + ' · ' + time24"
      :tier-name="selectedTier?.name"
      :tier-id="selectedTierId || ''"
      :qty="qty"
      :subtotal="(selectedTier?.price || 0) * qty"
      :add-ons="selectedAddons"
      :service-fee="serviceFee"
      :total="orderTotal"
      :currency="'₱'"
      :code-prefix="'G1-SHR'"
      @close="step = 'select'"
      @reset="resetFlow"
    />
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import BookingCheckout from '../components/BookingCheckout.vue'

const eventId = 'evt-002'
const eventName = 'Solitary Harmonics: Acoustic Piano Night'
const venueName = 'Samsung Performing Arts Theater'
const dateLong = 'Sat, Nov 28, 2026'
const dateShort = 'Sat, Nov 28'
const time24 = '19:30'

const tiers = ref([
  { id: 'tier_bronze', name: 'Bronze — Orchestra Cabaret', price: 3600, capacity: 30,
    desc: 'Unreserved cabaret seating on the flat, closest to the piano.', badge: null },
  { id: 'tier_silver', name: 'Silver — Mezzanine Reserved', price: 6000, capacity: 20,
    desc: 'Reserved mezzanine seat with a clear sight line to the keyboard.', badge: 'Best Value' },
  { id: 'tier_gold', name: 'Gold — Front Box & Green Room', price: 9500, capacity: 8,
    desc: 'Front box for two, with post-show green-room access and a signed programme.', badge: 'Includes Green Room Access' },
])

const addons = ref([
  { name: 'Post-Show Green Room Reception', price: 1200, desc: 'Meet the artists after the curtain.', selected: false },
  { name: 'Coat Check & Cloakroom Priority', price: 250, desc: 'Priority cloakroom for the interval.', selected: false },
])

const movements = ref([
  { work: 'Nils Frahm — Solo', detail: 'Grand upright piano, prepared and unprepared · 40 Minutes', tempo: '19:30 · Part I' },
  { work: 'Frode Haltli — Hardanger Fiddle', detail: 'Solo folk suite, no amplification · 15 Minutes', tempo: '20:10' },
  { work: 'Frahm & Guests — Modular', detail: 'Vintage analog modular synthesizer, live patch · 35 Minutes', tempo: '20:40 · Part II' },
  { work: 'All Artists — Improvisation', detail: 'Open ensemble improvisation, no set list · 25 Minutes', tempo: '21:30 · Encore' },
])

// ---- Tab panels ----
const activeTab = ref('program')

// ---- Hero gallery ----
// TODO: put your image paths here — src '' keeps the gradient placeholder until filled in.
const heroImages = ref([
  { src: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80', alt: 'Grand piano on a dark stage' },
  { src: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80', alt: 'Piano keys under a single spot' },
  { src: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80', alt: 'Modular synthesizer rack' },
  { src: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80', alt: 'Cabaret seating in the round' },
])
const activeImage = ref(0)

const artists = ref([
  { name: 'Nils Frahm', bio: 'A pianist and producer whose felt-damped piano recordings for Erased Tapes have made him one of the most streamed classical artists in the world, and one of the least predictable live.' },
  { name: 'Frode Haltli', bio: 'A Hardanger fiddle player and classical violist who moves between folk suites and contemporary commissions, and who has never amplified the instrument on stage.' },
])

// ---- Booking state ----
const step = ref('select')
const selectedTierId = ref(null)
const qty = ref(1)
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
  step.value = 'payment'
}

function resetFlow() {
  step.value = 'select'
  selectedTierId.value = null
  qty.value = 1
  addons.value.forEach(a => a.selected = false)
  holdExpired.value = false
}
</script>

<style scoped src="../assets/EventDetailsPage.css"></style>