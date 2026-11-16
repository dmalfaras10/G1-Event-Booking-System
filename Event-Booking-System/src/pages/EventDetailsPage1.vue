<template>
  <div class="event-page">
    <!-- ============ LEFT COLUMN: EVENT CONTENT ============ -->
    <div class="event-content">

      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="#">Performances</a><span class="crumb-sep">/</span>
        <a href="#">Live Concert</a><span class="crumb-sep">/</span>
        <span class="crumb-current">Neon Noir Symphony</span>
      </nav>

      <!-- Hero banner (switches when a thumbnail below is clicked) -->
      <div class="banner">
        <div class="banner-media">
          <!-- TODO: fill in the src values in heroImages (script) — banner auto-switches on thumb click -->
          <img v-if="heroImages[activeImage]?.src" :key="activeImage" :src="heroImages[activeImage].src" class="banner-img" alt="">
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
            <i class="bi bi-ticket-perforated"></i> 18 Bronze Seats Left
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

      <span class="event-kicker"><i class="bi bi-moon-stars-fill"></i> Manila After Dark Series // Volume I</span>
      <h1 class="event-title">
        Neon Noir Symphony: An Evening of Strings &amp; Synths at The Palace Pool Club
      </h1>

      <!-- Meta row: 4 quick facts in a single panel -->
      <div class="meta-grid">
        <div class="meta-card">
          <div class="meta-label">Date &amp; Evening</div>
          <div class="meta-value"><i class="bi bi-calendar-event"></i> Sat, Nov 21, 2026</div>
          <div class="meta-sub">Gates &amp; pool deck open at 19:00</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Show Start</div>
          <div class="meta-value"><i class="bi bi-clock"></i> 20:00 Sharp</div>
          <div class="meta-sub">DJ Kaito warm-up from 19:15</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Venue</div>
          <div class="meta-value"><i class="bi bi-geo-alt"></i> The Palace Pool Club</div>
          <div class="meta-sub">BGC, Taguig</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Dress Code</div>
          <div class="meta-value"><i class="bi bi-sunglasses"></i> Noir Cocktail</div>
          <div class="meta-sub">Pool deck closes at 22:00</div>
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
          An immersive nocturnal audiovisual takeover on the Palace pool deck, where a 24-piece string ensemble and deep melodic synth sets trade the same stage from dusk until the last light leaves the water.
        </p>
        <p class="lead">
          Headlining the night is DJ Kaito, whose live modular patches are answered in real time by the Nocturne Philharmonic — a single continuous set with no interval, built to move from ambient strings to peak-time house without a break.
        </p>
      </section>

      <!-- Curated Movement Schedule (part of Program Notes & Repertoire) -->
      <section v-if="activeTab === 'program'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Set Times &amp; Running Order</h2>
          <span class="intermission">Last set ends 23:30</span>
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
          <h2 class="section-title">Artist Lineup</h2>
          <span class="artist-profiles">24 Musicians &amp; 2 Selectors</span>
        </div>
        <div class="lineup-grid">
          <div class="lineup-card">
            <div class="lineup-name">Strings</div>
            <div class="lineup-detail">24 players — 14 first violins, 6 second violins and 4 cellos, amplified through the pool-deck line array.</div>
            <div class="lineup-count">24 Players</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Synth &amp; Electronics</div>
            <div class="lineup-detail">Two modular rigs, a Moog Sub 37 and a custom 12-voice poly chain, patched live on stage.</div>
            <div class="lineup-count">2 Rigs</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Percussion</div>
            <div class="lineup-detail">Live congas, cajón and a four-piece kit, time-locked to the click track.</div>
            <div class="lineup-count">4 Players</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Horns &amp; Flutes</div>
            <div class="lineup-detail">Dual flugelhorns and alto flute for the No. 2 Neon Adagio.</div>
            <div class="lineup-count">3 Players</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Guest Vocalists</div>
            <div class="lineup-detail">Two vocalists on the closing house cut, “Afterglow (Manila Edit)”.</div>
            <div class="lineup-count">2 Voices</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Selectors</div>
            <div class="lineup-detail">DJ Kaito (Tokyo) with Manila selector Mara Velez on the warm-up and after-party.</div>
            <div class="lineup-count">2 Selectors</div>
          </div>
        </div>
      </section>

      <!-- Resident Virtuosos & Maestro -->
      <section class="event-section">
        <div class="section-head">
          <h2 class="section-title">Featured Artists &amp; Maestro</h2>
          <span class="artist-profiles">Artist Profiles</span>
        </div>
        <div class="artist-grid">
          <div v-for="(a, i) in artists" :key="i" class="artist-card">
            <div class="artist-head">
              <div class="artist-avatar">
                <!-- TODO: replace with artist photo: <img src="..." class="artist-photo" alt=""> -->
              </div>
              <div class="artist-id">
                <div class="artist-role">{{ a.role }}</div>
                <div class="artist-name">{{ a.name }}</div>
                <div class="artist-city">{{ a.city }}</div>
              </div>
            </div>
            <p class="artist-bio">{{ a.bio }}</p>
            <div class="artist-badges">
              <span v-for="(b, bi) in a.badges" :key="bi" class="artist-badge">
                <i :class="['bi', b.icon]"></i> {{ b.text }}
              </span>
            </div>
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
          <span class="price-big">₱4,800 — ₱12,000</span>
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
      :code-prefix="'G1-NNS'"
      @close="step = 'select'"
      @reset="resetFlow"
    />
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import BookingCheckout from '../components/BookingCheckout.vue'

