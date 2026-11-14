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
    class="login-page container-fluid min-vh-100 d-flex justify-content-center align-items-start pt-5 pb-5 px-3"
  >
    <div class="card login-card w-100 mt-3 mt-md-4 rounded-4 shadow-lg overflow-hidden">
      <div class="login-card-accent"></div>

      <div class="card-body p-4 p-md-5 d-flex flex-column justify-content-between">
        <!-- Header with Centered Bootstrap Icon -->
        <div class="text-center mb-4 pb-3 border-bottom login-border-subtle">
          <div class="login-icon-container mb-3 mx-auto">
            <i class="bi bi-box-arrow-in-right fs-3"></i>
          </div>
          <span class="badge rounded-pill login-badge text-uppercase mb-2">
            Member Access
          </span>
          <h1 class="h2 fw-bold login-text-main mb-1">Welcome Back</h1>
          <p class="login-text-muted mb-0">
            Enter your credentials to access your account
          </p>
        </div>
        <!-- Login Form -->
        <form @submit="handleSubmit" class="d-flex flex-column gap-3">
          <!-- Email Address -->
          <div>
            <label for="email" class="form-label fw-semibold small login-form-label">
              Email Address
            </label>
            <input
              id="email"
              v-model.trim="email"
              type="email"
              class="form-control form-control-lg login-custom-input"
              placeholder="name@example.com"
              autocomplete="email"
              required
            />
          </div>
          <!-- Password -->
          <div>
            <label for="password" class="form-label fw-semibold small login-form-label">
              Password
            </label>
            <div class="input-group input-group-lg">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control login-custom-input border-end-0"
                placeholder="Enter your password"
                autocomplete="current-password"
                required
              />
              <button
                type="button"
                class="btn login-custom-toggle-btn border-start-0 px-3"
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
              class="btn btn-lg login-submit-btn fw-bold py-3"
              :disabled="!isEnabled"
            >
              Sign In <span class="ms-1">→</span>
            </button>
          </div>
          <!-- Footer Links: Forgot Password & Create Account -->
          <div class="d-flex justify-content-between align-items-center login-text-muted small mt-1">
            <router-link to="/forgot-password" class="login-gold-link" @click.prevent>
              Forgot password?
            </router-link>
            <p class="mb-0">
              Don't have an account?
              <router-link to="/register" class="login-gold-link fw-semibold ms-1">Create an account</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Login Start  */

.login-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
  max-width: 680px;
  min-height: 520px;
}

.login-card-accent {
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, var(--magenta-badge), var(--gold-accent));
}

.login-border-subtle {
  border-color: var(--border-subtle) !important;
}

.login-text-main {
  color: var(--text-main);
}

.login-text-muted {
  color: var(--text-muted);
}

.login-icon-container {
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

.login-badge {
  background-color: var(--magenta-badge);
  color: var(--text-main);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 0.45em 0.9em;
}

.login-form-label {
  color: var(--text-muted);
}

.login-custom-input,
.login-custom-toggle-btn {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
  font-size: 0.95rem;
}

.login-custom-input {
  padding: 0.85rem 1rem;
  border-radius: 0.65rem;
}

.input-group .login-custom-input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.login-custom-toggle-btn {
  color: var(--gold-muted);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-top-right-radius: 0.65rem;
  border-bottom-right-radius: 0.65rem;
  padding-inline: 1rem;
}

.login-custom-toggle-btn:hover {
  background-color: var(--bg-surface-hover);
  color: var(--gold-accent);
  border-color: var(--border-subtle);
}

.login-custom-input::placeholder {
  color: var(--text-muted);
  opacity: 0.5;
}

.login-custom-input:hover,
.login-custom-input:focus {
  background-color: var(--bg-surface-hover);
  color: var(--text-main);
}

.login-custom-input:focus {
  border-color: var(--gold-accent);
  box-shadow: 0 0 0 0.2rem color-mix(in srgb, var(--gold-accent) 22%, transparent);
}

.input-group:focus-within .login-custom-input,
.input-group:focus-within .login-custom-toggle-btn {
  border-color: var(--gold-accent);
  background-color: var(--bg-surface-hover);
}

.login-submit-btn {
  background-color: var(--gold-accent);
  color: var(--bg-primary);
  border: none;
  border-radius: 0.65rem;
  font-size: 1rem;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.login-submit-btn:hover:not(:disabled),
.login-submit-btn:focus-visible:not(:disabled) {
  background-color: var(--gold-accent-hover);
  color: var(--bg-primary);
}

.login-submit-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.login-submit-btn:active:not(:disabled) {
  transform: scale(0.99);
}

.login-gold-link {
  color: var(--gold-accent);
  text-decoration: none;
}

.login-gold-link:hover {
  color: var(--gold-accent-hover);
  text-decoration: underline;
}

/* Login End */
</style>