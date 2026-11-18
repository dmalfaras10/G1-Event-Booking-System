<script setup>
</script>

<template>
	<div class="d-flex flex-column gap-4">
		<!-- Page Header -->
		<div>
			<h1 class="text-white fw-bold mb-1" style="font-family: Georgia, serif;">Preferences &amp; Security</h1>
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
							<label class="form-label text-vault-muted small fw-bold">CURRENT PASSWORD</label>
							<input type="password" class="form-control" placeholder="••••••••••••">
						</div>

						<hr class="border-subtle my-4">

						<div class="mb-3">
							<label class="form-label text-vault-muted small fw-bold">NEW PASSWORD</label>
							<input type="password" class="form-control" placeholder="Minimum 14 characters">
						</div>

						<div class="mb-4">
							<label class="form-label text-vault-muted small fw-bold">CONFIRM NEW PASSWORD</label>
							<input type="password" class="form-control" placeholder="Re-enter new passphrase">
						</div>

						<!-- Password Strength / Requirements Box -->
						<!-- <div class="p-3 rounded bg-dark border border-subtle mb-4">
							<div class="text-gold small fw-bold mb-2" style="font-size: 0.7rem; letter-spacing: 0.05em;">
								CRYPTOGRAPHIC ENTROPY REQUIREMENTS
							</div>
							<ul class="list-unstyled text-vault-muted small mb-0 d-flex flex-column gap-1">
								<li><span class="text-gold me-2">&bull;</span> Minimum of 14 alphanumeric &amp; symbolic characters</li>
								<li><span class="text-gold me-2">&bull;</span> Must not match any of your previous 5 archived ciphers</li>
								<li><span class="text-gold me-2">&bull;</span> Active lounge sessions on secondary devices will require re-verification</li>
							</ul>
						</div> -->

						<div class="d-flex justify-content-end gap-2">
							<button type="button" class="btn btn-outline-light btn-sm px-3 py-2 border-subtle">Discard</button>
							<button type="submit" class="btn btn-gold btn-sm px-4 py-2">Update Password</button>
						</div>
					</form>
				</div>
			</div>

			<!-- Right Column: Security Status & Hardware Keys -->
			<div class="col-12 col-xl-5 d-flex flex-column gap-4">
				<!-- 2FA / Hardware Key Card -->
				<div class="bg-surface border border-subtle rounded-3 p-4">
					<h6 class="text-white fw-semibold mb-1">Two-Factor Authentication</h6>

					<div class="d-flex flex-column gap-2">
						<div class="p-3 rounded bg-dark border border-subtle d-flex justify-content-between align-items-center">
							<div>
								<div class="text-white small fw-semibold">Hardware Security Key (YubiKey)</div>
								<div class="text-vault-muted" style="font-size: 0.7rem;">Registered Oct 12, 2024</div>
							</div>
							<span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25">Active</span>
						</div>

						<div class="p-3 rounded bg-dark border border-subtle d-flex justify-content-between align-items-center">
							<div>
								<div class="text-white small fw-semibold">Encrypted SMS Concierge Line</div>
								<div class="text-vault-muted" style="font-size: 0.7rem;">+1 (555) •••-9012</div>
							</div>
							<span class="badge bg-dark border border-subtle text-gold">Primary</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>