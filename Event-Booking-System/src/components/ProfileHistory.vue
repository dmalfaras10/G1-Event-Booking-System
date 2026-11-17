<script setup>
</script>

<template>
	<div class="d-flex flex-column gap-4">
		<!-- Top Page Header & Summary Box -->
		<div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-start gap-3">
			<div>
				<div class="text-gold small fw-bold text-uppercase mb-1" style="font-size: 0.7rem; letter-spacing: 0.08em;">
					&bull; Sovereign Patron Sanctum
				</div>
				<h1 class="text-white fw-bold mb-1" style="font-family: Georgia, serif;">Passes &amp; Ticket Vault</h1>
				<p class="text-vault-muted small mb-0">
					Review secured allocations, digital NFC admittance keys, and bespoke hospitality provisions reserved under your personal patronage.
				</p>
			</div>

			<!-- Right Summary Pill Box -->
			<div class="bg-surface border border-subtle rounded-3 p-3 d-flex align-items-center gap-4 flex-shrink-0">
				<div class="d-flex align-items-center gap-3">
					<div class="rounded bg-dark border border-subtle p-2 text-gold">🎫</div>
					<div>
						<div class="text-white fw-semibold small">3 Sovereign Passes</div>
						<div class="text-gold" style="font-size: 0.65rem; letter-spacing: 0.05em;">ACTIVE &amp; ADMITTANCE READY</div>
					</div>
				</div>
				<div class="border-start border-subtle ps-3 text-end">
					<div class="text-vault-muted" style="font-size: 0.65rem;">FOLIO VALUE</div>
					<div class="text-white fw-bold small">$4,850 <span class="text-vault-muted fw-normal">USD</span></div>
				</div>
			</div>
		</div>

		<!-- Filter & Action Toolbar -->
		<div class="d-flex flex-wrap justify-content-between align-items-center gap-2 pb-2 border-bottom border-subtle">
			<div class="d-flex flex-wrap gap-2">
				<button type="button" class="btn filter-pill rounded-pill px-3 py-1">All Allocations (6)</button>
				<button type="button" class="btn filter-pill active rounded-pill px-3 py-1">&bull; Active &amp; Upcoming (3)</button>
				<button type="button" class="btn filter-pill rounded-pill px-3 py-1">Archived Past (14)</button>
				<button type="button" class="btn filter-pill rounded-pill px-3 py-1">Resale Vault (0)</button>
			</div>

			<div class="d-flex gap-2">
				<button type="button" class="btn filter-pill rounded px-3 py-1">Sync Calendar (.ics)</button>
				<button type="button" class="btn filter-pill rounded px-3 py-1">Filter</button>
			</div>
		</div>

		<!-- ORDER CARD 1: With Gold QR Code Stub -->
		<div class="bg-surface border border-subtle rounded-3 overflow-hidden">
			<div class="row g-0">
				<!-- Left Event & Order Details -->
				<div class="col-12 col-lg-8 p-4 border-end border-subtle">
					<div class="d-flex flex-wrap align-items-center gap-3 mb-2" style="font-size: 0.7rem;">
						<span class="text-gold fw-bold">ORDER #SP-9942-NY</span>
						<span class="text-vault-muted">&bull; CONFIRMED KEYHOLDER TIER</span>
					</div>

					<div class="badge badge-magenta rounded-pill px-2 py-1 mb-2" style="font-size: 0.65rem;">
						ORCHESTRAL SOVEREIGN SERIES
					</div>
					<h3 class="text-white fw-semibold mb-4" style="font-family: Georgia, serif;">
						Nocturne Philharmonic: Chopin &amp; Debussy at David Geffen Hall
					</h3>

					<!-- 3-Column Metadata Boxes -->
					<div class="row g-2 mb-3">
						<div class="col-md-4">
							<div class="p-2 px-3 rounded bg-dark border border-subtle h-100">
								<div class="text-vault-muted" style="font-size: 0.65rem;">DATE &amp; SCHEDULE</div>
								<div class="text-white fw-semibold small">Oct 28, 2025</div>
								<div class="text-vault-muted" style="font-size: 0.7rem;">8:00 PM EST (Doors 7:15)</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="p-2 px-3 rounded bg-dark border border-subtle h-100">
								<div class="text-vault-muted" style="font-size: 0.65rem;">VENUE SANCTUM</div>
								<div class="text-white fw-semibold small">Lincoln Center, NYC</div>
								<div class="text-vault-muted" style="font-size: 0.7rem;">David Geffen Hall &bull; Tier 1</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="p-2 px-3 rounded bg-dark border border-subtle h-100">
								<div class="text-vault-muted" style="font-size: 0.65rem;">SEATING ALLOCATION</div>
								<div class="text-white fw-semibold small">Chamber Parquet</div>
								<div class="text-vault-muted" style="font-size: 0.7rem;">Row D, Seats 14 &amp; 15 (2 Passes)</div>
							</div>
						</div>
					</div>

					<!-- Hospitality Inclusions Box -->
					<div class="p-2 px-3 rounded bg-dark border border-subtle mb-4">
						<div class="text-gold" style="font-size: 0.65rem; letter-spacing: 0.05em;">HOSPITALITY INCLUSIONS</div>
						<div class="text-vault-muted small">Private Velvet Lounge Access &bull; Porte-Cochère Valet &bull; Pre-Performance Krug Champagne Pour</div>
					</div>

					<!-- Action Buttons -->
					<div class="d-flex flex-wrap gap-2">
						<button type="button" class="btn btn-gold btn-sm px-3 py-2">View Encrypted Pass / NFC</button>
						<button type="button" class="btn btn-outline-light btn-sm px-3 py-2 border-subtle">Transfer to Guest Folio</button>
						<button type="button" class="btn btn-outline-light btn-sm px-3 py-2 border-subtle">Download E-PDF</button>
					</div>
				</div>

				<!-- Right Stub / QR Panel -->
				<div class="col-12 col-lg-4 p-4 d-flex flex-column justify-content-between bg-black bg-opacity-25">
					<div class="d-flex justify-content-between align-items-center">
						<span class="text-vault-muted" style="font-size: 0.65rem;">LIVE ACCESS STUB</span>
						<span class="badge bg-dark border border-subtle text-gold" style="font-size: 0.65rem;">NFC Provisioned</span>
					</div>

					<!-- Stylized Gold QR Placeholder -->
					<div class="my-3 text-center">
						<div class="d-inline-flex align-items-center justify-content-center p-3 rounded-3 border border-subtle bg-dark" style="width: 130px; height: 130px;">
							<div class="border border-2 border-warning rounded p-2 text-gold fw-bold small">
								[ QR CODE ]<br><span style="font-size: 0.6rem;">PASS KEY</span>
							</div>
						</div>
						<div class="text-vault-muted mt-2 font-monospace" style="font-size: 0.65rem;">TOKEN: 8842-9910-GOLD</div>
					</div>

					<div class="border-top border-subtle pt-2" style="font-size: 0.7rem;">
						<div class="d-flex justify-content-between text-vault-muted">
							<span>GATE CHECK</span>
							<span class="text-white">Tier 1 Sovereign Salon</span>
						</div>
						<div class="d-flex justify-content-between text-vault-muted">
							<span>FOLIO HOLDER</span>
							<span class="text-white">Lord Harrington</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- ORDER CARD 2: With Private Table Key Stub -->
		<div class="bg-surface border border-subtle rounded-3 overflow-hidden">
			<div class="row g-0">
				<div class="col-12 col-lg-8 p-4 border-end border-subtle">
					<div class="d-flex justify-content-between align-items-center mb-2" style="font-size: 0.7rem;">
						<span class="text-gold fw-bold">ORDER #SP-8820-NY</span>
						<span class="text-vault-muted">CONFIRMED &amp; SEALED</span>
					</div>

					<div class="text-gold small fw-bold text-uppercase mb-1" style="font-size: 0.65rem;">INTIMATE SALON SERIES</div>
					<h3 class="text-white fw-semibold mb-4" style="font-family: Georgia, serif;">
						Secret Rooftop Chopin Nocturne at The Carlyle
					</h3>

					<div class="row g-2 mb-3">
						<div class="col-md-4">
							<div class="p-2 px-3 rounded bg-dark border border-subtle h-100">
								<div class="text-vault-muted" style="font-size: 0.65rem;">DATE &amp; TIME</div>
								<div class="text-white fw-semibold small">Nov 14, 2025</div>
								<div class="text-vault-muted" style="font-size: 0.7rem;">9:30 PM EST (Intimate Admittance)</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="p-2 px-3 rounded bg-dark border border-subtle h-100">
								<div class="text-vault-muted" style="font-size: 0.65rem;">SECRET VENUE</div>
								<div class="text-white fw-semibold small">The Carlyle Hotel</div>
								<div class="text-vault-muted" style="font-size: 0.7rem;">Bemelmans Private Annex</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="p-2 px-3 rounded bg-dark border border-subtle h-100">
								<div class="text-vault-muted" style="font-size: 0.65rem;">BANQUETTE RESERVE</div>
								<div class="text-white fw-semibold small">Private Salon Table 04</div>
								<div class="text-vault-muted" style="font-size: 0.7rem;">4 Allocated Armchairs</div>
							</div>
						</div>
					</div>

					<div class="p-2 px-3 rounded bg-dark border border-subtle mb-4">
						<div class="text-gold" style="font-size: 0.65rem; letter-spacing: 0.05em;">HOSPITALITY INCLUSIONS</div>
						<div class="text-vault-muted small">Pairing Canapés by Executive Chef &bull; Curated Vintage Macallan Flight &bull; Discretion Protocol Guaranteed</div>
					</div>

					<div class="d-flex flex-wrap gap-2">
						<button type="button" class="btn btn-gold btn-sm px-3 py-2">View Encrypted Pass / NFC</button>
						<button type="button" class="btn btn-outline-light btn-sm px-3 py-2 border-subtle">Concierge Protocol Details</button>
					</div>
				</div>

				<!-- Right Key Stub -->
				<div class="col-12 col-lg-4 p-4 d-flex flex-column justify-content-between bg-black bg-opacity-25">
					<div class="d-flex justify-content-between align-items-center">
						<span class="text-vault-muted" style="font-size: 0.65rem;">ACCESS TOKEN</span>
						<span class="badge bg-dark border border-subtle text-vault-muted" style="font-size: 0.65rem;">Private Annex</span>
					</div>

					<div class="my-3 p-4 rounded-3 border border-subtle text-center" style="background-color: rgba(158, 28, 78, 0.14);">
						<div class="text-gold mb-1">🔑</div>
						<h5 class="text-white fw-bold mb-1" style="font-family: Georgia, serif;">Table 04</h5>
						<div class="text-gold fw-bold" style="font-size: 0.65rem; letter-spacing: 0.06em;">SECRET ENTRY KEY #482</div>
					</div>

					<div class="border-top border-subtle pt-2 text-center">
						<div class="text-vault-muted" style="font-size: 0.65rem;">ATTACHE DISPATCH</div>
						<div class="text-white" style="font-size: 0.7rem;">Secret door code sent via SMS 2h prior</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom Load Archive Bar -->
		<div class="text-center pt-2">
			<button type="button" class="btn bg-surface border border-subtle text-white px-4 py-2 small">
				Load Archival Performance History // 2022–2024 <span class="badge bg-dark text-gold ms-2">14 Events</span>
			</button>
		</div>
	</div>
</template>