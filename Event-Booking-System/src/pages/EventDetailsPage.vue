<template>
  <div class="event-page">
    <!-- ============ LEFT COLUMN: EVENT CONTENT ============ -->
    <div class="event-content">

      <!-- Hero banner -->
      <div class="banner">
        <div class="banner-inner">
          <div class="badge-row">
            <span class="badge badge-magenta">Exclusive Lincoln Center Sanctum</span>
            <span class="badge badge-dark">Private Patron Allotment</span>
          </div>
          <div class="banner-visual">
            <div class="hall-glow"></div>
            <div class="stage">
              <div class="curtains"></div>
              <div class="piano"></div>
              <div class="spotlight"></div>
            </div>
            <div class="banner-overlay-text">
              <span class="kicker">Autumnal Sanctum Series // Volume IV</span>
            </div>
          </div>
        </div>
      </div>

      <span class="event-subtitle">AUTUMNAL SANCTUM SERIES // VOLUME IV</span>
      <h1 class="event-title">
        Nocturne Philharmonic: An Evening of Chopin &amp; Debussy at David Geffen Hall
      </h1>

      <!-- Meta row: 4 quick facts -->
      <div class="meta-grid">
        <div class="meta-card">
          <div class="meta-label">Date &amp; Evening</div>
          <div class="meta-value">Sat, Oct 28, 2026</div>
          <div class="meta-sub">Doors &amp; Lounge open at 18:30</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Curtain Protocol</div>
          <div class="meta-value">19:30 Sharp</div>
          <div class="meta-sub">Black Tie / Velvet</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Sanctum Venue</div>
          <div class="meta-value">David Geffen Hall</div>
          <div class="meta-sub">Lincoln Center, NYC</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Dress Attire</div>
          <div class="meta-value">Style Colonel</div>
          <div class="meta-sub">Stiletto Salon Etiquette</div>
        </div>
      </div>

      <!-- Section tabs -->
      <div class="section-tabs">
        <span class="tab active">Program Notes &amp; Repertoire</span>
        <span class="tab">Orchestra Lineup</span>
        <span class="tab">Acoustic Blueprint</span>
        <span class="tab">Sommelier Pairing</span>
      </div>

      <!-- Description -->
      <section class="event-section">
        <p class="lead">
          Immerse your senses in a transcendent nocturnal exploration celebrating the impressionist
          architecture of Claude Debussy and the poetic virtuosity of Frédéric Chopin. Specially
          re-orchestrated for this one-night gala, the Nocturne Philharmonic summons thirty-two
          strings, dual French horns, and Lincoln Center’s legendary acoustic dispersion.
        </p>
        <p class="lead">
          Central to tonight’s repertoire is the rare 1892 Hamburg Steinway Centennial D-274,
          personally transported from a private Swiss conservatory. With hammers refelted in virgin
          merino wool, this singular instrument renders Chopin’s Ballade No. 4 in F Minor with
          unprecedented velvet-harmonic nuance.
        </p>
      </section>

      <!-- Curated Movement Schedule -->
      <section class="event-section">
        <div class="section-head">
          <h2 class="section-title">Curated Movement Schedule</h2>
          <span class="intermission">Intermission at 20:45 (25 min)</span>
        </div>
        <div class="movements">
          <div v-for="(m, i) in movements" :key="i" class="movement-row">
            <div class="movement-num">{{ i + 1 }}</div>
            <div class="movement-work">{{ m.work }}</div>
            <div class="movement-detail">{{ m.detail }}</div>
            <div class="movement-tempo">{{ m.tempo }}</div>
          </div>
        </div>
      </section>

      <!-- Resident Virtuosos & Maestro -->
      <section class="event-section">
        <div class="section-head">
          <h2 class="section-title">Resident Virtuosos &amp; Maestro</h2>
          <span class="artist-profiles">Artist Profiles</span>
        </div>
        <div class="artist-grid">
          <div v-for="(a, i) in artists" :key="i" class="artist-card">
            <div class="artist-avatar">
              <i class="bi bi-person-circle"></i>
            </div>
            <div class="artist-info">
              <div class="artist-role">{{ a.role }}</div>
              <div class="artist-name">{{ a.name }}</div>
              <div class="artist-city">{{ a.city }}</div>
              <p class="artist-bio">{{ a.bio }}</p>
              <div class="artist-badges">
                <span v-for="(b, bi) in a.badges" :key="bi" class="artist-badge">{{ b }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Access Protocol -->
      <section class="event-section access-protocol">
        <div class="access-head">
          <h3 class="access-title">Access Protocol</h3>
          <span class="access-loc">West 65th St &amp; Columbus Ave</span>
        </div>
        <div class="access-body">
          <div class="access-left">Private Porte-Cochère &amp; Lounge Entry</div>
          <div class="access-right">White-Glove Usher Escort</div>
        </div>
        <div class="access-gate">
          <span class="gate-icon">📍</span>
          <span class="gate-text">David Geffen Hall Patrons VIP Gate 3</span>
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
          <span class="price-big">$145 — $1,250</span>
          <span class="price-sub">/ attendee</span>
        </div>
        <p class="price-note">All admissions include Champagne reception &amp; souvenir program folio.</p>

        <!-- Tier selector title -->
        <div class="tier-title">
          <span class="tier-label">Select Reserve Seating Tier</span>
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
                <span class="tier-price">${{ tier.price }}</span>
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
                <div class="addon-price">+${{ a.price }} / seat</div>
              </div>
              <span class="addon-desc">{{ a.desc }}</span>
            </label>
          </div>
        </div>

        <!-- Order summary: dynamic line items derived from user selection -->
        <div class="order-summary">
          <div v-if="selectedTier" class="order-line">
            <span class="order-line-name">Pass Allocation ({{ selectedTier.name }} × {{ qty }})</span>
            <span class="order-line-price">${{ tiersSubtotal }}</span>
          </div>
          <div v-for="a in selectedAddons" :key="a.name" class="order-line">
            <span class="order-line-name">{{ a.name }} (× {{ qty }})</span>
            <span class="order-line-price">${{ a.price * qty }}</span>
          </div>
          <div v-if="serviceFee > 0" class="order-line">
            <span class="order-line-name">Concierge &amp; Facilities Surcharge (10%)</span>
            <span class="order-line-price">${{ serviceFee }}</span>
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
          <span class="order-total-big">${{ orderTotal }}</span>
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

    <!-- ============ STEP: PAYMENT ============ -->
    <div v-if="step === 'payment'" class="step-payment">
      <div class="container mx-auto px-4 py-5" style="max-width:900px;">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4 p-md-5">
                <nav class="mb-4">
                  <a class="text-decoration-none" @click="step='select'">
                    <i class="bi bi-arrow-left me-2"></i>Back to Seating Selection
                  </a>
                </nav>
                <h2 class="h4 mb-3">Complete Your Booking</h2>
                <p class="text-muted mb-4">Review your order and enter payment details to confirm your tickets.</p>

                <div class="order-mini card bg-dark border-secondary mb-4 p-3">
                  <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted small">{{ qty }} × {{ selectedTier?.name }}</span>
                    <span>${{ (selectedTier?.price || 0) * qty }}</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="fw-bold">Total to Pay</span>
                    <span class="fw-bold text-gold">${{ orderTotal }}</span>
                  </div>
                </div>

                <form @submit.prevent="processPayment" class="needs-validation">
                  <div class="mb-3">
                    <label class="form-label small fw-semibold text-uppercase">Cardholder Name</label>
                    <input v-model="pay.cardholder" type="text" class="form-control bg-dark border-secondary text-light" placeholder="Name on card" required>
                  </div>
                  <div class="mb-3">
                    <label class="form-label small fw-semibold text-uppercase">Card Number</label>
                    <input v-model="pay.number" type="text" class="form-control bg-dark border-secondary text-light" placeholder="1234 5678 9012 3456" required>
                  </div>
                  <div class="row g-3">
                    <div class="col-6 mb-3">
                      <label class="form-label small fw-semibold text-uppercase">Expiry</label>
                      <input v-model="pay.expiry" type="text" class="form-control bg-dark border-secondary text-light" placeholder="MM/YY" required>
                    </div>
                    <div class="col-6 mb-3">
                      <label class="form-label small fw-semibold text-uppercase">CVC</label>
                      <input v-model="pay.cvc" type="text" class="form-control bg-dark border-secondary text-light" placeholder="123" required maxlength="4">
                    </div>
                  </div>
                  <div class="form-check mb-4">
                    <input class="form-check-input" v-model="pay.terms" id="terms" required>
                    <label class="form-check-label small text-muted" for="terms">
                      I agree to the <a href="#" class="text-gold text-decoration-none">Booking Rules &amp; Policies</a> and refund terms.
                    </label>
                  </div>
                  <button class="btn btn-gold w-100 py-3 fw-bold text-uppercase letter-spaced" :disabled="payProcessing">
                    {{ payProcessing ? 'Processing Payment…' : 'Pay Now' }}
                  </button>
                </form>
                <p class="small text-muted mt-3 text-center">Your card details are never stored. Payment processed through a secure gateway.</p>
                <div v-if="payError" class="alert alert-danger mt-3">{{ payError }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============ STEP: CONFIRMATION ============ -->
    <div v-if="step === 'confirmation'" class="step-confirmation">
      <div class="container mx-auto px-4 py-5" style="max-width:1000px;">
        <div class="row">
          <div class="col-lg-8">
            <div class="confirm-hero text-center mb-4">
              <span class="badge bg-success text-dark fw-bold letter-spaced small px-3 py-2">
                <i class="bi bi-check-circle-fill me-1"></i>Booking Confirmed
              </span>
              <h1 class="h3 mb-2">Thank you, <span class="text-gold">{{ userName }}</span></h1>
              <p class="text-muted">Your booking is confirmed and your digital e-tickets are ready.</p>
            </div>

            <div class="card border-0 shadow-sm bg-dark">
              <div class="card-body p-4">
                <h3 class="h6 fw-bold text-uppercase letter-spaced text-muted mb-3">Booking Summary</h3>
                <div class="row g-3">
                  <div class="col-6">
                    <div class="recap-item">
                      <span class="recap-label text-muted small">Event</span>
                      <div class="recap-value">{{ eventName }}</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="recap-item">
                      <span class="recap-label text-muted small">Venue</span>
                      <div class="recap-value">David Geffen Hall</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="recap-item">
                      <span class="recap-label text-muted small">Date &amp; Time</span>
                      <div class="recap-value">Sat, Oct 28, 2026 · 19:30</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="recap-item">
                      <span class="recap-label text-muted small">Seating Tier</span>
                      <div class="recap-value">{{ selectedTier?.name }}</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="recap-item">
                      <span class="recap-label text-muted small">Attendees</span>
                      <div class="recap-value">{{ qty }}</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="recap-item">
                      <span class="recap-label text-muted small">Total Paid</span>
                      <div class="recap-value fw-bold text-gold">${{ orderTotal }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card border-0 shadow-sm bg-dark sticky-top" style="top:1rem;">
              <div class="card-body p-4">
                <h3 class="h6 fw-bold text-uppercase letter-spaced text-muted mb-3">
                  <i class="bi bi-ticket-perforated me-1 text-gold"></i>Digital E-Tickets
                </h3>
                <div class="etickets">
                  <div v-for="n in qty" :key="n" class="eticket mb-3 p-3 border border-secondary rounded bg-black">
                    <div class="eticket-head d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <div class="eticket-event fw-bold text-gold small">{{ eventName }}</div>
                        <div class="eticket-venue text-muted small">David Geffen Hall</div>
                        <div class="eticket-when text-muted small">Sat, Oct 28 · 19:30</div>
                      </div>
                      <div class="text-end">
                        <div class="eticket-tier fw-bold">{{ selectedTier?.name }}</div>
                        <div class="eticket-seat text-muted small">Seat {{ seatFor(n) }}</div>
                      </div>
                    </div>
                    <div class="eticket-code d-flex align-items-center gap-2">
                      <span class="code-label text-muted small fw-semibold">Ticket Code</span>
                      <div class="code-value fw-bold letter-spaced small">${{ ticketCode(n) }}</div>
                      <div class="qr ms-auto">
                        <i class="bi bi-qr-code text-muted"></i>
                      </div>
                    </div>
                    <div class="eticket-actions mt-2 d-flex gap-2">
                      <button class="btn btn-outline-gold btn-sm flex-fill" @click="dlTicket(n)">Download PDF</button>
                      <button class="btn btn-outline-gold btn-sm flex-fill" @click="walletTicket(n)">Add to Wallet</button>
                    </div>
                  </div>
                </div>
                <p class="eticket-note text-muted small mt-3 text-center">
                  <i class="bi bi-info-circle me-1"></i> Present your e‑ticket (QR code) at the venue entrance. Each ticket code is single‑use.
                </p>
                <div class="d-grid gap-2">
                  <button class="btn btn-gold py-2 fw-bold" @click="dlAllTickets">Download All Tickets (PDF)</button>
                  <button class="btn btn-outline-gold py-2 fw-bold text-uppercase letter-spaced" @click="resetFlow">Book Another Event</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const eventId = 'evt_nocturne_2026'
const eventName = 'Nocturne Philharmonic: Chopin & Debussy'

const tiers = ref([
  { id: 'tier_parquet', name: 'Parquet Orchestra Center', price: 185, capacity: 12,
    desc: 'Immersive acoustic sweet spot. Rows E–H. Direct line of sight to piano & keyboard.', badge: null },
  { id: 'tier_dress', name: 'First Tier Dress Circle', price: 299, capacity: 8,
    desc: 'Elevated panoramic sight lines with superior acoustics. Box Front.', badge: 'Most Requested by Guild Benefactors' },
  { id: 'tier_founders', name: 'Private Mezzanine Box', price: 1250, capacity: 6,
    desc: 'Dedicated 4‑Seat Enclave with Private Butler & Dom Pérignon Vintage Pour. Private Salon Anteroom Access.', badge: null },
])

const addons = ref([
  { name: 'Post‑Show Green Room Reception', price: 120, desc: 'Meet the artists after the curtain.', selected: false },
  { name: 'Valet Parking Guarantee (Porte‑Cochère)', price: 45, desc: 'Guaranteed valet at the private entrance.', selected: false },
])

const movements = ref([
  { work: 'Debussy: Prélude à l’après‑midi d’un faune', detail: 'Solo Flute, Dual Harps & Naded Strings · 11 Minutes', tempo: 'Allegretto ma non troppo' },
  { work: 'Chopin: Piano Concerto No. 2 in F Minor, Op. 21', detail: 'Featuring Viviano Atalian / 34 Minutes', tempo: 'Maestoso · Larghetto' },
  { work: 'Debussy: Nocturnes (Nuages, Fêtes, Sirènes)', detail: 'Full Orchestra with 16‑Voice Female Choir / 26 Minutes', tempo: 'Très lent · Animé' },
])

const artists = ref([
  { role: 'Featured Soloist', name: 'Alistair Vance', city: 'Hamburg Steinway Resident', bio: 'Three‑time International Chopin Piano Prize medalist, celebrated for a rare pianism that the Financial Times called “an otherworldly suspension of acoustic time.”', badges: ['Carnegie Hall Resident', '14× Deutscher Schallplattenpreis'] },
  { role: 'Musical Director', name: 'Julian von Berg', city: 'Vienna Philharmonic Alumnus', bio: 'Directing the Nocturne Philharmonic into its fifteenth season, Julian has previously conducted the Royal Concertgebouw and Vienna Philharmonic in historical French romantic repertoires.', badges: ['Order of Arts &amp; Letters', '32 World Premieres'] },
])

// ---- Booking state ----
const step = ref('select')
const selectedTierId = ref(null)
const qty = ref(1)
const holdExpired = ref(false)
const payProcessing = ref(false)
const payError = ref('')
const userName = ref('Guest')

const pay = ref({ cardholder: '', number: '', expiry: '', cvc: '', terms: false })

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
const ticketCode = (n) => `G1-NC-${String(selectedTierId.value).slice(-4).toUpperCase()}-${String(n).padStart(3, '0')}`
const seatFor = (n) => String.fromCharCode(65 + (n - 1)) + (10 + (n - 1))

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

function processPayment() {
  if (!pay.value.terms) { payError.value = 'Please accept the booking rules and refund terms.'; return }
  payProcessing.value = true
  payError.value = ''
  setTimeout(() => {
    const ok = Math.random() > 0.1
    payProcessing.value = false
    if (!ok) { payError.value = 'Payment was declined. Please try a different card.'; return }
    userName.value = 'Guest'
    step.value = 'confirmation'
  }, 1500)
}

function dlTicket(n) { alert(`Downloading e‑ticket PDF: ${ticketCode(n)}`) }
function walletTicket(n) { alert(`Added ${ticketCode(n)} to wallet.`) }
function dlAllTickets() { alert(`Downloading all ${qty.value} e‑tickets as a single PDF.`) }

function resetFlow() {
  step.value = 'select'
  selectedTierId.value = null
  qty.value = 1
  addons.value.forEach(a => a.selected = false)
  pay.value = { cardholder: '', number: '', expiry: '', cvc: '', terms: false }
  payError.value = ''
  holdExpired.value = false
}
</script>

<style scoped>
:root {
  --bg-primary: #0b0b0c;
  --bg-surface: #141416;
  --gold-accent: #f3c64f;
  --gold-accent-hover: #e0b23a;
  --magenta-badge: #a83266;
  --text-main: #f4f4f5;
  --text-muted: #9ca3af;
  --border-subtle: rgba(255, 255, 255, 0.08);
}
body { background: var(--bg-primary); color: var(--text-main); font-family: "Inter", sans-serif; }

.text-gold { color: var(--gold-accent) !important; }
.btn-gold {
  background: var(--gold-accent) !important;
  color: #0b0b0c !important;
  border: none !important;
}
.btn-gold:hover { background: var(--gold-accent-hover) !important; color: #0b0b0c !important; }
.btn-outline-gold {
  border: 2px solid var(--gold-accent) !important;
  color: var(--gold-accent) !important;
  background: transparent !important;
}
.btn-outline-gold:hover { background: var(--gold-accent) !important; color: #0b0b0c !important; }
.letter-spaced { letter-spacing: 0.6px; }

/* Layout */
.event-page {
  display: grid;
  grid-template-columns: 1fr 410px;
  gap: 2rem;
  min-height: 100vh;
  padding: 2rem 1.5rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
}
.event-content { min-width: 0; }
.booking-panel { position: sticky; top: 1rem; align-self: start; }

/* Banner */
.banner {
  position: relative;
  height: 300px;
  border-radius: 1rem;
  overflow: hidden;
  background: #0a0a0b;
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-end;
}
.banner-inner { position: relative; width: 100%; height: 100%; padding: 1rem; }
.badge-row { display: flex; gap: 0.5rem; margin-bottom: auto; }
.badge {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  padding: 0.4rem 0.75rem;
  border-radius: 0.35rem;
}
.badge-magenta { background: var(--magenta-badge); color: #fff; }
.badge-dark { background: rgba(255,255,255,0.10); color: var(--text-main); border: 1px solid var(--border-subtle); }

.banner-visual {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #141416 0%, #1c1c1f 60%, #24242a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hall-glow {
  position: absolute;
  width: 220px; height: 220px;
  background: radial-gradient(circle, rgba(243,198,79,0.15) 0%, transparent 70%);
  top: -60px; left: -60px;
  filter: blur(28px);
  z-index: 0;
}
.stage { position: relative; z-index: 2; width: 300px; height: 140px; }
.curtains {
  position: absolute; bottom: 0; left: 0; right: 0; height: 55px;
  background: repeating-linear-gradient(to right, #1a1a1c 0, #1a1a1c 14px, #121213 14px, #121213 28px);
  border-top: 2px solid #0b0b0c;
}
.piano {
  position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 150px; height: 40px;
  background: repeating-linear-gradient(to right, #0a0a0b 0, #0a0a0b 10px, #1a1a1c 10px, #1a1a1c 20px);
  border-radius: 4px 4px 0 0;
  box-shadow: 0 -6px 18px rgba(0,0,0,0.6);
}
.spotlight {
  position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
  width: 120px; height: 90px;
  background: radial-gradient(circle at 50% 100%, rgba(243,198,79,0.25) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(12px);
  z-index: 1;
}
.banner-overlay-text { position: absolute; bottom: 1rem; left: 1rem; z-index: 5; }
.kicker {
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.8px; color: var(--text-muted); display: block; margin-bottom: 0.2rem;
}

/* Title */
.event-title {
  font-family: "Montserrat", sans-serif;
  font-size: 2.15rem; font-weight: 800; line-height: 1.12;
  margin: 0 0 0.35rem 0; letter-spacing: -0.5px;
}
.event-subtitle {
  display: block; font-size: 1.35rem; font-weight: 600; color: var(--gold-accent);
  margin-top: 0.25rem; letter-spacing: -0.3px;
}

/* Meta grid */
.meta-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}
.meta-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  padding: 0.85rem 1rem;
}
.meta-label {
  font-size: 0.68rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.7px; color: var(--text-muted); margin-bottom: 0.2rem;
}
.meta-value { font-size: 0.92rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.12rem; }
.meta-sub { font-size: 0.75rem; color: #8a8a93; }

/* Section tabs */
.section-tabs {
  display: flex; gap: 0.5rem;
  margin-bottom: 1.25rem; flex-wrap: wrap;
}
.tab {
  font-size: 0.78rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.5px; color: var(--text-muted);
  padding: 0.45rem 0.9rem; border: 1px solid var(--border-subtle);
  border-radius: 2rem; background: transparent; cursor: pointer;
}
.tab.active { border-color: var(--gold-accent); color: var(--gold-accent); background: rgba(243,198,79,0.08); }

/* Sections */
.event-section { margin-bottom: 1.75rem; }
.section-head {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 0.9rem;
}
.section-title {
  font-family: "Montserrat", sans-serif;
  font-size: 1.05rem; font-weight: 800; margin: 0;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.artist-profiles { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); }
.intermission {
  font-size: 0.72rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.6px; color: var(--gold-accent);
}
.lead { font-size: 0.92rem; line-height: 1.7; color: #d9d9de; margin: 0 0 0.9rem 0; }

/* Movements */
.movements { display: flex; flex-direction: column; gap: 0.65rem; }
.movement-row {
  display: flex; gap: 0.9rem;
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: 0.75rem; padding: 0.85rem 1rem;
}
.movement-num {
  width: 26px; height: 26px; border-radius: 50%; background: var(--gold-accent);
  color: #0b0b0c; font-weight: 800; font-size: 0.8rem; display: flex;
  align-items: center; justify-content: center; flex-shrink: 0;
}
.movement-work { flex: 1; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.1rem; }
.movement-detail { font-size: 0.82rem; color: #b9b9c1; margin-bottom: 0.1rem; }
.movement-tempo { font-size: 0.78rem; color: var(--gold-accent); font-style: italic; }

/* Artists */
.artist-grid { display: flex; gap: 1rem; }
.artist-card {
  flex: 1; background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: 0.85rem; padding: 1rem; display: flex; gap: 0.85rem;
}
.artist-avatar {
  width: 50px; height: 50px; border-radius: 50%;
  background: linear-gradient(135deg, var(--gold-accent), var(--gold-accent-hover));
  color: #0b0b0c; display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem; flex-shrink: 0;
}
.artist-info { flex: 1; }
.artist-role { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gold-accent); margin-bottom: 0.1rem; }
.artist-name { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.2rem; color: var(--text-main); }
.artist-city { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.45rem; }
.artist-bio { font-size: 0.82rem; line-height: 1.5; color: #c1c1c7; margin: 0 0 0.6rem 0; }
.artist-badges { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.artist-badge {
  font-size: 0.62rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;
  color: var(--gold-accent); border: 1px solid rgba(243,198,79,0.35);
  padding: 0.2rem 0.55rem; border-radius: 0.3rem;
}

/* Access Protocol */
.access-protocol { margin-top: 0.5rem; }
.access-head {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 0.75rem;
}
.access-title { font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin: 0; color: var(--text-main); }
.access-loc { font-size: 0.72rem; font-weight: 700; color: var(--gold-accent); }
.access-body {
  display: flex; justify-content: space-between;
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: 0.75rem; padding: 0.9rem 1rem;
}
.access-left, .access-right { font-size: 0.88rem; font-weight: 700; }
.access-gate {
  display: flex; align-items: center; gap: 0.55rem;
  margin-top: 0.75rem; font-size: 0.8rem; color: #b9b9c1;
}
.gate-icon { color: var(--gold-accent); }

/* Booking panel */
.booking-card {
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: 1rem; padding: 1.25rem;
}
.allocation {
  display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;
}
.alloc-badge {
  font-size: 0.68rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.6px;
  color: var(--text-main);
  background: none;
  border: none;
  padding: 0;
  border-radius: 0;
}
.alloc-active {
  color: #fff;
  background: var(--magenta-badge);
  border: 1px solid var(--magenta-badge);
  border-radius: 0.3rem;
  padding: 0.32rem 0.65rem;
}

.price-range { display: flex; align-items: baseline; gap: 0.25rem; margin-bottom: 0.2rem; }
.price-big { font-family: "Montserrat", sans-serif; font-size: 1.9rem; font-weight: 900; color: var(--text-main); }
.price-sub { font-size: 1rem; font-weight: 700; color: var(--text-main); }
.price-note { font-size: 0.78rem; color: #b9b9c1; margin-bottom: 1.1rem; }

.tier-title { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.tier-label { font-size: 0.82rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-main); }

.tiers { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.2rem; }
.tier-card {
  display: flex; align-items: flex-start; gap: 0.75rem;
  background: var(--bg-primary); border: 1px solid var(--border-subtle);
  border-radius: 0.75rem; padding: 0.8rem 0.9rem; cursor: pointer; transition: all 0.2s;
}
.tier-card:hover { border-color: rgba(243,198,79,0.35); }
.tier-card.selected { border-color: var(--gold-accent); background: rgba(243,198,79,0.07); box-shadow: 0 0 0 2px rgba(243,198,79,0.16) inset; }
.tier-radio { margin: 0; width: 18px; height: 18px; appearance: none; border: 2px solid var(--border-subtle); border-radius: 50%; cursor: pointer; flex-shrink: 0; margin-top: 0.15rem; }
.tier-card.selected .tier-radio { border-color: var(--gold-accent); background: var(--gold-accent); background-image: radial-gradient(#0b0b0c 42%, transparent 44%); background-size: 55% 55%; background-repeat: no-repeat; background-position: center; }
.tier-body { flex: 1; min-width: 0; }
.tier-name-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.2rem; }
.tier-name { font-weight: 700; font-size: 0.9rem; color: var(--text-main); }
.tier-price { font-family: "Montserrat", sans-serif; font-size: 0.95rem; font-weight: 800; color: var(--gold-accent); }
.tier-desc { font-size: 0.76rem; color: #b9b9c1; line-height: 1.4; margin-bottom: 0.35rem; }
.tier-badge {
  font-size: 0.64rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;
  color: #fff; background: rgba(168,50,102,0.85); border: 1px solid var(--magenta-badge);
  padding: 0.18rem 0.55rem; border-radius: 0.3rem; width: fit-content;
}

/* Attendees */
.attendees {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: 0.7rem; padding: 0.7rem 0.9rem; margin-bottom: 1.2rem;
}
.att-label { font-size: 0.8rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
.att-control { display: flex; align-items: center; gap: 0.45rem; }
.att-btn {
  width: 26px; height: 26px; border: 1px solid var(--border-subtle);
  background: var(--bg-primary); color: var(--text-main); border-radius: 0.35rem;
  cursor: pointer; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; line-height: 1;
  transition: opacity 0.15s, color 0.15s, border-color 0.15s, background 0.15s;
}
.att-btn:disabled {
  opacity: 0.4;
  color: var(--text-muted);
  background: var(--bg-surface);
  border-color: var(--border-subtle);
  cursor: not-allowed;
}
.att-btn:not(:disabled):hover { border-color: rgba(243,198,79,0.35); }
.att-qty { font-family: "Montserrat", sans-serif; font-weight: 800; font-size: 0.95rem; min-width: 20px; text-align: center; }
.att-note { font-size: 0.7rem; color: var(--text-muted); margin-left: auto; }

/* Add-ons */
.addons-section { margin-bottom: 1.2rem; }
.addons-title { font-size: 0.82rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 0.65rem 0; color: var(--text-main); }
.addon-row { margin-bottom: 0.55rem; }
.addon-label {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) minmax(0, 0.9fr);
  column-gap: 0.75rem;
  row-gap: 0.1rem;
  align-items: start;
  cursor: pointer;
}
.addon-checkbox { display: none; }
.addon-check { width: 20px; height: 20px; border: 2px solid var(--border-subtle); border-radius: 0.3rem; flex-shrink: 0; margin-top: 0.1rem; background: var(--bg-primary); position: relative; }
.addon-checkbox:checked + .addon-check { background: var(--gold-accent); border-color: var(--gold-accent); }
.addon-checkbox:checked + .addon-check::after { content: "✓"; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); color: #0b0b0c; font-weight: 900; font-size: 0.85rem; }
/* Grid placement: checkbox | name/price | description, identical columns on every row */
.addon-check { grid-column: 1; grid-row: 1 / span 2; }
/* addon-main: name bold on top, gold price below it (flex column) */
.addon-main { grid-column: 2; grid-row: 1 / span 2; display: flex; flex-direction: column; gap: 0.1rem; min-width: 0; }
.addon-name { font-weight: 700; color: var(--text-main); line-height: 1.35; }
.addon-price { font-family: "Montserrat", sans-serif; font-weight: 800; color: var(--gold-accent); line-height: 1.35; }
/* Description aligned in its own column so every row lines up */
.addon-desc { grid-column: 3; grid-row: 1 / span 2; font-size: 0.74rem; color: #b9b9c1; line-height: 1.45; }

/* Order summary plain text line items */
.order-summary { border-top: 1px solid var(--border-subtle); padding-top: 0.9rem; margin-bottom: 0.9rem; }
.order-line {
  display: flex; justify-content: space-between; align-items: baseline; font-size: 0.88rem;
  color: var(--text-main); margin-bottom: 0.45rem;
}
.order-line-name { font-weight: 600; }
.order-empty { font-size: 0.8rem; color: var(--text-muted); font-style: italic; margin-bottom: 0.45rem; }
.order-line-price { font-family: "Montserrat", sans-serif; font-weight: 800; color: var(--gold-accent); white-space: nowrap; }
.order-divider { height: 1px; background: var(--border-subtle); margin: 0.6rem 0; }
/* Total header like Image 6: TOTAL INVESTMENT left, Taxes Included right */
.order-total-header {
  display: flex; justify-content: space-between; align-items: baseline;
  font-size: 0.82rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;
  color: var(--text-main); margin-bottom: 0.35rem;
}
.order-tax-right { color: var(--text-muted); font-weight: 600; }
.order-total-big {
  display: block; font-family: "Montserrat", sans-serif;
  font-size: 1.9rem; font-weight: 900; color: var(--gold-accent);
}

/* Buttons */
.checkout-btn { width: 100%; padding: 0.85rem 1.5rem; margin-bottom: 0.5rem; }
.secure-note { font-size: 0.68rem; color: var(--text-muted); text-align: center; margin-bottom: 1rem; letter-spacing: 0.3px; }

/* Special Patron Accommodations (separate section) */
.patron-accom {
  margin-top: 2rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  padding: 1rem;
}
.accom-row {
  display: flex; gap: 0.7rem;
  background: rgba(243,198,79,0.06); border: 1px solid rgba(243,198,79,0.25);
  border-radius: 0.7rem; padding: 0.8rem;
}
.accom-icon { font-size: 1.1rem; flex-shrink: 0; }
.accom-text { flex: 1; }
.accom-title { font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gold-accent); margin: 0 0 0.2rem 0; }
.accom-sub { font-size: 0.74rem; color: #b9b9c1; line-height: 1.4; margin: 0; }

/* Responsive */
@media (max-width: 1024px) {
  .event-page { grid-template-columns: 1fr; gap: 1.5rem; padding: 1.5rem 1rem 3rem; }
  .booking-panel { position: static; }
  .meta-grid { grid-template-columns: repeat(2, 1fr); }
  .artist-grid { flex-direction: column; }
}
@media (max-width: 480px) {
  /* Stack name/price above the description on very narrow panels */
  .addon-label {
    grid-template-columns: 20px minmax(0, 1fr);
  }
  .addon-check { grid-row: 1 / span 2; }
  .addon-main { grid-column: 2; grid-row: 1; }
  .addon-desc { grid-column: 2; grid-row: 2; }
}
</style>