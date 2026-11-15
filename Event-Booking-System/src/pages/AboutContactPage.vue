<script setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { useRoute } from "vue-router"
import {
  companyStats,
  servicesData,
  contactDetails,
  socialLinks,
  inquiryTypes,
  policiesData,
  faqsData
} from '../data/aboutData.js'

//router
const route = useRoute();


// --- CONTACT FORM STATE & VALIDATION ---
const form = reactive({
  fullName: '',
  email: '',
  inquiryType: 'general',
  subject: '',
  message: '',
  agreeToPolicies: false
})

const errors = reactive({
  fullName: '',
  email: '',
  subject: '',
  message: '',
  agreeToPolicies: ''
})

const submittedSuccess = ref(false)
const submittedRef = ref('')

// --- FAQ ACCORDION STATE ---
const openFaqId = ref(1)

const toggleFaq = (id) => {
  openFaqId.value = openFaqId.value === id ? null : id
}

// --- POLICY MODAL STATE ---
const activePolicy = ref(null)

const openPolicyModal = (policy) => {
  activePolicy.value = policy
}

const closePolicyModal = () => {
  activePolicy.value = null
}

// --- FORM VALIDATION & SUBMIT HANDLER ---
const clearErrors = () => {
  errors.fullName = ''
  errors.email = ''
  errors.subject = ''
  errors.message = ''
  errors.agreeToPolicies = ''
}

const validateForm = () => {
  clearErrors()
  let isValid = true
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!form.fullName.trim()) {
    errors.fullName = 'Please enter your full name.'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Please enter your email address.'
    isValid = false
  } else if (!emailPattern.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
    isValid = false
  }

  if (!form.subject.trim()) {
    errors.subject = 'Please provide a brief subject for your inquiry.'
    isValid = false
  }

  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = 'Please enter a message of at least 10 characters.'
    isValid = false
  }

  if (!form.agreeToPolicies) {
    errors.agreeToPolicies = 'You must agree to the Terms of Service and Privacy Policy.'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  submittedSuccess.value = false

  if (!validateForm()) return

  // Simulate inquiry reference generation (pre-API placeholder)
  const randomCode = Math.floor(100000 + Math.random() * 900000)
  submittedRef.value = `G1-INQ-${randomCode}`
  submittedSuccess.value = true

  // Reset form inputs
  form.fullName = ''
  form.email = ''
  form.inquiryType = 'general'
  form.subject = ''
  form.message = ''
  form.agreeToPolicies = false
}

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

