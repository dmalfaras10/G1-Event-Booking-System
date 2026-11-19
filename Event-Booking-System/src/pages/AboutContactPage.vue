<script setup>
import { ref, reactive, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import {
  companyStats,
  servicesData,
  contactDetails,
  socialLinks,
  inquiryTypes,
  policiesData,
  faqsData,
} from "../data/aboutData.js";

const route = useRoute();

// --- CONTACT FORM STATE & VALIDATION ---
const form = reactive({
  fullName: "",
  email: "",
  inquiryType: "general",
  subject: "",
  message: "",
  agreeToPolicies: false,
});

const errors = reactive({
  fullName: "",
  email: "",
  subject: "",
  message: "",
  agreeToPolicies: "",
});

const submittedSuccess = ref(false);
const submittedRef = ref("");

// --- FAQ ACCORDION STATE ---
const openFaqId = ref(1);

const toggleFaq = (id) => {
  openFaqId.value = openFaqId.value === id ? null : id;
};

// --- POLICY MODAL STATE ---
const activePolicy = ref(null);

const openPolicyModal = (policy) => {
  activePolicy.value = policy;
};

const closePolicyModal = () => {
  activePolicy.value = null;
};

// --- FORM VALIDATION & SUBMIT HANDLER ---
const clearErrors = () => {
  errors.fullName = "";
  errors.email = "";
  errors.subject = "";
  errors.message = "";
  errors.agreeToPolicies = "";
};

const validateForm = () => {
  clearErrors();
  let isValid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
    isValid = false;
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email address.";
    isValid = false;
  } else if (!emailPattern.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
    isValid = false;
  }

  if (!form.subject.trim()) {
    errors.subject = "Please provide a brief subject for your inquiry.";
    isValid = false;
  }

  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = "Please enter a message of at least 10 characters.";
    isValid = false;
  }

  if (!form.agreeToPolicies) {
    errors.agreeToPolicies =
      "You must agree to the Terms of Service and Privacy Policy.";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = () => {
  submittedSuccess.value = false;

  if (!validateForm()) return;

  const randomCode = Math.floor(100000 + Math.random() * 900000);
  submittedRef.value = `G1-INQ-${randomCode}`;
  submittedSuccess.value = true;

  form.fullName = "";
  form.email = "";
  form.inquiryType = "general";
  form.subject = "";
  form.message = "";
  form.agreeToPolicies = false;
};

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) {
    scrollToWithOffset(el, 110);
  }
};

