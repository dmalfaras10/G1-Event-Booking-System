<script setup>
import HeroCarousel from '../components/Hero.vue'
	import FeaturedEvents from '../components/FeaturedEvents.vue'
</script>

<template>
	<HeroCarousel />
	<FeaturedEvents />

		<section id="host-cta" class="py-5 my-4 host-section">
			<div class="container">
				<div class="card host-card p-4 p-md-5 rounded-4 position-relative overflow-hidden">
					<div class="row align-items-center position-relative z-2">
						<div class="col-lg-8 mb-4 mb-lg-0">
							<span class="text-uppercase small fw-bold host-eyebrow">
								<i class="bi bi-stars me-1 host-text-gold"></i>For Promoters &amp; Organizers
							</span>
							<h3 class="fw-bold mt-1 mb-2 host-title">Hosting an upscale event in Metro Manila?</h3>
							<p class="host-description mb-0">
								Partner with G-ONE to sell tickets, manage attendee seating, and reach Manila’s premier audience for live events and experiences.
							</p>
						</div>
						<div class="col-lg-4 text-lg-end">
							<button type="button"class="btn host-btn-action px-4 py-3 fw-bold text-decoration-none d-inline-flex align-items-center justify-content-center">
								<i class="bi bi-plus-circle me-2"></i>Be a Partner
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
</template>
