<script setup>
defineProps({
  event: { type: Object, default: null }
});

defineEmits(['close', 'cycle-seat']);

const adminEventGetSeatStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'available': return 'admin-event-status-available';
    case 'hold': return 'admin-event-status-hold';
    case 'sold': return 'admin-event-status-sold';
    case 'blocked': return 'admin-event-status-blocked';
    default: return 'admin-event-status-available';
  }
};
</script>

<template>
  <div v-if="event" class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3 admin-event-custom-modal-backdrop" @click.self="$emit('close')">
    <div class="rounded-4 w-100 shadow-lg overflow-hidden d-flex flex-column admin-event-custom-modal-dialog">
      <div class="modal-header p-4 d-flex justify-content-between align-items-start admin-event-custom-modal-header">
        <div>
          <h2 class="h5 fw-bold mb-1 admin-event-title-text">Seat Map — {{ event.name }}</h2>
          <p class="small mb-0 admin-event-dashboard-subtitle">Venue: {{ event.venueName }} | Capacity: {{ event.venueCapacity }} | Click seat to cycle status.</p>
        </div>
        <button class="btn-close btn-close-white shadow-none" @click="$emit('close')"></button>
      </div>

      <div class="mx-4 mt-3 py-2 text-center fw-bold fs-7 rounded-2 admin-event-stage-banner-box">
        STAGE / PERFORMANCE AREA
      </div>

      <div class="d-flex justify-content-center gap-3 px-4 py-2 small flex-wrap admin-event-dashboard-subtitle admin-event-stage-legend-bar">
        <span class="d-flex align-items-center gap-1"><i class="rounded-circle admin-event-legend-dot-available d-inline-block admin-event-dot-size"></i> Available</span>
        <span class="d-flex align-items-center gap-1"><i class="rounded-circle admin-event-legend-dot-hold d-inline-block admin-event-dot-size"></i> Hold</span>
        <span class="d-flex align-items-center gap-1"><i class="rounded-circle admin-event-legend-dot-sold d-inline-block admin-event-dot-size"></i> Sold</span>
        <span class="d-flex align-items-center gap-1"><i class="rounded-circle admin-event-legend-dot-blocked d-inline-block admin-event-dot-size"></i> Blocked</span>
      </div>

      <div class="modal-body p-4 overflow-y-auto d-flex flex-column gap-3">
        <div v-for="(ticket, tIdx) in event.tickets" :key="tIdx" class="p-3 rounded-3 admin-event-stage-tier-card">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <strong class="admin-event-title-text">{{ ticket.ticketType }}</strong>
              <span class="small ms-2 admin-event-dashboard-subtitle">({{ ticket.seatSection }} — Row {{ ticket.seatRow }})</span>
            </div>
            <span class="fw-semibold admin-event-capacity-allocated-text">₱{{ Number(ticket.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
          </div>
          <div class="d-flex flex-wrap gap-2">
            <button
              v-for="seat in ticket.seats"
              :key="seat.code"
              type="button"
              :class="['btn fw-bold d-flex align-items-center justify-content-center rounded-2 fs-8 admin-event-seat-box-dimension', adminEventGetSeatStatusClass(seat.status)]"
              @click="$emit('cycle-seat', seat)"
            >
              {{ seat.seatNumber }}
            </button>
          </div>
        </div>
      </div>

      <div class="modal-footer p-3 d-flex justify-content-end admin-event-custom-modal-footer">
        <button class="btn fw-semibold px-4 admin-event-publish-action-btn" @click="$emit('close')">Done</button>
      </div>
    </div>
  </div>
</template>