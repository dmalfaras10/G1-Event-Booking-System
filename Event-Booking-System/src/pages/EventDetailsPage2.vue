<template>
  <div class="event-page">
    <!-- ============ LEFT COLUMN: EVENT CONTENT ============ -->
    <div class="event-content">
      <!-- Hero banner (switches when a thumbnail below is clicked) -->
      <div class="banner">
        <div class="banner-media">
          <!-- TODO: fill in the src values in heroImages (script) — banner auto-switches on thumb click -->
          <img
            v-if="heroImages[activeImage]?.src"
            :key="activeImage"
            :src="heroImages[activeImage].src"
            class="banner-img"
            alt="" />
        </div>
        <div class="badge-row">
          <span class="badge badge-magenta">Early Bird Promo</span>
          <span class="badge badge-dark"
            >Doors open at 18:30 for acoustic check</span
          >
        </div>
        <div class="banner-strip">
          <div class="strip-left">
            <i class="bi bi-soundwave"></i> Samsung Hall A — Shoebox
            Configuration
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
        <div
          v-for="(img, i) in heroImages"
          :key="i"
          :class="['thumb', { active: activeImage === i }]"
          @click="activeImage = i">
          <!-- TODO: thumbnails render automatically once src is set in heroImages -->
        </div>
      </div>

      <span class="event-kicker"
        ><i class="bi bi-moon-stars"></i> Makati Acoustic Series // Volume
        II</span
      >
      <h1 class="event-title">
        Solitary Harmonics: An Intimate Piano Night at Samsung Performing Arts
        Theater
      </h1>

      <!-- Meta row: 4 quick facts in a single panel -->
      <div class="meta-grid">
        <div class="meta-card">
          <div class="meta-label">Date &amp; Evening</div>
          <div class="meta-value">
            <i class="bi bi-calendar-event"></i> Sat, Nov 28, 2026
          </div>
          <div class="meta-sub">Hall doors open at 18:30</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">First Note</div>
          <div class="meta-value"><i class="bi bi-clock"></i> 19:30 Sharp</div>
          <div class="meta-sub">Acoustic check from 18:30</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Venue</div>
          <div class="meta-value">
            <i class="bi bi-geo-alt"></i> Samsung Performing Arts Theater
          </div>
          <div class="meta-sub">Makati City</div>
        </div>
      </div>

      <!-- Program notes & repertoire -->
      <div class="event-section">
        <div class="section-head">
          <h2 class="section-title">Event Details</h2>
        </div>
        <p class="lead">
          An intimate three-hour improvisational performance on a grand upright
          piano and vintage analog modular synthesizers, staged in the round
          with the audience seated on three sides of the instrument.
        </p>
        <p class="lead">
          Nils Frahm returns to Manila with a programme that is never the same
          twice: prepared piano, felt-damped upright and live modular patches,
          performed without a set list and without amplification of any kind.
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
          <span class="alloc-badge alloc-active"
            >Founder Allocation Active</span
          >
        </div>

        <!-- Price range -->
        <div class="price-range">
          <span class="price-big">{{ priceRangeLabel }}</span>
          <span class="price-sub">/ attendee</span>
        </div>
        <p class="price-note">
          All admissions include one interval drink voucher and a printed set
          list.
        </p>

        <!-- Tier selector title -->
        <div class="tier-title">
          <span class="tier-label">Select Your Seating</span>
        </div>

        <!-- Ticket tiers -->
        <div class="tiers">
          <div
            v-for="tier in tiers"
            :key="tier.id"
            :class="['tier-card', { selected: selectedTierId === tier.id }]"
            @click="selectTier(tier)">
            <input
              type="radio"
              :name="eventId"
              :id="tier.id"
              :checked="selectedTierId === tier.id"
              @change="selectTier(tier)"
              class="tier-radio" />
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
            <button
              class="att-btn"
              :disabled="!selectedTier || qty <= 1"
              @click="changeQty(-1)">
              −
            </button>
            <span class="att-qty">{{ qty }}</span>
            <button
              class="att-btn"
              :disabled="!selectedTier || qty >= maxQty"
              @click="changeQty(1)">
              +
            </button>
          </div>
          <span class="att-note">Max 6 seats per patron order</span>
        </div>

        <!-- Sold-out guard -->
        <div v-if="allSoldOut" class="alert alert-danger mt-3">
          <i class="bi bi-exclamation-triangle-fill"></i> All seating tiers are
          currently sold out.
        </div>

        <!-- Perks included with the selected seating tier -->
        <div class="addons-section">
          <h4 class="addons-title">Included With Your Seating</h4>
          <ul v-if="selectedTier" class="perks-list">
            <li
              v-for="perk in selectedTier.perks"
              :key="perk"
              class="perk-item">
              {{ perk }}
            </li>
          </ul>
          <p v-else class="perks-empty">
            Select a seating tier to see what is included.
          </p>
        </div>

        <!-- Order summary: dynamic line items derived from user selection -->
        <div class="order-summary">
          <div v-if="selectedTier" class="order-line">
            <span class="order-line-name"
              >Pass Allocation ({{ selectedTier.name }} × {{ qty }})</span
            >
            <span class="order-line-price">{{ peso(tiersSubtotal) }}</span>
          </div>
          <div v-if="!selectedTier" class="order-empty">
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
        <button
          class="btn btn-gold w-100 checkout-btn"
          :disabled="!canCheckout"
          @click="goToPayment">
          {{
            canCheckout
              ? "Proceed to Secure Checkout"
              : "Select seating to continue"
          }}
        </button>
        <p class="secure-note">
          256-Bit Encrypted Concession Handoff · 100% Verified
        </p>
      </div>

      <!-- Special Patron Accommodations (completely separate from booking card) -->
      <div class="patron-accom">
        <div class="accom-row">
          <span class="accom-icon">🎟️</span>
          <div class="accom-text">
            <div class="accom-title">Special Patron Accommodations?</div>
            <div class="accom-sub">
              Contact our support team for ADA seating or dietary requests.
            </div>
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
      @confirm="onSeatsConfirmed" />

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
      :total="orderTotal"
      :currency="'₱'"
      :code-prefix="'G1-SHR'"
      @close="step = 'seats'"
      @reset="resetFlow" />
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from "vue";
import BookingCheckout from "../components/BookingCheckout.vue";
import SeatSelection from "../components/SeatSelection.vue";

