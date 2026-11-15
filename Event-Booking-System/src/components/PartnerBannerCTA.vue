<template>
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

<style scoped>
/* Home Page - CTA Partner Start */

.host-section {
    color: var(--text-main);
}

.host-card {
    background-color: var(--bg-surface);
    border: 1px solid rgba(243, 198, 79, 0.25);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.host-card:hover {
    border-color: rgba(243, 198, 79, 0.45);
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.65),
        0 0 20px rgba(243, 198, 79, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.host-eyebrow {
    color: var(--gold-accent);
    letter-spacing: 0.08em;
    font-size: 0.75rem;
}

.host-text-gold {
    color: var(--gold-accent);
}

.host-title {
    color: var(--text-main);
    letter-spacing: -0.02em;
    font-size: 1.65rem;
}

.host-description {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.6;
    max-width: 58ch;
}

.host-btn-action {
    background: linear-gradient(
        135deg,
        var(--gold-accent) 0%,
        var(--gold-accent-hover) 100%
    );
    border: 1px solid var(--gold-accent);
    color: var(--bg-primary);
    font-size: 0.9rem;
    border-radius: 0.75rem;
    box-shadow: 0 6px 20px rgba(243, 198, 79, 0.25);
    transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
}

.host-btn-action:hover {
    border-color: var(--gold-accent-hover);
    color: var(--bg-primary);
    transform: translateY(-2px);
    box-shadow: 0 10px 26px rgba(243, 198, 79, 0.38);
}

@media (max-width: 991.98px) {
    .host-card {
        text-align: left;
    }
}

/* Home Page - CTA Partner End */	
</style>