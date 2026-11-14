<template>
  <!-- ============ STEP: PAYMENT ============ -->
  <div v-if="step === 'payment'" class="step-payment">
    <div class="container mx-auto px-4 py-5" style="max-width:900px;">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4 p-md-5">
              <nav class="mb-4">
                <a class="text-decoration-none" @click="emit('close')">
                  <i class="bi bi-arrow-left me-2"></i>Back to Seating Selection
                </a>
              </nav>
              <h2 class="h4 mb-3">Complete Your Booking</h2>
              <p class="text-muted mb-4">Review your order and enter payment details to confirm your tickets.</p>

              <div class="order-mini card bg-dark border-secondary mb-4 p-3">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted small">{{ qty }} × {{ tierName }}</span>
                  <span>{{ money(subtotal) }}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span class="fw-bold">Total to Pay</span>
                  <span class="fw-bold text-gold">{{ money(total) }}</span>
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
  <div v-else class="step-confirmation">
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
                    <div class="recap-value">{{ venue }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="recap-item">
                    <span class="recap-label text-muted small">Date &amp; Time</span>
                    <div class="recap-value">{{ when }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="recap-item">
                    <span class="recap-label text-muted small">Seating Tier</span>
                    <div class="recap-value">{{ tierName }}</div>
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
                    <div class="recap-value fw-bold text-gold">{{ money(total) }}</div>
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
                      <div class="eticket-venue text-muted small">{{ venue }}</div>
                      <div class="eticket-when text-muted small">{{ when }}</div>
                    </div>
                    <div class="text-end">
                      <div class="eticket-tier fw-bold">{{ tierName }}</div>
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
                <button class="btn btn-outline-gold py-2 fw-bold text-uppercase letter-spaced" @click="emit('reset')">Book Another Event</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  eventName: { type: String, default: '' },
  venue: { type: String, default: '' },
  when: { type: String, default: '' },
  tierName: { type: String, default: '' },
  tierId: { type: String, default: '' },
  qty: { type: Number, default: 1 },
  subtotal: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  currency: { type: String, default: '₱' },
  codePrefix: { type: String, default: 'G1' },
})

const emit = defineEmits(['close', 'reset'])

// The component owns both checkout steps; the page only decides whether to show it.
const step = ref('payment')
const payProcessing = ref(false)
const payError = ref('')
const userName = ref('Guest')

const pay = ref({ cardholder: '', number: '', expiry: '', cvc: '', terms: false })

const money = (v) => props.currency + Number(v || 0).toLocaleString('en-PH')

const ticketCode = (n) =>
  `${props.codePrefix}-${String(props.tierId).slice(-4).toUpperCase()}-${String(n).padStart(3, '0')}`
const seatFor = (n) => String.fromCharCode(65 + (n - 1)) + (10 + (n - 1))

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
function dlAllTickets() { alert(`Downloading all ${props.qty} e‑tickets as a single PDF.`) }
</script>

<!-- Only the classes this component needs; the full page stylesheet stays with the pages. -->
<style scoped>
.text-gold { color: var(--gold-accent) !important; }
.btn-gold { background: var(--gold-accent) !important; color: #0b0b0c !important; border: none !important; }
.btn-gold:hover { background: var(--gold-accent-hover) !important; color: #0b0b0c !important; }
.btn-outline-gold { border: 2px solid var(--gold-accent) !important; color: var(--gold-accent) !important; background: transparent !important; }
.btn-outline-gold:hover { background: var(--gold-accent) !important; color: #0b0b0c !important; }
.letter-spaced { letter-spacing: 0.6px; }
</style>