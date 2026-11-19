<script setup>
import { ref, computed } from "vue";
import { mockSubscriptionPlans } from "../data/mockSubscriptions.js";

// Filter out inactive plans so only active tiers remain
const activeSubscriptionPlans = computed(() => {
  return mockSubscriptionPlans.filter(
    (plan) => plan.subscriptionStatus === "Active",
  );
});

// Tier-specific metadata for badges, icons, descriptions, and themes
const getTierConfig = (type) => {
  switch (type) {
    case "Bronze":
      return {
        badgeLabel: "Entry Tier",
        icon: "bi-shield-check",
        description:
          "Refined chamber ambiance with streamlined ingress, early presale windows, and member privileges.",
        themeClass: "tier-bronze",
        ctaLabel: "RESERVE BRONZE PASS",
      };
    case "Silver":
      return {
        badgeLabel: "Featured Curation",
        icon: "bi-gem",
        description:
          "Elevated salon privileges featuring priority seat locks, 48-hour presales, and curated merchandise drops.",
        themeClass: "tier-silver",
        ctaLabel: "RESERVE SILVER PASS",
      };
    case "Gold":
    default:
      return {
        badgeLabel: "Sovereign Sanctum",
        icon: "bi-star-fill",
        description:
          "The gold standard for seasoned patrons: 72-hour VIP presales, complimentary lounge pours, and dedicated concierge care.",
        themeClass: "tier-gold featured-tier-card",
        ctaLabel: "SECURE GOLD ACCESS",
      };
  }
};

// FAQ data & state
const openFaqId = ref(1);

const toggleFaq = (id) => {
  openFaqId.value = openFaqId.value === id ? null : id;
};

const vipFaqsData = [
  {
    id: 1,
    number: "01",
    question:
      "How does private side-entrance access and valet transfer operate?",
    answer:
      "Patrons are met by private white-glove doormen at designated porte-cochère gates 45 minutes prior to curtain. Vehicles are securely parked in subterranean vaulted bays while guests are escorted directly into private annex lounges.",
  },
  {
    id: 2,
    number: "02",
    question: "What etiquette governs artist greenroom introductions?",
    answer:
      "Greenroom access requires an active Gold or Founder key credential. Guests are accompanied by a protocol attaché following final applause. Photography is permitted only with explicit artist consent.",
  },
  {
    id: 3,
    number: "03",
    question:
      "Can dietary degustation menus be tailored for private salon patrons?",
    answer:
      "Yes. Executive chef pairings are fully customizable up to 72 hours prior to event seating through your concierge portal or direct attaché line.",
  },
  {
    id: 4,
    number: "04",
    question:
      "What is the transfer and cancellation protocol for bespoke passes?",
    answer:
      "Active passes can be securely transferred to designated guest folios instantly without fees up to 24 hours prior to curtain via the Ticket Vault interface.",
  },
];
</script>

