<script setup>
import { ref, watch } from 'vue'
import { useGlobalStore } from "../stores/global.js";
import { useRouter } from "vue-router";
import { Notyf } from 'notyf';

const router = useRouter();
const notyf = new Notyf();
const { getUserDetails } = useGlobalStore();
const isEnabled = ref(false);
const email = ref("");

watch(email, (currentValue) => {
    if(currentValue.trim() !== ""){
        isEnabled.value = true;
    }
    else
    {
        isEnabled.value = false;
    }
});

function handleSubmit (event){
    event.preventDefault();
    localStorage.setItem("email", email.value);
    getUserDetails (email.value);

    notyf.success("Recovery Instructions Sent");

    email.value = "";
    router.push({ path : '/login'});    
}
</script>

<template>
  <div
    data-bs-theme="dark"
    class="forgot-page container-fluid min-vh-100 d-flex justify-content-center align-items-start pt-5 pb-5 px-3"
  >
    <div class="card forgot-card w-100 mt-3 mt-md-4 rounded-4 shadow-lg overflow-hidden">
      <div class="forgot-card-accent"></div>

      <div class="card-body p-4 p-md-5 d-flex flex-column justify-content-between">
        <!-- Header with Centered Bootstrap Icon -->
        <div class="text-center mb-4 pb-3 border-bottom forgot-border-subtle">
          <div class="forgot-icon-container mb-3 mx-auto">
            <i class="bi bi-key-fill fs-3"></i>
          </div>
          <span class="badge rounded-pill forgot-badge text-uppercase mb-2">
            Account Recovery
          </span>
          <h1 class="h2 fw-bold forgot-text-main mb-1">Forgot Password?</h1>
          <p class="forgot-text-muted mb-0">
            Enter your email address and we'll send you recovery instructions
          </p>
        </div>
        <!-- Forgot Password Form -->
        <form @submit="handleSubmit" class="d-flex flex-column gap-3">
          <!-- Email Address -->
          <div>
            <label for="email" class="form-label fw-semibold small forgot-form-label">
              Email Address
            </label>
            <input
              id="email"
              v-model.trim="email"
              type="email"
              class="form-control form-control-lg forgot-custom-input"
              placeholder="name@example.com"
              required
            />
          </div>
          <!-- Submit Button -->
          <div class="d-grid mt-2">
            <button
              type="submit"
              class="btn btn-lg forgot-submit-btn fw-bold py-3"
              :disabled="!isEnabled"
            >
              Send Reset Instructions <span class="ms-1">→</span>
            </button>
          </div>
          <!-- Footer Link -->
          <p class="text-center forgot-text-muted small mb-0 mt-1">
            Remembered your password?
            <router-link to="/login" class="forgot-gold-link fw-semibold ms-1">Sign in</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forgot-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
  max-width: 680px;
  min-height: 440px;
}

.forgot-card-accent {
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, var(--magenta-badge), var(--gold-accent));
}

.forgot-border-subtle {
  border-color: var(--border-subtle) !important;
}

.forgot-text-main {
  color: var(--text-main);
}

.forgot-text-muted {
  color: var(--text-muted);
}

.forgot-icon-container {
  width: 48px;
  height: 48px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold-accent);
}

.forgot-badge {
  background-color: var(--magenta-badge);
  color: var(--text-main);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 0.45em 0.9em;
}

.forgot-form-label {
  color: var(--text-muted);
}

.forgot-custom-input {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
  font-size: 0.95rem;
  padding: 0.85rem 1rem;
  border-radius: 0.65rem;
}

.forgot-custom-input::placeholder {
  color: var(--text-muted);
  opacity: 0.5;
}

.forgot-custom-input:hover,
.forgot-custom-input:focus {
  background-color: var(--bg-surface-hover);
  color: var(--text-main);
}

.forgot-custom-input:focus {
  border-color: var(--gold-accent);
  box-shadow: 0 0 0 0.2rem color-mix(in srgb, var(--gold-accent) 22%, transparent);
}

.forgot-submit-btn {
  background-color: var(--gold-accent);
  color: var(--bg-primary);
  border: none;
  border-radius: 0.65rem;
  font-size: 1rem;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.forgot-submit-btn:hover:not(:disabled),
.forgot-submit-btn:focus-visible:not(:disabled) {
  background-color: var(--gold-accent-hover);
  color: var(--bg-primary);
}

.forgot-submit-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.forgot-submit-btn:active:not(:disabled) {
  transform: scale(0.99);
}

.forgot-gold-link {
  color: var(--gold-accent);
  text-decoration: none;
}

.forgot-gold-link:hover {
  color: var(--gold-accent-hover);
  text-decoration: underline;
}
</style>