<script setup>
	import { ref, computed } from 'vue';
	import { mockSubscriptionPlans } from '../data/mockSubscriptions.js';

	// Filter out inactive plans so only the 3 main tiers remain active
	const activeSubscriptionPlans = computed(() => {
		return mockSubscriptionPlans.filter(plan => plan.subscriptionStatus === 'Active');
	});

	// Tier-specific metadata for flavor text, badges, icons, and theme classes
	const getTierConfig = (type) => {
		switch (type) {
			case 'Bronze':
				return {
					badgeLabel: 'Entry Tier',
					icon: 'bi-cup-hot',
					description: 'Refined chamber ambiance with streamlined ingress, early presale windows, and member privileges.',
					themeClass: 'tier-bronze',
					ctaLabel: 'RESERVE BRONZE PASS'
				};
			case 'Silver':
				return {
					badgeLabel: 'Featured Curation',
					icon: 'bi-gem',
					description: 'Elevated salon privileges featuring priority seat locks, 48-hour presales, and curated merchandise drops.',
					themeClass: 'tier-silver',
					ctaLabel: 'RESERVE SILVER PASS'
				};
			case 'Gold':
			default:
				return {
					badgeLabel: 'Sovereign Sanctum',
					icon: 'bi-star-fill',
					description: 'The gold standard for seasoned patrons: 72-hour VIP presales, complimentary lounge pours, and dedicated concierge care.',
					themeClass: 'tier-gold featured-tier-card',
					ctaLabel: 'SECURE GOLD ACCESS'
				};
		}
	};

	// Corporate suite form state
	const corpForm = ref({
		companyName: '',
		representative: '',
		suiteType: 'Executive Suite - 6 Persons',
		email: '',
		notes: '',
		agreeToProtocol: false
	});

	const submittedSuccess = ref(false);
	const submittedRef = ref('');

	const handleCorpSubmit = () => {
		const randomCode = Math.floor(100000 + Math.random() * 900000);
		submittedRef.value = `G1-VIP-${randomCode}`;
		submittedSuccess.value = true;

		corpForm.value = {
			companyName: '',
			representative: '',
			suiteType: 'Executive Suite - 6 Persons',
			email: '',
			notes: '',
			agreeToProtocol: false
		};
	};

	// FAQ data
	const openFaqId = ref(1);

	const toggleFaq = (id) => {
		openFaqId.value = openFaqId.value === id ? null : id;
	};

	const vipFaqsData = [
		{
			id: 1,
			number: '01',
			question: 'How does private side-entrance access and valet transfer operate?',
			answer: 'Patrons are met by private white-glove doormen at designated porte-cochère gates 45 minutes prior to curtain. Vehicles are securely parked in subterranean vaulted bays while guests are escorted directly into private annex lounges.'
		},
		{
			id: 2,
			number: '02',
			question: 'What etiquette governs artist greenroom introductions?',
			answer: 'Greenroom access requires an active Gold or Founder key credential. Guests are accompanied by a protocol attaché following final applause. Photography is permitted only with explicit artist consent.'
		},
		{
			id: 3,
			number: '03',
			question: 'Can dietary degustation menus be tailored for private salon patrons?',
			answer: 'Yes. Executive chef pairings are fully customizable up to 72 hours prior to event seating through your concierge portal or direct attaché line.'
		},
		{
			id: 4,
			number: '04',
			question: 'What is the transfer and cancellation protocol for bespoke passes?',
			answer: 'Active passes can be securely transferred to designated guest folios instantly without fees up to 24 hours prior to curtain via the Ticket Vault interface.'
		}
	];

	const scrollToSection = (sectionId) => {
		const el = document.getElementById(sectionId);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	};
</script>

