<script setup>
import { ref, watch } from 'vue';
import { Notyf } from 'notyf';
import {useGlobalStore} from "../stores/global.js";
import { useRouter } from "vue-router";

const router = useRouter();
const notyf = new Notyf();
const { getUserDetails } = useGlobalStore();
const showPassword = ref(false);
const isEnabled = ref(false);
const email = ref("");
const password = ref("");

watch([email, password], (currentValue) => {

    if(currentValue.every(input => input !== "")){
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

    notyf.success("Login Successful");

    email.value = "";
    password.value = "";
    router.push({ path : '/'});    
}
</script>

<template>
  <div
    data-bs-theme="dark"
    class="auth-page container-fluid min-vh-100 d-flex justify-content-center align-items-start pt-5 pb-5 px-3"
  >
    <div class="card auth-card w-100 mt-3 mt-md-4 rounded-4 shadow-lg overflow-hidden">
      <div class="card-accent"></div>

      <div class="card-body p-4 p-md-5 d-flex flex-column justify-content-between">
        <!-- Header with Centered Bootstrap Icon -->
        <div class="text-center mb-4 pb-3 border-bottom border-subtle">
          <div class="icon-container mb-3 mx-auto">
            <i class="bi bi-box-arrow-in-right fs-3"></i>
          </div>
          <span class="badge rounded-pill badge-custom text-uppercase mb-2">
            Member Access
          </span>
          <h1 class="h2 fw-bold text-main mb-1">Welcome Back</h1>
          <p class="text-muted-custom mb-0">
            Enter your credentials to access your account
          </p>
        </div>

        <!-- Login Form -->
        <form @submit="handleSubmit" class="d-flex flex-column gap-3">
          <!-- Email Address -->
          <div>
            <label for="email" class="form-label fw-semibold small">
              Email Address
            </label>
            <input
              id="email"
              v-model.trim="email"
              type="email"
              class="form-control form-control-lg custom-input"
              placeholder="name@example.com"
              autocomplete="email"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="form-label fw-semibold small">
              Password
            </label>
            <div class="input-group input-group-lg">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control custom-input border-end-0"
                placeholder="Enter your password"
                autocomplete="current-password"
                required
              />
              <button
                type="button"
                class="btn custom-toggle-btn border-start-0 px-3"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="d-grid mt-2">
            <button
              type="submit"
              class="btn btn-lg submit-btn fw-bold py-3"
              :disabled="!isEnabled"
            >
              Sign In <span class="ms-1">→</span>
            </button>
          </div>

          <!-- Footer Links: Forgot Password & Create Account -->
          <div class="d-flex justify-content-between align-items-center text-muted-custom small mt-1">
            <a href="/forgot-password" class="gold-link" @click.prevent>
              Forgot password?
            </a>
            <p class="mb-0">
              Don't have an account?
              <a href="/register" class="gold-link fw-semibold ms-1">Create an account</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
  max-width: 680px;
  min-height: 520px;
}

.card-accent {
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, var(--magenta-badge), var(--gold-accent));
}

.border-subtle {
  border-color: var(--border-subtle) !important;
}

.text-main {
  color: var(--text-main);
}

.text-muted-custom {
  color: var(--text-muted);
}

/* Icon Badge Styling */
.icon-container {
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

.badge-custom {
  background-color: var(--magenta-badge);
  color: var(--text-main);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 0.45em 0.9em;
}

.form-label {
  color: var(--text-muted);
}

.custom-input,
.custom-toggle-btn {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
  font-size: 0.95rem;
}

.custom-input {
  padding: 0.85rem 1rem;
  border-radius: 0.65rem;
}

.input-group .custom-input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.custom-toggle-btn {
  color: var(--gold-muted);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-top-right-radius: 0.65rem;
  border-bottom-right-radius: 0.65rem;
  padding-inline: 1rem;
}

.custom-toggle-btn:hover {
  background-color: var(--bg-surface-hover);
  color: var(--gold-accent);
  border-color: var(--border-subtle);
}

.custom-input::placeholder {
  color: var(--text-muted);
  opacity: 0.5;
}

.custom-input:hover,
.custom-input:focus {
  background-color: var(--bg-surface-hover);
  color: var(--text-main);
}

.custom-input:focus {
  border-color: var(--gold-accent);
  box-shadow: 0 0 0 0.2rem color-mix(in srgb, var(--gold-accent) 22%, transparent);
}

.input-group:focus-within .custom-input,
.input-group:focus-within .custom-toggle-btn {
  border-color: var(--gold-accent);
  background-color: var(--bg-surface-hover);
}

.submit-btn {
  background-color: var(--gold-accent);
  color: var(--bg-primary);
  border: none;
  border-radius: 0.65rem;
  font-size: 1rem;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.submit-btn:hover:not(:disabled),
.submit-btn:focus-visible:not(:disabled) {
  background-color: var(--gold-accent-hover);
  color: var(--bg-primary);
}

.submit-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.submit-btn:active:not(:disabled) {
  transform: scale(0.99);
}

.gold-link {
  color: var(--gold-accent);
  text-decoration: none;
}

.gold-link:hover {
  color: var(--gold-accent-hover);
  text-decoration: underline;
}
</style>