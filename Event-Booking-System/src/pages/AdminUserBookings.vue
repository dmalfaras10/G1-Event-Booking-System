<script setup>
import { ref, computed, watch } from 'vue';
import { mockBookings } from '../data/mockBookings.js';

const bookings = ref(mockBookings);
const bookingStatuses = ['Confirmed', 'Pending', 'Cancelled', 'Refunded'];

const searchQuery = ref('');
const selectedStatus = ref('');
const currentPage = ref(1);
const itemsPerPage = 5;

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

watch(currentPage, () => {
  scrollToTop();
});

const filteredBookings = computed(() => {
  return bookings.value.filter((booking) => {
    const query = searchQuery.value.toLowerCase();
    const matchesSearch =
      booking.fullName.toLowerCase().includes(query) ||
      booking.eventName.toLowerCase().includes(query) ||
      booking.ticketType.toLowerCase().includes(query) ||
      (booking.bookingCode && booking.bookingCode.toLowerCase().includes(query));
    const matchesStatus = selectedStatus.value ? booking.status === selectedStatus.value : true;
    return matchesSearch && matchesStatus;
  });
});

const totalPages = computed(() => Math.ceil(filteredBookings.value.length / itemsPerPage) || 1);

watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal) {
    currentPage.value = Math.max(1, newTotal);
  }
});

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredBookings.value.slice(start, start + itemsPerPage);
});

const handleSearchOrFilterChange = () => {
  currentPage.value = 1;
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedStatus.value = '';
  currentPage.value = 1;
};

const cycleBookingStatus = (booking) => {
  const nextIndex = (bookingStatuses.indexOf(booking.status) + 1) % bookingStatuses.length;
  booking.status = bookingStatuses[nextIndex];
};

const deleteBooking = (id) => {
  bookings.value = bookings.value.filter((b) => b.id !== id);
  if (currentPage.value > totalPages.value) {
    currentPage.value = Math.max(1, totalPages.value);
  }
};

const formatDateTime = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getBookingStatusBadgeClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'confirmed':
      return 'admin-event-badge-upcoming';
    case 'pending':
      return 'admin-event-badge-live';
    case 'cancelled':
    case 'refunded':
      return 'admin-event-badge-cancelled';
    default:
      return 'admin-event-badge-completed';
  }
};

