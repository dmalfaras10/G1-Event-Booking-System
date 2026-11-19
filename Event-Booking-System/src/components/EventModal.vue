<script setup>
defineProps({
  isOpen: { type: Boolean, required: true },
  isEditing: { type: Boolean, required: true },
  form: { type: Object, required: true },
  categories: { type: Array, required: true },
  isOverCapacity: { type: Boolean, required: true },
});

defineEmits([
  "close",
  "save",
  "image-upload",
  "add-tier",
  "remove-tier",
  "update-perks",
  "generate-seats",
  "cycle-seat",
]);

const getTotalSeatsCount = (tickets) =>
  tickets
    ? tickets.reduce((sum, t) => sum + (t.seats ? t.seats.length : 0), 0)
    : 0;

const adminEventGetSeatStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "available":
      return "admin-event-status-available";
    case "hold":
      return "admin-event-status-hold";
    case "sold":
      return "admin-event-status-sold";
    case "blocked":
      return "admin-event-status-blocked";
    default:
      return "admin-event-status-available";
  }
};
</script>

<template>
  <div
    v-if="isOpen"
    class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3 admin-event-custom-modal-backdrop"
    @click.self="$emit('close')">
    <div
      class="rounded-4 w-100 shadow-lg overflow-hidden d-flex flex-column admin-event-custom-modal-dialog">
      <div
        class="modal-header p-4 d-flex justify-content-between align-items-start admin-event-custom-modal-header">
        <div>
          <h2 class="h5 fw-bold mb-1 admin-event-title-text">
            {{
              isEditing ? "Edit Event & Seat Allocation" : "Create New Event"
            }}
          </h2>
          <p class="small mb-0 admin-event-dashboard-subtitle">
            Fill out the event details and define ticket pricing & capacity.
          </p>
        </div>
        <button
          class="btn-close btn-close-white shadow-none"
          @click="$emit('close')"></button>
      </div>

      <form
        @submit.prevent="$emit('save')"
        class="modal-body p-4 overflow-y-auto d-flex flex-column gap-3">
        <!-- Image Input & Preview -->
        <div class="mb-1">
          <label
            class="form-label small fw-medium admin-event-dashboard-subtitle"
            >Event Image (URL or Upload)</label
          >
          <div class="input-group">
            <input
              v-model="form.image"
              type="text"
              placeholder="Paste image URL or upload file..."
              class="form-control shadow-none admin-event-modal-text-input" />
            <label
              class="btn px-3 d-flex align-items-center mb-0 admin-event-upload-action-btn">
              Upload
              <input
                type="file"
                accept="image/*"
                @change="(e) => $emit('image-upload', e)"
                hidden />
            </label>
          </div>
          <div
            v-if="form.image"
            class="mt-2 rounded-2 overflow-hidden admin-event-modal-img-preview">
            <img
              :src="form.image"
              alt="Preview"
              class="w-100 h-100 object-fit-cover" />
          </div>
        </div>

        <!-- Event Name, Artist Name & Status -->
        <div class="row g-3">
          <div class="col-12 col-md-4">
            <label
              class="form-label small fw-medium admin-event-dashboard-subtitle"
              >Event Name *</label
            >
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="e.g., Neon Noir Symphony"
              class="form-control shadow-none admin-event-modal-text-input" />
          </div>
          <div class="col-12 col-md-4">
            <label
              class="form-label small fw-medium admin-event-dashboard-subtitle"
              >Artist Name *</label
            >
            <input
              v-model="form.artist"
              type="text"
              required
              placeholder="e.g., Nocturne Philharmonic"
              class="form-control shadow-none admin-event-modal-text-input" />
          </div>
          <div class="col-12 col-md-4">
            <label
              class="form-label small fw-medium admin-event-dashboard-subtitle"
              >Event Status *</label
            >
            <select
              v-model="form.status"
              required
              class="form-select shadow-none admin-event-modal-text-input">
              <option
                value="Upcoming"
                class="admin-event-modal-dropdown-option">
                Upcoming
              </option>
              <option value="Live" class="admin-event-modal-dropdown-option">
                Live
              </option>
              <option
                value="Completed"
                class="admin-event-modal-dropdown-option">
                Completed
              </option>
              <option
                value="Cancelled"
                class="admin-event-modal-dropdown-option">
                Cancelled
              </option>
            </select>
          </div>
        </div>

        <!-- Category & Date -->
        <div class="row g-3">
          <div class="col-12 col-md-6">
            <label
              class="form-label small fw-medium admin-event-dashboard-subtitle"
              >Event Category *</label
            >
            <select
              v-model="form.category"
              required
              class="form-select shadow-none admin-event-modal-text-input">
              <option disabled value="" class="admin-event-dashboard-subtitle">
                Select a category
              </option>
              <option
                v-for="cat in categories"
                :key="cat"
                :value="cat"
                class="admin-event-modal-dropdown-option">
                {{ cat }}
              </option>
            </select>
          </div>
          <div class="col-12 col-md-6">
            <label
              class="form-label small fw-medium admin-event-dashboard-subtitle"
              >Date & Time *</label
            >
            <input
              v-model="form.date"
              type="datetime-local"
              required
              class="form-control shadow-none admin-event-modal-text-input" />
          </div>
        </div>

        <!-- Venue Name, Address & Venue Capacity -->
        <div class="row g-3">
          <div class="col-12 col-md-5">
            <label
              class="form-label small fw-medium admin-event-dashboard-subtitle"
              >Venue Name *</label
            >
            <input
              v-model="form.venueName"
              type="text"
              required
              placeholder="e.g., The Palace Pool Club"
              class="form-control shadow-none admin-event-modal-text-input" />
          </div>
          <div class="col-12 col-md-4">
            <label
              class="form-label small fw-medium admin-event-dashboard-subtitle"
              >Location *</label
            >
            <input
              v-model="form.address"
              type="text"
              required
              placeholder="e.g., BGC, Taguig"
              class="form-control shadow-none admin-event-modal-text-input" />
          </div>
          <div class="col-12 col-md-3">
            <label
              class="form-label small fw-medium admin-event-dashboard-subtitle"
              >Venue Capacity *</label
            >
            <input
              v-model.number="form.venueCapacity"
              type="number"
              min="1"
              required
              placeholder="e.g., 500"
              class="form-control shadow-none admin-event-modal-text-input" />
          </div>
        </div>

        <!-- Event & Artist Descriptions -->
        <div class="row g-3">
          <div class="col-12 col-md-6">
            <label
              class="form-label small fw-medium admin-event-dashboard-subtitle"
              >Event Description *</label
            >
            <textarea
              v-model="form.description"
              rows="4"
              required
              placeholder="Show details, doors open time..."
              class="form-control shadow-none admin-event-modal-text-input"></textarea>
          </div>
          <div class="col-12 col-md-6">
            <label
              class="form-label small fw-medium admin-event-dashboard-subtitle"
              >Artist Description</label
            >
            <textarea
              v-model="form.artistDescription"
              rows="4"
              placeholder="Artist bio, genre, notable achievements..."
              class="form-control shadow-none admin-event-modal-text-input"></textarea>
          </div>
        </div>

        <!-- Ticket Tiers & Seat Generator Section -->
        <div class="p-3 rounded-3 admin-event-modal-inner-section">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <label
                class="form-label small fw-medium mb-0 admin-event-dashboard-subtitle"
                >Ticket Tiers, Perks & Allocation *</label
              >
              <div class="small admin-event-dashboard-subtitle">
                Allocated:
                <strong class="admin-event-title-text">{{
                  getTotalSeatsCount(form.tickets)
                }}</strong>
                / {{ form.venueCapacity || 0 }} Capacity
                <span v-if="isOverCapacity" class="text-danger fw-bold ms-1"
                  >(⚠️ Exceeds capacity!)</span
                >
              </div>
            </div>
            <button
              type="button"
              class="btn btn-sm admin-event-add-tier-btn-style"
              @click="$emit('add-tier')">
              + Add Tier
            </button>
          </div>

          <div
            v-for="(ticket, index) in form.tickets"
            :key="index"
            class="p-3 rounded-3 mb-3 admin-event-modal-tier-card">
            <div class="row g-2 align-items-end mb-2">
              <div class="col-12 col-md-3">
                <label
                  class="form-label fs-8 mb-1 admin-event-dashboard-subtitle"
                  >Ticket Type *</label
                >
                <input
                  v-model="ticket.ticketType"
                  type="text"
                  required
                  placeholder="VIP"
                  class="form-control form-control-sm shadow-none admin-event-modal-text-input" />
              </div>
              <div class="col-12 col-md-3">
                <label
                  class="form-label fs-8 mb-1 admin-event-dashboard-subtitle"
                  >Seat Section *</label
                >
                <input
                  v-model="ticket.seatSection"
                  type="text"
                  required
                  placeholder="Orchestra"
                  class="form-control form-control-sm shadow-none admin-event-modal-text-input" />
              </div>
              <div class="col-12 col-md-2">
                <label
                  class="form-label fs-8 mb-1 admin-event-dashboard-subtitle"
                  >Row *</label
                >
                <input
                  v-model="ticket.seatRow"
                  type="text"
                  required
                  placeholder="A"
                  class="form-control form-control-sm shadow-none admin-event-modal-text-input" />
              </div>
              <div class="col-12 col-md-3">
                <label
                  class="form-label fs-8 mb-1 admin-event-dashboard-subtitle"
                  >Price (₱) *</label
                >
                <div class="input-group input-group-sm">
                  <span class="input-group-text admin-event-price-prefix-addon"
                    >₱</span
                  >
                  <input
                    v-model.number="ticket.price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    placeholder="0.00"
                    class="form-control shadow-none admin-event-modal-text-input" />
                </div>
              </div>
              <div class="col-12 col-md-1 text-end">
                <button
                  type="button"
                  class="btn btn-sm w-100 admin-event-tier-remove-btn"
                  @click="$emit('remove-tier', index)"
                  :disabled="form.tickets.length === 1">
                  &times;
                </button>
              </div>
            </div>

            <div class="row g-2 mb-2">
              <div class="col-12 col-md-6">
                <input
                  v-model="ticket.ticketDescription"
                  type="text"
                  placeholder="Description..."
                  class="form-control form-control-sm shadow-none admin-event-modal-text-input" />
              </div>
              <div class="col-12 col-md-6">
                <input
                  v-model="ticket.perksInput"
                  type="text"
                  placeholder="Perks (comma separated)..."
                  class="form-control form-control-sm shadow-none admin-event-modal-text-input"
                  @input="$emit('update-perks', ticket)" />
              </div>
            </div>

            <div
              class="d-flex justify-content-between align-items-center p-2 rounded-2 gap-2 flex-wrap admin-event-modal-generator-bar">
              <div class="d-flex align-items-center gap-2">
                <span class="fs-8 admin-event-dashboard-subtitle"
                  >Generate Qty:</span
                >
                <input
                  v-model.number="ticket.quantity"
                  type="number"
                  min="1"
                  max="500"
                  class="form-control form-control-sm shadow-none admin-event-qty-input-field" />
                <button
                  type="button"
                  class="btn btn-sm fs-8 admin-event-generate-seats-action-btn"
                  @click="$emit('generate-seats', ticket)">
                  Generate Seats
                </button>
              </div>
              <span class="fs-8 admin-event-dashboard-subtitle"
                >Active Seats:
                <strong class="admin-event-title-text">{{
                  ticket.seats.length
                }}</strong></span
              >
            </div>

            <div
              v-if="ticket.seats.length > 0"
              class="d-flex flex-wrap gap-1 mt-2 p-2 rounded-2 admin-event-seats-preview-scroll">
              <button
                v-for="seat in ticket.seats"
                :key="seat.code"
                type="button"
                :class="[
                  'btn btn-xs fw-bold px-2 py-1 fs-9 rounded-1',
                  adminEventGetSeatStatusClass(seat.status),
                ]"
                @click="$emit('cycle-seat', seat)"
                :title="`Seat ${seat.code}`">
                {{ seat.seatNumber }}
              </button>
            </div>
          </div>
        </div>

        <!-- Submit Actions -->
        <div
          class="modal-footer p-3 d-flex justify-content-end gap-2 mt-2 admin-event-custom-modal-footer">
          <button
            type="button"
            class="btn px-3 admin-event-modal-cancel-btn"
            @click="$emit('close')">
            Cancel
          </button>
          <button
            type="submit"
            class="btn fw-semibold px-4 admin-event-publish-action-btn">
            {{ isEditing ? "Save Changes" : "Publish Event" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
