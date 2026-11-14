<template>
  <div class="event-page">
    <!-- ============ LEFT COLUMN: EVENT CONTENT ============ -->
    <div class="event-content">

      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="#">Performances</a><span class="crumb-sep">/</span>
        <a href="#">Live Concert</a><span class="crumb-sep">/</span>
        <span class="crumb-current">Velvet Indie Sessions</span>
      </nav>

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

      <!-- Section tabs (switch the content panel below) -->
      <div class="section-tabs">
        <span :class="['tab', { active: activeTab === 'program' }]" @click="activeTab = 'program'"><i class="bi bi-music-note-list"></i> Set List &amp; Running Order</span>
        <span :class="['tab', { active: activeTab === 'lineup' }]" @click="activeTab = 'lineup'"><i class="bi bi-people"></i> Band &amp; Support</span>
        <span :class="['tab', { active: activeTab === 'acoustic' }]" @click="activeTab = 'acoustic'"><i class="bi bi-broadcast"></i> Theatre &amp; Sound</span>
        <span :class="['tab', { active: activeTab === 'sommelier' }]" @click="activeTab = 'sommelier'"><i class="bi bi-cup-straw"></i> Merch &amp; Bar</span>
      </div>

      <!-- Tab panel: Program Notes & Repertoire -->
      <section v-if="activeTab === 'program'" class="event-section">
        <p class="lead">
          Warm analog guitars and nostalgic indie rock anthems, performed live in an acoustically engineered theatre by a nine-piece collective that has spent three years turning Where Time Goes into a full-band record.
        </p>
        <p class="lead">
          The Coastal Drift Collective bring a string quartet for the second set, a pedal steel player from Cebu, and a support slot from Paper Lanterns — all of it mixed for a seated room rather than a festival field.
        </p>
      </section>

      <!-- Curated Movement Schedule (part of Program Notes & Repertoire) -->
      <section v-if="activeTab === 'program'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Set List &amp; Running Order</h2>
          <span class="intermission">Support act · two sets</span>
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
          <h2 class="section-title">Band &amp; Support</h2>
          <span class="artist-profiles">9 Musicians Onstage</span>
        </div>
        <div class="lineup-grid">
          <div class="lineup-card">
            <div class="lineup-name">Guitars</div>
            <div class="lineup-detail">Two electric guitars and one pedal steel, vintage amps only.</div>
            <div class="lineup-count">3 Players</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Bass</div>
            <div class="lineup-detail">Fretless bass and a baritone guitar covering the low end.</div>
            <div class="lineup-count">1 Player</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Drums</div>
            <div class="lineup-detail">Kit plus a floor tom and tambourine for the indie anthems.</div>
            <div class="lineup-count">1 Player</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Keys</div>
            <div class="lineup-detail">Rhodes, Wurlitzer and a Mellotron for the string lines.</div>
            <div class="lineup-count">1 Player</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">String Quartet</div>
            <div class="lineup-detail">Four-piece string section joining for Set II and the encore.</div>
            <div class="lineup-count">4 Players</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Support</div>
            <div class="lineup-detail">Paper Lanterns — four-piece acoustic support act from Cebu.</div>
            <div class="lineup-count">4 Players</div>
          </div>
        </div>
      </section>

      <!-- Tab panel: Acoustic Blueprint (placeholder content) -->
      <section v-else-if="activeTab === 'acoustic'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Theatre &amp; Sound</h2>
          <span class="artist-profiles">Hall Calibration</span>
        </div>
        <div class="movements">
          <div class="spec-row">
            <span class="spec-name">Hall</span>
            <span class="spec-value">Solaire Theatre — 1,400 seats, raked stalls and balcony</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Reverberation Time (RT60)</span>
            <span class="spec-value">1.6 s at 500 Hz, adjustable banners</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Dispersion System</span>
            <span class="spec-value">Line array, 12 elements per hang, with balcony delays</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Acoustic Sweet Spot</span>
            <span class="spec-value">Stalls rows F–M — ±2 dB dispersion tolerance</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Merch</span>
            <span class="spec-value">Vinyl booth opens 18:00 in the lobby, card only</span>
          </div>
        </div>
      </section>

      <!-- Tab panel: Sommelier Pairing (placeholder content) -->
      <section v-else-if="activeTab === 'sommelier'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Merch &amp; Bar</h2>
          <span class="artist-profiles">Curated by the Theatre Bar</span>
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
          Two drink vouchers are included with every stalls and balcony admission. The merch booth accepts cards only.
        </p>
      </section>

      <!-- Resident Virtuosos & Maestro -->
      <section class="event-section">
        <div class="section-head">
          <h2 class="section-title">Featured Artists</h2>
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
          <span class="access-loc"><i class="bi bi-geo-alt"></i> Pasay City</span>
        </div>
        <h3 class="access-title">Lobby, Merch Booth &amp; Theatre Entry</h3>
        <div class="access-map">
          <!-- TODO: replace with map image: <img src="..." class="map-img" alt=""> -->
        </div>
        <div class="access-gate">
          <span class="gate-left"><i class="bi bi-geo-alt"></i> Solaire Theatre — Main Lobby, Gate 2</span>
          <span class="gate-right">House Usher Escort</span>
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
                    <span>{{ peso((selectedTier?.price || 0) * qty) }}</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="fw-bold">Total to Pay</span>
                    <span class="fw-bold text-gold">{{ peso(orderTotal) }}</span>
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
                      <div class="recap-value">{{ venueName }}</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="recap-item">
                      <span class="recap-label text-muted small">Date &amp; Time</span>
                      <div class="recap-value">{{ dateLong }} · {{ time24 }}</div>
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
                      <div class="recap-value fw-bold text-gold">{{ peso(orderTotal) }}</div>
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
                        <div class="eticket-venue text-muted small">{{ venueName }}</div>
                        <div class="eticket-when text-muted small">{{ dateShort }} · {{ time24 }}</div>
                      </div>
                      <div class="text-end">
                        <div class="eticket-tier fw-bold">{{ selectedTier?.name }}</div>
                        <div class="eticket-seat text-muted small">Seat {{ seatFor(n) }}</div>
                      </div>
                    </div>
                    <div class="eticket-code d-flex align-items-center gap-2">
                      <span class="code-label text-muted small fw-semibold">Ticket Code</span>
                      <div class="code-value fw-bold letter-spaced small">{{ ticketCode(n) }}</div>
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

