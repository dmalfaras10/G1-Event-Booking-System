<script setup>
</script>

<template>
	<div class="d-flex flex-column gap-4">
		<!-- Page Header -->
		<div>
			<div class="text-gold small fw-bold text-uppercase mb-1" style="font-size: 0.7rem; letter-spacing: 0.08em;">
				&bull; Vault Security &amp; Access Control
			</div>
			<h1 class="text-white fw-bold mb-1" style="font-family: Georgia, serif;">Preferences &amp; Security</h1>
			<p class="text-vault-muted small mb-0">
				Manage your sovereign access passphrase, cryptographic hardware keys, and private lounge authentication protocols.
			</p>
		</div>

		<div class="row g-4">
			<!-- Left Column: Update Password Form -->
			<div class="col-12 col-xl-7">
				<div class="bg-surface border border-subtle rounded-3 p-4">
					<div class="d-flex justify-content-between align-items-start mb-4">
						<div>
							<h5 class="text-white fw-semibold mb-1">Rotate Vault Passphrase</h5>
							<p class="text-vault-muted small mb-0">Update the primary cipher used to authorize folio changes and ticket transfers.</p>
						</div>
						<span class="badge badge-magenta rounded-pill px-2 py-1" style="font-size: 0.65rem;">AES-256 SEALED</span>
					</div>

					<form @submit.prevent>
						<div class="mb-3">
							<label class="form-label text-vault-muted small fw-bold">CURRENT VAULT PASSPHRASE</label>
							<input type="password" class="form-control" placeholder="••••••••••••">
						</div>

						<hr class="border-subtle my-4">

						<div class="mb-3">
							<label class="form-label text-vault-muted small fw-bold">NEW SOVEREIGN PASSPHRASE</label>
							<input type="password" class="form-control" placeholder="Minimum 14 characters">
						</div>

						<div class="mb-4">
							<label class="form-label text-vault-muted small fw-bold">CONFIRM NEW PASSPHRASE</label>
							<input type="password" class="form-control" placeholder="Re-enter new passphrase">
						</div>

						<!-- Password Strength / Requirements Box -->
						<div class="p-3 rounded bg-dark border border-subtle mb-4">
							<div class="text-gold small fw-bold mb-2" style="font-size: 0.7rem; letter-spacing: 0.05em;">
								CRYPTOGRAPHIC ENTROPY REQUIREMENTS
							</div>
							<ul class="list-unstyled text-vault-muted small mb-0 d-flex flex-column gap-1">
								<li><span class="text-gold me-2">&bull;</span> Minimum of 14 alphanumeric &amp; symbolic characters</li>
								<li><span class="text-gold me-2">&bull;</span> Must not match any of your previous 5 archived ciphers</li>
								<li><span class="text-gold me-2">&bull;</span> Active lounge sessions on secondary devices will require re-verification</li>
							</ul>
						</div>

						<div class="d-flex justify-content-end gap-2">
							<button type="button" class="btn btn-outline-light btn-sm px-3 py-2 border-subtle">Discard</button>
							<button type="submit" class="btn btn-gold btn-sm px-4 py-2">Update Passphrase</button>
						</div>
					</form>
				</div>
			</div>

			<!-- Right Column: Security Status & Hardware Keys -->
			<div class="col-12 col-xl-5 d-flex flex-column gap-4">
				<!-- 2FA / Hardware Key Card -->
				<div class="bg-surface border border-subtle rounded-3 p-4">
					<h6 class="text-white fw-semibold mb-1">Two-Factor Attache Verification</h6>
					<p class="text-vault-muted small mb-3">Secondary authentication required for high-value salon transfers.</p>

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

				<!-- Active Sessions Card -->
				<div class="bg-surface border border-subtle rounded-3 p-4">
					<h6 class="text-white fw-semibold mb-3">Sanctum Active Sessions</h6>
					<div class="d-flex flex-column gap-3 small">
						<div class="d-flex justify-content-between align-items-start border-bottom border-subtle pb-2">
							<div>
								<div class="text-white fw-semibold">MacBook Pro &bull; Safari 18</div>
								<div class="text-vault-muted" style="font-size: 0.75rem;">New York, NY &bull; Current Session</div>
							</div>
							<span class="text-gold" style="font-size: 0.7rem;">&bull; LIVE</span>
						</div>
						<div class="d-flex justify-content-between align-items-start">
							<div>
								<div class="text-white fw-semibold">iPhone 16 Pro &bull; StagePass Vault App</div>
								<div class="text-vault-muted" style="font-size: 0.75rem;">New York, NY &bull; Synced 2h ago</div>
							</div>
							<button type="button" class="btn btn-link text-vault-muted p-0 text-decoration-none" style="font-size: 0.75rem;">Revoke</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>