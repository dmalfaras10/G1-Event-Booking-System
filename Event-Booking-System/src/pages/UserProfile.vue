<script setup>
	import { ref } from 'vue';

	import ProfileChangePassword from '../components/ProfileChangePassword.vue';
	import ProfileDetails from '../components/ProfileDetails.vue';
	import ProfileHistory from '../components/ProfileHistory.vue';

	let profileState = ref("details");
</script>

<template>
	<div class="container-fluid main-wrapper min-vh-100 p-0">
		<div class="row g-0 w-100">
			<!-- Sidebar -->
			<div class="col-12 col-md-3 col-xl-2 border-end border-subtle bg-surface">
				<!-- Change min-vh-100 to vh-100 and add sticky-top (on md+ screens) -->
				<div class="d-flex flex-column min-vh-100 vh-md-100 sticky-sidebar py-4 px-3">
					<!-- Logo / Header -->
					<div class="mb-4 px-2">
						<span class="text-uppercase tracking-wider fw-bold text-gold small">StagePass</span>
						<h5 class="text-white mb-0 fw-bold">PATRON VAULT</h5>
					</div>

					<!-- Account Profile Card Widget -->
					<div class="w-100 my-2 p-3 rounded bg-primary bg-opacity-10 border border-subtle d-flex align-items-center gap-3">
						<div class="rounded bg-dark p-2 border border-subtle text-gold">
							<i class="bi bi-shield-lock-fill">👑</i>
						</div>
						<div>
							<h6 class="text-white mb-0 fs-6 fw-semibold">Lord Harrington</h6>
							<small class="text-gold" style="font-size: 0.75rem;">FOUNDER PATRON</small>
						</div>
					</div>

					<div class="text-uppercase text-main small fw-bold px-2 mt-4 mb-2" style="font-size: 0.7rem;">Account Sanctum</div>
					
					<!-- Navigation Links -->
					<div class="d-flex flex-column gap-1 text-vault-muted">
						<button 
							type="button" 
							class="btn profile-nav-btn w-100 py-2 px-3 rounded" 
							:class="{ 'active': profileState === 'details' }"
							@click="profileState = 'details'"
						>
							Patron Profile
						</button>
							
						<button 
							type="button" 
							class="btn profile-nav-btn w-100 py-2 px-3 rounded" 
							:class="{ 'active': profileState === 'history' }"
							@click="profileState = 'history'"
						>
							Passes & Ticket Vault
						</button>

						<button 
							type="button" 
							class="btn profile-nav-btn w-100 py-2 px-3 rounded"
							:class="{ 'active': profileState === 'change-password' }"
							@click="profileState = 'change-password'"
						>
							Preferences & Security
						</button>
					</div>

					<!-- Sidebar Footer (stays pinned to the bottom of the screen) -->
					<div class="mt-auto pt-4 border-top border-subtle px-2">
						<small class="text-vault-muted d-block mb-1" style="font-size: 0.7rem;">PRIVATE ATTACHE</small>
						<span class="text-white small font-monospace">+1 800 843-7277</span>
					</div>
				</div>
			</div>

			<!-- Main Content Panel -->
			<div class="col-12 col-md-9 col-xl-10">
				<div class="p-4 p-lg-5">
					<Component :is="
						profileState === 'change-password' ? ProfileChangePassword :
						profileState === 'history' ? ProfileHistory : ProfileDetails
					" />
				</div>
			</div>
		</div>
	</div>
</template>