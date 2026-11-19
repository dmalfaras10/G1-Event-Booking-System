<script setup>
import { ref, computed, watch } from "vue";
import {
  mockSubscriptionPlans,
  mockUserSubscriptions,
  planStatuses,
  userSubscriptionStatuses,
} from "../data/mockSubscriptions.js";

// --- ACTIVE TAB ('plans' = SUBSCRIPTION_PLAN | 'subscribers' = USER_SUBSCRIPTIONS) ---
const activeTab = ref("plans");

// --- REACTIVE DATA ---
const plans = ref(mockSubscriptionPlans);
const userSubscriptions = ref(mockUserSubscriptions);

// --- SEARCH, FILTER & PAGINATION STATE ---
const searchQuery = ref("");
const selectedStatus = ref("");
const selectedPlanFilter = ref("");
const currentPage = ref(1);
const itemsPerPage = 5;

// --- MODAL STATES ---
const isPlanModalOpen = ref(false);
const isEditingPlan = ref(false);
const planToDelete = ref(null);
const subscriberToDelete = ref(null);

// --- DEFAULT FORM FOR SUBSCRIPTION_PLAN ---
const getDefaultPlanForm = () => ({
  _id: null,
  user_id: "admin-001",
  adminName: "System Admin",
  subscriptionType: "",
  subscriptionPrice: 999,
  subscriptionPerks: "",
  subscriptionStatus: "Active",
  createdAt: "",
  updatedAt: "",
});

const planForm = ref(getDefaultPlanForm());

// --- SCROLL & TAB WATCHERS ---
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

watch(currentPage, () => {
  scrollToTop();
});

const switchTab = (tab) => {
  activeTab.value = tab;
  resetFilters();
};

const handleSearchOrFilterChange = () => {
  currentPage.value = 1;
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedStatus.value = "";
  selectedPlanFilter.value = "";
  currentPage.value = 1;
};

// --- COMPUTED: SUBSCRIPTION_PLAN FILTERING & PAGINATION ---
const filteredPlans = computed(() => {
  return plans.value.filter((plan) => {
    const query = searchQuery.value.toLowerCase();
    const matchesSearch =
      plan.subscriptionType.toLowerCase().includes(query) ||
      (plan.subscriptionPerks &&
        plan.subscriptionPerks.toLowerCase().includes(query)) ||
      (plan.adminName && plan.adminName.toLowerCase().includes(query)) ||
      plan._id.toLowerCase().includes(query);
    const matchesStatus = selectedStatus.value
      ? plan.subscriptionStatus === selectedStatus.value
      : true;
    return matchesSearch && matchesStatus;
  });
});

// --- COMPUTED: USER_SUBSCRIPTIONS FILTERING & PAGINATION ---
const filteredUserSubscriptions = computed(() => {
  return userSubscriptions.value.filter((sub) => {
    const query = searchQuery.value.toLowerCase();
    const matchesSearch =
      sub.fullName.toLowerCase().includes(query) ||
      sub.email.toLowerCase().includes(query) ||
      sub.subscriptionType.toLowerCase().includes(query) ||
      (sub.transactionRef &&
        sub.transactionRef.toLowerCase().includes(query)) ||
      sub._id.toLowerCase().includes(query);
    const matchesStatus = selectedStatus.value
      ? sub.subscriptionStatus === selectedStatus.value
      : true;
    const matchesPlan = selectedPlanFilter.value
      ? sub.subscriptionPlan_id === selectedPlanFilter.value
      : true;
    return matchesSearch && matchesStatus && matchesPlan;
  });
});

const totalPages = computed(() => {
  const totalItems =
    activeTab.value === "plans"
      ? filteredPlans.value.length
      : filteredUserSubscriptions.value.length;
  return Math.ceil(totalItems / itemsPerPage) || 1;
});

watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal) {
    currentPage.value = Math.max(1, newTotal);
  }
});

const paginatedPlans = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredPlans.value.slice(start, start + itemsPerPage);
});

const paginatedUserSubscriptions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredUserSubscriptions.value.slice(start, start + itemsPerPage);
});