//handle dynamic scrolling to about / contact
const handleRouteScroll = async () => {
  await nextTick()

  if (route.path === '/contact') {
    const contactSection = document.getElementById('contact-section')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
}

//user clicks /contact path
onMounted(() => {
  handleRouteScroll()
});

// switching between paths
watch(
  () => route.path,
  () => {
    handleRouteScroll()
  }
)

</script>

<template>
  <main class="main-wrapper py-5">
    <div class="container">

      <!-- SECTION 1: ABOUT US / ORGANIZATION BACKGROUND HERO -->
      <section id="about-section" class="mb-5 pb-3">
        <div class="d-flex align-items-center gap-2 mb-3">
          <span class="pulse-dot"></span>
          <span class="text-uppercase small fw-bold browse-lineup-title">
            About G-ONE // Est. 2026
          </span>
        </div>

        <div class="row g-4 g-lg-5 align-items-center">
          <!-- Left Narrative Column -->
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold text-white lh-sm mb-3">
              Redefining Live Event Discovery &amp;
              <span class="text-warning">Effortless Ticketing</span>
            </h1>

            <p class="lead-text mb-3">
              <strong>G-ONE</strong> is a modern web-based event booking platform built to connect audiences with concerts, gala performances, and premier live experiences through one centralized, reliable portal.
            </p>

            <p class="small text-secondary-light mb-4">
              From browsing schedules and checking real-time seat availability to securing exclusive Bronze, Silver, and Gold membership benefits, we eliminate manual booking friction so both attendees and event organizers can focus on unforgettable moments.
            </p>

            <!-- Action Buttons -->
            <div class="d-flex flex-wrap gap-3 mb-4">
              <button
                type="button"
                class="btn btn-login px-4 py-2.5 d-inline-flex align-items-center gap-2"
                @click="scrollToSection('contact-section')"
              >
                <span>Contact Support</span>
                <i class="bi bi-arrow-down-right"></i>
              </button>
              <button
                type="button"
                class="btn btn-register px-4 py-2.5 d-inline-flex align-items-center gap-2"
                @click="scrollToSection('policies-section')"
              >
                <i class="bi bi-shield-check text-warning"></i>
                <span>Terms &amp; Policies</span>
              </button>
            </div>

            <!-- Micro Metric Strip -->
            <div class="row g-3 pt-3 border-top border-secondary border-opacity-25">
              <div
                v-for="stat in companyStats"
                :key="stat.label"
                class="col-4"
              >
                <div class="fs-4 fw-bold text-warning lh-1">{{ stat.value }}</div>
                <div class="extra-small text-uppercase text-secondary-light mt-1">
                  {{ stat.label }}
                </div>
              </div>
            </div>
          </div>

          <!-- Right Visual Showcase Frame -->
          <div class="col-lg-6">
            <div class="hero-image-card position-relative rounded-4 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85"
                alt="G-ONE Live Event Venue Experience"
                class="w-100 h-100 object-fit-cover about-hero-img"
              />
              <div class="hero-img-gradient"></div>

              <!-- Floating Highlight Card -->
              <div class="floating-badge-card position-absolute bottom-0 start-0 end-0 m-3 p-3 rounded-3 d-flex align-items-center justify-content-between gap-2">
                <div class="d-flex align-items-center gap-3">
                  <div class="icon-circle d-flex align-items-center justify-content-center flex-shrink-0">
                    <i class="bi bi-ticket-perforated-fill text-warning fs-5"></i>
                  </div>
                  <div>
                    <div class="fw-bold text-white small">G-ONE Event Booking System</div>
                    <div class="extra-small text-secondary-light">
                      Verified Venues • Real-Time Seat Holds • Digital Passes
                    </div>
                  </div>
                </div>
                <span class="hero-badge px-2 py-1 flex-shrink-0">Metro Manila</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: ORGANIZATION SERVICES (4 PILLARS) -->
      <section id="services-section" class="mb-5 pb-3">
        <div class="row align-items-end g-3 mb-4">
          <div class="col-lg-7">
            <span class="text-uppercase small fw-bold browse-lineup-title">
              <i class="bi bi-layers me-1"></i>What We Offer
            </span>
            <h2 class="fw-bold text-white mb-0 mt-1">Core Platform Services</h2>
          </div>
          <div class="col-lg-5">
            <p class="small text-secondary-light mb-0">
              Built for speed, transparency, and convenience—delivering a seamless journey from event discovery to venue check-in.
            </p>
          </div>
        </div>

        <div class="row g-4">
          <div
            v-for="service in servicesData"
            :key="service.code"
            class="col-md-6"
          >
            <div class="card event-card h-100 rounded-4 p-4">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <span class="service-code-pill px-2 py-1 rounded-2 extra-small fw-bold">
                  {{ service.code }}
                </span>
                <i :class="['bi', service.icon, 'fs-4 text-warning']"></i>
              </div>

              <h5 class="fw-bold text-white mb-2">{{ service.title }}</h5>
              <p class="small text-secondary-light mb-4 flex-grow-1">
                {{ service.description }}
              </p>

              <div class="pt-3 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center extra-small text-uppercase">
                <span class="text-secondary-light">{{ service.meta }}</span>
                <span class="text-warning fw-semibold">
                  G-ONE Standard <i class="bi bi-check2-circle ms-1"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: CONTACT US (FORM + DETAILS & SOCIAL LINKS) -->
      <section id="contact-section" class="mb-5 pb-3">
        <div class="mb-4">
          <span class="text-uppercase small fw-bold browse-lineup-title">
            <i class="bi bi-chat-dots me-1"></i>Get In Touch
          </span>
          <h2 class="fw-bold text-white mb-1 mt-1">Contact G-ONE Support</h2>
          <p class="small text-secondary-light mb-0">
            Have a question about an upcoming event, ticket order, or membership tier? Send us an inquiry, share feedback, or reach us directly.
          </p>
        </div>

        <div class="row g-4">
          <!-- Left Column: Contact Form -->
          <div class="col-lg-7">
            <div class="surface-panel rounded-4 p-4 p-md-5 h-100">
              <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                <h4 class="fw-bold text-white mb-0">Send an Inquiry or Feedback</h4>
                <span class="hero-badge px-2.5 py-1">Response within 24h</span>
              </div>
              <p class="small text-secondary-light mb-4">
                Fill out the form below for general questions, booking concerns, membership assistance, or platform feedback.
              </p>

              <!-- Success Confirmation Banner -->
              <div
                v-if="submittedSuccess"
                class="alert-success-gold rounded-3 p-3 mb-4 d-flex align-items-start gap-3"
                role="alert"
              >
                <i class="bi bi-check-circle-fill text-warning fs-4 flex-shrink-0"></i>
                <div>
                  <div class="fw-bold text-white small">
                    Inquiry Submitted Successfully ({{ submittedRef }})
                  </div>
                  <div class="extra-small text-secondary-light mt-1">
                    Thank you for contacting G-ONE. Our support team has received your message and will respond to your email shortly.
                  </div>
                </div>
              </div>

              <form novalidate @submit.prevent="handleSubmit">
                <div class="row g-3">
                  <!-- Full Name -->
                  <div class="col-md-6">
                    <label for="contactName" class="form-label small text-secondary-light fw-semibold">
                      Full Name <span class="text-warning">*</span>
                    </label>
                    <input
                      id="contactName"
                      v-model="form.fullName"
                      type="text"
                      class="form-control dark-input"
                      :class="{ 'is-invalid-dark': errors.fullName }"
                      placeholder="e.g., Juan Dela Cruz"
                    />
                    <div v-if="errors.fullName" class="error-text mt-1">
                      <i class="bi bi-exclamation-circle me-1"></i>{{ errors.fullName }}
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="col-md-6">
                    <label for="contactEmail" class="form-label small text-secondary-light fw-semibold">
                      Email Address <span class="text-warning">*</span>
                    </label>
                    <input
                      id="contactEmail"
                      v-model="form.email"
                      type="email"
                      class="form-control dark-input"
                      :class="{ 'is-invalid-dark': errors.email }"
                      placeholder="you@example.com"
                    />
                    <div v-if="errors.email" class="error-text mt-1">
                      <i class="bi bi-exclamation-circle me-1"></i>{{ errors.email }}
                    </div>
                  </div>

                  <!-- Category -->
                  <div class="col-md-6">
                    <label for="inquiryType" class="form-label small text-secondary-light fw-semibold">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      v-model="form.inquiryType"
                      class="form-select dark-input"
                    >
                      <option
                        v-for="item in inquiryTypes"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </option>
                    </select>
                  </div>

                  <!-- Subject -->
                  <div class="col-md-6">
                    <label for="contactSubject" class="form-label small text-secondary-light fw-semibold">
                      Subject <span class="text-warning">*</span>
                    </label>
                    <input
                      id="contactSubject"
                      v-model="form.subject"
                      type="text"
                      class="form-control dark-input"
                      :class="{ 'is-invalid-dark': errors.subject }"
                      placeholder="Booking Ref or Topic"
                    />
                    <div v-if="errors.subject" class="error-text mt-1">
                      <i class="bi bi-exclamation-circle me-1"></i>{{ errors.subject }}
                    </div>
                  </div>

                  <!-- Message -->
                  <div class="col-12">
                    <label for="contactMessage" class="form-label small text-secondary-light fw-semibold">
                      Message / Concern <span class="text-warning">*</span>
                    </label>
                    <textarea
                      id="contactMessage"
                      v-model="form.message"
                      rows="4"
                      class="form-control dark-input"
                      :class="{ 'is-invalid-dark': errors.message }"
                      placeholder="Share details about your inquiry, feedback, or booking reference number..."
                    ></textarea>
                    <div v-if="errors.message" class="error-text mt-1">
                      <i class="bi bi-exclamation-circle me-1"></i>{{ errors.message }}
                    </div>
                  </div>

                  <!-- Terms Consent Checkbox -->
                  <div class="col-12">
                    <div class="form-check">
                      <input
                        id="agreePolicies"
                        v-model="form.agreeToPolicies"
                        type="checkbox"
                        class="form-check-input gold-checkbox"
                      />
                      <label for="agreePolicies" class="form-check-label extra-small text-secondary-light">
                        I agree to the G-ONE
                        <a
                          href="#policies-section"
                          class="text-warning text-decoration-none fw-semibold"
                          @click.prevent="openPolicyModal(policiesData[0])"
                        >
                          Terms of Service
                        </a>
                        and
                        <a
                          href="#policies-section"
                          class="text-warning text-decoration-none fw-semibold"
                          @click.prevent="openPolicyModal(policiesData[1])"
                        >
                          Privacy Policy
                        </a>.
                      </label>
                    </div>
                    <div v-if="errors.agreeToPolicies" class="error-text mt-1">
                      <i class="bi bi-exclamation-circle me-1"></i>{{ errors.agreeToPolicies }}
                    </div>
                  </div>

                  <!-- Submit Button -->
                  <div class="col-12 pt-2 d-flex justify-content-end">
                    <button type="submit" class="btn btn-login px-4 py-2.5 d-inline-flex align-items-center gap-2">
                      <span>Submit Inquiry</span>
                      <i class="bi bi-send-fill"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Right Column: Contact Information & Social Media -->
          <div class="col-lg-5 d-flex flex-column gap-4">
            <!-- Direct Contact Details Card -->
            <div class="surface-panel rounded-4 p-4">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <span class="service-code-pill px-2 py-1 rounded-2 extra-small fw-bold">
                  DIRECT CHANNELS
                </span>
                <i class="bi bi-headset text-warning fs-5"></i>
              </div>

              <h5 class="fw-bold text-white mb-1">{{ contactDetails.officeName }}</h5>
              <p class="small text-secondary-light mb-4">
                {{ contactDetails.addressLine1 }}<br />
                {{ contactDetails.addressLine2 }}
              </p>

              <div class="d-flex flex-column gap-2">
                <!-- Phone Primary -->
                <div class="contact-info-row rounded-3 p-3 d-flex align-items-center justify-content-between gap-2">
                  <div class="d-flex align-items-center gap-2 small text-secondary-light">
                    <i class="bi bi-telephone-fill text-warning"></i>
                    <span>Hotline</span>
                  </div>
                  <a :href="'tel:' + contactDetails.phonePrimary" class="small fw-semibold text-white text-decoration-none contact-link">
                    {{ contactDetails.phonePrimary }}
                  </a>
                </div>

                <!-- Mobile Support -->
                <div class="contact-info-row rounded-3 p-3 d-flex align-items-center justify-content-between gap-2">
                  <div class="d-flex align-items-center gap-2 small text-secondary-light">
                    <i class="bi bi-phone-fill text-warning"></i>
                    <span>Mobile</span>
                  </div>
                  <a :href="'tel:' + contactDetails.phoneMobile" class="small fw-semibold text-white text-decoration-none contact-link">
                    {{ contactDetails.phoneMobile }}
                  </a>
                </div>

                <!-- Support Email -->
                <div class="contact-info-row rounded-3 p-3 d-flex align-items-center justify-content-between gap-2">
                  <div class="d-flex align-items-center gap-2 small text-secondary-light">
                    <i class="bi bi-envelope-fill text-warning"></i>
                    <span>Support</span>
                  </div>
                  <a :href="'mailto:' + contactDetails.emailSupport" class="small fw-semibold text-warning text-decoration-none contact-link">
                    {{ contactDetails.emailSupport }}
                  </a>
                </div>

                <!-- Partnerships Email -->
                <div class="contact-info-row rounded-3 p-3 d-flex align-items-center justify-content-between gap-2">
                  <div class="d-flex align-items-center gap-2 small text-secondary-light">
                    <i class="bi bi-briefcase-fill text-warning"></i>
                    <span>Partners</span>
                  </div>
                  <a :href="'mailto:' + contactDetails.emailPartnerships" class="small fw-semibold text-white text-decoration-none contact-link">
                    {{ contactDetails.emailPartnerships }}
                  </a>
                </div>

                <!-- Hours -->
                <div class="contact-info-row rounded-3 p-3 d-flex align-items-center justify-content-between gap-2">
                  <div class="d-flex align-items-center gap-2 small text-secondary-light">
                    <i class="bi bi-clock-fill text-warning"></i>
                    <span>Hours</span>
                  </div>
                  <span class="extra-small fw-medium text-white text-end">
                    {{ contactDetails.supportHours }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Social Media Card -->
            <div class="surface-panel rounded-4 p-4">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <h6 class="fw-bold text-white mb-0">Follow G-ONE Socials</h6>
                <span class="extra-small text-warning text-uppercase fw-bold">Live Updates</span>
              </div>
              <p class="extra-small text-secondary-light mb-3">
                Stay updated on newly announced shows, presale schedules, and exclusive VIP member drops.
              </p>

              <div class="row g-2">
                <div
                  v-for="social in socialLinks"
                  :key="social.name"
                  class="col-6"
                >
                  <a
                    :href="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-card rounded-3 p-2 d-flex align-items-center gap-2 text-decoration-none"
                  >
                    <i :class="['bi', social.icon, 'fs-5 text-warning']"></i>
                    <div class="overflow-hidden">
                      <div class="extra-small fw-bold text-white lh-1">{{ social.name }}</div>
                      <div class="extra-small text-secondary-light text-truncate mt-1">
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

      <!-- SECTION 4: TERMS & POLICIES LINKS -->
      <section id="policies-section" class="mb-5 pb-3">
        <div class="mb-4">
          <span class="text-uppercase small fw-bold browse-lineup-title">
            <i class="bi bi-file-earmark-check me-1"></i>Transparency &amp; Trust
          </span>
          <h2 class="fw-bold text-white mb-1 mt-1">Terms &amp; Platform Policies</h2>
          <p class="small text-secondary-light mb-0">
            Review our official ticketing guidelines, data privacy practices, and cancellation policies.
          </p>
        </div>

        <div class="row g-3">
          <div
            v-for="policy in policiesData"
            :key="policy.id"
            class="col-sm-6 col-lg-3"
          >
            <button
              type="button"
              class="policy-link-card w-100 h-100 text-start rounded-4 p-4 d-flex flex-column"
              @click="openPolicyModal(policy)"
            >
              <div class="d-flex align-items-center justify-content-between mb-3">
                <i :class="['bi', policy.icon, 'fs-4 text-warning']"></i>
                <i class="bi bi-arrow-up-right text-secondary-light small"></i>
              </div>
              <h6 class="fw-bold text-white mb-2">{{ policy.title }}</h6>
              <p class="extra-small text-secondary-light mb-3 flex-grow-1">
                {{ policy.summary }}
              </p>
              <span class="extra-small text-warning fw-semibold">
                Read Policy &rarr;
              </span>
            </button>
          </div>
        </div>
      </section>

      <!-- SECTION 5: FREQUENTLY ASKED QUESTIONS -->
      <section id="faq-section" class="mb-4">
        <div class="text-center mx-auto mb-4" style="max-width: 620px;">
          <span class="text-uppercase small fw-bold browse-lineup-title">
            Quick Answers
          </span>
          <h2 class="fw-bold text-white mt-1 mb-2">Frequently Asked Questions</h2>
          <p class="small text-secondary-light mb-0">
            Essential information about seat holds, membership perks, and digital tickets on G-ONE.
          </p>
        </div>

        <div class="mx-auto d-flex flex-column gap-3" style="max-width: 860px;">
          <div
            v-for="faq in faqsData"
            :key="faq.id"
            class="faq-card rounded-4 overflow-hidden"
            :class="{ active: openFaqId === faq.id }"
          >
            <button
              type="button"
              class="w-100 p-4 bg-transparent border-0 d-flex align-items-center justify-content-between text-start gap-3"
              @click="toggleFaq(faq.id)"
            >
              <span class="fw-semibold text-white d-flex align-items-center gap-3">
                <span class="text-warning small font-monospace">{{ faq.number }}</span>
                <span>{{ faq.question }}</span>
              </span>
              <i
                class="bi bi-chevron-down text-warning faq-chevron"
                :class="{ rotated: openFaqId === faq.id }"
              ></i>
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

    <!-- POLICY READER MODAL -->
    <div
      v-if="activePolicy"
      class="policy-modal-backdrop d-flex align-items-center justify-content-center p-3"
      @click.self="closePolicyModal"
    >
      <div class="policy-modal-box rounded-4 p-4 p-md-5 w-100" style="max-width: 580px;">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="d-flex align-items-center gap-2">
            <i :class="['bi', activePolicy.icon, 'fs-4 text-warning']"></i>
            <h5 class="fw-bold text-white mb-0">{{ activePolicy.title }}</h5>
          </div>
          <button
            type="button"
            class="btn btn-sm btn-register px-2 py-1"
            aria-label="Close modal"
            @click="closePolicyModal"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div class="extra-small text-warning text-uppercase fw-bold mb-3">
          Last Updated: {{ activePolicy.updated }}
        </div>

        <p class="small text-secondary-light lh-lg mb-4">
          {{ activePolicy.content }}
        </p>

        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-login px-4 py-2" @click="closePolicyModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main-wrapper {
  background:
    radial-gradient(circle at 85% 15%, rgba(158, 28, 78, 0.16), transparent 45%),
    radial-gradient(circle at 15% 45%, rgba(243, 198, 79, 0.08), transparent 45%),
    var(--bg-primary);
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
}

.text-secondary-light {
  color: var(--text-muted);
}

.lead-text {
  color: var(--text-main);
  font-size: 1.02rem;
  line-height: 1.7;
}

.extra-small {
  font-size: 0.74rem;
}

.browse-lineup-title {
  color: var(--gold-accent);
  letter-spacing: 1.5px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--gold-accent);
  box-shadow: 0 0 10px var(--gold-accent);
}

/* Shared Buttons & Badges */
.hero-badge {
  background-color: rgba(158, 28, 78, 0.25);
  border: 1px solid var(--magenta-badge);
  color: var(--gold-accent);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.1px;
  border-radius: 50px;
}

.btn-register {
  color: var(--text-main);
  background-color: transparent;
  border: 1px solid var(--border-subtle);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.btn-register:hover {
  background-color: rgba(243, 198, 79, 0.1);
  border-color: var(--gold-accent);
  color: var(--gold-accent);
}

.btn-login {
  background-color: var(--gold-accent);
  color: #0b0b0c;
  border: 1px solid var(--gold-accent);
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.btn-login:hover {
  background-color: var(--gold-accent-hover);
  border-color: var(--gold-accent-hover);
  color: #0b0b0c;
  box-shadow: 0 0 14px rgba(243, 198, 79, 0.35);
}

/* Hero Image Card */
.hero-image-card {
  aspect-ratio: 4 / 3;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.65);
}

.about-hero-img {
  transition: transform 0.6s ease;
}

.hero-image-card:hover .about-hero-img {
  transform: scale(1.04);
}

.hero-img-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 35%, rgba(11, 11, 12, 0.92) 100%);
  pointer-events: none;
}