// Event data based on mockEvents.js structure (Event ID: 2)
const eventId = 2;
const eventName = "Solitary Harmonics: Acoustic Piano Night";
const artist = ref([
  "Nils Frahm & Guests",
  "Acclaimed Berlin composer and multi-instrumentalist renowned for bridging classical piano intimacy with tactile analog synthesis.",
]);
const artistDescription =
  "Acclaimed Berlin composer and multi-instrumentalist renowned for bridging classical piano intimacy with tactile analog synthesis.";
const category = "Classical & Gala";
const description =
  "An intimate three-hour improvisational performance on grand upright piano and vintage analog modular synthesizers.";
const dateLong = "Sat, Nov 28, 2026";
const dateShort = "Sat, Nov 28";
const time24 = "19:30";
const status = "Upcoming";

// Venue information
const venueName = "Samsung Performing Arts Theater";
const address = "Makati City";
const venueCapacity = 150;

// Build seats function (matching mockEvents.js)
const buildSeats = (row, count, soldIndices = [], holdIndices = []) => {
  return Array.from({ length: count }, (_, i) => {
    const num = i + 1;
    let seatStatus = "available";
    if (soldIndices.includes(num)) seatStatus = "sold";
    else if (holdIndices.includes(num)) seatStatus = "hold";
    return {
      seatRow: row,
      seatNumber: num,
      code: `${row}-${num}`,
      status: seatStatus,
    };
  });
};

