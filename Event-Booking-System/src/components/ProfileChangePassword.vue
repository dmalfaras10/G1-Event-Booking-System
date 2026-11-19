<script setup></script>

<template>
  <div class="d-flex flex-column gap-4">
    <!-- Page Header -->
    <div>
      <h1 class="text-white fw-bold mb-1">Preferences &amp; Security</h1>
    </div>

    <div class="row g-4">
      <!-- Left Column: Update Password Form -->
      <div class="col-12 col-xl-7">
        <div class="bg-surface border border-subtle rounded-3 p-4">
          <div class="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h5 class="text-white fw-semibold mb-1">Update Password</h5>
            </div>
          </div>

          <form @submit.prevent>
            <div class="mb-3">
              <label class="form-label text-vault-muted small fw-bold"
                >CURRENT PASSWORD</label
              >
              <input
                type="password"
                class="form-control"
                placeholder="••••••••••••" />
            </div>

            <hr class="border-subtle my-4" />

            <div class="mb-3">
              <label class="form-label text-vault-muted small fw-bold"
                >NEW PASSWORD</label
              >
              <input
                type="password"
                class="form-control"
                placeholder="Minimum 14 characters" />
            </div>

            <div class="mb-4">
              <label class="form-label text-vault-muted small fw-bold"
                >CONFIRM NEW PASSWORD</label
              >
              <input
                type="password"
                class="form-control"
                placeholder="Re-enter new passphrase" />
            </div>

            <div class="d-flex justify-content-end gap-2">
              <button
                type="button"
                class="btn btn-outline-light btn-sm px-3 py-2 border-subtle">
                Discard
              </button>
              <button type="submit" class="btn btn-gold btn-sm px-4 py-2">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Right Column: Two-Factor Authentication (Mobile Phone & Email) -->
      <div class="col-12 col-xl-5 d-flex flex-column gap-4">
        <div class="bg-surface border border-subtle rounded-3 p-4">
          <h6 class="text-white fw-semibold mb-1">Two-Factor Authentication</h6>
          <p class="text-vault-muted small mb-3">
            One-time passcode verification sent to your registered Philippine
            mobile number and email address.
          </p>

          <div class="d-flex flex-column gap-2">
            <div
              class="p-3 rounded bg-dark border border-subtle d-flex justify-content-between align-items-center">
              <div>
                <div class="text-white small fw-semibold">
                  Mobile SMS Verification
                </div>
                <div class="text-vault-muted text-xs font-monospace">
                  +63 917 ••• 7277
                </div>
              </div>
              <span
                class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25"
                >Active</span
              >
            </div>

            <div
              class="p-3 rounded bg-dark border border-subtle d-flex justify-content-between align-items-center">
              <div>
                <div class="text-white small fw-semibold">
                  Email OTP Verification
                </div>
                <div class="text-vault-muted text-xs font-monospace">
                  raf••••@g-one.ph
                </div>
              </div>
              <span
                class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25"
                >Active</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-xs {
  font-size: 0.7rem;
}
</style>