.floating-badge-card {
  background-color: rgba(20, 20, 22, 0.88);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-subtle);
}

.icon-circle {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background-color: rgba(243, 198, 79, 0.12);
  border: 1px solid rgba(243, 198, 79, 0.3);
}

/* Cards & Panels */
.surface-panel {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
}

.event-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  transition: transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}

.event-card:hover {
  transform: translateY(-4px);
  background-color: var(--bg-surface-hover);
  border-color: rgba(243, 198, 79, 0.4);
}

.service-code-pill {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  color: var(--gold-accent);
  letter-spacing: 1px;
}

/* Form Inputs & Validation */
.dark-input {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
  padding: 0.65rem 0.9rem;
  font-size: 0.9rem;
  border-radius: 8px;
}

.dark-input::placeholder {
  color: rgba(156, 163, 175, 0.65);
}

.dark-input:focus {
  background-color: var(--bg-primary);
  border-color: var(--gold-accent);
  color: var(--text-main);
  box-shadow: 0 0 0 2px rgba(243, 198, 79, 0.2);
}

.is-invalid-dark {
  border-color: #f43f5e !important;
}

.error-text {
  color: #fda4af;
  font-size: 0.76rem;
}

.gold-checkbox {
  background-color: var(--bg-primary);
  border-color: var(--border-subtle);
}

