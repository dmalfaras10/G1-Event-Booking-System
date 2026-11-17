<template>
  <Teleport to="body">
    <div class="seat-overlay" @click.self="emit('close')">
      <div
        class="seat-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Seat selection"
      >
        <button type="button" class="modal-close" aria-label="Close seat selection" @click="emit('close')">
          <i class="bi bi-x-lg"></i>
        </button>

        <div class="modal-body">
          <span class="modal-kicker"><i class="bi bi-ticket-perforated"></i> Seat Selection</span>
          <h2 class="modal-title">Choose Your Seats</h2>
          <p class="modal-sub">
            {{ eventName }}<template v-if="tierName"> · {{ tierName }}</template> — pick
            {{ qty }} {{ qty === 1 ? 'seat' : 'seats' }} in your section on the map below.
          </p>

          <div class="seat-context">
            <span class="context-item"><i class="bi bi-geo-alt"></i> {{ venue }}</span>
            <span class="context-item"><i class="bi bi-clock"></i> {{ when }}</span>
          </div>

          <!-- Sold-out guard (defensive: the booking panel disables checkout first) -->
          <div v-if="soldOut" class="seat-empty">
            <i class="bi bi-exclamation-triangle-fill"></i>
            No seats are currently available for this allocation.
          </div>

          <template v-else>
            <!-- Venue map: one section per tier, premium tiers nearest the stage -->
            <div class="venue">
              <div class="stage">
                <span class="stage-text">Stage</span>
              </div>

              <div class="seat-map">
                <div
                  v-for="section in sections"
                  :key="section.id"
                  class="seat-section"
                  :class="{ 'section-mine': section.mine }"
                  :style="{ '--tier-color': section.color }"
                  :aria-label="section.name + ' section'"
                >
                  <div v-for="row in section.rows" :key="row.label" class="seat-row">
                    <span class="row-label">{{ row.label }}</span>
                    <div class="row-seats">
                      <button
                        v-for="seat in row.seats"
                        :key="seat.id"
                        type="button"
                        class="seat"
                        :class="{
                          'seat-taken': seat.taken,
                          'seat-selected': isSelected(seat),
                          'seat-aisle': seat.aisle,
                          'seat-locked': !section.mine,
                          'seat-dimmed': section.mine && !seat.taken && !isSelected(seat) && selected.length >= qty,
                        }"
                        :disabled="seat.taken || !section.mine || (selected.length >= qty && !isSelected(seat))"
                        :aria-label="seat.label + (seat.taken ? ', unavailable' : !section.mine ? ', other tier' : isSelected(seat) ? ', selected' : '')"
                        :aria-pressed="isSelected(seat)"
                        :title="seat.label + (seat.taken ? ' — unavailable' : !section.mine ? ' — other tier' : '')"
                        @click="toggle(seat)"
                      >
                        <span v-if="isSelected(seat)" class="seat-check"><i class="bi bi-check-lg"></i></span>
                      </button>
                    </div>
                    <span class="row-label">{{ row.label }}</span>
                  </div>
                </div>
              </div>

              <div class="map-legend">
                <span class="legend-item"><span class="legend-swatch swatch-free"></span> Available</span>
                <span class="legend-item"><span class="legend-swatch swatch-taken"></span> Taken</span>
                <span class="legend-item"><span class="legend-swatch swatch-locked"></span> Other Tier</span>
                <span class="legend-item"><span class="legend-swatch swatch-picked"></span> Your Seats</span>
              </div>
            </div>

            <!-- Selection summary -->
            <div class="seat-summary">
              <div class="summary-line">
                <span class="summary-label">Selected Seats</span>
                <span class="summary-value">{{ selected.length ? selectedLabels.join(', ') : 'None yet' }}</span>
              </div>
              <div class="summary-line">
                <span class="summary-label">Selection Progress</span>
                <span class="summary-value">{{ selected.length }} / {{ qty }}</span>
              </div>
              <p v-if="remaining > 0" class="seat-hint">
                <i class="bi bi-info-circle"></i>
                Select {{ remaining }} more {{ remaining === 1 ? 'seat' : 'seats' }} to continue.
              </p>
              <p v-else class="seat-hint">
                <i class="bi bi-check-circle"></i>
                All seats selected — click a selected seat to swap it.
              </p>
            </div>

            <div class="seat-actions">
              <button type="button" class="btn-ghost" :disabled="selected.length === 0" @click="clearSelection">
                Clear
              </button>
              <button type="button" class="btn-pay" :disabled="selected.length !== qty" @click="confirm">
                Confirm Seats <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  eventName: { type: String, default: '' },
  venue: { type: String, default: '' },
  when: { type: String, default: '' },
  tier: { type: Object, default: null },
  tiers: { type: Array, default: () => [] },
  qty: { type: Number, default: 1 },
  initialSeats: { type: Array, default: () => [] },
})

