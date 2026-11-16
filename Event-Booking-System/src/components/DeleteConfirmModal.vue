<script setup>
defineProps({
  event: { type: Object, default: null }
});

defineEmits(['close', 'confirm']);
</script>

<template>
  <div v-if="event" class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3 admin-event-custom-modal-backdrop" @click.self="$emit('close')">
    <div class="rounded-4 w-100 p-4 shadow-lg admin-event-delete-modal-box">
      <h3 class="h5 fw-bold mb-2 admin-event-title-text">Delete Event</h3>
      <p class="small mb-4 admin-event-dashboard-subtitle">Are you sure you want to delete <strong class="admin-event-title-text">{{ event.name }}</strong>? This will remove all seat allocations.</p>
      <div class="d-flex justify-content-end gap-2">
        <button class="btn btn-sm px-3 admin-event-modal-cancel-btn" @click="$emit('close')">Cancel</button>
        <button class="btn btn-sm px-3 admin-event-delete-confirm-btn" @click="$emit('confirm')">Yes, Delete</button>
      </div>
    </div>
  </div>
</template>