<template>
  <div class="vip-portal-container container py-5 text-white">
    <!-- HERO SECTION (Targeted Ticketing Access) -->
    <section class="text-center mb-5 pb-5 hero-section position-relative">
      <div
        class="hero-glow position-absolute top-50 start-50 translate-middle"></div>
      <div class="position-relative z-1">
        <div
          class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3 hero-badge-pill">
          <i class="bi bi-ticket-perforated text-warning"></i>
          <span class="text-uppercase extra-small fw-bold tracking-wider"
            >G-ONE Ticketing Access Protocol</span
          >
        </div>
        <h1 class="display-3 fw-extrabold text-white lh-tight mb-3">
          Event Pass <span class="text-gradient-gold">VIP Memberships</span>
        </h1>
        <p
          class="lead-text mx-auto mb-4 description-width-constrained text-secondary-light">
          Secure priority event seat holds, private venue gate admissions,
          presale ticket drops, and dedicated box-office concierge privileges.
        </p>
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <router-link
            to="/contact"
            type="button"
            class="btn btn-gold-outline px-4 py-3 d-inline-flex align-items-center gap-2 shadow-sm">
            <i class="bi bi-headset text-warning"></i>
            <span>Contact Us</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- TICKETING PRIVILEGES HIGHLIGHT GRID -->
    <section class="mb-5 py-4">
      <div class="row g-4 justify-content-center">
        <div class="col-12 col-md-4">
          <div
            class="feature-highlight-card p-4 rounded-4 h-100 border border-secondary border-opacity-25">
            <div
              class="icon-box mb-3 d-inline-flex p-3 rounded-3 bg-warning bg-opacity-10 text-warning">
              <i class="bi bi-stopwatch fs-4"></i>
            </div>
            <h4 class="h5 fw-bold text-white mb-2">Tiered Presale Access</h4>
            <p class="small text-secondary-light mb-0">
              Enjoy 24-hour, 48-hour, or 72-hour VIP presale queue placement to
              secure high-demand concert, theater, and festival ticket drops
              early.
            </p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div
            class="feature-highlight-card p-4 rounded-4 h-100 border border-secondary border-opacity-25">
            <div
              class="icon-box mb-3 d-inline-flex p-3 rounded-3 bg-warning bg-opacity-10 text-warning">
              <i class="bi bi-tag fs-4"></i>
            </div>
            <h4 class="h5 fw-bold text-white mb-2">
              Exclusive Ticket Discounts
            </h4>
            <p class="small text-secondary-light mb-0">
              Save across every booking with automatic tier-based price
              reductions ranging from 5% up to 25% on gala and event passes.
            </p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div
            class="feature-highlight-card p-4 rounded-4 h-100 border border-secondary border-opacity-25">
            <div
              class="icon-box mb-3 d-inline-flex p-3 rounded-3 bg-warning bg-opacity-10 text-warning">
              <i class="bi bi-star fs-4"></i>
            </div>
            <h4 class="h5 fw-bold text-white mb-2">VIP Perks & Concierge</h4>
            <p class="small text-secondary-light mb-0">
              Unlock priority seat holds, complimentary lounge drink vouchers,
              waived booking fees, and dedicated concierge support.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- HOSPITALITY TIER PORTFOLIOS (UNCHANGED CORE STRUCTURE) -->
    <section id="tiers-section" class="mb-5 pb-5">
      <div class="row align-items-end g-3 mb-5">
        <div class="col-lg-7">
          <span class="text-uppercase small fw-bold browse-lineup-title">
            <i class="bi bi-award me-1"></i>Tiered Memberships
          </span>
          <h2 class="fw-bold text-white mb-0 mt-1">
            Explore Subscription Plans
          </h2>
        </div>
        <div class="col-lg-5">
          <p class="small text-secondary-light mb-0">
            Lock in member privileges with up to 25% ticket discounts, 24- to
            72-hour presale access, priority seat holds, and complimentary
            lounge vouchers.
          </p>
        </div>
      </div>

      <div class="row g-4 align-items-stretch justify-content-center">
        <div
          v-for="plan in activeSubscriptionPlans"
          :key="plan._id"
          class="col-12 col-md-6 col-xl-4">
          <div
            class="tier-card rounded-4 p-4 h-100 d-flex flex-column justify-content-between position-relative shadow-lg"
            :class="getTierConfig(plan.subscriptionType).themeClass">
            <!-- Floating Badge for Gold Tier -->
            <div
              v-if="plan.subscriptionType === 'Gold'"
              class="position-absolute top-0 start-50 translate-middle">
              <span
                class="badge-featured px-3 py-1 rounded-pill extra-small fw-bold text-dark d-flex align-items-center gap-1 shadow-sm">
                <i class="bi bi-star-fill text-dark"></i> MOST REQUESTED TIER
              </span>
            </div>

            <div>
              <!-- Tier Title & Flavor Description -->
              <div
                class="d-flex align-items-center justify-content-between mt-4 mb-2">
                <h3 class="fw-bold text-white mb-0">
                  {{ plan.subscriptionType }} Tier
                </h3>
                <div
                  class="tier-icon-badge p-2 rounded-circle bg-dark bg-opacity-50">
                  <i
                    :class="[
                      'bi',
                      getTierConfig(plan.subscriptionType).icon,
                      'text-warning fs-5',
                    ]"></i>
                </div>
              </div>
              <p class="small text-secondary-light mb-4">
                {{ getTierConfig(plan.subscriptionType).description }}
              </p>

              <!-- Price Block -->
              <div class="mb-4">
                <span class="display-6 fw-bold tier-price">
                  &#8369;{{
                    plan.subscriptionPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                    })
                  }}
                </span>
                <span class="extra-small text-secondary-light">
                  / per guest pass</span
                >
              </div>

              <hr class="border-secondary border-opacity-25 my-3" />

              <!-- Perks Checklist -->
              <div class="mb-4">
                <ul
                  class="list-unstyled extra-small text-secondary-light d-flex flex-column gap-2.5 mb-0">
                  <li
                    v-for="(perk, idx) in plan.subscriptionPerks.split(', ')"
                    :key="idx"
                    class="d-flex align-items-start gap-2.5">
                    <i
                      class="bi bi-check-circle tier-check fs-6 flex-shrink-0"></i>
                    <span class="text-white-50-hover ms-2">{{ perk }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Bottom Action Button -->
            <div class="pt-3 border-top border-secondary border-opacity-25">
              <button
                type="button"
                class="btn w-100 py-2.5 fw-semibold tier-btn">
                {{ getTierConfig(plan.subscriptionType).ctaLabel }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VIP PATRONAGE FAQ (UNCHANGED CORE STRUCTURE) -->
    <section id="vip-faq-section" class="mb-4">
      <div class="text-center mx-auto mb-4 faq-header-width">
        <span class="text-uppercase small fw-bold browse-lineup-title">
          Protocol Inquiries
        </span>
        <h2 class="fw-bold text-white mt-1 mb-2">VIP Patronage FAQ</h2>
        <p class="small text-secondary-light mb-0">
          Essential information regarding private admittance, greenroom
          etiquette, and pass transfers.
        </p>
      </div>

      <div class="mx-auto d-flex flex-column gap-3 faq-container-width">
        <div
          v-for="faq in vipFaqsData"
          :key="faq.id"
          class="faq-card rounded-4 overflow-hidden border border-secondary border-opacity-25 shadow-sm"
          :class="{ active: openFaqId === faq.id }">
          <button
            type="button"
            class="w-100 p-4 bg-transparent border-0 d-flex align-items-center justify-content-between text-start gap-3"
            @click="toggleFaq(faq.id)">
            <span
              class="fw-semibold text-white d-flex align-items-center gap-3">
              <span class="text-warning small font-monospace">{{
                faq.number
              }}</span>
              <span>{{ faq.question }}</span>
            </span>
            <i
              class="bi bi-chevron-down text-warning faq-chevron"
              :class="{ rotated: openFaqId === faq.id }"></i>
          </button>

          <div v-if="openFaqId === faq.id" class="px-4 pb-4 pt-0">
            <p class="small text-secondary-light mb-0 ps-md-4">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.text-secondary-light {
  color: #9ca3af;
}

.lead-text {
  font-size: 1.05rem;
  line-height: 1.7;
}

.description-width-constrained {
  max-width: 680px;
}

.faq-header-width {
  max-width: 620px;
}

.faq-container-width {
  max-width: 860px;
}

.extra-small {
  font-size: 0.74rem;
}

.browse-lineup-title {
  color: var(--gold-accent, #f3c64f);
  letter-spacing: 1.5px;
}

/* Hero Enhancements */
.hero-section {
  padding-top: 2rem;
}

.hero-glow {
  width: 300px;
  height: 300px;
  background: rgba(243, 198, 79, 0.08);
  filter: blur(90px);
  pointer-events: none;
}

.hero-badge-pill {
  background-color: rgba(243, 198, 79, 0.08);
  border: 1px solid rgba(243, 198, 79, 0.2);
}

.text-gradient-gold {
  background: linear-gradient(135deg, #fff 0%, #f3c64f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn-gold-outline {
  background-color: transparent;
  border: 1px solid rgba(243, 198, 79, 0.4);
  color: #f3c64f;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.25s ease;
}

.btn-gold-outline:hover {
  background-color: rgba(243, 198, 79, 0.15);
  border-color: #f3c64f;
  color: #fff;
  box-shadow: 0 0 20px rgba(243, 198, 79, 0.2);
}

/* Highlight Cards */
.feature-highlight-card {
  background-color: rgba(23, 23, 26, 0.6);
  backdrop-filter: blur(10px);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
}

.feature-highlight-card:hover {
  transform: translateY(-4px);
  border-color: rgba(243, 198, 79, 0.4) !important;
}

/* Base Tier Card */
.tier-card {
  background-color: var(--bg-surface, #131316);
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.1));
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.tier-card:hover {
  transform: translateY(-6px);
}

/* BRONZE TIER THEME */
.tier-bronze:hover {
  border-color: rgba(205, 127, 50, 0.45);
}

.tier-bronze .tier-price,
.tier-bronze .tier-check {
  color: #d99b66;
}

.tier-bronze .tier-btn {
  background-color: rgba(205, 127, 50, 0.12);
  border: 1px solid rgba(205, 127, 50, 0.35);
  color: #e6b385;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.tier-bronze .tier-btn:hover {
  background-color: #cd7f32;
  border-color: #cd7f32;
  color: #0b0b0c;
}

/* SILVER TIER THEME */
.tier-silver:hover {
  border-color: rgba(203, 213, 225, 0.45);
}

.tier-silver .tier-price,
.tier-silver .tier-check {
  color: #e2e8f0;
}

.tier-silver .tier-btn {
  background-color: rgba(203, 213, 225, 0.1);
  border: 1px solid rgba(203, 213, 225, 0.35);
  color: #f1f5f9;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.tier-silver .tier-btn:hover {
  background-color: #cbd5e1;
  border-color: #cbd5e1;
  color: #0b0b0c;
}

/* GOLD TIER THEME (Featured) */
.featured-tier-card {
  background-color: #17171a;
  border: 1px solid rgba(243, 198, 79, 0.65) !important;
  box-shadow: 0 0 32px rgba(243, 198, 79, 0.12);
}

.featured-tier-card:hover {
  box-shadow: 0 0 38px rgba(243, 198, 79, 0.2);
}

.badge-featured {
  background-color: var(--gold-accent, #f3c64f);
  color: #0b0b0c;
  font-size: 0.65rem;
  letter-spacing: 0.08em;
}

.tier-gold .tier-price,
.tier-gold .tier-check {
  color: var(--gold-accent, #f3c64f);
}

.tier-gold .tier-btn {
  background-color: var(--gold-accent, #f3c64f);
  border: 1px solid var(--gold-accent, #f3c64f);
  color: #0b0b0c;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(243, 198, 79, 0.25);
  transition: all 0.2s ease;
}

.tier-gold .tier-btn:hover {
  background-color: #e5b63d;
  border-color: #e5b63d;
  color: #0b0b0c;
  box-shadow: 0 6px 20px rgba(243, 198, 79, 0.4);
}

/* FAQ Accordion */
.faq-card {
  background-color: var(--bg-surface, #131316);
  transition: border-color 0.2s ease;
}

.faq-card.active {
  border-color: rgba(243, 198, 79, 0.4) !important;
}

.faq-chevron {
  transition: transform 0.25s ease;
}

.faq-chevron.rotated {
  transform: rotate(180deg);
}
</style>