const emit = defineEmits(['close', 'confirm'])

// ---- Deterministic pseudo-random helpers (stable map across re-opens) ----
function hashCode(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Row names run A, B, C … Z, AA, AB … so labels stay unique across sections.
function rowName(i) {
  let n = i + 1
  let name = ''
  while (n > 0) {
    name = String.fromCharCode(65 + ((n - 1) % 26)) + name
    n = Math.floor((n - 1) / 26)
  }
  return name
}

// ---- Seat map generation ----
// Each tier gets its own section. `capacity` is the number of seats still on
// sale; a few extra "taken" seats are drawn around it so the map looks real.
// Tiers are rendered premium-first (nearest the stage), and each section is
// outlined according to its price rank: the most expensive tier is gold,
// followed by silver, then bronze.
const TIER_COLORS = ['#f3c64f', '#c9d1d9', '#cd7f32', '#8b5cf6', '#38bdf8', '#34d399']

// A small number of visual seats on each side widens the map without forcing
// larger events into additional wrapped rows on narrow screens.
const EXTRA_SEATS_PER_SIDE = 2

function buildSections() {
  const list = (props.tiers || []).slice().reverse()
  const priceRank = [...(props.tiers || [])]
    .sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0))
    .reduce((ranks, tier, index) => {
      ranks.set(tier.id, index)
      return ranks
    }, new Map())
  let rowOffset = 0

  return list.map((t, index) => {
    const capacity = Math.max(0, Number(t.capacity) || 0)
    const mine = !!props.tier && t.id === props.tier.id
    const soldCount = capacity > 0 ? Math.min(capacity - 1, Math.max(2, Math.round(capacity * 0.25))) : 0
    const baseTotal = capacity > 0 ? capacity + soldCount : 4
    const baseRowCount = baseTotal <= 6 ? 1 : baseTotal <= 12 ? 2 : baseTotal <= 24 ? 3 : 4
    // Bronze is the deep general-admission section: give it two extra rows.
    const isBronze = /bronze/i.test(t.id || '') || /^bronze/i.test(t.name || '')
    const rowCount = baseRowCount + (isBronze ? 2 : 0)
    const basePerRow = Math.ceil(baseTotal / baseRowCount)
    // Widen every row with extra seats on both sides.
    const perRow = basePerRow + EXTRA_SEATS_PER_SIDE * 2
    const totalSeats = perRow * rowCount

    const rows = []
    for (let r = 0; r < rowCount; r++) {
      const label = rowName(rowOffset + r)
      const seats = []
      for (let c = 0; c < perRow; c++) {
        seats.push({
          id: `${label}${c + 1}`,
          label: `${label}${c + 1}`,
          col: c,
          aisle: c === Math.floor(perRow / 2),
          taken: capacity === 0,
          mine,
        })
      }
      rows.push({ label, seats })
    }
    rowOffset += rowCount

    // Deterministically mark seats as taken, leaving exactly `capacity` free.
    if (capacity > 0) {
      const all = rows.flatMap(row => row.seats)
      const takenCount = totalSeats - capacity
      const rand = mulberry32(hashCode(t.id || t.name || 'tier'))
      const order = all.map((_, i) => i)
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1))
        ;[order[i], order[j]] = [order[j], order[i]]
      }
      const takenIds = new Set(order.slice(0, takenCount).map(i => all[i].id))
      all.forEach(seat => { seat.taken = takenIds.has(seat.id) })
    }

    return {
      id: t.id,
      name: t.name,
      capacity,
      mine,
      rows,
      color: TIER_COLORS[(priceRank.get(t.id) ?? index) % TIER_COLORS.length],
    }
  })
}

