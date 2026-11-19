<script setup>
defineProps({
  events: { type: Array, required: true },
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  filteredEventsLength: { type: Number, required: true },
});

defineEmits([
  "page-change",
  "open-seat-map",
  "edit-event",
  "confirm-delete",
  "reset-filters",
]);

const truncateText = (text, length) =>
  !text ? "" : text.length > length ? text.substring(0, length) + "..." : text;
const formatDateOnly = (dateString) =>
  !dateString
    ? ""
    : new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
const formatTimeOnly = (dateString) =>
  !dateString
    ? ""
    : new Date(dateString).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

const getStatusBadgeClass = (status) => {
  switch (status?.toLowerCase()) {
    case "upcoming":
      return "admin-event-badge-upcoming";
    case "live":
      return "admin-event-badge-live";
    case "completed":
      return "admin-event-badge-completed";
    case "cancelled":
      return "admin-event-badge-cancelled";
    default:
      return "admin-event-badge-completed";
  }
};

const countAvailableSeats = (seats) =>
  seats ? seats.filter((s) => s.status === "available").length : 0;
const getTotalSeatsCount = (tickets) =>
  tickets
    ? tickets.reduce((sum, t) => sum + (t.seats ? t.seats.length : 0), 0)
    : 0;

const getEventSeatStats = (event) => {
  let available = 0,
    hold = 0,
    sold = 0;
  event.tickets.forEach((t) =>
    t.seats.forEach((s) => {
      if (s.status === "available") available++;
      else if (s.status === "hold") hold++;
      else if (s.status === "sold") sold++;
    }),
  );
  return { available, hold, sold };
};
</script>

