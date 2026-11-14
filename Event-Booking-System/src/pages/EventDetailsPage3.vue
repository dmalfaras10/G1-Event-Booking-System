<template>
  <div class="event-page">
    <!-- ============ LEFT COLUMN: EVENT CONTENT ============ -->
    <div class="event-content">

      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="#">Performances</a><span class="crumb-sep">/</span>
        <a href="#">Classical &amp; Gala</a><span class="crumb-sep">/</span>
        <span class="crumb-current">Winter Masquerade</span>
      </nav>

      <!-- Hero banner (switches when a thumbnail below is clicked) -->
      <div class="banner">
        <div class="banner-media">
          <!-- TODO: fill in the src values in heroImages (script) — banner auto-switches on thumb click -->
          <img v-if="heroImages[activeImage]?.src" :key="activeImage" :src="heroImages[activeImage].src" class="banner-img" alt="">
        </div>
        <div class="badge-row">
          <span class="badge badge-magenta">Complimentary Champagne</span>
          <span class="badge badge-dark">Strict Black Tie &amp; Mask Dress Code</span>
        </div>
        <div class="banner-strip">
          <div class="strip-left">
            <i class="bi bi-stars"></i> Shangri-La Grand Ballroom — Candlelit
            <span class="strip-sep">|</span>
            <span class="strip-detail">480 covers · Four-course service</span>
          </div>
          <div class="strip-right">
            <i class="bi bi-ticket-perforated"></i> 7 Seats Left
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

      <span class="event-kicker"><i class="bi bi-snow"></i> Manila Winter Gala // Masquerade IV</span>
      <h1 class="event-title">
        Winter Masquerade at The Fort: Vivaldi Recomposed at Shangri-La Grand Ballroom
      </h1>

      <!-- Meta row: 4 quick facts in a single panel -->
      <div class="meta-grid">
        <div class="meta-card">
          <div class="meta-label">Date &amp; Evening</div>
          <div class="meta-value"><i class="bi bi-calendar-event"></i> Sat, Dec 5, 2026</div>
          <div class="meta-sub">Champagne reception at 18:30</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Curtain</div>
          <div class="meta-value"><i class="bi bi-clock"></i> 19:00 Sharp</div>
          <div class="meta-sub">Mask check from 18:00</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Venue</div>
          <div class="meta-value"><i class="bi bi-bank2"></i> Shangri-La Grand Ballroom</div>
          <div class="meta-sub">BGC, Taguig</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Dress Attire</div>
          <div class="meta-value"><i class="bi bi-suit-diamond"></i> Black Tie &amp; Mask</div>
          <div class="meta-sub">Masks provided at the cloakroom</div>
        </div>
      </div>

      <!-- Section tabs (switch the content panel below) -->
      <div class="section-tabs">
        <span :class="['tab', { active: activeTab === 'program' }]" @click="activeTab = 'program'"><i class="bi bi-journal-text"></i> Program &amp; Dinner</span>
        <span :class="['tab', { active: activeTab === 'lineup' }]" @click="activeTab = 'lineup'"><i class="bi bi-people"></i> The Ensemble</span>
        <span :class="['tab', { active: activeTab === 'acoustic' }]" @click="activeTab = 'acoustic'"><i class="bi bi-rulers"></i> Room &amp; Acoustics</span>
        <span :class="['tab', { active: activeTab === 'sommelier' }]" @click="activeTab = 'sommelier'"><i class="bi bi-cup-straw"></i> Champagne &amp; Wine</span>
      </div>

      <!-- Tab panel: Program Notes & Repertoire -->
      <section v-if="activeTab === 'program'" class="event-section">
        <p class="lead">
          An evening of velvet elegance at The Fort: Vivaldi’s Four Seasons recomposed for chamber quintet under candlelight, with a curated four-course dinner served between movements.
        </p>
        <p class="lead">
          The Manila Chamber Quintet performs on gut strings and period bows at baroque pitch, with a 1920s bandoneón joining for the Piazzolla. Masks are worn until the midnight toast and provided at the cloakroom.
        </p>
      </section>

      <!-- Curated Movement Schedule (part of Program Notes & Repertoire) -->
      <section v-if="activeTab === 'program'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Program &amp; Dinner Service</h2>
          <span class="intermission">Four courses · one interval at 21:00</span>
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
          <h2 class="section-title">The Ensemble</h2>
          <span class="artist-profiles">5 Musicians + Service Brigade</span>
        </div>
        <div class="lineup-grid">
          <div class="lineup-card">
            <div class="lineup-name">Violin</div>
            <div class="lineup-detail">Concertmaster desk, baroque bow and gut strings, tuned a semitone below modern pitch.</div>
            <div class="lineup-count">1 Player</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Viola</div>
            <div class="lineup-detail">Period viola with a baroque bridge for the Four Seasons reduction.</div>
            <div class="lineup-count">1 Player</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Cello</div>
            <div class="lineup-detail">Five-string cello for the Piazzolla set and the Largo encore.</div>
            <div class="lineup-count">1 Player</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Bandoneón</div>
            <div class="lineup-detail">1920s bandoneón, guest artist on Adiós Nonino.</div>
            <div class="lineup-count">1 Player</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Harpsichord</div>
            <div class="lineup-detail">Single-manual harpsichord supplying the continuo line, lid removed.</div>
            <div class="lineup-count">1 Player</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Service Brigade</div>
            <div class="lineup-detail">Four-course brigade at a one-to-eight server-to-guest ratio.</div>
            <div class="lineup-count">24 Staff</div>
          </div>
        </div>
      </section>

      <!-- Tab panel: Acoustic Blueprint (placeholder content) -->
      <section v-else-if="activeTab === 'acoustic'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Room &amp; Acoustics</h2>
          <span class="artist-profiles">Ballroom Calibration</span>
        </div>
        <div class="movements">
          <div class="spec-row">
            <span class="spec-name">Room</span>
            <span class="spec-value">Shangri-La Grand Ballroom — 480 covers, candlelit, no amplification</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Reverberation Time (RT60)</span>
            <span class="spec-value">1.9 s with drapes drawn; 1.2 s for dinner service</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Amplification</span>
            <span class="spec-value">None — acoustic quintet, harpsichord lid removed</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Acoustic Sweet Spot</span>
            <span class="spec-value">Tables 1–12, centre aisle — ±2 dB dispersion tolerance</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Mask Protocol</span>
            <span class="spec-value">Masks required until the midnight toast; provided at the cloakroom</span>
          </div>
        </div>
      </section>

      <!-- Tab panel: Sommelier Pairing (placeholder content) -->
      <section v-else-if="activeTab === 'sommelier'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Champagne &amp; Wine</h2>
          <span class="artist-profiles">Curated by the House Sommelier</span>
        </div>
        <div class="movements">
          <div v-for="(p, i) in pairings" :key="i" class="movement-row">
            <div class="movement-main">
              <div class="movement-work">{{ p.name }}</div>
              <div class="movement-detail">{{ p.detail }}</div>
            </div>
            <div class="movement-tempo">{{ p.pour }}</div>
          </div>
        </div>
        <p class="pairing-note">
          <i class="bi bi-cup-straw"></i>
          A complimentary glass of vintage Champagne is included with every admission. Additional pours are available at the table.
        </p>
      </section>

      <!-- Resident Virtuosos & Maestro -->
      <section class="event-section">
        <div class="section-head">
          <h2 class="section-title">Resident Virtuosos &amp; Maestro</h2>
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

      <!-- Access Protocol -->
      <section class="event-section access-protocol">
        <div class="access-head">
          <span class="access-kicker">Access Protocol</span>
          <span class="access-loc"><i class="bi bi-geo-alt"></i> BGC, Taguig</span>
        </div>
        <h3 class="access-title">Private Porte-Cochère &amp; Ballroom Entry</h3>
        <div class="access-map">
          <!-- TODO: replace with map image: <img src="..." class="map-img" alt=""> -->
        </div>
        <div class="access-gate">
          <span class="gate-left"><i class="bi bi-geo-alt"></i> Shangri-La — Grand Ballroom Door C</span>
          <span class="gate-right">Masked Usher Escort</span>
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
          <span class="price-big">₱8,500 — ₱22,000</span>
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
      :total="orderTotal"
      :currency="'₱'"
      :code-prefix="G1-WMG"
      @close="step = 'select'"
      @reset="resetFlow"
    />
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import BookingCheckout from '../components/BookingCheckout.vue'