const sections = buildSections()
const flatSeats = sections.flatMap(section => section.rows.flatMap(row => row.seats))
const mySection = sections.find(section => section.mine)
const soldOut = !mySection || mySection.capacity === 0

// ---- Selection state ----
const selected = ref(
  props.initialSeats
    .map(label => flatSeats.find(seat => seat.label === label && seat.mine && !seat.taken))
    .filter(Boolean)
    .slice(0, props.qty)
)

const selectedLabels = computed(() => selected.value.map(seat => seat.label))
const remaining = computed(() => Math.max(0, props.qty - selected.value.length))
const isSelected = (seat) => selected.value.some(s => s.id === seat.id)

function toggle(seat) {
  if (!seat.mine || seat.taken) return
  const idx = selected.value.findIndex(s => s.id === seat.id)
  if (idx >= 0) {
    selected.value.splice(idx, 1)
    return
  }
  if (selected.value.length >= props.qty) return
  selected.value.push(seat)
}

function clearSelection() {
  selected.value = []
}

function confirm() {
  if (selected.value.length !== props.qty) return
  emit('confirm', selectedLabels.value.slice())
}

// ---- Overlay behaviour (mirrors BookingCheckout) ----
const onKeydown = (e) => { if (e.key === 'Escape') emit('close') }
onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ---------- Overlay ---------- */
.seat-overlay {
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
.seat-modal {
  position: relative;
  width: 100%;
  max-width: 720px;
  margin: auto;
  max-height: 92vh;
  overflow-y: auto;
  background: var(--bg-surface);
  border: 1px solid rgba(243, 198, 79, 0.22);
  border-radius: 1rem;
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.5);
  animation: modal-in 0.22s cubic-bezier(0.2, 0.8, 0.3, 1);
}
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
  font-family: var(--font-serif, Georgia, serif);
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 0.35rem;
  color: var(--text-main);
}
.modal-sub {
  font-size: 0.84rem;
  color: var(--text-muted);
  margin: 0 0 0.85rem;
  max-width: 54ch;
}

/* ---------- Venue map ---------- */
.seat-context {
  display: flex;
  flex-wrap: wrap;
  gap: 1.1rem;
  margin: 0 0 1.2rem;
  font-size: 0.74rem;
  color: var(--text-muted);
}
.context-item { display: inline-flex; align-items: center; gap: 0.35rem; }
.context-item i { color: var(--gold-accent); }

.venue { margin-top: 0.4rem; }

.stage {
  width: 78%;
  height: 2rem;
  margin: 0 auto 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 2px solid rgba(243, 198, 79, 0.55);
  border-radius: 0.4rem 0.4rem 50% 50% / 0.4rem 0.4rem 100% 100%;
  background: linear-gradient(180deg, rgba(243, 198, 79, 0.22), rgba(243, 198, 79, 0.02));
}
.stage-text {
  font-size: 0.62rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--gold-accent);
}

.seat-map {
  max-height: 44vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.2rem 0.2rem 0.6rem;
}

/* ---------- Sections (one colour-bordered box per tier) ---------- */
.seat-section {
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--tier-color, rgba(255, 255, 255, 0.12));
  border-radius: 0.65rem;
  background: transparent;
  padding: 0.7rem 0.6rem 0.35rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.18s ease, border-color 0.18s ease;
}
.seat-section:last-child { margin-bottom: 0.2rem; }

/* Keep inactive tier borders understated so the selected section is clear. */
.seat-section:not(.section-mine) {
  border-color: rgba(255, 255, 255, 0.1);
}

/* The tier being booked gets a soft ring/glow in its own colour */
.section-mine {
  border-color: var(--tier-color, var(--gold-accent));
  box-shadow:
    0 0 4px var(--tier-color, var(--gold-accent)),
    0 0 10px -2px var(--tier-color, var(--gold-accent));
}

/* ---------- Rows & seats ---------- */
.seat-row {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.35rem;
}
.row-label {
  flex-shrink: 0;
  width: 0.9rem;
  text-align: center;
  font-size: 0.6rem;
  font-weight: 800;
  color: var(--text-muted);
}
.row-seats {
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
  /* Keep each generated venue row visually intact. */
  justify-content: safe center;
  gap: 0.26rem;
}

