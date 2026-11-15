<template>
  <Teleport to="body">
    <div class="checkout-overlay" @click.self="emit('close')">
      <div
        class="checkout-modal"
        :class="{ 'checkout-modal-wide': step === 'confirmation' }"
        role="dialog"
        aria-modal="true"
        aria-label="Booking checkout"
      >
        <button type="button" class="modal-close" aria-label="Close checkout" @click="emit('close')">
          <i class="bi bi-x-lg"></i>
        </button>

        <!-- ==================== STEP: PAYMENT ==================== -->
        <div v-if="step === 'payment'" class="modal-body">
          <span class="modal-kicker"><i class="bi bi-shield-lock"></i> Secure Checkout</span>
          <h2 class="modal-title">Complete Your Booking</h2>
          <p class="modal-sub">Review your order, then enter your payment details to confirm.</p>

          <div class="order-strip">
            <div class="order-strip-row">
              <span class="order-strip-label">{{ qty }} × {{ tierName }}</span>
              <span class="order-strip-value">{{ money(subtotal) }}</span>
            </div>
            <div class="order-strip-row order-strip-total">
              <span>Total to Pay</span>
              <span class="order-strip-value gold">{{ money(total) }}</span>
            </div>
          </div>

          <form @submit.prevent="processPayment">
            <div class="field">
              <label for="co-cardholder">Cardholder Name</label>
              <input id="co-cardholder" v-model="pay.cardholder" type="text" placeholder="Name on card" required>
            </div>
            <div class="field">
              <label for="co-number">Card Number</label>
              <input id="co-number" v-model="pay.number" type="text" placeholder="1234 5678 9012 3456" inputmode="numeric" required>
            </div>
            <div class="field-row">
              <div class="field">
                <label for="co-expiry">Expiry</label>
                <input id="co-expiry" v-model="pay.expiry" type="text" placeholder="MM/YY" required>
              </div>
              <div class="field">
                <label for="co-cvc">CVC</label>
                <input id="co-cvc" v-model="pay.cvc" type="text" placeholder="123" maxlength="4" inputmode="numeric" required>
              </div>
            </div>

            <label class="check-row">
              <input v-model="pay.terms" type="checkbox" required>
              <span>I agree to the <a href="#">Booking Rules &amp; Policies</a> and refund terms.</span>
            </label>

            <div v-if="payError" class="pay-error">
              <i class="bi bi-exclamation-triangle-fill"></i> {{ payError }}
            </div>

            <button class="btn-pay" type="submit" :disabled="payProcessing">
              {{ payProcessing ? 'Processing Payment…' : 'Pay Now' }}
            </button>
          </form>

          <p class="secure-note">
            <i class="bi bi-lock-fill"></i> 256-bit encrypted · card details are never stored
          </p>
        </div>
        <!-- ==================== STEP: CONFIRMATION ==================== -->
        <div v-else class="modal-body">
          <div class="confirm-head">
            <span class="confirm-badge"><i class="bi bi-check-circle-fill"></i> Booking Confirmed</span>
            <h2 class="modal-title">Thank you, <span class="gold">{{ userName }}</span></h2>
            <p class="modal-sub">Your booking is confirmed and your digital e-tickets are ready.</p>
          </div>

          <div class="summary-grid">
            <div class="summary-item">
              <span class="summary-label">Event</span>
              <span class="summary-value">{{ eventName }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Venue</span>
              <span class="summary-value">{{ venue }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Date &amp; Time</span>
              <span class="summary-value">{{ when }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Seating Tier</span>
              <span class="summary-value">{{ tierName }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Attendees</span>
              <span class="summary-value">{{ qty }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Total Paid</span>
              <span class="summary-value gold">{{ money(total) }}</span>
            </div>
          </div>

          <div class="tickets-head">
            <span class="tickets-title"><i class="bi bi-ticket-perforated"></i> Digital E-Tickets</span>
            <span class="tickets-count">{{ qty }} issued</span>
          </div>

          <div class="tickets">
            <div v-for="n in qty" :key="n" class="ticket">
              <div class="ticket-top">
                <div>
                  <div class="ticket-event">{{ eventName }}</div>
                  <div class="ticket-meta">{{ venue }} · {{ when }}</div>
                </div>
                <div class="ticket-side">
                  <div class="ticket-tier">{{ tierName }}</div>
                  <div class="ticket-seat">Seat {{ seatFor(n) }}</div>
                </div>
              </div>
              <div class="ticket-code">
                <span class="ticket-code-label">Ticket Code</span>
                <span class="ticket-code-value">{{ ticketCode(n) }}</span>
                <i class="bi bi-qr-code ticket-qr"></i>
              </div>
              <div class="ticket-actions">
                <button type="button" class="btn-ticket" @click="dlTicket(n)">
                  <i class="bi bi-download"></i> PDF
                </button>
                <button type="button" class="btn-ticket" @click="walletTicket(n)">
                  <i class="bi bi-wallet2"></i> Add to Wallet
                </button>
              </div>
            </div>
          </div>

          <p class="ticket-note">
            <i class="bi bi-info-circle"></i> Present the QR code at the venue entrance. Each code is single-use.
          </p>

          <div class="modal-actions">
            <button type="button" class="btn-ghost" @click="emit('reset')">Book Another Event</button>
            <button type="button" class="btn-pay btn-pay-inline" @click="dlAllTickets">
              <i class="bi bi-download"></i> Download All Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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

// The modal owns both checkout steps; the page only decides whether to show it.
const step = ref('payment')
const payProcessing = ref(false)
const payError = ref('')
const userName = ref('Guest')

const pay = ref({ cardholder: '', number: '', expiry: '', cvc: '', terms: false })

const money = (v) => props.currency + Number(v || 0).toLocaleString('en-PH')

const ticketCode = (n) =>
  `${props.codePrefix}-${String(props.tierId).slice(-4).toUpperCase()}-${String(n).padStart(3, '0')}`
const seatFor = (n) => String.fromCharCode(65 + (n - 1)) + (10 + (n - 1))

// Lock the page behind the overlay, and let Escape close it.
const onKeydown = (e) => { if (e.key === 'Escape') emit('close') }
onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

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
<style scoped>
/* ---------- Overlay: darkens and blurs the page behind ---------- */
.checkout-overlay {
  position: fixed;
  inset: 0;
  z-index: 1080;
  display: flex;
  padding: 4vh 1rem;
  overflow-y: auto;
  background: rgba(5, 5, 6, 0.78);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  animation: overlay-in 0.18s ease;
}
@keyframes overlay-in { from { opacity: 0; } to { opacity: 1; } }

/* ---------- Modal panel ---------- */
.checkout-modal {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: auto;
  background: var(--bg-surface);
  border: 1px solid rgba(243, 198, 79, 0.22);
  border-radius: 1rem;
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.5);
  animation: modal-in 0.22s cubic-bezier(0.2, 0.8, 0.3, 1);
  overflow: hidden;
}
.checkout-modal-wide { max-width: 880px; }
@keyframes modal-in {
  from { opacity: 0; transform: translateY(14px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.modal-close {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--border-subtle);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-muted);
  font-size: 0.9rem;
  cursor: pointer;
  z-index: 2;
  transition: all 0.18s ease;
}
.modal-close:hover {
  color: #0b0b0c;
  background: var(--gold-accent);
  border-color: var(--gold-accent);
}

.modal-body { padding: 1.9rem 1.9rem 1.7rem; }

/* ---------- Headings ---------- */
.modal-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.66rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--gold-accent);
  margin-bottom: 0.5rem;
}
.modal-title {
  font-family: var(--font-serif);
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 0.35rem;
  color: var(--text-main);
}
.modal-sub {
  font-size: 0.84rem;
  color: var(--text-muted);
  margin: 0 0 1.25rem;
  max-width: 46ch;
}
.gold { color: var(--gold-accent); }

/* ---------- Order strip ---------- */
.order-strip {
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 0.7rem;
  padding: 0.85rem 1rem;
  margin-bottom: 1.35rem;
}
.order-strip-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  font-size: 0.86rem;
  color: var(--text-main);
  margin-bottom: 0.4rem;
}
.order-strip-label { color: var(--text-muted); }
.order-strip-value { font-weight: 700; }
.order-strip-total {
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.55rem;
  margin: 0.55rem 0 0;
  font-size: 0.95rem;
  font-weight: 700;
}
.order-strip-total .order-strip-value { font-size: 1.15rem; font-weight: 800; }
/* ---------- Form fields ---------- */
.field { margin-bottom: 0.85rem; }
.field label {
  display: block;
  font-size: 0.66rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--text-muted);
  margin-bottom: 0.32rem;
}
.field input {
  width: 100%;
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 0.5rem;
  color: var(--text-main);
  font-size: 0.88rem;
  padding: 0.62rem 0.75rem;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}
.field input::placeholder { color: #6b6b73; }
.field input:focus {
  outline: none;
  border-color: var(--gold-accent);
  box-shadow: 0 0 0 3px rgba(243, 198, 79, 0.16);
}
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }

.check-row {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--text-muted);
  margin: 0.4rem 0 1rem;
  cursor: pointer;
}
.check-row input {
  margin-top: 0.15rem;
  accent-color: var(--gold-accent);
  flex-shrink: 0;
}
.check-row a { color: var(--gold-accent); text-decoration: none; }
.check-row a:hover { text-decoration: underline; }