// Ticket tiers based on mockEvents.js structure
const tiers = ref([
  {
    id: "tier_1",
    ticketType: "Orchestra Center",
    name: "Orchestra Center",
    ticketDescription:
      "Direct acoustic sweet spot with unobstructed stage view.",
    desc: "Direct acoustic sweet spot with unobstructed stage view.",
    ticketPerks: ["Acoustic Check Access", "Program Booklet"],
    perks: ["Acoustic Check Access", "Program Booklet"],
    perksInput: "Acoustic Check Access, Program Booklet",
    price: 3600.0,
    seatSection: "Orchestra",
    seatRow: "C",
    quantity: 40,
    seats: buildSeats("C", 40, [1, 2, 10, 11], [5, 6]),
    capacity: 34,
    badge: null,
  },
]);

// Capacity is the number of seats still bookable, so the panel's maxQty and the
// SeatSelection map can never disagree with the seat data.
tiers.value.forEach((t) => {
  t.capacity = t.seats.filter((s) => s.status === "available").length;
});

// ---- Hero gallery ----
// TODO: put your image paths here — src '' keeps the gradient placeholder until filled in.
const heroImages = ref([
  {
    src: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80",
    alt: "Grand piano on a dark stage",
  },
  {
    src: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80",
    alt: "Piano keys under a single spot",
  },
  {
    src: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80",
    alt: "Modular synthesizer rack",
  },
  {
    src: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80",
    alt: "Cabaret seating in the round",
  },
]);
const activeImage = ref(0);

// ---- Booking state ----
const step = ref("select");
const selectedTierId = ref(null);
const qty = ref(1);
const selectedSeats = ref([]);
const holdExpired = ref(false);

// ---- Computed ----
const selectedTier = computed(() =>
  tiers.value.find((t) => t.id === selectedTierId.value),
);
const allSoldOut = computed(() => tiers.value.every((t) => t.capacity === 0));
const canCheckout = computed(
  () =>
    !!selectedTier.value &&
    qty.value > 0 &&
    selectedTier.value.capacity > 0 &&
    !holdExpired.value,
);

// Price headline derived from the tiers, so it can't drift from the data.
const priceRangeLabel = computed(() => {
  const prices = tiers.value.map((t) => t.price);
  if (!prices.length) return "—";
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? peso(min) : `${peso(min)} — ${peso(max)}`;
});

// ---- Attendees ----
const MAX_SEATS_PER_ORDER = 6;
const maxQty = computed(() =>
  Math.min(
    selectedTier.value?.capacity ?? MAX_SEATS_PER_ORDER,
    MAX_SEATS_PER_ORDER,
  ),
);

const tiersSubtotal = computed(() =>
  selectedTier.value ? selectedTier.value.price * qty.value : 0,
);
const orderTotal = computed(() => tiersSubtotal.value);

// ---- Formatters ----
const peso = (v) => "₱" + Number(v).toLocaleString("en-PH");

// ---- Actions ----
function selectTier(t) {
  if (t.capacity === 0) return;
  selectedTierId.value = t.id;
  qty.value = Math.min(qty.value, maxQty.value);
}
function changeQty(d) {
  if (!selectedTier.value) return;
  const next = qty.value + d;
  if (next < 1 || next > maxQty.value) return;
  qty.value = next;
}

function goToPayment() {
  if (!canCheckout.value) return;
  step.value = "seats";
}

function onSeatsConfirmed(seats) {
  selectedSeats.value = seats;
  step.value = "payment";
}

function closeSeats() {
  step.value = "select";
  selectedSeats.value = [];
}

function resetFlow() {
  step.value = "select";
  selectedSeats.value = [];
  selectedTierId.value = null;
  qty.value = 1;
  holdExpired.value = false;
}
</script>

<style scoped src="../assets/EventDetailsPage.css"></style>