const eventId = 'evt-003'
const eventName = 'Winter Masquerade at The Fort'
const venueName = 'Shangri-La Grand Ballroom'
const dateLong = 'Sat, Dec 5, 2026'
const dateShort = 'Sat, Dec 5'
const time24 = '19:00'

const tiers = ref([
  { id: 'tier_bronze', name: 'Bronze — Ballroom Seat', price: 8500, capacity: 7,
    desc: 'A seat at a shared round table of ten, with the full four-course menu.', badge: null },
  { id: 'tier_silver', name: 'Silver — Private Table for Two', price: 14000, capacity: 12,
    desc: 'Your own table for two, with dedicated service and a candle centrepiece.', badge: 'Best Value' },
  { id: 'tier_gold', name: 'Gold — Grand Balcony Box', price: 22000, capacity: 6,
    desc: 'Private balcony box for four with a butler and a magnum of vintage Champagne.', badge: 'Complimentary Champagne' },
])

const addons = ref([
  { name: 'Midnight Waltz Masterclass', price: 1800, desc: 'A 30-minute waltz lesson with the ensemble after the encore.', selected: false },
  { name: 'Cloakroom & Mask Concierge', price: 300, desc: 'Coat check, mask fitting and a reserved car at the door.', selected: false },
])

const movements = ref([
  { work: 'Vivaldi — The Four Seasons (Recomposed)', detail: 'Manila Chamber Quintet, candlelit string reduction · 32 Minutes', tempo: '19:00 · Act I' },
  { work: 'Course II — Winter Consommé', detail: 'Served in the ballroom during the seasonal interlude', tempo: '20:00' },
  { work: 'Piazzolla — Adiós Nonino', detail: 'Bandoneón and quintet · 18 Minutes', tempo: '20:45 · Act II' },
  { work: 'Vivaldi — Winter, II. Largo (Encore)', detail: 'Full quintet, by candlelight only · 9 Minutes', tempo: '21:20 · Encore' },
])

