<script setup>
import { ref, watch } from 'vue';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const email = ref("");
const password = ref("");
const confirmPass = ref("");
const firstName = ref("");
const lastName = ref("");
const mobile = ref("");
const agreeTerms = ref(false);
const isEnabled = ref(false);

watch([email, password, confirmPass, firstName, lastName, mobile, agreeTerms], (currentValue) => {

	 if(currentValue.slice(0, 6).every(input => input !== "") && currentValue[1] === currentValue[2] && currentValue[6] === true){
		  isEnabled.value = true;
	 }
	 else
	 {
		  isEnabled.value = false;
	 }
});

function handleSubmit(event) {
    event.preventDefault();

  	notyf.success("Registration Successful");

  	email.value = "";
  	password.value = "";
  	confirmPass.value = "";
  	firstName.value = "";
  	lastName.value = "";
  	mobile.value = "";
  	agreeTerms.value = false;
}
</script>

<template>
  <div
    data-bs-theme="dark"
    class="register-page container-fluid min-vh-100 d-flex justify-content-center align-items-start pt-5 pb-5 px-3"
  >
    <div class="card register-card w-100 mt-3 mt-md-4 rounded-4 shadow-lg overflow-hidden">
      <div class="register-card-accent"></div>

      <div class="card-body p-4 p-md-5 d-flex flex-column justify-content-between">
        <!-- Header with Centered Bootstrap Icon -->
        <div class="text-center mb-4 pb-3 border-bottom register-border-subtle">
          <div class="register-icon-container mb-3 mx-auto">
            <i class="bi bi-shield-lock-fill fs-3"></i>
          </div>
          <span class="badge rounded-pill register-badge text-uppercase mb-2">
            New Member Registration
          </span>
          <h1 class="h2 fw-bold register-text-main mb-1">Create an Account</h1>
          <p class="register-text-muted mb-0">
            Fill in your details below to register for member access
          </p>
        </div>
        <!-- Registration Form -->
        <form @submit="handleSubmit" class="d-flex flex-column gap-3">
          <!-- Row 1: First & Last Name (Side by Side) -->
          <div class="row g-3">
            <div class="col-md-6">
              <label for="firstName" class="form-label fw-semibold small register-form-label">
                First Name
              </label>
              <input
                id="firstName"
                v-model.trim="firstName"
                type="text"
                class="form-control form-control-lg register-custom-input"
                placeholder="Juan"
                autocomplete="given-name"
                required
              />
            </div>

            <div class="col-md-6">
              <label for="lastName" class="form-label fw-semibold small register-form-label">
                Last Name
              </label>
              <input
                id="lastName"
                v-model.trim="lastName"
                type="text"
                class="form-control form-control-lg register-custom-input"
                placeholder="Dela Cruz"
                autocomplete="family-name"
                required
              />
            </div>
          </div>
          <!-- Row 2: Mobile Number (Individual Row) -->
          <div>
            <label for="mobile" class="form-label fw-semibold small register-form-label">
              Mobile Number
            </label>
            <input
              id="mobile"
              v-model.trim="mobile"
              type="tel"
              class="form-control form-control-lg register-custom-input"
              placeholder="+63 912 345 6789"
              autocomplete="tel"
              required
            />
          </div>
          <!-- Row 3: Email Address (Individual Row) -->
          <div>
            <label for="email" class="form-label fw-semibold small register-form-label">
              Email Address
            </label>
            <input
              id="email"
              v-model.trim="email"
              type="email"
              class="form-control form-control-lg register-custom-input"
              placeholder="name@example.com"
              autocomplete="email"
              required
            />
          </div>
          <!-- Row 4: Password (Individual Row) -->
          <div>
            <label for="password" class="form-label fw-semibold small register-form-label">
              Password
            </label>
            <div class="input-group input-group-lg">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control register-custom-input border-end-0"
                placeholder="Min. 8 characters"
                autocomplete="new-password"
                minlength="8"
                required
              />
              <button
                type="button"
                class="btn register-custom-toggle-btn border-start-0 px-3"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>
          <!-- Row 5: Confirm Password (Individual Row) -->
          <div>
            <label for="confirmPass" class="form-label fw-semibold small register-form-label">
              Confirm Password
            </label>
            <div class="input-group input-group-lg">
              <input
                id="confirmPass"
                v-model="confirmPass"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="form-control register-custom-input border-end-0"
                placeholder="Re-enter password"
                autocomplete="new-password"
                required
              />
              <button
                type="button"
                class="btn register-custom-toggle-btn border-start-0 px-3"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>
          <!-- Terms Checkbox -->
          <div class="form-check mt-1">
            <input
              id="agreeTerms"
              v-model="agreeTerms"
              class="form-check-input register-custom-checkbox"
              type="checkbox"
              required
            />
            <label class="form-check-label register-text-muted small" for="agreeTerms">
              I agree to the <a href="#terms" class="register-gold-link" @click.prevent>Terms of Service</a> and
              <a href="#privacy" class="register-gold-link" @click.prevent>Privacy Policy</a>.
            </label>
          </div>
          <!-- Submit Button -->
          <div class="d-grid mt-2">
            <button
              type="submit"
              class="btn btn-lg register-submit-btn fw-bold py-3"
              :disabled="!isEnabled"
            >
              Create Account <span class="ms-1">→</span>
            </button>
          </div>
          <!-- Footer Link -->
          <p class="text-center register-text-muted small mb-0 mt-1">
            Already have an account?
            <a href="/login" class="register-gold-link fw-semibold ms-1">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Register Start  */

