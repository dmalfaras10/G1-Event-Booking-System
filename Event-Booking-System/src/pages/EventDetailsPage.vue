<template>
  <div class="event-page">
    <!-- ============ LEFT COLUMN: EVENT CONTENT ============ -->
    <div class="event-content">

      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="#">Performances</a><span class="crumb-sep">/</span>
        <a href="#">Classical &amp; Orchestral</a><span class="crumb-sep">/</span>
        <span class="crumb-current">Nocturne Philharmonic Gala</span>
      </nav>

      <!-- Hero banner (switches when a thumbnail below is clicked) -->
      <div class="banner">
        <div class="banner-media">
          <!-- TODO: fill in the src values in heroImages (script) — banner auto-switches on thumb click -->
          <img v-if="heroImages[activeImage]?.src" :key="activeImage" :src="heroImages[activeImage].src" class="banner-img" alt="">
        </div>
        <div class="badge-row">
          <span class="badge badge-magenta">Exclusive Lincoln Center Sanctum</span>
          <span class="badge badge-dark">Private Patron Allotment</span>
        </div>
        <div class="banner-strip">
          <div class="strip-left">
            <i class="bi bi-megaphone-fill"></i> Meyer Sound Constellation
            <span class="strip-sep">|</span>
            <span class="strip-detail">Reverbation RT60 = 1.82s</span>
          </div>
          <div class="strip-right">
            <i class="bi bi-bank2"></i> 14 Master Box Suites Left
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

      <span class="event-kicker"><i class="bi bi-lightning-charge-fill"></i> Autumnal Sanctum Series // Volume IV</span>
      <h1 class="event-title">
        Nocturne Philharmonic: An Evening of Chopin &amp; Debussy at David Geffen Hall
      </h1>

      <!-- Meta row: 4 quick facts in a single panel -->
      <div class="meta-grid">
        <div class="meta-card">
          <div class="meta-label">Date &amp; Evening</div>
          <div class="meta-value"><i class="bi bi-calendar-event"></i> Sat, Oct 28, 2026</div>
          <div class="meta-sub">Doors &amp; Lounge open at 18:30</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Curtain Protocol</div>
          <div class="meta-value"><i class="bi bi-clock"></i> 19:30 Sharp</div>
          <div class="meta-sub">Doors &amp; Lounge from 18:30</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Sanctum Venue</div>
          <div class="meta-value"><i class="bi bi-bank2"></i> David Geffen Hall</div>
          <div class="meta-sub">Lincoln Center, NYC</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Dress Attire</div>
          <div class="meta-value"><i class="bi bi-suit-diamond"></i> Black Tie / Velvet</div>
          <div class="meta-sub">Stiletto Salon Etiquette</div>
        </div>
      </div>

      <!-- Section tabs (switch the content panel below) -->
      <div class="section-tabs">
        <span :class="['tab', { active: activeTab === 'program' }]" @click="activeTab = 'program'"><i class="bi bi-journal-text"></i> Program Notes &amp; Repertoire</span>
        <span :class="['tab', { active: activeTab === 'lineup' }]" @click="activeTab = 'lineup'"><i class="bi bi-people"></i> Orchestra Lineup</span>
        <span :class="['tab', { active: activeTab === 'acoustic' }]" @click="activeTab = 'acoustic'"><i class="bi bi-rulers"></i> Acoustic Blueprint</span>
        <span :class="['tab', { active: activeTab === 'sommelier' }]" @click="activeTab = 'sommelier'"><i class="bi bi-cup-straw"></i> Sommelier Pairing</span>
      </div>

      <!-- Tab panel: Program Notes & Repertoire -->
      <section v-if="activeTab === 'program'" class="event-section">
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

      <!-- Curated Movement Schedule (part of Program Notes & Repertoire) -->
      <section v-if="activeTab === 'program'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Curated Movement Schedule</h2>
          <span class="intermission">Intermission at 20:45 (25 min)</span>
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
          <h2 class="section-title">Orchestra Lineup</h2>
          <span class="artist-profiles">71 Musicians Onstage</span>
        </div>
        <div class="lineup-grid">
          <div class="lineup-card">
            <div class="lineup-name">Strings</div>
            <div class="lineup-detail">32 players — 12 First Violins · 10 Second Violins · 6 Violas · 4 Cellos, led by the Concertmaster's desk.</div>
            <div class="lineup-count">32 Players</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Woodwinds</div>
            <div class="lineup-detail">Dual flutes, oboes, clarinets &amp; bassoons — with solo cor anglais for the Nocturnes.</div>
            <div class="lineup-count">8 Players</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Brass</div>
            <div class="lineup-detail">Dual French horns, dual trumpets &amp; tenor trombone — muted for the impressionist passages.</div>
            <div class="lineup-count">5 Players</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Harp, Piano &amp; Percussion</div>
            <div class="lineup-detail">1892 Hamburg Steinway Centennial D-274, dual harps, timpani &amp; celesta.</div>
            <div class="lineup-count">5 Players</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Guest Female Choir</div>
            <div class="lineup-detail">16-voice chamber choir — Sirènes movement, positioned in the First Tier balcony.</div>
            <div class="lineup-count">16 Voices</div>
          </div>
          <div class="lineup-card">
            <div class="lineup-name">Featured Soloists</div>
            <div class="lineup-detail">Alistair Vance, piano — Viviano Atalian, guest concertmaster — Julian von Berg, podium.</div>
            <div class="lineup-count">3 Guest Artists</div>
          </div>
        </div>
      </section>

      <!-- Tab panel: Acoustic Blueprint (placeholder content) -->
      <section v-else-if="activeTab === 'acoustic'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Acoustic Blueprint</h2>
          <span class="artist-profiles">Hall Calibration</span>
        </div>
        <div class="movements">
          <div class="spec-row">
            <span class="spec-name">Reverberation Time (RT60)</span>
            <span class="spec-value">1.82 s — full concert configuration</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Dispersion System</span>
            <span class="spec-value">Meyer Sound Constellation — 96 elements, concealed in the ceiling coffers</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Acoustic Sweet Spot</span>
            <span class="spec-value">Parquet Rows E–H — ±2 dB dispersion tolerance</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Hall Volume</span>
            <span class="spec-value">27,400 m³ adjustable chamber — velvet dampening panels engaged at 19:15</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">Box Suite Isolation</span>
            <span class="spec-value">Private mezzanine envelope — acoustic decoupling at 38 dB attenuation</span>
          </div>
        </div>
      </section>

      <!-- Tab panel: Sommelier Pairing (placeholder content) -->
      <section v-else-if="activeTab === 'sommelier'" class="event-section">
        <div class="section-head">
          <h2 class="section-title">Sommelier Pairing</h2>
          <span class="artist-profiles">Curated by House Sommelier</span>
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
          The Champagne reception is included with every admission; reserve pours are complimentary for Founder Tier patrons.
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
          <span class="access-loc"><i class="bi bi-geo-alt"></i> West 65th St &amp; Columbus Ave</span>
        </div>
        <h3 class="access-title">Private Porte-Cochère &amp; Lounge Entry</h3>
        <div class="access-map">
          <!-- TODO: replace with map image: <img src="..." class="map-img" alt=""> -->
        </div>
        <div class="access-gate">
          <span class="gate-left"><i class="bi bi-geo-alt"></i> David Geffen Hall Patrons VIP Gate 3</span>
          <span class="gate-right">White-Glove Usher Escort</span>
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