// ---- Tab panels ----
const activeTab = ref('program')

// ---- Hero gallery ----
// TODO: put your image paths here — src '' keeps the gradient placeholder until filled in.
const heroImages = ref([
  { src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80', alt: 'Candlelit ballroom set for dinner' },
  { src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80', alt: 'Masked guests at the reception' },
  { src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80', alt: 'Chamber quintet in period dress' },
  { src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80', alt: 'Champagne service at the table' },
])
const activeImage = ref(0)

const pairings = ref([
  { name: 'Brut Vintage Champagne', detail: 'Champagne, France · served from 18:30 in the foyer', pour: 'Reception · 18:30' },
  { name: 'Chablis 1er Cru', detail: 'Burgundy, France · paired with the winter consommé', pour: 'Course II · 20:00' },
  { name: 'Sauternes', detail: 'Half-bottle service with the Winter Largo encore', pour: 'Encore · 21:20' },
])

const artists = ref([
  { role: 'Concertmaster', name: 'Isabel Zaragoza', city: 'Manila Symphony', bio: 'Nine seasons as concertmaster of the Manila Symphony, and the driving force behind the city’s baroque-pitch chamber series. Her gut-string Four Seasons has been called “the warmest winter in Manila.”', badges: [
    { icon: 'bi-patch-check', text: 'Concertmaster · 9 Seasons' },
    { icon: 'bi-award', text: 'Gawad CCP 2022' },
  ]},
  { role: 'Guest Bandoneón', name: 'Tomás Aguirre', city: 'Buenos Aires', bio: 'A bandoneón player from Buenos Aires who has toured eighteen countries with the Piazzolla repertoire, and who plays a 1920s instrument restored by his family.', badges: [
    { icon: 'bi-disc', text: 'Piazzolla Estate' },
    { icon: 'bi-globe', text: '18 Countries Touring' },
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