const movements = ref([
  { work: 'Support — Paper Lanterns', detail: 'Four-piece indie folk, acoustic · 30 Minutes', tempo: '19:15' },
  { work: 'Set I — Velvet Years', detail: 'Where Time Goes, Slow Motion, Hometown Static · 45 Minutes', tempo: '20:00' },
  { work: 'Set II — Neon Coast', detail: 'Full band with pedal steel and string quartet · 50 Minutes', tempo: '21:00' },
  { work: 'Encore — Where Time Goes (Reprise)', detail: 'Acoustic, house lights up · 10 Minutes', tempo: '22:00' },
])

// ---- Tab panels ----
const activeTab = ref('program')

// ---- Hero gallery ----
// TODO: put your image paths here — src '' keeps the gradient placeholder until filled in.
const heroImages = ref([
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80', alt: 'Band on a theatre stage' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80', alt: 'Guitarist under warm stage light' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80', alt: 'Crowd in the stalls' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80', alt: 'Vinyl merch booth in the lobby' },
])
const activeImage = ref(0)

const pairings = ref([
  { name: 'Local Craft Lager', detail: 'Brewed in Pampanga · served from the lobby bar', pour: 'Doors · 18:00' },
  { name: 'Cold Brew & Bourbon', detail: 'Barrel-aged cold brew with a bourbon float', pour: 'Interval · 21:00' },
  { name: 'Sparkling Yuzu', detail: 'Zero-proof, served at the merch booth', pour: 'Encore · 22:00' },
])

const artists = ref([
  { role: 'Frontman & Guitar', name: 'Elias Manalo', city: 'Cebu → Manila', bio: 'Elias writes the songs, sings them, and plays the loudest guitar in the room — a Cebu-raised songwriter whose Where Time Goes turned a bedroom demo into a national tour.', badges: [
    { icon: 'bi-vinyl', text: 'Where Time Goes · LP' },
    { icon: 'bi-award', text: 'Awit Award 2024' },
  ]},
  { role: 'The Band', name: 'The Coastal Drift Collective', city: 'Cebu, Philippines', bio: 'Nine players, three vocalists and a string quartet, assembled for the record and kept together for the tour. Their live shows are built for rooms with seats, not fields.', badges: [
    { icon: 'bi-music-note', text: '9 Members' },
    { icon: 'bi-globe', text: 'SEA Tour 2025' },
  ]},
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
const peso = (v) => '₱' + Number(v).toLocaleString('en-PH')
const ROMANS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
const roman = (i) => ROMANS[i] ?? (i + 1)
const ticketCode = (n) => `G1-VIS-${String(selectedTierId.value).slice(-4).toUpperCase()}-${String(n).padStart(3, '0')}`
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

<style scoped src="../assets/EventDetailsPage.css"></style>