function scrollToWithOffset(element, offset = 110) {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

const handleRouteScroll = async () => {
  await nextTick();

  if (route.path === "/contact") {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      scrollToWithOffset(contactSection, 110);
    }
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
};

onMounted(() => {
  handleRouteScroll();
});

watch(
  () => route.path,
  () => {
    handleRouteScroll();
  },
);
</script>

<template>
  <div class="container py-5">
    <!-- SECTION 1: HERO / ABOUT BACKGROUND -->
    <section id="about-section" class="mb-5 pb-4">
      <div
        class="hero-bento-card p-4 p-lg-5 rounded-5 position-relative overflow-hidden">
        <div class="hero-glow-accent"></div>

        <div class="row g-5 align-items-center position-relative z-1">
          <div class="col-lg-7">
            <div
              class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-4 hero-tag-pill">
              <span class="pulse-dot"></span>
              <span
                class="text-uppercase extra-small fw-bold text-warning tracking-wider">
                G-ONE Ecosystem // Est. 2026
              </span>
            </div>

            <span
              class="text-uppercase small fw-bold browse-lineup-title d-block mb-2">
              <i class="bi bi-award me-1"></i>Tiered Memberships &amp;
              Subscriptions
            </span>

            <h1 class="display-4 fw-extrabold text-white lh-tight mb-4">
              Redefining Live Event Discovery &amp;
              <span class="text-gradient-gold">Seamless Ticketing</span>
            </h1>

            <p class="lead-text mb-4">
              <strong>G-ONE</strong> is a next-generation event booking platform
              connecting audiences with world-class concerts, gala performances,
              and exclusive live experiences through a lightning-fast digital
              portal. Lock in member privileges with up to 25% ticket discounts,
              24- to 72-hour presale access, priority seat holds, and
              complimentary lounge vouchers.
            </p>

            <div class="d-flex flex-wrap gap-3 mb-5">
              <button
                type="button"
                class="btn btn-login px-4 py-3 d-inline-flex align-items-center gap-2 shadow-gold"
                @click="scrollToSection('contact-section')">
                <span>Connect With Support</span>
                <i class="bi bi-arrow-down-right"></i>
              </button>
              <button
                type="button"
                class="btn btn-register px-4 py-3 d-inline-flex align-items-center gap-2"
                @click="scrollToSection('policies-section')">
                <i class="bi bi-shield-check text-warning"></i>
                <span>Platform Policies</span>
              </button>
            </div>

            <!-- Metric Grid -->
            <div
              class="row g-4 pt-4 border-top border-secondary border-opacity-25">
              <div v-for="stat in companyStats" :key="stat.label" class="col-4">
                <div class="fs-3 fw-black text-warning lh-1 mb-1">
                  {{ stat.value }}
                </div>
                <div
                  class="extra-small text-uppercase text-secondary-light tracking-wide fw-semibold">
                  {{ stat.label }}
                </div>
              </div>
            </div>
          </div>

          <!-- Hero Visual Frame -->
          <div class="col-lg-5">
            <div
              class="hero-image-frame position-relative rounded-4 overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85"
                alt="G-ONE Live Event Experience"
                class="w-100 h-100 object-fit-cover about-hero-img" />
              <div class="hero-img-gradient"></div>

              <div
                class="floating-badge-card position-absolute bottom-0 start-0 end-0 m-3 p-3 rounded-3 d-flex align-items-center justify-content-between gap-2">
                <div class="d-flex align-items-center gap-3">
                  <div
                    class="icon-circle d-flex align-items-center justify-content-center flex-shrink-0">
                    <i
                      class="bi bi-ticket-perforated-fill text-warning fs-5"></i>
                  </div>
                  <div>
                    <div class="fw-bold text-white small">
                      Verified Live Hub
                    </div>
                    <div class="extra-small text-secondary-light">
                      Real-Time Secure Allocations
                    </div>
                  </div>
                </div>
                <span class="hero-badge px-2 py-1 flex-shrink-0">Manila</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TICKETING PRIVILEGES HIGHLIGHT GRID -->
    <section class="mb-5 pb-4">
      <div class="row g-4 justify-content-center">
        <div class="col-12 col-md-4">
          <div class="feature-highlight-card p-4 rounded-4 h-100">
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
          <div class="feature-highlight-card p-4 rounded-4 h-100">
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
          <div class="feature-highlight-card p-4 rounded-4 h-100">
            <div
              class="icon-box mb-3 d-inline-flex p-3 rounded-3 bg-warning bg-opacity-10 text-warning">
              <i class="bi bi-star fs-4"></i>
            </div>
            <h4 class="h5 fw-bold text-white mb-2">
              VIP Perks &amp; Concierge
            </h4>
            <p class="small text-secondary-light mb-0">
              Unlock priority seat holds, complimentary lounge drink vouchers,
              waived booking fees, and dedicated concierge support.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: CORE PLATFORM SERVICES -->
    <section id="services-section" class="mb-5 pb-4">
      <div class="text-center mx-auto mb-5 section-heading-narrow">
        <span
          class="text-uppercase small fw-bold browse-lineup-title tracking-wider">
          <i class="bi bi-layers me-1"></i> What We Offer
        </span>
        <h2 class="fw-bold text-white mt-1 mb-2 display-6">
          Core Platform Services
        </h2>
        <p class="small text-secondary-light">
          Engineered for high concurrency, transparency, and effortless
          navigation from discovery to check-in.
        </p>
      </div>

      <div class="row g-4">
        <div
          v-for="service in servicesData"
          :key="service.code"
          class="col-md-6 col-lg-3">
          <div class="card event-card h-100 rounded-4 p-4 d-flex flex-column">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <span
                class="service-code-pill px-2 py-1 rounded-2 extra-small fw-bold font-monospace">
                {{ service.code }}
              </span>
              <div class="service-icon-box">
                <i :class="['bi', service.icon, 'fs-4 text-warning']"></i>
              </div>
            </div>

            <h5 class="fw-bold text-white mb-2">{{ service.title }}</h5>
            <p class="small text-secondary-light mb-4 flex-grow-1">
              {{ service.description }}
            </p>

            <div
              class="pt-3 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center extra-small text-uppercase">
              <span class="text-secondary-light">{{ service.meta }}</span>
              <span class="text-warning fw-bold">G-ONE Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: CONTACT FORM & DIRECT CHANNELS -->
    <section id="contact-section" class="mb-5 pb-4">
      <div class="mb-5">
        <span
          class="text-uppercase small fw-bold browse-lineup-title tracking-wider">
          <i class="bi bi-chat-dots me-1"></i> Get In Touch
        </span>
        <h2 class="fw-bold text-white mb-1 mt-1 display-6">
          Contact G-ONE Support
        </h2>
        <p class="small text-secondary-light">
          Have questions regarding an upcoming show, ticket transfer, or VIP
          benefits? Our support desk is here for you.
        </p>
      </div>

      <div class="row g-4">
        <!-- Left Column: Modern Form Box -->
        <div class="col-lg-7">
          <div
            class="surface-panel rounded-5 p-4 p-md-5 h-auto position-relative">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
              <h4 class="fw-bold text-white mb-0">Send an Inquiry</h4>
              <span class="hero-badge px-3 py-1">24h Response Window</span>
            </div>
            <p class="small text-secondary-light mb-4">
              Fill out the secure dispatch form below and our response team will
              get back to your inbox promptly.
            </p>

            <!-- Success Alert -->
            <div
              v-if="submittedSuccess"
              class="alert-success-gold rounded-4 p-4 mb-4 d-flex align-items-start gap-3 animate-fade-in"
              role="alert">
              <i
                class="bi bi-check-circle-fill text-warning fs-3 flex-shrink-0"></i>
              <div>
                <div class="fw-bold text-white mb-1">
                  Inquiry Dispatched Successfully! Reference:
                  <span class="text-warning font-monospace">{{
                    submittedRef
                  }}</span>
                </div>
                <div class="extra-small text-secondary-light">
                  Thank you for reaching out. A confirmation has been registered
                  in our system and an agent will email you shortly.
                </div>
              </div>
            </div>

            <form novalidate @submit.prevent="handleSubmit">
              <div class="row g-3">
                <!-- Full Name -->
                <div class="col-md-6">
                  <label
                    for="contactName"
                    class="form-label extra-small text-secondary-light fw-bold text-uppercase tracking-wider">
                    Full Name <span class="text-warning">*</span>
                  </label>
                  <input
                    id="contactName"
                    v-model="form.fullName"
                    type="text"
                    class="form-control dark-input"
                    :class="{ 'is-invalid-dark': errors.fullName }"
                    placeholder="e.g., Juan Dela Cruz" />
                  <div v-if="errors.fullName" class="error-text mt-1">
                    <i class="bi bi-exclamation-circle me-1"></i
                    >{{ errors.fullName }}
                  </div>
                </div>

                <!-- Email -->
                <div class="col-md-6">
                  <label
                    for="contactEmail"
                    class="form-label extra-small text-secondary-light fw-bold text-uppercase tracking-wider">
                    Email Address <span class="text-warning">*</span>
                  </label>
                  <input
                    id="contactEmail"
                    v-model="form.email"
                    type="email"
                    class="form-control dark-input"
                    :class="{ 'is-invalid-dark': errors.email }"
                    placeholder="you@example.com" />
                  <div v-if="errors.email" class="error-text mt-1">
                    <i class="bi bi-exclamation-circle me-1"></i
                    >{{ errors.email }}
                  </div>
                </div>

                <!-- Inquiry Type -->
                <div class="col-md-6">
                  <label
                    for="inquiryType"
                    class="form-label extra-small text-secondary-light fw-bold text-uppercase tracking-wider">
                    Inquiry Category
                  </label>
                  <select
                    id="inquiryType"
                    v-model="form.inquiryType"
                    class="form-select dark-input">
                    <option
                      v-for="item in inquiryTypes"
                      :key="item.value"
                      :value="item.value">
                      {{ item.label }}
                    </option>
                  </select>
                </div>

                <!-- Subject -->
                <div class="col-md-6">
                  <label
                    for="contactSubject"
                    class="form-label extra-small text-secondary-light fw-bold text-uppercase tracking-wider">
                    Subject <span class="text-warning">*</span>
                  </label>
                  <input
                    id="contactSubject"
                    v-model="form.subject"
                    type="text"
                    class="form-control dark-input"
                    :class="{ 'is-invalid-dark': errors.subject }"
                    placeholder="Booking ID or Topic" />
                  <div v-if="errors.subject" class="error-text mt-1">
                    <i class="bi bi-exclamation-circle me-1"></i
                    >{{ errors.subject }}
                  </div>
                </div>

                <!-- Message -->
                <div class="col-12">
                  <label
                    for="contactMessage"
                    class="form-label extra-small text-secondary-light fw-bold text-uppercase tracking-wider">
                    Message / Concern <span class="text-warning">*</span>
                  </label>
                  <textarea
                    id="contactMessage"
                    v-model="form.message"
                    rows="4"
                    class="form-control dark-input"
                    :class="{ 'is-invalid-dark': errors.message }"
                    placeholder="Provide details regarding your booking, membership, or feedback..."></textarea>
                  <div v-if="errors.message" class="error-text mt-1">
                    <i class="bi bi-exclamation-circle me-1"></i
                    >{{ errors.message }}
                  </div>
                </div>

                <!-- Checkbox Agreement -->
                <div class="col-12 mt-3">
                  <div class="form-check d-flex align-items-center gap-2">
                    <input
                      id="agreePolicies"
                      v-model="form.agreeToPolicies"
                      type="checkbox"
                      class="form-check-input gold-checkbox mt-0" />
                    <label
                      for="agreePolicies"
                      class="form-check-label extra-small text-secondary-light">
                      I agree to G-ONE's
                      <a
                        href="#policies-section"
                        class="text-warning text-decoration-none fw-semibold"
                        @click.prevent="openPolicyModal(policiesData[0])"
                        >Terms</a
                      >
                      &amp;
                      <a
                        href="#policies-section"
                        class="text-warning text-decoration-none fw-semibold"
                        @click.prevent="openPolicyModal(policiesData[1])"
                        >Privacy Policy</a
                      >.
                    </label>
                  </div>
                  <div v-if="errors.agreeToPolicies" class="error-text mt-1">
                    <i class="bi bi-exclamation-circle me-1"></i
                    >{{ errors.agreeToPolicies }}
                  </div>
                </div>

                <!-- Submit Action -->
                <div class="col-12 pt-4 d-flex justify-content-end">
                  <button
                    type="submit"
                    class="btn btn-login px-5 py-3 d-inline-flex align-items-center gap-2 shadow-gold">
                    <span>Send Inquiry</span>
                    <i class="bi bi-send-fill"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Right Column: Direct Channels & Social Matrix -->
        <div class="col-lg-5 d-flex flex-column gap-4">
          <!-- Info Card -->
          <div class="surface-panel rounded-5 p-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <span
                class="service-code-pill px-2 py-1 rounded-2 extra-small fw-bold font-monospace">
                DIRECT CHANNELS
              </span>
              <i class="bi bi-headset text-warning fs-5"></i>
            </div>

            <h5 class="fw-bold text-white mb-1">
              {{ contactDetails.officeName }}
            </h5>
            <p class="small text-secondary-light mb-4">
              {{ contactDetails.addressLine1 }}<br />
              {{ contactDetails.addressLine2 }}
            </p>

            <div class="d-flex flex-column gap-2">
              <div
                class="contact-info-row rounded-3 p-3 d-flex align-items-center justify-content-between gap-2">
                <div
                  class="d-flex align-items-center gap-2 small text-secondary-light">
                  <i class="bi bi-telephone-fill text-warning"></i>
                  <span>Hotline</span>
                </div>
                <a
                  :href="'tel:' + contactDetails.phonePrimary"
                  class="small fw-semibold text-white text-decoration-none contact-link">
                  {{ contactDetails.phonePrimary }}
                </a>
              </div>

              <div
                class="contact-info-row rounded-3 p-3 d-flex align-items-center justify-content-between gap-2">
                <div
                  class="d-flex align-items-center gap-2 small text-secondary-light">
                  <i class="bi bi-phone-fill text-warning"></i>
                  <span>Mobile Desk</span>
                </div>
                <a
                  :href="'tel:' + contactDetails.phoneMobile"
                  class="small fw-semibold text-white text-decoration-none contact-link">
                  {{ contactDetails.phoneMobile }}
                </a>
              </div>

              <div
                class="contact-info-row rounded-3 p-3 d-flex align-items-center justify-content-between gap-2">
                <div
                  class="d-flex align-items-center gap-2 small text-secondary-light">
                  <i class="bi bi-envelope-fill text-warning"></i>
                  <span>Support Desk</span>
                </div>
                <a
                  :href="'mailto:' + contactDetails.emailSupport"
                  class="small fw-semibold text-warning text-decoration-none contact-link">
                  {{ contactDetails.emailSupport }}
                </a>
              </div>

              <div
                class="contact-info-row rounded-3 p-3 d-flex align-items-center justify-content-between gap-2">
                <div
                  class="d-flex align-items-center gap-2 small text-secondary-light">
                  <i class="bi bi-briefcase-fill text-warning"></i>
                  <span>Partnerships</span>
                </div>
                <a
                  :href="'mailto:' + contactDetails.emailPartnerships"
                  class="small fw-semibold text-white text-decoration-none contact-link">
                  {{ contactDetails.emailPartnerships }}
                </a>
              </div>

              <div
                class="contact-info-row rounded-3 p-3 d-flex align-items-center justify-content-between gap-2">
                <div
                  class="d-flex align-items-center gap-2 small text-secondary-light">
                  <i class="bi bi-clock-fill text-warning"></i>
                  <span>Support Hours</span>
                </div>
                <span class="extra-small fw-medium text-white text-end">
                  {{ contactDetails.supportHours }}
                </span>
              </div>
            </div>
          </div>

          <!-- Social Media Matrix -->
          <div class="surface-panel rounded-5 p-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h6 class="fw-bold text-white mb-0">Follow G-ONE Socials</h6>
              <span
                class="extra-small text-warning text-uppercase fw-bold tracking-wider"
                >Live Feeds</span
              >
            </div>
            <p class="extra-small text-secondary-light mb-3">
              Get instant notifications on priority presales, lineup
              announcements, and exclusive community drops.
            </p>

            <div class="row g-3">
              <div
                v-for="social in socialLinks"
                :key="social.name"
                class="col-6">
                <a
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-card rounded-3 p-3 d-flex align-items-center gap-3 text-decoration-none h-100">
                  <i
                    :class="[
                      'bi',
                      social.icon,
                      'fs-4 text-warning flex-shrink-0',
                    ]"></i>
                  <div class="overflow-hidden">
                    <div class="extra-small fw-bold text-white lh-1 mb-1">
                      {{ social.name }}
                    </div>
                    <div class="extra-small text-secondary-light text-truncate">
                      {{ social.handle }}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 4: TERMS & POLICIES -->
    <section id="policies-section" class="mb-5 pb-4">
      <div class="mb-4">
        <span
          class="text-uppercase small fw-bold browse-lineup-title tracking-wider">
          <i class="bi bi-shield-lock me-1"></i> Transparency &amp; Trust
        </span>
        <h2 class="fw-bold text-white mb-1 mt-1 display-6">
          Platform Policies &amp; Terms
        </h2>
        <p class="small text-secondary-light">
          Review official guidelines regarding seat expirations, data
          safeguards, and ticket protection rules.
        </p>
      </div>

      <div class="row g-4">
        <div
          v-for="policy in policiesData"
          :key="policy.id"
          class="col-sm-6 col-lg-3">
          <button
            type="button"
            class="policy-link-card w-100 h-100 text-start rounded-4 p-4 d-flex flex-column border-0"
            @click="openPolicyModal(policy)">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div class="service-icon-box">
                <i :class="['bi', policy.icon, 'fs-4 text-warning']"></i>
              </div>
              <i class="bi bi-arrow-up-right text-secondary-light small"></i>
            </div>
            <h6 class="fw-bold text-white mb-2">{{ policy.title }}</h6>
            <p class="extra-small text-secondary-light mb-4 flex-grow-1">
              {{ policy.summary }}
            </p>
            <span
              class="extra-small text-warning fw-semibold d-inline-flex align-items-center gap-1">
              Read Policy <i class="bi bi-arrow-right"></i>
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- SECTION 5: FREQUENTLY ASKED QUESTIONS -->
    <section id="faq-section" class="mb-4">
      <div class="text-center mx-auto mb-5 section-heading-narrow">
        <span
          class="text-uppercase small fw-bold browse-lineup-title tracking-wider">
          Quick Answers
        </span>
        <h2 class="fw-bold text-white mt-1 mb-2 display-6">
          Frequently Asked Questions
        </h2>
        <p class="small text-secondary-light">
          Everything you need to know about transactional locks, seat
          reservations, and digital passes.
        </p>
      </div>

      <div class="mx-auto d-flex flex-column gap-3 faq-container">
        <div
          v-for="faq in faqsData"
          :key="faq.id"
          class="faq-card rounded-4 overflow-hidden"
          :class="{ active: openFaqId === faq.id }">
          <button
            type="button"
            class="w-100 p-4 bg-transparent border-0 d-flex align-items-center justify-content-between text-start gap-3"
            @click="toggleFaq(faq.id)">
            <span
              class="fw-semibold text-white d-flex align-items-center gap-3">
              <span
                class="text-warning small font-monospace px-2 py-1 rounded bg-dark border border-secondary border-opacity-25">
                {{ faq.number }}
              </span>
              <span class="fs-6">{{ faq.question }}</span>
            </span>
            <i
              class="bi bi-chevron-down text-warning faq-chevron fs-5"
              :class="{ rotated: openFaqId === faq.id }"></i>
          </button>

          <div
            v-if="openFaqId === faq.id"
            class="px-4 pb-4 pt-0 animate-fade-in">
            <p class="small text-secondary-light mb-0 ps-md-4 lh-lg">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- POLICY READER MODAL -->
  <div
    v-if="activePolicy"
    class="policy-modal-backdrop d-flex align-items-center justify-content-center p-3 animate-fade-in"
    @click.self="closePolicyModal">
    <div
      class="policy-modal-box rounded-5 p-4 p-md-5 w-100 position-relative shadow-2xl modal-box-custom">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <div class="d-flex align-items-center gap-3">
          <div class="service-icon-box">
            <i :class="['bi', activePolicy.icon, 'fs-4 text-warning']"></i>
          </div>
          <h5 class="fw-bold text-white mb-0 fs-4">{{ activePolicy.title }}</h5>
        </div>
        <button
          type="button"
          class="btn btn-sm btn-register px-2 py-1"
          aria-label="Close modal"
          @click="closePolicyModal">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div
        class="extra-small text-warning text-uppercase fw-bold mb-4 tracking-wider font-monospace">
        Last Updated: {{ activePolicy.updated }}
      </div>

      <p class="small text-secondary-light lh-lg mb-5 modal-content-text">
        {{ activePolicy.content }}
      </p>

      <div class="d-flex justify-content-end">
        <button
          type="button"
          class="btn btn-login px-4 py-2"
          @click="closePolicyModal">
          Acknowledge &amp; Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-secondary-light {
  color: var(--text-muted, #a1a1aa);
}

.lead-text {
  color: var(--text-main, #f4f4f5);
  font-size: 1.05rem;
  line-height: 1.75;
}

.extra-small {
  font-size: 0.75rem;
}

.tracking-wider {
  letter-spacing: 1.5px;
}

.tracking-wide {
  letter-spacing: 0.8px;
}

.fw-extrabold {
  font-weight: 800;
}

.fw-black {
  font-weight: 900;
}

.lh-tight {
  line-height: 1.15;
}

.browse-lineup-title {
  color: var(--gold-accent, #f3c64f);
}

.text-gradient-gold {
  background: linear-gradient(135deg, #f3c64f 0%, #ffd875 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--gold-accent, #f3c64f);
  box-shadow: 0 0 12px var(--gold-accent, #f3c64f);
}

/* Hero Card */
.hero-bento-card {
  background: linear-gradient(
    145deg,
    rgba(24, 24, 28, 0.88) 0%,
    rgba(14, 14, 16, 0.96) 100%
  );
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
}

.hero-glow-accent {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 260px;
  height: 260px;
  background: radial-gradient(
    circle,
    rgba(243, 198, 79, 0.16) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.hero-tag-pill {
  background-color: rgba(243, 198, 79, 0.1);
  border: 1px solid rgba(243, 198, 79, 0.25);
}

/* Shared Buttons & Badges */
.hero-badge {
  background-color: rgba(158, 28, 78, 0.25);
  border: 1px solid var(--magenta-badge, #9e1c4e);
  color: var(--gold-accent, #f3c64f);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.1px;
  border-radius: 50px;
}

.btn-register {
  color: var(--text-main, #f4f4f5);
  background-color: transparent;
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.12));
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.25s ease;
}

.btn-register:hover {
  background-color: rgba(243, 198, 79, 0.1);
  border-color: var(--gold-accent, #f3c64f);
  color: var(--gold-accent, #f3c64f);
}

.btn-login {
  background-color: var(--gold-accent, #f3c64f);
  color: #0b0b0c;
  border: 1px solid var(--gold-accent, #f3c64f);
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 8px;
  transition: all 0.25s ease;
}

.btn-login:hover {
  background-color: var(--gold-accent-hover, #ffd875);
  border-color: var(--gold-accent-hover, #ffd875);
  color: #0b0b0c;
  box-shadow: 0 0 20px rgba(243, 198, 79, 0.45);
  transform: translateY(-1px);
}

.shadow-gold {
  box-shadow: 0 8px 25px rgba(243, 198, 79, 0.25);
}

/* Hero Image Frame */
.hero-image-frame {
  aspect-ratio: 4 / 3;
  background-color: #141418;
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
}

.about-hero-img {
  transition: transform 0.6s ease;
}

.hero-image-frame:hover .about-hero-img {
  transform: scale(1.04);
}

.hero-img-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(11, 11, 12, 0.88) 0%,
    rgba(11, 11, 12, 0.15) 60%,
    transparent 100%
  );
  pointer-events: none;
}

.floating-badge-card {
  background: rgba(18, 18, 22, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(243, 198, 79, 0.12);
  border: 1px solid rgba(243, 198, 79, 0.25);
}

/* Ticketing Privileges Cards */
.feature-highlight-card {
  background: linear-gradient(
    160deg,
    rgba(24, 24, 28, 0.85) 0%,
    rgba(14, 14, 16, 0.95) 100%
  );
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.feature-highlight-card:hover {
  transform: translateY(-4px);
  border-color: rgba(243, 198, 79, 0.4);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
}

/* Services Cards */
.event-card {
  background: linear-gradient(
    160deg,
    rgba(24, 24, 28, 0.85) 0%,
    rgba(14, 14, 16, 0.95) 100%
  );
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.event-card:hover {
  transform: translateY(-4px);
  border-color: rgba(243, 198, 79, 0.4);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
}

.service-code-pill {
  background-color: rgba(243, 198, 79, 0.12);
  color: var(--gold-accent, #f3c64f);
  border: 1px solid rgba(243, 198, 79, 0.25);
}

.service-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: rgba(243, 198, 79, 0.1);
  border: 1px solid rgba(243, 198, 79, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Surface Panels & Contact Form */
.surface-panel {
  background: linear-gradient(
    155deg,
    rgba(24, 24, 28, 0.88) 0%,
    rgba(14, 14, 16, 0.96) 100%
  );
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
}

.alert-success-gold {
  background-color: rgba(243, 198, 79, 0.1);
  border: 1px solid rgba(243, 198, 79, 0.35);
}

.dark-input {
  background-color: rgba(11, 11, 13, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border-radius: 10px;
  padding: 0.7rem 0.95rem;
  font-size: 0.9rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.dark-input::placeholder {
  color: rgba(161, 161, 170, 0.55);
}

.dark-input:focus {
  background-color: rgba(11, 11, 13, 0.95);
  border-color: var(--gold-accent, #f3c64f);
  box-shadow: 0 0 0 3px rgba(243, 198, 79, 0.15);
  color: #ffffff;
}

.dark-input option {
  background-color: #141418;
  color: #ffffff;
}

.is-invalid-dark {
  border-color: #ef4444;
}

.error-text {
  color: #f87171;
  font-size: 0.78rem;
}

.gold-checkbox {
  background-color: rgba(11, 11, 13, 0.85);
  border-color: rgba(255, 255, 255, 0.25);
  cursor: pointer;
}

.gold-checkbox:checked {
  background-color: var(--gold-accent, #f3c64f);
  border-color: var(--gold-accent, #f3c64f);
}

/* Direct Channels & Social Cards */
.contact-info-row {
  background-color: rgba(11, 11, 13, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.contact-link:hover {
  color: var(--gold-accent, #f3c64f) !important;
}

.social-card {
  background-color: rgba(11, 11, 13, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.25s ease;
}

.social-card:hover {
  background-color: rgba(243, 198, 79, 0.08);
  border-color: rgba(243, 198, 79, 0.4);
  transform: translateY(-2px);
}

/* Policies Cards */
.policy-link-card {
  background: linear-gradient(
    160deg,
    rgba(24, 24, 28, 0.85) 0%,
    rgba(14, 14, 16, 0.95) 100%
  );
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.policy-link-card:hover {
  transform: translateY(-4px);
  border-color: rgba(243, 198, 79, 0.4);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
}

/* FAQ Accordion */
.section-heading-narrow {
  max-width: 650px;
}

.faq-container {
  max-width: 880px;
}

.faq-card {
  background: rgba(20, 20, 24, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;
}

.faq-card.active {
  border-color: rgba(243, 198, 79, 0.4);
  background: rgba(26, 26, 32, 0.95);
}

.faq-chevron {
  transition: transform 0.25s ease;
}

.faq-chevron.rotated {
  transform: rotate(180deg);
}

/* Policy Modal */
.policy-modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(5, 5, 7, 0.82);
  backdrop-filter: blur(8px);
  z-index: 1055;
}

.policy-modal-box {
  background: linear-gradient(155deg, #18181c 0%, #0e0e10 100%);
  border: 1px solid rgba(243, 198, 79, 0.3);
}

.modal-box-custom {
  max-width: 620px;
}

.modal-content-text {
  max-height: 50vh;
  overflow-y: auto;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.25s ease forwards;
}
</style>