/* ---------- Buttons ---------- */
.btn-pay {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  background: var(--gold-accent);
  color: #0b0b0c;
  border: none;
  border-radius: 0.6rem;
  padding: 0.85rem 1.25rem;
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.12s ease;
}
.btn-pay:hover:not(:disabled) { background: var(--gold-accent-hover); }
.btn-pay:active:not(:disabled) { transform: translateY(1px); }
.btn-pay:disabled { opacity: 0.55; cursor: progress; }
.btn-pay-inline { width: auto; }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--text-main);
  border: 1px solid var(--border-subtle);
  border-radius: 0.6rem;
  padding: 0.8rem 1.25rem;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  cursor: pointer;
  transition: all 0.18s ease;
}
.btn-ghost:hover {
  border-color: var(--gold-accent);
  color: var(--gold-accent);
  background: rgba(243, 198, 79, 0.07);
}

/* ---------- Feedback ---------- */
.pay-error {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(190, 40, 60, 0.14);
  border: 1px solid rgba(248, 113, 113, 0.45);
  color: #fecaca;
  border-radius: 0.5rem;
  padding: 0.6rem 0.8rem;
  font-size: 0.8rem;
  margin-bottom: 0.9rem;
}
.secure-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.68rem;
  color: var(--text-muted);
  margin: 0.75rem 0 0;
  letter-spacing: 0.2px;
}
/* ---------- Confirmation ---------- */
.confirm-head { text-align: center; margin-bottom: 1.4rem; }
.confirm-head .modal-sub { margin-left: auto; margin-right: auto; }
.confirm-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(16, 185, 129, 0.16);
  border: 1px solid rgba(16, 185, 129, 0.55);
  color: #6ee7b7;
  font-size: 0.66rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  border-radius: 50px;
  padding: 0.35rem 0.8rem;
  margin-bottom: 0.75rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  margin-bottom: 1.4rem;
}
.summary-item {
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 0.6rem;
  padding: 0.6rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}