<template>
  <div>
    <!-- Event Table List (Read) -->
    <div v-if="events.length > 0">
      <div
        class="card rounded-4 overflow-hidden shadow-lg admin-event-table-container-card mb-3">
        <div class="table-responsive mb-0">
          <table
            class="table table-hover align-middle mb-0 admin-event-custom-table">
            <thead>
              <tr class="text-uppercase fs-7 admin-event-table-header-tr">
                <th class="py-3 px-3 ps-4">Event & Status</th>
                <th class="py-3 px-3">Artist & Category</th>
                <th class="py-3 px-3">Date & Time</th>
                <th class="py-3 px-3">Venue, Location & Capacity</th>
                <th class="py-3 px-3">Ticket Tiers, Perks & Inventory</th>
                <th class="py-3 px-3 pe-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="event in events"
                :key="event.id"
                class="admin-event-table-body-tr">
                <!-- Event Image, Name, Status & Description -->
                <td class="py-3 px-3 ps-4">
                  <div class="d-flex align-items-start gap-3">
                    <img
                      :src="
                        event.image ||
                        'https://placehold.co/120x120/1c1c1f/f3c64f?text=Event'
                      "
                      :alt="event.name"
                      class="rounded-2 object-fit-cover admin-event-thumbnail" />
                    <div>
                      <div
                        class="d-flex align-items-center gap-2 flex-wrap mb-1">
                        <span class="fw-semibold admin-event-title-text">{{
                          event.name
                        }}</span>
                        <span
                          :class="[
                            'badge fs-8 text-uppercase fw-bold',
                            getStatusBadgeClass(event.status),
                          ]">
                          {{ event.status }}
                        </span>
                      </div>
                      <p
                        class="small mb-0 text-truncate-2 lh-sm admin-event-desc-text"
                        :title="event.description">
                        {{ truncateText(event.description, 45) }}
                      </p>
                    </div>
                  </div>
                </td>

                <!-- Artist & Category -->
                <td class="py-3 px-3">
                  <div class="fw-medium mb-1 admin-event-title-text">
                    {{ event.artist }}
                  </div>
                  <span
                    class="badge fw-normal small px-2 py-1 mb-1 admin-event-category-badge-style">
                    {{ event.category }}
                  </span>
                  <p
                    v-if="event.artistDescription"
                    class="small mb-0 text-truncate-2 lh-sm admin-event-desc-text"
                    :title="event.artistDescription">
                    {{ truncateText(event.artistDescription, 45) }}
                  </p>
                </td>

                <!-- Date -->
                <td class="py-3 px-3">
                  <div class="fw-medium admin-event-title-text">
                    {{ formatDateOnly(event.date) }}
                  </div>
                  <div class="small admin-event-dashboard-subtitle">
                    {{ formatTimeOnly(event.date) }}
                  </div>
                </td>

                <!-- Venue, Location & Capacity -->
                <td class="py-3 px-3">
                  <div class="fw-medium admin-event-title-text">
                    {{ event.venueName }}
                  </div>
                  <div
                    class="small text-truncate admin-event-venue-address-text">
                    {{ event.address }}
                  </div>
                  <div class="small mt-1 pt-1 admin-event-capacity-footer-box">
                    Capacity:
                    <strong class="admin-event-title-text">{{
                      event.venueCapacity || 0
                    }}</strong>
                    <span
                      class="fw-medium ms-1 admin-event-capacity-allocated-text"
                      >({{ getTotalSeatsCount(event.tickets) }} allocated)</span
                    >
                  </div>
                </td>

                <!-- Tickets, Perks & Seat Summary -->
                <td class="py-3 px-3">
                  <div class="d-flex flex-column gap-2 mb-2">
                    <div
                      v-for="(ticket, idx) in event.tickets"
                      :key="idx"
                      class="p-2 rounded-3 d-flex flex-column gap-1 admin-event-ticket-tier-inner-card">
                      <div
                        class="d-flex justify-content-between align-items-center">
                        <span
                          class="fw-semibold small admin-event-title-text"
                          >{{ ticket.ticketType }}</span
                        >
                        <span class="small admin-event-dashboard-subtitle"
                          >📍 {{ ticket.seatSection }} (Row
                          {{ ticket.seatRow }})</span
                        >
                      </div>
                      <div
                        v-if="
                          ticket.ticketDescription ||
                          (ticket.ticketPerks && ticket.ticketPerks.length)
                        "
                        class="small admin-event-dashboard-subtitle">
                        <p
                          v-if="ticket.ticketDescription"
                          class="mb-1 fst-italic lh-sm">
                          {{ ticket.ticketDescription }}
                        </p>
                        <div
                          v-if="ticket.ticketPerks && ticket.ticketPerks.length"
                          class="d-flex flex-wrap gap-1">
                          <span
                            v-for="(perk, pIdx) in ticket.ticketPerks"
                            :key="pIdx"
                            class="badge fw-normal small admin-event-custom-magenta-badge">
                            ✨ {{ perk }}
                          </span>
                        </div>
                      </div>
                      <div
                        class="d-flex justify-content-between align-items-center pt-1 small mt-1 admin-event-ticket-card-bottom-border">
                        <strong class="admin-event-title-text"
                          >₱{{
                            Number(ticket.price).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          }}</strong
                        >
                        <span class="fs-8 admin-event-dashboard-subtitle"
                          >{{ countAvailableSeats(ticket.seats) }}/{{
                            ticket.seats.length
                          }}
                          avail</span
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    class="small d-flex align-items-center gap-2 flex-wrap admin-event-dashboard-subtitle">
                    <span class="admin-event-stat-available fw-medium"
                      >{{ getEventSeatStats(event).available }} Avail</span
                    >
                    •
                    <span class="fw-medium admin-event-capacity-allocated-text"
                      >{{ getEventSeatStats(event).hold }} Hold</span
                    >
                    •
                    <span class="admin-event-stat-sold fw-medium"
                      >{{ getEventSeatStats(event).sold }} Sold</span
                    >
                  </div>
                </td>

                <!-- CRUD & Seat Map Actions -->
                <td class="py-3 px-3 pe-4 text-center">
                  <div
                    class="d-flex flex-column gap-2 align-items-center mx-auto"
                    style="width: 100px">
                    <button
                      class="btn btn-sm w-100 py-1 fs-8 admin-event-action-seatmap-btn"
                      @click="$emit('open-seat-map', event)">
                      Seat Map
                    </button>
                    <button
                      class="btn btn-sm w-100 py-1 fs-8 admin-event-action-edit-btn"
                      @click="$emit('edit-event', event)">
                      Edit
                    </button>
                    <button
                      class="btn btn-sm w-100 py-1 fs-8 admin-event-action-delete-btn"
                      @click="$emit('confirm-delete', event)">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination Controls -->
      <nav
        v-if="totalPages > 1"
        class="d-flex justify-content-between align-items-center px-2 py-3">
        <div class="small admin-event-dashboard-subtitle">
          Showing page
          <strong class="admin-event-title-text">{{ currentPage }}</strong> of
          <strong class="admin-event-title-text">{{ totalPages }}</strong> ({{
            filteredEventsLength
          }}
          total events)
        </div>
        <ul class="pagination pagination-sm mb-0">
          <li :class="['page-item', { disabled: currentPage === 1 }]">
            <button
              class="page-link admin-event-pagination-btn"
              @click="$emit('page-change', currentPage - 1)"
              :disabled="currentPage === 1">
              Previous
            </button>
          </li>
          <li
            v-for="page in totalPages"
            :key="page"
            :class="['page-item', { active: page === currentPage }]">
            <button
              class="page-link admin-event-pagination-btn"
              @click="$emit('page-change', page)">
              {{ page }}
            </button>
          </li>
          <li :class="['page-item', { disabled: currentPage === totalPages }]">
            <button
              class="page-link admin-event-pagination-btn"
              @click="$emit('page-change', currentPage + 1)"
              :disabled="currentPage === totalPages">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="card rounded-4 p-5 text-center admin-event-empty-state-box">
      <div class="fs-1 mb-2">🎟️</div>
      <p class="mb-3 admin-event-dashboard-subtitle">
        No events found matching your criteria.
      </p>
      <button
        class="btn btn-sm admin-event-reset-filter-btn"
        @click="$emit('reset-filters')">
        Reset Filters
      </button>
    </div>
  </div>
</template>