const eventId = 'evt-001'
const eventName = 'Neon Noir Symphony: Manila Edition'
const venueName = 'The Palace Pool Club'
const dateLong = 'Sat, Nov 21, 2026'
const dateShort = 'Sat, Nov 21'
const time24 = '20:00'

const tiers = ref([
  { id: 'tier_bronze', name: 'Bronze — Pool Deck General Admission', price: 4800, capacity: 18,
    desc: 'Standing room around the pool deck with full sight lines to the stage and DJ booth.', badge: null },
  { id: 'tier_silver', name: 'Silver — Sky-Deck Lounge', price: 7500, capacity: 25,
    desc: 'Elevated sky-deck with a dedicated bar, lounge seating and a private balcony rail.', badge: 'Includes Sky-Deck Lounge Access' },
  { id: 'tier_gold', name: 'Gold — Noir VIP Cabana', price: 12000, capacity: 6,
    desc: 'Private four-seat cabana with butler service, bottle service and a poolside daybed.', badge: 'Most Requested by Patrons' },
])

const addons = ref([
  { name: 'Post-Show Sky-Deck Afterparty', price: 1500, desc: 'DJ Kaito B2B set until 01:00 with the orchestra strings.', selected: false },
  { name: 'Valet Parking (11th Avenue Porte-Cochère)', price: 500, desc: 'Guaranteed valet at the private BGC entrance.', selected: false },
])

const movements = ref([
  { work: 'DJ Kaito — Warm-Up Set', detail: 'Deep melodic house, live modular · 45 Minutes', tempo: 'Doors · 19:15' },
  { work: 'Nocturne Philharmonic — Neon Suite', detail: '24 Strings, 2 Synth Modules & Live Percussion · 55 Minutes', tempo: '20:00 · Act I' },
  { work: 'DJ Kaito × Orchestra — B2B Finale', detail: 'Improvised orchestral-house hybrid, no set list · 40 Minutes', tempo: '22:00 · Act II' },
])

// ---- Tab panels ----
const activeTab = ref('program')

// ---- Hero gallery ----
// TODO: put your image paths here — src '' keeps the gradient placeholder until filled in.
const heroImages = ref([
  { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80', alt: 'Palace pool deck at night' },
  { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80', alt: 'Crowd under the neon rig' },
  { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80', alt: 'String section on stage' },
  { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80', alt: 'Sky-deck cabana view' },
])
const activeImage = ref(0)

const artists = ref([
  { role: 'Headline Selector', name: 'DJ Kaito', city: 'Tokyo → Manila', bio: 'A fixture of the Tokyo underground, Kaito is known for live modular sets that dissolve the line between DJ booth and orchestra pit. His 2025 Boiler Room Manila set was called “a sunrise in the middle of the night.”', badges: [
    { icon: 'bi-disc', text: 'Resident · Womb, Tokyo' },
    { icon: 'bi-stars', text: 'Boiler Room Manila 2025' },
  ]},
  { role: 'Musical Director', name: 'Rafael Ibarra', city: 'Manila Philharmonic', bio: 'Rafael has arranged for the Manila Philharmonic for eleven seasons, with a specialism in amplified strings and hybrid orchestral-electronic scores for film and stage.', badges: [
    { icon: 'bi-patch-check', text: 'Conductor · 24 Strings' },
    { icon: 'bi-award', text: 'Aliw Award 2024' },
  ]},
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