// ---- Tab panels ----
const activeTab = ref('program')

// ---- Hero gallery ----
// TODO: put your image paths here — src '' keeps the gradient placeholder until filled in.
const heroImages = ref([
  { src: '', alt: 'David Geffen Hall — patron view' },
  { src: '', alt: 'Grand chandelier & boxes' },
  { src: '', alt: 'Orchestra on stage' },
  { src: '', alt: 'Master box suite' },
])
const activeImage = ref(0)

const pairings = ref([
  { name: 'Dom Pérignon Vintage 2013', detail: 'Épernay, France · Disgorged 2021 — served fluted at the Porte-Cochère lounge', pour: 'Doors Pour · 18:30' },
  { name: 'Chablis Grand Cru “Les Clos” 2019', detail: 'William Fèvre, Burgundy — kinetic minerality to mirror the Nocturnes', pour: 'First Interlude · 20:45' },
  { name: 'Château d’Yquem 2011', detail: 'Sauternes, half-bottle service — apricot & saffron finish for the encore', pour: 'Encore Pour · 21:40' },
])

const artists = ref([
  { role: 'Featured Soloist', name: 'Alistair Vance', city: 'Hamburg Steinway Laureate', bio: 'Three‑time International Chopin Piano Prize medalist, celebrated for a rare pianism that the Financial Times called “an otherworldly suspension of acoustic time.”', badges: [
    { icon: 'bi-bank2', text: 'Carnegie Hall Resident' },
    { icon: 'bi-award', text: '14× Deutscher Schallplattenpreis' },
  ]},
  { role: 'Musical Director', name: 'Julian von Berg', city: 'Conductor, Laureate', bio: 'Directing the Nocturne Philharmonic into its fifteenth season, Julian has previously conducted the Royal Concertgebouw and Vienna Philharmonic in historical French romantic repertoires.', badges: [
    { icon: 'bi-patch-check', text: 'Order of Arts et des Lettres' },
    { icon: 'bi-disc', text: '32 World Premieres' },
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
const ROMANS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
const roman = (i) => ROMANS[i] ?? (i + 1)
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
  --font-serif: "Playfair Display", Georgia, "Times New Roman", serif;
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

/* Breadcrumb */
.breadcrumb {
  display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
  font-size: 0.68rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.7px; margin-bottom: 0.85rem;
}
.breadcrumb a { color: var(--gold-accent); text-decoration: none; }
.breadcrumb a:hover { text-decoration: underline; }
.crumb-sep { color: var(--text-muted); font-weight: 400; }
.crumb-current { color: var(--gold-accent); }

/* Banner */
.banner {
  position: relative;
  height: 420px;
  border-radius: 1rem;
  overflow: hidden;
  background: linear-gradient(135deg, #16161a 0%, #1e1e24 55%, #2a2a32 100%);
}
.banner-media { position: absolute; inset: 0; }
.banner-img { width: 100%; height: 100%; object-fit: cover; animation: banner-fade 0.35s ease; }
@keyframes banner-fade { from { opacity: 0; } to { opacity: 1; } }
.badge-row { position: absolute; top: 1rem; left: 1rem; display: flex; gap: 0.5rem; z-index: 3; flex-wrap: wrap; }
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
.banner-strip {
  position: absolute; left: 0; right: 0; bottom: 0; z-index: 3;
  display: flex; justify-content: space-between; align-items: center; gap: 1rem;
  padding: 0.55rem 1rem;
  background: rgba(5,5,6,0.72);
  backdrop-filter: blur(4px);
  font-size: 0.72rem; font-weight: 700; color: var(--text-main);
}
.strip-left, .strip-right { display: flex; align-items: center; gap: 0.45rem; text-transform: uppercase; letter-spacing: 0.5px; }
.strip-sep { color: var(--text-muted); font-weight: 400; }
.strip-detail { color: var(--text-muted); font-weight: 600; text-transform: none; letter-spacing: 0.2px; }
.strip-right i { color: var(--gold-accent); }

/* Gallery thumbnails */
.thumb-row { display: flex; gap: 0.6rem; margin-top: 0.6rem; margin-bottom: 1.25rem; }
.thumb {
  flex: 1; height: 64px; border-radius: 0.5rem; overflow: hidden;
  background: linear-gradient(135deg, #17171a 0%, #222228 100%);
  border: 2px solid var(--border-subtle); cursor: pointer;
}
.thumb.active { border-color: var(--gold-accent); }
.thumb img { width: 100%; height: 100%; object-fit: cover; }

/* Title */
.event-kicker {
  display: flex; align-items: center; gap: 0.4rem;
  font-size: 0.72rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.8px; color: var(--gold-accent); margin-bottom: 0.5rem;
}
.event-title {
  font-family: var(--font-serif);
  font-size: 2.6rem; font-weight: 700; line-height: 1.15;
  margin: 0 0 1.1rem 0; letter-spacing: -0.5px;
}

/* Meta grid: single panel split into 4 fact columns */
.meta-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  margin-bottom: 1.25rem;
  overflow: hidden;
}
.meta-card { padding: 0.85rem 1rem; border-left: 1px solid var(--border-subtle); }
.meta-card:first-child { border-left: none; }
.meta-label {
  font-size: 0.68rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.7px; color: var(--text-muted); margin-bottom: 0.2rem;
}
.meta-value { font-size: 0.92rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.12rem; }
.meta-value i { color: var(--gold-accent); margin-right: 0.15rem; }
.meta-sub { font-size: 0.75rem; color: #8a8a93; }

/* Section tabs: gold underline style */
.section-tabs {
  display: flex; gap: 1.4rem; flex-wrap: wrap;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: 1.4rem;
}
.tab {
  display: flex; align-items: center; gap: 0.4rem;
  font-size: 0.78rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.5px; color: var(--text-muted);
  padding: 0.25rem 0 0.65rem; border: none; border-bottom: 2px solid transparent;
  background: transparent; cursor: pointer;
}
.tab i { font-size: 0.9rem; }
.tab:hover { color: var(--text-main); }
.tab.active { color: var(--gold-accent); border-bottom-color: var(--gold-accent); }

/* Sections */
.event-section { margin-bottom: 2.25rem; }
.section-head {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 1rem;
}
.section-title {
  font-family: var(--font-serif);
  font-size: 1.35rem; font-weight: 700; margin: 0;
  letter-spacing: 0;
}
.artist-profiles { font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; color: var(--gold-accent); }
.intermission {
  font-size: 0.72rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.6px; color: var(--gold-accent);
}
.lead { font-size: 0.92rem; line-height: 1.7; color: #d9d9de; margin: 0 0 0.9rem 0; }

/* Movements: serif roman numerals, work + detail stacked, tempo right */
.movements { display: flex; flex-direction: column; gap: 0.65rem; }
.movement-row {
  display: flex; align-items: flex-start; gap: 1rem;
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: 0.75rem; padding: 0.95rem 1.1rem;
}
.movement-num {
  font-family: var(--font-serif); font-size: 1.15rem; font-weight: 700;
  color: var(--gold-accent); width: 1.6rem; flex-shrink: 0; line-height: 1.3;
}
.movement-main { flex: 1; min-width: 0; }
.movement-work { font-family: var(--font-serif); font-weight: 700; font-size: 1rem; margin-bottom: 0.25rem; }
.movement-detail { font-size: 0.78rem; color: var(--text-muted); }
.movement-tempo { font-size: 0.78rem; color: var(--text-muted); font-style: italic; flex-shrink: 0; }

/* Orchestra Lineup cards */
.lineup-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.lineup-card {
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: 0.75rem; padding: 1rem 1.1rem;
}
.lineup-name { font-family: var(--font-serif); font-weight: 700; font-size: 1.05rem; margin-bottom: 0.35rem; }
.lineup-detail { font-size: 0.8rem; line-height: 1.55; color: #b9b9c1; }
.lineup-count {
  margin-top: 0.6rem; font-size: 0.66rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.5px; color: var(--gold-accent);
}

/* Acoustic Blueprint spec rows */
.spec-row {
  display: flex; justify-content: space-between; align-items: baseline; gap: 1.5rem;
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: 0.75rem; padding: 0.95rem 1.1rem;
}
.spec-name { font-family: var(--font-serif); font-weight: 700; font-size: 1rem; flex-shrink: 0; }
.spec-value { font-size: 0.8rem; color: var(--text-muted); text-align: right; line-height: 1.5; }

/* Sommelier Pairing */
.pairing-note {
  display: flex; align-items: baseline; gap: 0.45rem;
  margin-top: 0.9rem; font-size: 0.78rem; color: #b9b9c1;
}
.pairing-note i { color: var(--gold-accent); flex-shrink: 0; }

/* Artists: photo header + full-width bio + icon badges */
.artist-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.artist-card {
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  border-radius: 0.85rem; padding: 1.1rem;
  display: flex; flex-direction: column;
}
.artist-head { display: flex; gap: 0.9rem; margin-bottom: 0.8rem; }
.artist-avatar {
  width: 62px; height: 62px; border-radius: 0.5rem; flex-shrink: 0; overflow: hidden;
  background: linear-gradient(135deg, #1d1d21 0%, #2c2c33 100%);
  border: 1px solid var(--border-subtle);
}
.artist-photo { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1); }
.artist-id { flex: 1; min-width: 0; }
.artist-role { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gold-accent); margin-bottom: 0.1rem; }
.artist-name { font-family: var(--font-serif); font-weight: 700; font-size: 1.2rem; margin-bottom: 0.15rem; color: var(--text-main); }
.artist-city { font-size: 0.72rem; font-weight: 700; color: var(--gold-accent); }
.artist-bio { font-size: 0.82rem; line-height: 1.55; color: #c1c1c7; margin: 0 0 0.9rem 0; }
.artist-badges { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem 0.75rem; margin-top: auto; }
.artist-badge {
  display: flex; align-items: center; gap: 0.35rem;
  font-size: 0.6rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;
  color: var(--gold-accent);
}
.artist-badge i { font-size: 0.8rem; flex-shrink: 0; }

/* Access Protocol: panel with map placeholder + gate strip */
.access-protocol {
  margin-top: 0.5rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  padding: 1.1rem 1.25rem 1.25rem;
}
.access-head {
  display: flex; justify-content: space-between; align-items: center;
}
.access-kicker { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; color: var(--gold-accent); }
.access-loc { font-size: 0.72rem; font-weight: 700; color: var(--text-muted); }
.access-loc i { color: var(--gold-accent); }
.access-title {
  font-family: var(--font-serif); font-size: 1.45rem; font-weight: 700;
  margin: 0.35rem 0 1rem; color: var(--text-main);
}
.access-map {
  height: 240px; border-radius: 0.6rem; margin-bottom: 1rem;
  background: linear-gradient(135deg, #101013 0%, #17171b 100%);
  border: 1px solid var(--border-subtle);
}
.map-img { width: 100%; height: 100%; object-fit: cover; border-radius: 0.6rem; }
.access-gate {
  display: flex; justify-content: space-between; align-items: center; gap: 1rem;
  background: #060607; border: 1px solid var(--border-subtle);
  border-radius: 0.5rem; padding: 0.65rem 0.9rem;
}
.gate-left { display: flex; align-items: center; gap: 0.4rem; font-size: 0.78rem; font-weight: 700; }
.gate-left i { color: var(--gold-accent); }
.gate-right { font-size: 0.66rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; color: var(--gold-accent); }

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
  .banner { height: 320px; }
  .meta-grid { grid-template-columns: repeat(2, 1fr); }
  .meta-card:nth-child(odd) { border-left: none; }
  .meta-card:nth-child(n+3) { border-top: 1px solid var(--border-subtle); }
  .artist-grid { grid-template-columns: 1fr; }
  .lineup-grid { grid-template-columns: 1fr; }
  .section-tabs { gap: 1rem; }
}
@media (max-width: 640px) {
  .event-title { font-size: 1.9rem; }
  .banner-strip { flex-direction: column; align-items: flex-start; gap: 0.25rem; }
  .thumb-row { flex-wrap: wrap; }
  .thumb { min-width: 40%; }
  .movement-row { flex-wrap: wrap; }
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