<script setup>
import { ref, computed, watch } from 'vue';
import { mockEvents, eventCategories } from '../data/mockEvents';

// Import child components
import EventTable from '../components/EventTable.vue';
import EventModal from '../components/EventModal.vue';
import SeatMapModal from '../components/SeatMapModal.vue';
import DeleteConfirmModal from '../components/DeleteConfirmModal.vue';

const getDefaultForm = () => ({
  id: null,
  image: '',
  name: '',
  artist: '',
  category: '',
  description: '',
  date: '',
  status: 'Upcoming',
  venueName: '',
  address: '',
  venueCapacity: 100,
  tickets: [
    {
      ticketType: 'General Admission',
      ticketDescription: 'Standard admission ticket',
      ticketPerks: ['Standard Entry'],
      perksInput: 'Standard Entry',
      price: 1500,
      seatSection: 'Main Hall',
      seatRow: 'A',
      quantity: 16,
      seats: Array.from({ length: 16 }, (_, i) => ({
        seatRow: 'A',
        seatNumber: i + 1,
        code: `A-${i + 1}`,
        status: 'available'
      }))
    }
  ]
});

const categories = ref(eventCategories);
const events = ref(mockEvents);

const searchQuery = ref('');
const selectedCategory = ref('');
const isModalOpen = ref(false);
const isEditing = ref(false);
const eventToDelete = ref(null);
const activeSeatMapEvent = ref(null);

const currentPage = ref(1);
const itemsPerPage = 5;
const form = ref(getDefaultForm());

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

watch(currentPage, () => {
  scrollToTop();
});

const isOverCapacity = computed(() => {
  const cap = Number(form.value.venueCapacity) || 0;
  return cap > 0 && getTotalSeatsCount(form.value.tickets) > cap;
});

const filteredEvents = computed(() => {
  return events.value.filter((event) => {
    const query = searchQuery.value.toLowerCase();
    const matchesSearch =
      event.name.toLowerCase().includes(query) ||
      event.artist.toLowerCase().includes(query) ||
      event.venueName.toLowerCase().includes(query) ||
      event.address.toLowerCase().includes(query);
    const matchesCategory = selectedCategory.value ? event.category === selectedCategory.value : true;
    return matchesSearch && matchesCategory;
  });
});

const totalPages = computed(() => Math.ceil(filteredEvents.value.length / itemsPerPage) || 1);

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredEvents.value.slice(start, start + itemsPerPage);
});

const handleSearchOrFilterChange = () => {
  currentPage.value = 1;
};

const openModal = (event = null) => {
  if (event) {
    isEditing.value = true;
    form.value = JSON.parse(JSON.stringify(event));
  } else {
    isEditing.value = false;
    form.value = getDefaultForm();
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  form.value = getDefaultForm();
};

const saveEvent = () => {
  if (isEditing.value) {
    const index = events.value.findIndex((e) => e.id === form.value.id);
    if (index !== -1) events.value[index] = { ...form.value };
  } else {
    events.value.unshift({ ...form.value, id: Date.now() });
    currentPage.value = 1;
  }
  closeModal();
};

const deleteEvent = () => {
  if (eventToDelete.value) {
    events.value = events.value.filter((e) => e.id !== eventToDelete.value.id);
    eventToDelete.value = null;
    if (currentPage.value > totalPages.value) {
      currentPage.value = Math.max(1, totalPages.value);
    }
  }
};

const addTicketTier = () => {
  const rowName = String.fromCharCode(65 + form.value.tickets.length);
  form.value.tickets.push({
    ticketType: '',
    seatSection: 'Section ' + rowName,
    seatRow: rowName,
    price: 0,
    quantity: 12,
    seats: Array.from({ length: 12 }, (_, i) => ({
      seatRow: rowName,
      seatNumber: i + 1,
      code: `${rowName}-${i + 1}`,
      status: 'available'
    }))
  });
};

const removeTicketTier = (index) => {
  if (form.value.tickets.length > 1) form.value.tickets.splice(index, 1);
};

const generateSeatsForTier = (ticket) => {
  const count = Math.max(1, Math.min(500, Number(ticket.quantity) || 1));
  const row = (ticket.seatRow || 'A').trim().toUpperCase();
  ticket.seats = Array.from({ length: count }, (_, i) => ({
    seatRow: row,
    seatNumber: i + 1,
    code: `${row}-${i + 1}`,
    status: 'available'
  }));
};

const cycleSeatStatus = (seat) => {
  const order = ['available', 'hold', 'sold', 'blocked'];
  seat.status = order[(order.indexOf(seat.status) + 1) % order.length];
};

const getTotalSeatsCount = (tickets) => tickets ? tickets.reduce((sum, t) => sum + (t.seats ? t.seats.length : 0), 0) : 0;
</script>

<template>
  <div class="admin-event-dashboard container-fluid py-5 px-3 px-md-4 d-flex flex-column justify-content-between">
    <div>
      <!-- Header -->
      <header class="admin-event-dashboard-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 pb-3 gap-3">
        <div>
          <h1 class="h3 fw-bold mb-1 admin-event-dashboard-title">Event Ticketing & Seat Allocation</h1>
          <p class="small mb-0 admin-event-dashboard-subtitle">Manage events, venues, ticket tiers, and real-time seat statuses</p>
        </div>
        <button class="btn fw-semibold px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm border-0 admin-event-create-btn" @click="openModal()">
          <span class="fs-5 lh-1">+</span> Create Event
        </button>
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
              placeholder="Search by event name, artist, venue..."
              class="form-control bg-transparent border-0 shadow-none py-2 px-2 admin-event-search-input"
            />
          </div>
        </div>
        <div class="col-12 col-md-4">
          <select v-model="selectedCategory" @change="handleSearchOrFilterChange" class="form-select py-2 shadow-none admin-event-category-select">
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
      </div>

      <!-- Event Table Component -->
      <EventTable
        v-if="paginatedEvents.length > 0"
        :events="paginatedEvents"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="(p) => currentPage = p"
        @open-seat-map="(ev) => activeSeatMapEvent = ev"
        @edit-event="(ev) => openModal(ev)"
        @confirm-delete="(ev) => eventToDelete = ev"
      />

      <!-- Empty State -->
      <div v-else class="card rounded-4 p-5 text-center admin-event-empty-state-box">
        <div class="fs-1 mb-2">🎟️</div>
        <p class="mb-3 admin-event-dashboard-subtitle">No events found matching your criteria.</p>
        <button class="btn btn-sm admin-event-reset-filter-btn" @click="searchQuery = ''; selectedCategory = ''; currentPage = 1;">Reset Filters</button>
      </div>
    </div>

    <!-- Modals -->
    <EventModal
      :is-open="isModalOpen"
      :is-editing="isEditing"
      :form="form"
      :categories="categories"
      :is-over-capacity="isOverCapacity"
      @close="closeModal"
      @save="saveEvent"
      @add-tier="addTicketTier"
      @remove-tier="removeTicketTier"
      @generate-seats="generateSeatsForTier"
      @cycle-seat="cycleSeatStatus"
    />

    <SeatMapModal
      :event="activeSeatMapEvent"
      @close="activeSeatMapEvent = null"
      @cycle-seat="cycleSeatStatus"
    />

    <DeleteConfirmModal
      :event="eventToDelete"
      @close="eventToDelete = null"
      @confirm="deleteEvent"
    />
  </div>
</template>