const formatCurrency = (amount) => {
  return Number(amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
</script>

<template>
  <div class="admin-event-dashboard container-fluid py-5 px-3 px-md-4 d-flex flex-column justify-content-between">
    <div>
      <!-- Header -->
      <header class="admin-event-dashboard-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 pb-3 gap-3">
        <div>
          <h1 class="h3 fw-bold mb-1 admin-event-dashboard-title">Event Bookings & Orders</h1>
          <p class="small mb-0 admin-event-dashboard-subtitle">View attendee reservations, ticket tiers, quantities, and payment totals</p>
        </div>
      </header>

      <!-- Filters & Search -->
      <div class="row g-3 mb-4">
        <div class="col-12 col-md-8">
          <div class="input-group admin-event-search-group rounded-3 overflow-hidden">
            <span class="input-group-text bg-transparent border-0 ps-3 admin-event-search-icon-wrap">🔍</span>
            <input
              v-model="searchQuery"
              @input="handleSearchOrFilterChange"
              type="text"
              placeholder="Search by full name, event name, ticket tier, or ref code..."
              class="form-control bg-transparent border-0 shadow-none py-2 px-2 admin-event-search-input"
            />
          </div>
        </div>
        <div class="col-12 col-md-4">
          <select v-model="selectedStatus" @change="handleSearchOrFilterChange" class="form-select py-2 shadow-none admin-event-category-select">
            <option value="">All Statuses</option>
            <option v-for="st in bookingStatuses" :key="st" :value="st">{{ st }}</option>
          </select>
        </div>
      </div>

      <!-- Bookings Table List -->
      <div v-if="filteredBookings.length > 0">
        <div class="card rounded-4 overflow-hidden shadow-lg admin-event-table-container-card mb-3">
          <div class="table-responsive mb-0">
            <table class="table table-hover align-middle mb-0 admin-event-custom-table">
              <thead>
                <tr class="text-uppercase fs-7 admin-event-table-header-tr">
                  <th class="py-3 px-3 ps-4">Full Name</th>
                  <th class="py-3 px-3">Event Name</th>
                  <th class="py-3 px-3">Tickets</th>
                  <th class="py-3 px-3 text-center">Quantity</th>
                  <th class="py-3 px-3">Price</th>
                  <th class="py-3 px-3 pe-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="booking in paginatedBookings" :key="booking.id" class="admin-event-table-body-tr">
                  <!-- Full Name -->
                  <td class="py-3 px-3 ps-4">
                    <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
                      <span class="fw-semibold admin-event-title-text">{{ booking.fullName }}</span>
                      <span :class="['badge fs-8 text-uppercase fw-bold', getBookingStatusBadgeClass(booking.status)]">
                        {{ booking.status }}
                      </span>
                    </div>
                    <div v-if="booking.email" class="small admin-event-dashboard-subtitle">
                      {{ booking.email }}
                    </div>
                    <div v-if="booking.bookingCode" class="fs-8 mt-1 admin-event-capacity-allocated-text">
                      Ref: #{{ booking.bookingCode }}
                    </div>
                  </td>

                  <!-- Event Name -->
                  <td class="py-3 px-3">
                    <div class="fw-medium mb-1 admin-event-title-text">{{ booking.eventName }}</div>
                    <div v-if="booking.eventDate" class="small admin-event-dashboard-subtitle">
                      {{ formatDateTime(booking.eventDate) }}
                    </div>
                  </td>

                  <!-- Tickets -->
                  <td class="py-3 px-3">
                    <div class="p-2 rounded-3 d-flex flex-column gap-1 admin-event-ticket-tier-inner-card">
                      <div class="d-flex justify-content-between align-items-center gap-2">
                        <span class="fw-semibold small admin-event-title-text">{{ booking.ticketType }}</span>
                        <span v-if="booking.seatSection" class="small admin-event-dashboard-subtitle">
                          📍 {{ booking.seatSection }}
                        </span>
                      </div>
                      <div v-if="booking.seatCodes && booking.seatCodes.length" class="d-flex flex-wrap gap-1 mt-1">
                        <span
                          v-for="(code, idx) in booking.seatCodes"
                          :key="idx"
                          class="badge fw-normal fs-8 admin-event-custom-magenta-badge"
                        >
                          {{ code }}
                        </span>
                      </div>
                    </div>
                  </td>

                  <!-- Quantity -->
                  <td class="py-3 px-3 text-center">
                    <span class="fw-bold admin-event-title-text">{{ booking.quantity }}</span>
                    <div class="fs-8 admin-event-dashboard-subtitle">
                      {{ booking.quantity === 1 ? 'ticket' : 'tickets' }}
                    </div>
                  </td>

                  <!-- Price -->
                  <td class="py-3 px-3">
                    <div class="fw-bold admin-event-title-text">
                      ₱{{ formatCurrency(booking.totalPrice ?? booking.unitPrice * booking.quantity) }}
                    </div>
                    <div v-if="booking.unitPrice" class="fs-8 admin-event-dashboard-subtitle">
                      ₱{{ formatCurrency(booking.unitPrice) }} each
                    </div>
                  </td>

                  <!-- Actions -->
                  <td class="py-3 px-3 pe-4 text-center">
                    <div class="d-flex flex-column gap-2 align-items-center mx-auto" style="width: 100px;">
                      <button
                        class="btn btn-sm w-100 py-1 fs-8 admin-event-action-edit-btn"
                        @click="cycleBookingStatus(booking)"
                        title="Cycle booking status"
                      >
                        Toggle Status
                      </button>
                      <button
                        class="btn btn-sm w-100 py-1 fs-8 admin-event-action-delete-btn"
                        @click="deleteBooking(booking.id)"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination Controls -->
        <nav v-if="totalPages > 1" class="d-flex justify-content-between align-items-center px-2 py-3">
          <div class="small admin-event-dashboard-subtitle">
            Showing page <strong class="admin-event-title-text">{{ currentPage }}</strong> of
            <strong class="admin-event-title-text">{{ totalPages }}</strong> ({{ filteredBookings.length }} total bookings)
          </div>
          <ul class="pagination pagination-sm mb-0">
            <li :class="['page-item', { disabled: currentPage === 1 }]">
              <button
                class="page-link admin-event-pagination-btn"
                @click="currentPage--"
                :disabled="currentPage === 1"
              >
                Previous
              </button>
            </li>
            <li
              v-for="page in totalPages"
              :key="page"
              :class="['page-item', { active: page === currentPage }]"
            >
              <button class="page-link admin-event-pagination-btn" @click="currentPage = page">
                {{ page }}
              </button>
            </li>
            <li :class="['page-item', { disabled: currentPage === totalPages }]">
              <button
                class="page-link admin-event-pagination-btn"
                @click="currentPage++"
                :disabled="currentPage === totalPages"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Empty State -->
      <div v-else class="card rounded-4 p-5 text-center admin-event-empty-state-box">
        <div class="fs-1 mb-2">🧾</div>
        <p class="mb-3 admin-event-dashboard-subtitle">No bookings found matching your criteria.</p>
        <button class="btn btn-sm admin-event-reset-filter-btn" @click="resetFilters">Reset Filters</button>
      </div>
    </div>
  </div>
</template>