// --- SUBSCRIPTION_PLAN CRUD ACTIONS ---
const openPlanModal = (plan = null) => {
  if (plan) {
    isEditingPlan.value = true;
    planForm.value = JSON.parse(JSON.stringify(plan));
  } else {
    isEditingPlan.value = false;
    planForm.value = getDefaultPlanForm();
  }
  isPlanModalOpen.value = true;
};

const closePlanModal = () => {
  isPlanModalOpen.value = false;
  planForm.value = getDefaultPlanForm();
};

const savePlan = () => {
  if (!planForm.value.subscriptionType.trim()) return;
  const nowIso = new Date().toISOString();

  if (isEditingPlan.value) {
    const idx = plans.value.findIndex((p) => p._id === planForm.value._id);
    if (idx !== -1) {
      plans.value[idx] = {
        ...planForm.value,
        subscriptionPrice: Number(planForm.value.subscriptionPrice) || 0,
        updatedAt: nowIso,
      };
      // Sync updated tier name/price to linked user subscriptions
      userSubscriptions.value.forEach((sub) => {
        if (sub.subscriptionPlan_id === planForm.value._id) {
          sub.subscriptionType = planForm.value.subscriptionType;
          sub.subscriptionPrice = Number(planForm.value.subscriptionPrice) || 0;
        }
      });
    }
  } else {
    plans.value.unshift({
      ...planForm.value,
      _id: `plan-${Date.now().toString().slice(-4)}`,
      subscriptionPrice: Number(planForm.value.subscriptionPrice) || 0,
      createdAt: nowIso,
      updatedAt: nowIso,
    });
    currentPage.value = 1;
  }
  closePlanModal();
};

const cyclePlanStatus = (plan) => {
  const nextIndex =
    (planStatuses.indexOf(plan.subscriptionStatus) + 1) % planStatuses.length;
  plan.subscriptionStatus = planStatuses[nextIndex];
  plan.updatedAt = new Date().toISOString();
};

const confirmDeletePlan = () => {
  if (planToDelete.value) {
    plans.value = plans.value.filter((p) => p._id !== planToDelete.value._id);
    planToDelete.value = null;
  }
};

// --- USER_SUBSCRIPTIONS ACTIONS (TOGGLE STATUS & REMOVE ONLY) ---
const cycleUserSubStatus = (sub) => {
  const nextIndex =
    (userSubscriptionStatuses.indexOf(sub.subscriptionStatus) + 1) %
    userSubscriptionStatuses.length;
  sub.subscriptionStatus = userSubscriptionStatuses[nextIndex];
  sub.updatedAt = new Date().toISOString();
};

const confirmDeleteSubscriber = () => {
  if (subscriberToDelete.value) {
    userSubscriptions.value = userSubscriptions.value.filter(
      (s) => s._id !== subscriberToDelete.value._id,
    );
    subscriberToDelete.value = null;
  }
};

// --- FORMATTERS & HELPERS ---
const parsePerksList = (perksStr) => {
  if (!perksStr) return [];
  return perksStr
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
};

const getActiveSubscribersCount = (planId) => {
  return userSubscriptions.value.filter(
    (s) =>
      s.subscriptionPlan_id === planId && s.subscriptionStatus === "Active",
  ).length;
};

const formatDateTime = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatCurrency = (amount) => {
  return Number(amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getStatusBadgeClass = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "admin-event-badge-upcoming";
    case "pending":
    case "inactive":
      return "admin-event-badge-live";
    case "cancelled":
    case "expired":
    case "archived":
      return "admin-event-badge-cancelled";
    default:
      return "admin-event-badge-completed";
  }
};
</script>