<template>
	<main class="main-wrapper py-5 text-white">
		<div class="container">

			<!-- 1. HERO SECTION -->
			<section class="text-center mb-5 pb-3">

				<h1 class="display-4 fw-bold text-white lh-sm mb-3">
					<span class="text-warning">VIP</span> Memberships
				</h1>

				<p class="lead-text mx-auto mb-4" style="max-width: 650px;">
					Enjoy various benefits and exclusive offers with G-ONE's tiered memberships!
				</p>

				<div class="d-flex flex-wrap justify-content-center gap-3">
					<button
						type="button"
						class="btn btn-login px-4 py-2.5 d-inline-flex align-items-center gap-2"
						@click="scrollToSection('tiers-section')"
					>
						<span>Explore VIP Plans</span>
						<i class="bi bi-arrow-down-right"></i>
					</button>
					<button
						type="button"
						class="btn btn-register px-4 py-2.5 d-inline-flex align-items-center gap-2"
						@click="scrollToSection('corporate-section')"
					>
						<i class="bi bi-key text-warning"></i>
						<span>Contact Us</span>
					</button>
				</div>
			</section>

			<!-- 4. HOSPITALITY TIER PORTFOLIOS -->
			<section id="tiers-section" class="mb-5 pb-3">
				<div class="row align-items-end g-3 mb-5">
					<div class="col-lg-7">
						<span class="text-uppercase small fw-bold browse-lineup-title">
							<i class="bi bi-award me-1"></i>Tiered Memberships
						</span>
						<h2 class="fw-bold text-white mb-0 mt-1">Explore VIP Plans</h2>
					</div>
					<div class="col-lg-5">
						<p class="small text-secondary-light mb-0">
							Lock in VIP access with structured subscription privileges, priority seat holds, and private lounge entry.
						</p>
					</div>
				</div>

				<div class="row g-4 align-items-stretch justify-content-center">
					<div
						v-for="plan in activeSubscriptionPlans"
						:key="plan._id"
						class="col-12 col-md-6 col-xl-4"
					>
						<div
							class="tier-card rounded-4 p-4 h-100 d-flex flex-column justify-content-between position-relative"
							:class="getTierConfig(plan.subscriptionType).themeClass"
						>
							<!-- Floating Badge for Gold Tier -->
							<div
								v-if="plan.subscriptionType === 'Gold'"
								class="position-absolute top-0 start-50 translate-middle"
							>
								<span class="badge-featured px-3 py-1 rounded-pill extra-small fw-bold text-dark d-flex align-items-center gap-1 shadow-sm">
									<i class="bi bi-star-fill text-dark"></i> MOST REQUESTED TIER
								</span>
							</div>

							<div>

								<!-- Tier Title & Flavor Description -->
								<h3 class="fw-bold text-white mt-5 mb-2" style="font-family: Georgia, serif;">
									{{ plan.subscriptionType }} Tier
								</h3>

								<!-- Price Block -->
								<div class="mb-4">
									<span class="display-6 fw-bold tier-price" style="font-family: Georgia, serif;">
										&#8369;{{ plan.subscriptionPrice.toLocaleString('en-US', { minimumFractionDigits: 0 }) }}
									</span>
									<span class="extra-small text-secondary-light"> / per guest pass</span>
								</div>

								<hr class="border-secondary border-opacity-25 my-3" />

								<!-- Perks Checklist -->
								<div class="mb-4">
									<ul class="list-unstyled extra-small text-secondary-light d-flex flex-column gap-2.5 mb-0">
										<li
											v-for="(perk, idx) in plan.subscriptionPerks.split(', ')"
											:key="idx"
											class="d-flex align-items-start gap-2.5"
										>
											<i class="bi bi-check-circle tier-check fs-6 flex-shrink-0"></i>
											<span class="text-white-50-hover ms-2">{{ perk }}</span>
										</li>
									</ul>
								</div>
							</div>

							<!-- Bottom Action Button -->
							<div class="pt-3 border-top border-secondary border-opacity-25">
								<button
									type="button"
									class="btn w-100 py-2.5 fw-semibold tier-btn"
								>
									{{ getTierConfig(plan.subscriptionType).ctaLabel }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- 5. QUOTE BANNER -->
			<section class="mb-5 pb-3">
				<div class="surface-panel rounded-4 p-4 p-md-5 text-center">
					<div class="mx-auto" style="max-width: 740px;">
						<i class="bi bi-quote fs-1 text-warning d-block mb-2"></i>
						<h4 class="fw-semibold text-white fst-italic lh-base mb-3" style="font-family: Georgia, serif;">
							“The distinction between attending a performance and truly inhabiting it lives within the silence of the private salon.”
						</h4>
						<div class="extra-small text-warning text-uppercase fw-bold" style="letter-spacing: 1.5px;">
							&mdash; G-ONE
						</div>
					</div>
				</div>
			</section>

			<!-- 6. CORPORATE & PRIVATE SUITE RESERVATIONS -->
			<section id="corporate-section" class="mb-5 pb-3">
				<div class="row g-4 align-items-center">
					<div class="col-12 col-lg-5">
						<span class="text-uppercase small fw-bold browse-lineup-title">
							<i class="bi bi-building me-1"></i>INQUIRY OR CONCERNS
						</span>
						<h2 class="fw-bold text-white mb-3 mt-1" style="font-family: Georgia, serif;">
							Send Us a Message!
						</h2>

						<div class="d-flex flex-column gap-2">
							<div class="contact-info-row rounded-3 p-3 d-flex align-items-center gap-3">
								<i class="bi bi-shield-lock-fill text-warning fs-5"></i>
								<div>
									<div class="small fw-bold text-white">Strict Confidentiality Protocol</div>
									<div class="extra-small text-secondary-light">Full non-disclosure &amp; private guest register handling</div>
								</div>
							</div>
							<div class="contact-info-row rounded-3 p-3 d-flex align-items-center gap-3">
								<i class="bi bi-person-badge-fill text-warning fs-5"></i>
								<div>
									<div class="small fw-bold text-white">Dedicated Protocol Officers</div>
									<div class="extra-small text-secondary-light">On-site concierge liaison assigned for all events</div>
								</div>
							</div>
						</div>
					</div>

					<div class="col-12 col-lg-7">
						<div class="surface-panel rounded-4 p-4 p-md-5">
							<div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
								<h4 class="fw-bold text-white mb-0">VIP Inquiry Form</h4>
								<span class="hero-badge px-3 py-1">Priority Desk</span>
							</div>
							<p class="small text-secondary-light mb-4">
								Submit your inquiries and concerns and an agent will respond within 24 hours.
							</p>

							<!-- Success Confirmation Banner -->
							<div
								v-if="submittedSuccess"
								class="alert-success-gold rounded-3 p-3 mb-4 d-flex align-items-start gap-3"
								role="alert"
							>
								<i class="bi bi-check-circle-fill text-warning fs-4 flex-shrink-0"></i>
								<div>
									<div class="fw-bold text-white small">
										Message Sent ({{ submittedRef }})
									</div>
									<div class="extra-small text-secondary-light mt-1">
										Your private suite inquiry has been logged with our concierge desk. Expect a reply shortly.
									</div>
								</div>
							</div>

							<form @submit.prevent="handleCorpSubmit">
								<div class="row g-3 mb-3">
									<div class="col-md-6">
										<label class="form-label small text-secondary-light fw-semibold">
											Name <span class="text-warning">*</span>
										</label>
										<input
											v-model="corpForm.representative"
											type="text"
											class="form-control dark-input"
											placeholder="e.g., Rafael Mendoza"
											required
										/>
									</div>
									<div class="col-md-6">
										<label class="form-label small text-secondary-light fw-semibold">
											Email <span class="text-warning">*</span>
										</label>
										<input
											v-model="corpForm.companyName"
											type="email"
											class="form-control dark-input"
											placeholder="e.g., rafael.mendoza@g-one.com"
											required
										/>
									</div>
								</div>
								<div class="mb-3">
									<label class="form-label small text-secondary-light fw-semibold">
										Message
									</label>
									<textarea
										v-model="corpForm.notes"
										class="form-control dark-input"
										rows="3"
										placeholder="What would you like to ask regarding our VIP memberships..."
									></textarea>
								</div>

								<div class="mb-4">
									<div class="form-check">
										<input
											id="agreeProtocol"
											v-model="corpForm.agreeToProtocol"
											type="checkbox"
											class="form-check-input gold-checkbox"
											required
										/>
										<label for="agreeProtocol" class="form-check-label extra-small text-secondary-light">
											I acknowledge the G-ONE Private Suite Confidentiality &amp; Patronage Terms.
										</label>
									</div>
								</div>

								<div class="d-flex justify-content-end">
									<button type="submit" class="btn btn-login px-4 py-2.5 d-inline-flex align-items-center gap-2">
										<span>Send</span>
										<i class="bi bi-send-fill"></i>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>

			<!-- 7. VIP PATRONAGE FAQ -->
			<section id="vip-faq-section" class="mb-4">
				<div class="text-center mx-auto mb-4" style="max-width: 620px;">
					<span class="text-uppercase small fw-bold browse-lineup-title">
						Protocol Inquiries
					</span>
					<h2 class="fw-bold text-white mt-1 mb-2" style="font-family: Georgia, serif;">VIP Patronage FAQ</h2>
					<p class="small text-secondary-light mb-0">
						Essential information regarding private admittance, greenroom etiquette, and pass transfers.
					</p>
				</div>

				<div class="mx-auto d-flex flex-column gap-3" style="max-width: 860px;">
					<div
						v-for="faq in vipFaqsData"
						:key="faq.id"
						class="faq-card rounded-4 overflow-hidden"
						:class="{ active: openFaqId === faq.id }"
					>
						<button
							type="button"
							class="w-100 p-4 bg-transparent border-0 d-flex align-items-center justify-content-between text-start gap-3"
							@click="toggleFaq(faq.id)"
						>
							<span class="fw-semibold text-white d-flex align-items-center gap-3">
								<span class="text-warning small font-monospace">{{ faq.number }}</span>
								<span>{{ faq.question }}</span>
							</span>
							<i
								class="bi bi-chevron-down text-warning faq-chevron"
								:class="{ rotated: openFaqId === faq.id }"
							></i>
						</button>

						<div v-if="openFaqId === faq.id" class="px-4 pb-4 pt-0">
							<p class="small text-secondary-light mb-0 ps-md-4">
								{{ faq.answer }}
							</p>
						</div>
					</div>
				</div>
			</section>

		</div>
	</main>
</template>

<style scoped>
.main-wrapper {
	background:
		radial-gradient(circle at 85% 15%, rgba(158, 28, 78, 0.16), transparent 45%),
		radial-gradient(circle at 15% 45%, rgba(243, 198, 79, 0.08), transparent 45%),
		var(--bg-primary);
	min-height: 100vh;
	font-family: 'Montserrat', sans-serif;
}

.text-secondary-light {
	color: var(--text-muted);
}

.lead-text {
	color: var(--text-main);
	font-size: 1.02rem;
	line-height: 1.7;
}

.extra-small {
	font-size: 0.74rem;
}

.browse-lineup-title {
	color: var(--gold-accent);
	letter-spacing: 1.5px;
}

.pulse-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: var(--gold-accent);
	box-shadow: 0 0 10px var(--gold-accent);
}

