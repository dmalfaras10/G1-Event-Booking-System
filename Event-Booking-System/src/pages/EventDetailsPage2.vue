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
        <span :class="['tab', { active: activeTab === 'program' }]" @click="activeTab = 'program'"><i class="bi bi-music-note-list"></i> Program &amp; Set List</span>
        <span :class="['tab', { active: activeTab === 'lineup' }]" @click="activeTab = 'lineup'"><i class="bi bi-people"></i> Performers</span>
        <span :class="['tab', { active: activeTab === 'acoustic' }]" @click="activeTab = 'acoustic'"><i class="bi bi-soundwave"></i> Venue &amp; Acoustics</span>
        <span :class="['tab', { active: activeTab === 'sommelier' }]" @click="activeTab = 'sommelier'"><i class="bi bi-cup-straw"></i> Interval Bar</span>
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

      <!-- Tab panel: Acoustic Blueprint (placeholder content) -->
      <section v-else-if="activeTab === 'acoustic'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Venue &amp; Acoustics</h2>
          <span class="artist-profiles">Hall Calibration</span>
        </div>
        <div class="movements">
          <div class="spec-row">
            <span class="spec-name">Hall</span>
            <span class="spec-value">Samsung Performing Arts Theater — 1,200 seats, shoebox configuration</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Reverberation Time (RT60)</span>
            <span class="spec-value">1.4 s at 500 Hz, with adjustable banners engaged</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Amplification</span>
            <span class="spec-value">None — all instruments acoustic, piano lid on full stick</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Acoustic Sweet Spot</span>
            <span class="spec-value">Orchestra rows C–F — ±1.5 dB dispersion tolerance</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Recording</span>
            <span class="spec-value">Audience recording prohibited; one room mic feed is archived by the house</span>
          </div>
        </div>
      </section>

      <!-- Tab panel: Sommelier Pairing (placeholder content) -->
      <section v-else-if="activeTab === 'sommelier'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Interval Bar</h2>
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
          The interval bar is cashless only. One complimentary soft drink is included with every admission.
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
          <span class="access-loc"><i class="bi bi-geo-alt"></i> Makati City</span>
        </div>
        <h3 class="access-title">Private Lobby &amp; Cabaret Entry</h3>
        <div class="access-map">
          <!-- TODO: replace with map image: <img src="..." class="map-img" alt=""> -->
        </div>
        <div class="access-gate">
          <span class="gate-left"><i class="bi bi-geo-alt"></i> Samsung Performing Arts Theater — Lobby B</span>
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

const pairings = ref([
  { name: 'Riesling Kabinett', detail: 'Mosel, Germany · off-dry, served chilled', pour: 'Interval · 20:40' },
  { name: 'Single Malt Flight', detail: 'Three 15 ml pours — Highland, Speyside and Islay', pour: 'Interval · 20:40' },
  { name: 'Chamomile & Honey', detail: 'Caffeine-free, served in the lobby after the encore', pour: 'Encore · 21:55' },
])

const artists = ref([
  { role: 'Featured Artist', name: 'Nils Frahm', city: 'Berlin, Germany', bio: 'A pianist and producer whose felt-damped piano recordings for Erased Tapes have made him one of the most streamed classical artists in the world, and one of the least predictable live.', badges: [
    { icon: 'bi-disc', text: 'Erased Tapes' },
    { icon: 'bi-award', text: 'Echo Klassik 2015' },
  ]},
  { role: 'Guest Artist', name: 'Frode Haltli', city: 'Oslo, Norway', bio: 'A Hardanger fiddle player and classical violist who moves between folk suites and contemporary commissions, and who has never amplified the instrument on stage.', badges: [
    { icon: 'bi-music-note', text: 'Hardanger Fiddle' },
    { icon: 'bi-patch-check', text: 'Grammy Nominee 2010' },
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
const ticketCode = (n) => `G1-SHR-${String(selectedTierId.value).slice(-4).toUpperCase()}-${String(n).padStart(3, '0')}`
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