.summary-label {
  font-size: 0.6rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--text-muted);
}
.summary-value {
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--text-main);
  overflow-wrap: anywhere;
}

/* ---------- E-tickets ---------- */
.tickets-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.7rem;
}
.tickets-title {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--text-main);
}
.tickets-title i { color: var(--gold-accent); }
.tickets-count { font-size: 0.7rem; color: var(--text-muted); }

.tickets { max-height: 38vh; overflow-y: auto; padding-right: 0.25rem; }

.ticket {
  background: var(--bg-primary);
  border: 1px dashed rgba(243, 198, 79, 0.32);
  border-radius: 0.7rem;
  padding: 0.8rem 0.9rem;
  margin-bottom: 0.6rem;
}
.ticket-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px dashed var(--border-subtle);
}
.ticket-event { font-size: 0.82rem; font-weight: 700; color: var(--gold-accent); }
.ticket-meta { font-size: 0.7rem; color: var(--text-muted); margin-top: 0.1rem; }
.ticket-side { text-align: right; flex-shrink: 0; }
.ticket-tier { font-size: 0.78rem; font-weight: 700; color: var(--text-main); }
.ticket-seat { font-size: 0.68rem; color: var(--text-muted); }

.ticket-code {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0;
}
.ticket-code-label {
  font-size: 0.6rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--text-muted);
}
.ticket-code-value {
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: var(--text-main);
}
.ticket-qr { margin-left: auto; font-size: 1.35rem; color: var(--gold-muted, var(--text-muted)); }

.ticket-actions { display: flex; gap: 0.5rem; }
.btn-ticket {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  background: transparent;
  border: 1px solid rgba(243, 198, 79, 0.45);
  color: var(--gold-accent);
  border-radius: 0.45rem;
  padding: 0.42rem 0.6rem;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.18s ease;
}
.btn-ticket:hover { background: var(--gold-accent); color: #0b0b0c; }

.ticket-note {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.7rem;
  color: var(--text-muted);
  margin: 0.7rem 0 1.15rem;
}
.ticket-note i { color: var(--gold-accent); flex-shrink: 0; }

.modal-actions { display: flex; gap: 0.6rem; justify-content: flex-end; }
.modal-actions .btn-pay-inline { flex: 0 0 auto; }

/* ---------- Narrow screens ---------- */
@media (max-width: 640px) {
  .checkout-overlay { padding: 2vh 0.6rem; }
  .modal-body { padding: 1.5rem 1.15rem 1.3rem; }
  .modal-title { font-size: 1.35rem; padding-right: 2rem; }
  .summary-grid { grid-template-columns: 1fr 1fr; }
  .field-row { grid-template-columns: 1fr; gap: 0; }
  .modal-actions { flex-direction: column-reverse; }
  .modal-actions .btn-pay-inline,
  .modal-actions .btn-ghost { width: 100%; }
}
</style>