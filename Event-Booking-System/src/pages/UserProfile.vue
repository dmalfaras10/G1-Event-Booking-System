<script setup>
	import { ref } from 'vue';

	import ProfileChangePassword from '../components/ProfileChangePassword.vue';
	import ProfileDetails from '../components/ProfileDetails.vue';

	const profileState = ref('details');
</script>

<template>
	<div class="container-fluid main-wrapper min-vh-100 p-0">
		<div class="row g-0 w-100">
			<!-- Sidebar -->
			<aside class="col-12 col-md-3 col-xl-2 border-end border-subtle bg-surface">
				<div class="d-flex flex-column min-vh-100 vh-md-100 sticky-sidebar py-4 px-3">
					<!-- Header -->
					<div class="mb-4 px-2">
						<span class="text-uppercase tracking-wider fw-bold text-gold extra-small d-block mb-1">
							Settings
						</span>
						<h5 class="text-white mb-0 fw-bold">User Information</h5>
					</div>

					<!-- Account Profile Card Widget -->
					<div class="profile-badge-card w-100 my-2 p-3 rounded-3 border border-subtle d-flex align-items-center gap-3">
						<div class="avatar-ring rounded-3 p-2 d-flex align-items-center justify-content-center text-gold flex-shrink-0">
							<i class="bi bi-award-fill fs-5"></i>
						</div>
						<div class="overflow-hidden">
							<h6 class="text-white mb-0 fs-6 fw-semibold text-truncate">Rafael Mendoza</h6>
							<span class="tier-tag text-gold fw-bold text-uppercase d-inline-block mt-1">
								Bronze Patron
							</span>
						</div>
					</div>

					<!-- Navigation: Account -->
					<div class="nav-section-label text-uppercase text-vault-muted fw-bold px-2 mt-4 mb-2">
						Account
					</div>
					<nav class="d-flex flex-column gap-1">
						<button
							type="button"
							class="btn profile-nav-btn w-100 py-2 px-3 rounded-3 text-start d-flex align-items-center gap-2"
							:class="{ active: profileState === 'details' }"
							@click="profileState = 'details'"
						>
							<i class="bi bi-person"></i>
							<span>User Profile</span>
						</button>

						<button
							type="button"
							class="btn profile-nav-btn w-100 py-2 px-3 rounded-3 text-start d-flex align-items-center gap-2"
							:class="{ active: profileState === 'change-password' }"
							@click="profileState = 'change-password'"
						>
							<i class="bi bi-shield-lock"></i>
							<span>Security</span>
						</button>
					</nav>

					<!-- Sidebar Footer -->
					<div class="mt-auto pt-4 border-top border-subtle px-2">
						<div class="attache-card rounded-3 p-2.5">
							<span class="nav-section-label text-uppercase text-vault-muted d-block mb-1">
								Private Attaché
							</span>
							<a href="tel:+63288437277" class="text-white small font-monospace text-decoration-none d-flex align-items-center gap-2">
								<i class="bi bi-telephone-fill text-gold"></i>
								<span>+63 (2) 8843-7277</span>
							</a>
							<div class="extra-small text-vault-muted mt-1 d-flex align-items-start gap-2">
								<i class="bi bi-geo-alt-fill text-gold flex-shrink-0"></i>
								<span>Bonifacio Global City, Taguig, Metro Manila</span>
							</div>
						</div>
					</div>
				</div>
			</aside>

			<!-- Main Content Panel -->
			<main class="col-12 col-md-9 col-xl-10">
				<div class="p-4 p-lg-5 content-container mx-auto">
					<Component
						:is="
							profileState === 'change-password'
								? ProfileChangePassword
								: ProfileDetails
						"
					/>
				</div>
			</main>
		</div>
	</div>
</template>

<style scoped>
.main-wrapper {
	background:
		radial-gradient(circle at 90% 10%, rgba(158, 28, 78, 0.12), transparent 40%),
		radial-gradient(circle at 20% 85%, rgba(243, 198, 79, 0.06), transparent 45%),
		var(--bg-primary);
}

.bg-surface {
	background-color: var(--bg-surface);
}

.border-subtle {
	border-color: var(--border-subtle) !important;
}

.text-gold {
	color: var(--gold-accent);
}

.text-vault-muted {
	color: var(--text-muted);
}

.tracking-wider {
	letter-spacing: 1.5px;
}

.extra-small {
	font-size: 0.72rem;
}

.nav-section-label {
	font-size: 0.68rem;
	letter-spacing: 1.2px;
}

@media (min-width: 768px) {
	.sticky-sidebar {
		position: sticky;
		top: 0;
		height: 100vh;
	}
}

/* Profile Badge Widget */
.profile-badge-card {
	background-color: var(--bg-primary);
	transition: border-color 0.2s ease;
}

.profile-badge-card:hover {
	border-color: rgba(243, 198, 79, 0.4) !important;
}

.avatar-ring {
	width: 40px;
	height: 40px;
	background-color: rgba(243, 198, 79, 0.1);
	border: 1px solid rgba(243, 198, 79, 0.3);
}

.tier-tag {
	font-size: 0.68rem;
	letter-spacing: 0.8px;
}

/* Sidebar Navigation Buttons */
.profile-nav-btn {
	color: var(--text-muted);
	background-color: transparent;
	border: 1px solid transparent;
	font-size: 0.875rem;
	font-weight: 500;
	transition: all 0.2s ease;
}

.profile-nav-btn:hover {
	color: var(--text-main);
	background-color: rgba(255, 255, 255, 0.04);
}

.profile-nav-btn.active {
	color: var(--gold-accent);
	background-color: rgba(243, 198, 79, 0.1);
	border-color: rgba(243, 198, 79, 0.3);
	font-weight: 600;
}

/* Footer Attache Card */
.attache-card {
	background-color: var(--bg-primary);
	border: 1px solid var(--border-subtle);
	padding: 0.75rem;
}

.content-container {
	max-width: 1140px;
}
</style>