.register-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
  max-width: 680px;
  min-height: 640px;
}

.register-card-accent {
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, var(--magenta-badge), var(--gold-accent));
}

.register-border-subtle {
  border-color: var(--border-subtle) !important;
}

.register-text-main {
  color: var(--text-main);
}

.register-text-muted {
  color: var(--text-muted);
}

.register-icon-container {
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

.register-badge {
  background-color: var(--magenta-badge);
  color: var(--text-main);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 0.45em 0.9em;
}

.register-form-label {
  color: var(--text-muted);
}

.register-custom-input,
.register-custom-toggle-btn {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
  font-size: 0.95rem;
}

.register-custom-input {
  padding: 0.85rem 1rem;
  border-radius: 0.65rem;
}

.input-group .register-custom-input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.register-custom-toggle-btn {
  color: var(--gold-muted);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-top-right-radius: 0.65rem;
  border-bottom-right-radius: 0.65rem;
  padding-inline: 1rem;
}

.register-custom-toggle-btn:hover {
  background-color: var(--bg-surface-hover);
  color: var(--gold-accent);
  border-color: var(--border-subtle);
}

.register-custom-input::placeholder {
  color: var(--text-muted);
  opacity: 0.5;
}

.register-custom-input:hover,
.register-custom-input:focus {
  background-color: var(--bg-surface-hover);
  color: var(--text-main);
}

.register-custom-input:focus {
  border-color: var(--gold-accent);
  box-shadow: 0 0 0 0.2rem color-mix(in srgb, var(--gold-accent) 22%, transparent);
}

.input-group:focus-within .register-custom-input,
.input-group:focus-within .register-custom-toggle-btn {
  border-color: var(--gold-accent);
  background-color: var(--bg-surface-hover);
}

.register-custom-checkbox {
  background-color: var(--bg-primary);
  border-color: var(--border-subtle);
  cursor: pointer;
}

.register-custom-checkbox:checked {
  background-color: var(--gold-accent);
  border-color: var(--gold-accent);
}

.register-submit-btn {
  background-color: var(--gold-accent);
  color: var(--bg-primary);
  border: none;
  border-radius: 0.65rem;
  font-size: 1rem;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.register-submit-btn:hover:not(:disabled),
.register-submit-btn:focus-visible:not(:disabled) {
  background-color: var(--gold-accent-hover);
  color: var(--bg-primary);
}

.register-submit-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.register-submit-btn:active:not(:disabled) {
  transform: scale(0.99);
}

.register-gold-link {
  color: var(--gold-accent);
  text-decoration: none;
}

.register-gold-link:hover {
  color: var(--gold-accent-hover);
  text-decoration: underline;
}

/* Register End  */
</style>