.gold-checkbox:checked {
  background-color: var(--gold-accent);
  border-color: var(--gold-accent);
}

.alert-success-gold {
  background-color: rgba(243, 198, 79, 0.12);
  border: 1px solid rgba(243, 198, 79, 0.45);
}

/* Contact Rows & Social Cards */
.contact-info-row {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-subtle);
}

.contact-link:hover {
  color: var(--gold-accent) !important;
  text-decoration: underline !important;
}

.social-card {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  transition: all 0.2s ease;
}

.social-card:hover {
  border-color: var(--gold-accent);
  background-color: rgba(243, 198, 79, 0.08);
  transform: translateY(-2px);
}

/* Policy Link Cards */
.policy-link-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  transition: all 0.25s ease;
}

.policy-link-card:hover {
  background-color: var(--bg-surface-hover);
  border-color: rgba(243, 198, 79, 0.45);
  transform: translateY(-4px);
}

/* FAQ Accordion */
.faq-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  transition: border-color 0.2s ease;
}

.faq-card.active {
  border-color: rgba(243, 198, 79, 0.4);
}

.faq-chevron {
  transition: transform 0.25s ease;
}

.faq-chevron.rotated {
  transform: rotate(180deg);
}

/* Policy Modal Overlay */
.policy-modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(6px);
  z-index: 1060;
}

.policy-modal-box {
  background-color: var(--bg-surface);
  border: 1px solid rgba(243, 198, 79, 0.35);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.8);
}
</style>