/* Base Tier Card */
.tier-card {
	background-color: var(--bg-surface);
	border: 1px solid var(--border-subtle);
	transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.tier-card:hover {
	transform: translateY(-5px);
}

.tier-pill {
	background-color: var(--bg-primary);
	border: 1px solid var(--border-subtle);
	font-size: 0.68rem;
	letter-spacing: 0.08em;
}

/* BRONZE TIER THEME */
.tier-bronze:hover {
	border-color: rgba(205, 127, 50, 0.45);
}

.tier-bronze .tier-pill {
	color: #d99b66;
	border-color: rgba(205, 127, 50, 0.3);
	background-color: rgba(205, 127, 50, 0.08);
}

.tier-bronze .tier-icon,
.tier-bronze .tier-price,
.tier-bronze .tier-check {
	color: #d99b66;
}

.tier-bronze .tier-btn {
	background-color: rgba(205, 127, 50, 0.12);
	border: 1px solid rgba(205, 127, 50, 0.35);
	color: #e6b385;
	font-size: 0.85rem;
	letter-spacing: 0.05em;
	transition: all 0.2s ease;
}

.tier-bronze .tier-btn:hover {
	background-color: #cd7f32;
	border-color: #cd7f32;
	color: #0b0b0c;
}

/* SILVER TIER THEME */
.tier-silver:hover {
	border-color: rgba(203, 213, 225, 0.45);
}

.tier-silver .tier-pill {
	color: #cbd5e1;
	border-color: rgba(203, 213, 225, 0.3);
	background-color: rgba(203, 213, 225, 0.08);
}

.tier-silver .tier-icon,
.tier-silver .tier-price,
.tier-silver .tier-check {
	color: #e2e8f0;
}

.tier-silver .tier-btn {
	background-color: rgba(203, 213, 225, 0.1);
	border: 1px solid rgba(203, 213, 225, 0.35);
	color: #f1f5f9;
	font-size: 0.85rem;
	letter-spacing: 0.05em;
	transition: all 0.2s ease;
}

.tier-silver .tier-btn:hover {
	background-color: #cbd5e1;
	border-color: #cbd5e1;
	color: #0b0b0c;
}

/* GOLD TIER THEME (Featured) */
.featured-tier-card {
	background-color: #17171a;
	border: 1px solid rgba(243, 198, 79, 0.65) !important;
	box-shadow: 0 0 32px rgba(243, 198, 79, 0.12);
}

.featured-tier-card:hover {
	box-shadow: 0 0 38px rgba(243, 198, 79, 0.2);
}

.badge-featured {
	background-color: var(--gold-accent);
	color: #0b0b0c;
	font-size: 0.65rem;
	letter-spacing: 0.08em;
}

.tier-gold .tier-pill {
	color: var(--gold-accent);
	border-color: rgba(243, 198, 79, 0.35);
	background-color: rgba(243, 198, 79, 0.1);
}

.tier-gold .tier-icon,
.tier-gold .tier-price,
.tier-gold .tier-check {
	color: var(--gold-accent);
}

.tier-gold .tier-btn {
	background-color: var(--gold-accent);
	border: 1px solid var(--gold-accent);
	color: #0b0b0c;
	font-size: 0.85rem;
	letter-spacing: 0.05em;
	box-shadow: 0 4px 16px rgba(243, 198, 79, 0.25);
	transition: all 0.2s ease;
}

.tier-gold .tier-btn:hover {
	background-color: var(--gold-accent-hover);
	border-color: var(--gold-accent-hover);
	color: #0b0b0c;
	box-shadow: 0 6px 20px rgba(243, 198, 79, 0.4);
}

/* Shared Buttons & Badges */
.hero-badge {
	background-color: rgba(158, 28, 78, 0.25);
	border: 1px solid var(--magenta-badge);
	color: var(--gold-accent);
	font-size: 0.72rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 1.1px;
	border-radius: 50px;
}

.btn-register {
	color: var(--text-main);
	background-color: transparent;
	border: 1px solid var(--border-subtle);
	font-size: 0.875rem;
	font-weight: 500;
	border-radius: 6px;
	transition: all 0.2s ease;
}

.btn-register:hover {
	background-color: rgba(243, 198, 79, 0.1);
	border-color: var(--gold-accent);
	color: var(--gold-accent);
}

.btn-login {
	background-color: var(--gold-accent);
	color: #0b0b0c;
	border: 1px solid var(--gold-accent);
	font-size: 0.875rem;
	font-weight: 600;
	border-radius: 6px;
	transition: all 0.2s ease;
}

.btn-login:hover {
	background-color: var(--gold-accent-hover);
	border-color: var(--gold-accent-hover);
	color: #0b0b0c;
	box-shadow: 0 0 14px rgba(243, 198, 79, 0.35);
}

/* Gallery Hover Effect */
.gallery-img {
	transition: transform 0.5s ease;
}

.surface-panel:hover .gallery-img {
	transform: scale(1.04);
}

/* Cards & Panels */
.surface-panel {
	background-color: var(--bg-surface);
	border: 1px solid var(--border-subtle);
}

/* Four Pillars Cards */
.policy-link-card {
	background-color: var(--bg-surface);
	border: 1px solid var(--border-subtle);
	transition: all 0.25s ease;
}

.policy-link-card:hover {
	background-color: var(--bg-surface-hover);
	border-color: rgba(243, 198, 79, 0.45);
	transform: translateY(-4px);
}

/* Form Inputs & Validation */
.dark-input {
	background-color: var(--bg-primary);
	border: 1px solid var(--border-subtle);
	color: var(--text-main);
	padding: 0.65rem 0.9rem;
	font-size: 0.9rem;
	border-radius: 8px;
}

.dark-input::placeholder {
	color: rgba(156, 163, 175, 0.65);
}

.dark-input:focus {
	background-color: var(--bg-primary);
	border-color: var(--gold-accent);
	color: var(--text-main);
	box-shadow: 0 0 0 2px rgba(243, 198, 79, 0.2);
}

.gold-checkbox {
	background-color: var(--bg-primary);
	border-color: var(--border-subtle);
}

.gold-checkbox:checked {
	background-color: var(--gold-accent);
	border-color: var(--gold-accent);
}

.alert-success-gold {
	background-color: rgba(243, 198, 79, 0.12);
	border: 1px solid rgba(243, 198, 79, 0.45);
}

.contact-info-row {
	background-color: var(--bg-primary);
	border: 1px solid var(--border-subtle);
}

/* FAQ Accordion */
.faq-card {
	background-color: var(--bg-surface);
	border: 1px solid var(--border-subtle);
	transition: border-color 0.2s ease;
}

.faq-card.active {
	border-color: rgba(243, 198, 79, 0.4);
}

.faq-chevron {
	transition: transform 0.25s ease;
}

.faq-chevron.rotated {
	transform: rotate(180deg);
}
</style>