.seat {
  flex-shrink: 0;
  width: 1.3rem;
  height: 1.3rem;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.26rem;
  border: 1px solid rgba(243, 198, 79, 0.28);
  background: rgba(243, 198, 79, 0.08);
  cursor: pointer;
  transition: background 0.14s ease, border-color 0.14s ease, transform 0.1s ease;
}

@media (max-width: 480px) {
  .seat-row { gap: 0.3rem; }
  .row-seats { gap: 0.08rem; }
  .seat {
    width: 0.9rem;
    height: 0.9rem;
    font-size: 0.55rem;
  }
  .seat-aisle { margin-left: 0.15rem; }
}
.seat:hover:not(:disabled) {
  background: rgba(243, 198, 79, 0.24);
  border-color: var(--gold-accent);
  transform: translateY(-1px);
}
.seat:focus-visible {
  outline: 2px solid var(--gold-accent);
  outline-offset: 1px;
}
.seat-aisle { margin-left: 0.7rem; }

.seat-taken {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.06);
  cursor: not-allowed;
}

.seat-locked {
  opacity: 0.45;
  cursor: not-allowed;
}

.seat-selected,
.seat-selected:hover:not(:disabled) {
  background: var(--gold-accent);
  border-color: var(--gold-accent);
}

.seat-dimmed { opacity: 0.32; }

.seat-check {
  color: #0b0b0c;
  font-size: 0.62rem;
  line-height: 1;
}

/* ---------- Legend ---------- */
.map-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  font-size: 0.7rem;
  color: var(--text-muted);
}
.legend-item { display: inline-flex; align-items: center; gap: 0.4rem; }
.legend-swatch {
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 0.22rem;
  border: 1px solid rgba(243, 198, 79, 0.28);
  background: rgba(243, 198, 79, 0.08);
}
.swatch-taken { background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.06); }
.swatch-locked { opacity: 0.45; }
.swatch-picked { background: var(--gold-accent); border-color: var(--gold-accent); }

/* ---------- Selection summary ---------- */
.seat-summary {
  margin-top: 1.1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 0.7rem;
  padding: 0.85rem 1rem;
}
.summary-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  font-size: 0.84rem;
  margin-bottom: 0.35rem;
}
.summary-label { color: var(--text-muted); }
.summary-value {
  font-weight: 700;
  color: var(--text-main);
  text-align: right;
  overflow-wrap: anywhere;
}
.seat-hint {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.76rem;
  color: var(--text-muted);
  margin: 0.5rem 0 0;
}
.seat-hint i { color: var(--gold-accent); flex-shrink: 0; }

/* ---------- Empty state ---------- */
.seat-empty {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(190, 40, 60, 0.14);
  border: 1px solid rgba(248, 113, 113, 0.45);
  color: #fecaca;
  border-radius: 0.6rem;
  padding: 0.8rem 0.9rem;
  font-size: 0.82rem;
}

/* ---------- Buttons ---------- */
.seat-actions {
  display: flex;
  gap: 0.6rem;
  margin-top: 1.2rem;
}
.seat-actions .btn-pay { flex: 1; }

.btn-pay {
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
.btn-pay:disabled { opacity: 0.45; cursor: not-allowed; }

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
.btn-ghost:hover:not(:disabled) {
  border-color: var(--gold-accent);
  color: var(--gold-accent);
  background: rgba(243, 198, 79, 0.07);
}
.btn-ghost:disabled { opacity: 0.45; cursor: not-allowed; }

/* ---------- Narrow screens ---------- */
@media (max-width: 640px) {
  .seat-overlay { padding: 2vh 0.6rem; }
  .modal-body { padding: 1.5rem 1.15rem 1.3rem; }
  .modal-title { font-size: 1.35rem; padding-right: 2rem; }
  .seat {
    width: 1.1rem;
    height: 1.1rem;
  }
  .row-seats { gap: 0.18rem; }
  .seat-aisle { margin-left: 0.45rem; }
  .seat-actions { flex-direction: column-reverse; }
  .seat-actions .btn-pay,
  .seat-actions .btn-ghost { width: 100%; }
}
</style>
