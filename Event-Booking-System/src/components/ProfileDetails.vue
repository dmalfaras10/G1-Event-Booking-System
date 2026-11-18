<script setup>
</script>

<template>
	<div class="row g-4">
		<!-- Top Banner / Profile Header Card -->
		<div class="col-12">
			<div class="bg-surface border border-subtle rounded-3 p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
				<div class="d-flex align-items-center gap-4">
					<div class="position-relative">
						<div class="rounded bg-dark border border-gold border-opacity-50 d-flex align-items-center justify-content-center" style="width: 88px; height: 88px;">
							<span class="text-gold fs-2">🏛️</span>
						</div>
					</div>
					<div>
						<div class="text-vault-muted small mb-1" style="font-size: 0.75rem;">
							Patron ID: <span class="text-white font-monospace">#SP-89240-NY</span>
						</div>
						<h2 class="text-white fw-bold mb-2" style="font-family: Georgia, serif;">Rafael Mendoza</h2>
						<div class="d-flex flex-wrap gap-3 text-vault-muted small" style="font-size: 0.78rem;">
							<span>Member since <strong class="text-white fw-normal">Oct 2021</strong></span>
							<span>&bull;</span>
							<span>VIP Status: <strong class="text-gold fw-semibold">Bronze</strong></span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Left Card: Personal Dossier & Credentials -->
		<div class="col-12 col-xl-6">
			<div class="bg-surface border border-subtle rounded-3 p-4 h-100 d-flex flex-column">
				<div class="d-flex justify-content-between align-items-start mb-4">
					<div>
						<h5 class="text-white fw-semibold mb-1" style="font-family: Georgia, serif;">Personal Dossier &amp; Credentials</h5>
						<p class="text-vault-muted small mb-0">Confidential identity details utilized for high-salon guest registers.</p>
					</div>
					<span class="text-vault-muted small">🔒</span>
				</div>

				<div class="row g-3 mb-3">
					<div class="col-md-6">
						<label class="form-label text-vault-muted fw-bold" style="font-size: 0.68rem; letter-spacing: 0.05em;">FIRST NAME</label>
						<input type="text" class="form-control" value="Alexander">
					</div>
					<div class="col-md-6">
						<label class="form-label text-vault-muted fw-bold" style="font-size: 0.68rem; letter-spacing: 0.05em;">LAST NAME</label>
						<input type="text" class="form-control" value="Vance-Hayes">
					</div>
				</div>

				<div class="mb-3">
					<div class="d-flex justify-content-between align-items-center mb-1">
						<label class="form-label text-vault-muted fw-bold mb-0" style="font-size: 0.68rem; letter-spacing: 0.05em;">EMAIL</label>
						<span class="text-gold fw-bold" style="font-size: 0.65rem;">VERIFIED &amp; SEALED</span>
					</div>
					<input type="email" class="form-control" value="vance@residence.org">
				</div>

				<div class="row g-3 mb-4">
					<div class="col-md-6">
						<label class="form-label text-vault-muted fw-bold" style="font-size: 0.68rem; letter-spacing: 0.05em;">MOBILE NUMBER</label>
						<input type="text" class="form-control" value="+1 (555) 482-9012">
					</div>
				</div>
			</div>
		</div>

		<!-- Right Card: Primary Residence & Courier Address -->
		<div class="col-12 col-xl-6">
			<div class="bg-surface border border-subtle rounded-3 p-4 h-100 d-flex flex-column">
				<div class="d-flex justify-content-between align-items-start mb-4">
					<div>
						<h5 class="text-white fw-semibold mb-1" style="font-family: Georgia, serif;">Primary Residence &amp; Courier Address</h5>
						<p class="text-vault-muted small mb-0">Where commemorative printed passes, vinyl archives, and tasting vintages arrive.</p>
					</div>
					<span class="text-vault-muted small">🚚</span>
				</div>

				<div class="mb-3">
					<label class="form-label text-vault-muted fw-bold" style="font-size: 0.68rem; letter-spacing: 0.05em;">STREET ADDRESS &amp; SUITE / PENTHOUSE</label>
					<input type="text" class="form-control" value="742 Park Avenue, Penthouse 12B">
				</div>

				<div class="row g-3 mb-3">
					<div class="col-md-6">
						<label class="form-label text-vault-muted fw-bold" style="font-size: 0.68rem; letter-spacing: 0.05em;">CITY</label>
						<input type="text" class="form-control" value="New York">
					</div>
					<div class="col-md-6">
						<label class="form-label text-vault-muted fw-bold" style="font-size: 0.68rem; letter-spacing: 0.05em;">POSTAL / ZIP CODE</label>
						<input type="text" class="form-control" value="10021">
					</div>
				</div>

				<div class="mb-3">
					<label class="form-label text-vault-muted fw-bold" style="font-size: 0.68rem; letter-spacing: 0.05em;">REGION &amp; SOVEREIGN STATE</label>
					<select class="form-select">
						<option selected>United States (New York State)</option>
						<option>United Kingdom (Greater London)</option>
						<option>France (Île-de-France)</option>
						<option>Switzerland (Zürich)</option>
					</select>
				</div>
			</div>
		</div>

		<!-- Sticky / Footer Action Bar: Discard & Save Dossier Changes -->
		<div class="col-12">
			<div class="pt-3 border-top border-subtle d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
				<div class="text-vault-muted small" style="font-size: 0.75rem;">
					&#9432; Revisions apply immediately across all global private lounge terminals.
				</div>
				<div class="d-flex gap-2">
					<button type="button" class="btn bg-surface border border-subtle text-white px-4 py-2 small">
						Discard Revisions
					</button>
					<button type="button" class="btn btn-gold px-4 py-2 small">
						Save Changes
					</button>
				</div>
			</div>
		</div>
	</div>
</template>