<template>
  <div
    class="admin-event-dashboard container-fluid py-5 px-3 px-md-4 d-flex flex-column justify-content-between">
    <div>
      <!-- Header -->
      <header
        class="admin-event-dashboard-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 pb-3 gap-3">
        <div>
          <h1 class="h3 fw-bold mb-1 admin-event-dashboard-title">
            Membership Plans &amp; User Subscriptions
          </h1>
          <p class="small mb-0 admin-event-dashboard-subtitle">
            Manage subscription tiers and monitor member enrollments
          </p>
        </div>

        <button
          v-if="activeTab === 'plans'"
          class="btn fw-semibold px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm border-0 admin-event-create-btn"
          @click="openPlanModal()">
          <span class="fs-5 lh-1">+</span> Create Membership Plan
        </button>
      </header>

      <!-- Entity Switcher Tabs (SUBSCRIPTION_PLAN vs USER_SUBSCRIPTIONS) -->
      <div class="d-flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          class="btn btn-sm px-3 py-2 fw-semibold rounded-3"
          :class="
            activeTab === 'plans'
              ? 'admin-event-create-btn'
              : 'admin-event-action-edit-btn'
          "
          @click="switchTab('plans')">
          💎 Membership Plans ({{ plans.length }})
        </button>
        <button
          type="button"
          class="btn btn-sm px-3 py-2 fw-semibold rounded-3"
          :class="
            activeTab === 'subscribers'
              ? 'admin-event-create-btn'
              : 'admin-event-action-edit-btn'
          "
          @click="switchTab('subscribers')">
          👥 User Subscriptions ({{ userSubscriptions.length }})
        </button>
      </div>

      <!-- Filters & Search -->
      <div class="row g-3 mb-4">
        <div
          :class="
            activeTab === 'subscribers' ? 'col-12 col-md-6' : 'col-12 col-md-8'
          ">
          <div
            class="input-group admin-event-search-group rounded-3 overflow-hidden">
            <span
              class="input-group-text bg-transparent border-0 ps-3 admin-event-search-icon-wrap"
              >🔍</span
            >
            <input
              v-model="searchQuery"
              @input="handleSearchOrFilterChange"
              type="text"
              :placeholder="
                activeTab === 'plans'
                  ? 'Search by plan tier name, included perks, admin, or ID...'
                  : 'Search by customer name, email, plan tier, or transaction ref...'
              "
              class="form-control bg-transparent border-0 shadow-none py-2 px-2 admin-event-search-input" />
          </div>
        </div>

        <!-- Plan Filter when viewing User Subscriptions -->
        <div
          v-if="activeTab === 'subscribers'"
          class="col-12 col-sm-6 col-md-3">
          <select
            v-model="selectedPlanFilter"
            @change="handleSearchOrFilterChange"
            class="form-select py-2 shadow-none admin-event-category-select">
            <option value="">All Plan Tiers</option>
            <option v-for="pl in plans" :key="pl._id" :value="pl._id">
              {{ pl.subscriptionType }}
            </option>
          </select>
        </div>

        <!-- Status Filter -->
        <div
          :class="
            activeTab === 'subscribers'
              ? 'col-12 col-sm-6 col-md-3'
              : 'col-12 col-md-4'
          ">
          <select
            v-model="selectedStatus"
            @change="handleSearchOrFilterChange"
            class="form-select py-2 shadow-none admin-event-category-select">
            <option value="">All Statuses</option>
            <option
              v-for="st in activeTab === 'plans'
                ? planStatuses
                : userSubscriptionStatuses"
              :key="st"
              :value="st">
              {{ st }}
            </option>
          </select>
        </div>
      </div>

      <!-- TAB 1: SUBSCRIPTION_PLAN TABLE -->
      <div v-if="activeTab === 'plans'">
        <div v-if="filteredPlans.length > 0">
          <div
            class="card rounded-4 overflow-hidden shadow-lg admin-event-table-container-card mb-3">
            <div class="table-responsive mb-0">
              <table
                class="table table-hover align-middle mb-0 admin-event-custom-table">
                <thead>
                  <tr class="text-uppercase fs-7 admin-event-table-header-tr">
                    <th class="py-3 px-3 ps-4">Plan Tier</th>
                    <th class="py-3 px-3">Price</th>
                    <th class="py-3 px-3">Included Perks</th>
                    <th class="py-3 px-3 text-center">Active Members</th>
                    <th class="py-3 px-3">Managed By</th>
                    <th class="py-3 px-3 pe-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="plan in paginatedPlans"
                    :key="plan._id"
                    class="admin-event-table-body-tr">
                    <!-- Plan Tier & Status -->
                    <td class="py-3 px-3 ps-4">
                      <div
                        class="d-flex align-items-center gap-2 flex-wrap mb-1">
                        <span class="fw-bold admin-event-title-text">{{
                          plan.subscriptionType
                        }}</span>
                        <span
                          :class="[
                            'badge fs-8 text-uppercase fw-bold',
                            getStatusBadgeClass(plan.subscriptionStatus),
                          ]">
                          {{ plan.subscriptionStatus }}
                        </span>
                      </div>
                      <div class="fs-8 admin-event-capacity-allocated-text">
                        ID: #{{ plan._id }}
                      </div>
                    </td>

                    <!-- Price -->
                    <td class="py-3 px-3">
                      <div class="fw-bold admin-event-title-text">
                        ₱{{ formatCurrency(plan.subscriptionPrice) }}
                      </div>
                      <div class="fs-8 admin-event-dashboard-subtitle">
                        per year
                      </div>
                    </td>

                    <!-- Included Perks -->
                    <td class="py-3 px-3 admin-perks-cell">
                      <div
                        class="p-2 rounded-3 d-flex flex-wrap gap-1 admin-event-ticket-tier-inner-card">
                        <span
                          v-for="(perk, idx) in parsePerksList(
                            plan.subscriptionPerks,
                          )"
                          :key="idx"
                          class="badge fw-normal fs-8 admin-event-custom-magenta-badge">
                          {{ perk }}
                        </span>
                      </div>
                    </td>

                    <!-- Active Subscribers Count -->
                    <td class="py-3 px-3 text-center">
                      <span class="fw-bold admin-event-title-text">
                        {{ getActiveSubscribersCount(plan._id) }}
                      </span>
                      <div class="fs-8 admin-event-dashboard-subtitle">
                        active users
                      </div>
                    </td>

                    <!-- Managing Admin -->
                    <td class="py-3 px-3">
                      <div class="fw-medium small admin-event-title-text">
                        {{ plan.adminName || "System Admin" }}
                      </div>
                      <div class="fs-8 admin-event-dashboard-subtitle">
                        Updated {{ formatDateTime(plan.updatedAt) }}
                      </div>
                    </td>

                    <!-- Actions -->
                    <td class="py-3 px-3 pe-4 text-center">
                      <div
                        class="d-flex flex-column gap-2 align-items-center mx-auto admin-action-col-width">
                        <button
                          class="btn btn-sm w-100 py-1 fs-8 admin-event-action-edit-btn"
                          @click="openPlanModal(plan)">
                          Edit Plan
                        </button>
                        <button
                          class="btn btn-sm w-100 py-1 fs-8 admin-event-action-edit-btn"
                          @click="cyclePlanStatus(plan)"
                          title="Cycle plan availability status">
                          Toggle Status
                        </button>
                        <button
                          class="btn btn-sm w-100 py-1 fs-8 admin-event-action-delete-btn"
                          @click="planToDelete = plan">
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Empty State for Plans -->
        <div
          v-else
          class="card rounded-4 p-5 text-center admin-event-empty-state-box">
          <div class="fs-1 mb-2">💎</div>
          <p class="mb-3 admin-event-dashboard-subtitle">
            No membership plans found matching your criteria.
          </p>
          <button
            class="btn btn-sm admin-event-reset-filter-btn"
            @click="resetFilters">
            Reset Filters
          </button>
        </div>
      </div>

      <!-- TAB 2: USER_SUBSCRIPTIONS TABLE (TOGGLE STATUS & REMOVE ONLY)   -->
      <div v-else>
        <div v-if="filteredUserSubscriptions.length > 0">
          <div
            class="card rounded-4 overflow-hidden shadow-lg admin-event-table-container-card mb-3">
            <div class="table-responsive mb-0">
              <table
                class="table table-hover align-middle mb-0 admin-event-custom-table">
                <thead>
                  <tr class="text-uppercase fs-7 admin-event-table-header-tr">
                    <th class="py-3 px-3 ps-4">Subscriber</th>
                    <th class="py-3 px-3">Membership Plan</th>
                    <th class="py-3 px-3">Validity Period</th>
                    <th class="py-3 px-3">Payment &amp; Price</th>
                    <th class="py-3 px-3 pe-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="sub in paginatedUserSubscriptions"
                    :key="sub._id"
                    class="admin-event-table-body-tr">
                    <!-- Subscriber Details -->
                    <td class="py-3 px-3 ps-4">
                      <div
                        class="d-flex align-items-center gap-2 flex-wrap mb-1">
                        <span class="fw-semibold admin-event-title-text">{{
                          sub.fullName
                        }}</span>
                        <span
                          :class="[
                            'badge fs-8 text-uppercase fw-bold',
                            getStatusBadgeClass(sub.subscriptionStatus),
                          ]">
                          {{ sub.subscriptionStatus }}
                        </span>
                      </div>
                      <div class="small admin-event-dashboard-subtitle">
                        {{ sub.email }}
                      </div>
                      <div
                        class="fs-8 mt-1 admin-event-capacity-allocated-text">
                        Sub ID: #{{ sub._id }} &bull; User: {{ sub.user_id }}
                      </div>
                    </td>

                    <!-- Plan Tier -->
                    <td class="py-3 px-3">
                      <div
                        class="p-2 rounded-3 d-inline-flex flex-column gap-1 admin-event-ticket-tier-inner-card">
                        <span class="fw-bold small admin-event-title-text">
                          {{ sub.subscriptionType }} Tier
                        </span>
                        <span class="fs-8 admin-event-dashboard-subtitle">
                          Plan FK: {{ sub.subscriptionPlan_id }}
                        </span>
                      </div>
                    </td>

                    <!-- Start & End Date -->
                    <td class="py-3 px-3">
                      <div class="small admin-event-title-text">
                        <strong>Start:</strong>
                        {{ formatDateTime(sub.startDate) }}
                      </div>
                      <div class="small admin-event-dashboard-subtitle">
                        <strong>Ends:</strong> {{ formatDateTime(sub.endDate) }}
                      </div>
                    </td>

                    <!-- Payment & Price -->
                    <td class="py-3 px-3">
                      <div class="fw-bold admin-event-title-text">
                        ₱{{ formatCurrency(sub.subscriptionPrice) }}
                      </div>
                      <div class="fs-8 admin-event-dashboard-subtitle">
                        {{ sub.paymentMethod }} &bull; {{ sub.transactionRef }}
                      </div>
                    </td>

                    <!-- Actions: Toggle Status & Remove Only -->
                    <td class="py-3 px-3 pe-4 text-center">
                      <div
                        class="d-flex flex-column gap-2 align-items-center mx-auto admin-subscriber-action-col-width">
                        <button
                          class="btn btn-sm w-100 py-1 fs-8 admin-event-action-edit-btn"
                          @click="cycleUserSubStatus(sub)"
                          title="Cycle user subscription status">
                          Toggle Status
                        </button>
                        <button
                          class="btn btn-sm w-100 py-1 fs-8 admin-event-action-delete-btn"
                          @click="subscriberToDelete = sub">
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Empty State for User Subscriptions -->
        <div
          v-else
          class="card rounded-4 p-5 text-center admin-event-empty-state-box">
          <div class="fs-1 mb-2">👥</div>
          <p class="mb-3 admin-event-dashboard-subtitle">
            No user subscriptions found matching your criteria.
          </p>
          <button
            class="btn btn-sm admin-event-reset-filter-btn"
            @click="resetFilters">
            Reset Filters
          </button>
        </div>
      </div>

      <!-- Pagination Controls -->
      <nav
        v-if="totalPages > 1"
        class="d-flex justify-content-between align-items-center px-2 py-3">
        <div class="small admin-event-dashboard-subtitle">
          Showing page
          <strong class="admin-event-title-text">{{ currentPage }}</strong> of
          <strong class="admin-event-title-text">{{ totalPages }}</strong>
          ({{
            activeTab === "plans"
              ? filteredPlans.length
              : filteredUserSubscriptions.length
          }}
          total records)
        </div>
        <ul class="pagination pagination-sm mb-0">
          <li :class="['page-item', { disabled: currentPage === 1 }]">
            <button
              class="page-link admin-event-pagination-btn"
              @click="currentPage--"
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
              @click="currentPage = page">
              {{ page }}
            </button>
          </li>
          <li :class="['page-item', { disabled: currentPage === totalPages }]">
            <button
              class="page-link admin-event-pagination-btn"
              @click="currentPage++"
              :disabled="currentPage === totalPages">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- MODAL 1: CREATE / EDIT SUBSCRIPTION_PLAN -->
    <div
      v-if="isPlanModalOpen"
      class="admin-modal-backdrop"
      @click.self="closePlanModal">
      <div class="card rounded-4 p-4 shadow-lg admin-modal-card">
        <div
          class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-25">
          <h5 class="fw-bold mb-0 admin-event-title-text">
            {{
              isEditingPlan ? "Edit Membership Plan" : "Create Membership Plan"
            }}
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="closePlanModal"></button>
        </div>

        <form @submit.prevent="savePlan">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label small admin-event-dashboard-subtitle">
                Tier Name (subscriptionType) *
              </label>
              <input
                v-model="planForm.subscriptionType"
                type="text"
                class="form-control admin-event-category-select"
                placeholder="e.g., Bronze, Silver, Gold"
                required />
            </div>

            <div class="col-md-6">
              <label class="form-label small admin-event-dashboard-subtitle">
                Plan Price (subscriptionPrice in ₱) *
              </label>
              <input
                v-model.number="planForm.subscriptionPrice"
                type="number"
                min="0"
                step="0.01"
                class="form-control admin-event-category-select"
                required />
            </div>

            <div class="col-md-6">
              <label class="form-label small admin-event-dashboard-subtitle">
                Availability Status (subscriptionStatus)
              </label>
              <select
                v-model="planForm.subscriptionStatus"
                class="form-select admin-event-category-select">
                <option v-for="st in planStatuses" :key="st" :value="st">
                  {{ st }}
                </option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label small admin-event-dashboard-subtitle">
                Managing Admin
              </label>
              <input
                v-model="planForm.adminName"
                type="text"
                class="form-control admin-event-category-select"
                placeholder="Admin Name" />
            </div>

            <div class="col-12">
              <label class="form-label small admin-event-dashboard-subtitle">
                Included Benefits (subscriptionPerks — comma-separated)
              </label>
              <textarea
                v-model="planForm.subscriptionPerks"
                rows="3"
                class="form-control admin-event-category-select"
                placeholder="e.g., 15% Ticket Discount, 48-Hour Presale Access, Priority Seat Hold"></textarea>
            </div>
          </div>

          <div
            class="d-flex justify-content-end gap-2 mt-4 pt-3 border-top border-secondary border-opacity-25">
            <button
              type="button"
              class="btn btn-sm px-3 admin-event-action-edit-btn"
              @click="closePlanModal">
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-sm px-4 fw-semibold admin-event-create-btn">
              {{ isEditingPlan ? "Save Changes" : "Create Plan" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL 2: DELETE CONFIRMATION (PLANS OR SUBSCRIBERS) -->
    <div
      v-if="planToDelete || subscriberToDelete"
      class="admin-modal-backdrop"
      @click.self="
        planToDelete = null;
        subscriberToDelete = null;
      ">
      <div
        class="card rounded-4 p-4 shadow-lg admin-modal-card admin-delete-modal-card">
        <h5 class="fw-bold mb-2 admin-event-title-text">Confirm Removal</h5>

        <p
          v-if="planToDelete"
          class="small admin-event-dashboard-subtitle mb-3">
          Are you sure you want to remove the
          <strong class="text-white">{{
            planToDelete.subscriptionType
          }}</strong>
          plan?
          <span
            v-if="getActiveSubscribersCount(planToDelete._id) > 0"
            class="d-block text-warning mt-2">
            ⚠️ Warning: This plan currently has
            {{ getActiveSubscribersCount(planToDelete._id) }} active
            subscriber(s). Consider setting its status to Inactive or Archived
            instead.
          </span>
        </p>

        <p
          v-else-if="subscriberToDelete"
          class="small admin-event-dashboard-subtitle mb-3">
          Are you sure you want to remove the subscription record for
          <strong class="text-white">{{ subscriberToDelete.fullName }}</strong
          >?
        </p>

        <div class="d-flex justify-content-end gap-2">
          <button
            type="button"
            class="btn btn-sm px-3 admin-event-action-edit-btn"
            @click="
              planToDelete = null;
              subscriberToDelete = null;
            ">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-sm px-3 admin-event-action-delete-btn"
            @click="
              planToDelete ? confirmDeletePlan() : confirmDeleteSubscriber()
            ">
            Confirm Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
