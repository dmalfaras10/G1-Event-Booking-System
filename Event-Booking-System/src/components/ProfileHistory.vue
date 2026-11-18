<script setup>
	import { ref, computed } from 'vue';
	import { mockBookings } from '../data/mockBookings.js';

	const activeFilter = ref('All');
	const searchQuery = ref('');

	// Grab ONLY the first booking item from the mock dataset and split its seats
	const rawFirstBooking = mockBookings[0] || {};

	// Expand the first booking into individual seat passes based on seatCodes array
	const splitSeatBookings = computed(() => {
		const seats = rawFirstBooking.seatCodes || ['A-1'];
		return seats.map((seatCode, index) => ({
			...rawFirstBooking,
			id: `${rawFirstBooking.id}-${index + 1}`,
			bookingCode: `${rawFirstBooking.bookingCode}-${index + 1}`,
			seatCodes: [seatCode],
			quantity: 1,
			totalPrice: rawFirstBooking.unitPrice, // Individual unit price per separated pass
			passIndex: index + 1
		}));
	});

	const filteredBookings = computed(() => {
		return splitSeatBookings.value.filter(booking => {
			const matchesFilter = 
				activeFilter.value === 'All' ? true :
				activeFilter.value === 'Active' ? booking.status === 'Confirmed' :
				booking.status === activeFilter.value;

			const matchesSearch = 
				booking.eventName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
				booking.bookingCode.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
				booking.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
				booking.seatSection.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
				booking.seatCodes[0].toLowerCase().includes(searchQuery.value.toLowerCase());

			return matchesFilter && matchesSearch;
		});
	});

	const totalFolioValue = computed(() => {
		return splitSeatBookings.value
			.filter(b => b.status === 'Confirmed')
			.reduce((sum, b) => sum + b.totalPrice, 0)
			.toLocaleString('en-US', { minimumFractionDigits: 2 });
	});

	const activeCount = computed(() => {
		return splitSeatBookings.value.filter(b => b.status === 'Confirmed').length;
	});

	const formatDate = (isoString) => {
		const options = { month: 'short', day: 'numeric', year: 'numeric' };
		return new Date(isoString).toLocaleDateString('en-US', options);
	};

	const formatTime = (isoString) => {
		const options = { hour: 'numeric', minute: '2-digit', hour12: true };
		return new Date(isoString).toLocaleTimeString('en-US', options) + ' PHT';
	};

	// Status badge styling helper
	const getStatusBadgeClass = (status) => {
		switch (status) {
			case 'Confirmed': return 'bg-success bg-opacity-25 text-success border border-success border-opacity-25';
			case 'Pending': return 'bg-warning bg-opacity-25 text-warning border border-warning border-opacity-25';
			case 'Cancelled': return 'badge-magenta';
			case 'Refunded': return 'bg-dark border border-subtle text-vault-muted';
			default: return 'bg-dark border border-subtle text-gold';
		}
	};
</script>

<template>
	<div class="d-flex flex-column gap-4">
		<!-- Top Page Header & Summary Box -->
		<div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-start gap-3">
			<div>
				<h1 class="text-white fw-bold mb-1" style="font-family: Georgia, serif;">Ticket Inventory &amp; Booking History</h1>
			</div>

			<!-- Right Summary Pill Box -->
			<div class="bg-surface border border-subtle rounded-3 p-3 d-flex align-items-center gap-4 flex-shrink-0">
				<div class="d-flex align-items-center gap-3">
					<div class="rounded bg-dark border border-subtle p-2 text-gold">🎫</div>
					<div>
						<div class="text-white fw-semibold small">{{ activeCount }} Bookings</div>
						<div class="text-gold" style="font-size: 0.65rem; letter-spacing: 0.05em;">ACTIVE &amp; ADMITTANCE READY</div>
					</div>
				</div>
				<div class="border-start border-subtle ps-3 text-end">
					<div class="text-vault-muted" style="font-size: 0.65rem;">TOTAL TICKETS VALUE</div>
					<div class="text-white fw-bold small">₱{{ totalFolioValue }} <span class="text-vault-muted fw-normal">USD</span></div>
				</div>
			</div>
		</div>

		<!-- Filter & Action Toolbar -->
		<div class="d-flex flex-wrap justify-content-between align-items-center gap-2 pb-2 border-bottom border-subtle">
			<div class="d-flex flex-wrap gap-2">
				<button 
					type="button" 
					class="btn filter-pill rounded-pill px-3 py-1"
					:class="{ active: activeFilter === 'All' }"
					@click="activeFilter = 'All'"
				>
					All Passes ({{ splitSeatBookings.length }})
				</button>
				<button 
					type="button" 
					class="btn filter-pill rounded-pill px-3 py-1"
					:class="{ active: activeFilter === 'Active' }"
					@click="activeFilter = 'Active'"
				>
					Active (Confirmed)
				</button>
				<button 
					type="button" 
					class="btn filter-pill rounded-pill px-3 py-1"
					:class="{ active: activeFilter === 'Pending' }"
					@click="activeFilter = 'Pending'"
				>
					Pending
				</button>
				<button 
					type="button" 
					class="btn filter-pill rounded-pill px-3 py-1"
					:class="{ active: activeFilter === 'Cancelled' }"
					@click="activeFilter = 'Cancelled'"
				>
					Cancelled / Refunded
				</button>
			</div>

			<div class="d-flex gap-2">
				<input 
					type="text" 
					class="form-control form-control-sm py-1 px-3 text-white" 
					placeholder="Search separated passes..." 
					v-model="searchQuery"
					style="max-width: 220px;"
				>
			</div>
		</div>

		<!-- Empty State Check -->
		<div v-if="filteredBookings.length === 0" class="text-center py-5 bg-surface border border-subtle rounded-3">
			<div class="text-gold fs-3 mb-2">🔍</div>
			<h6 class="text-white fw-semibold">No separated pass records found</h6>
			<p class="text-vault-muted small mb-0">Try selecting a different filter category or search term.</p>
		</div>

		<!-- Dynamic Separated Seat Pass Cards -->
		<div 
			v-for="booking in filteredBookings" 
			:key="booking.id" 
			class="bg-surface border border-subtle rounded-3 overflow-hidden"
		>
			<div class="row g-0">
				<div class="col-12 col-lg-8 p-4 border-end border-subtle d-flex flex-column justify-content-between">
					<div>
						<div class="d-flex flex-wrap align-items-center justify-content-between mb-2" style="font-size: 0.7rem;">
							<span class="text-gold fw-bold font-monospace">PASS ORDER #{{ booking.bookingCode }}</span>
							<span class="badge px-2 py-1" :class="getStatusBadgeClass(booking.status)" style="font-size: 0.65rem;">
								{{ booking.status.toUpperCase() }}
							</span>
						</div>

						<div class="badge badge-magenta rounded-pill px-2 py-1 mb-2 text-uppercase" style="font-size: 0.65rem; letter-spacing: 0.05em;">
							{{ booking.ticketType }} // {{ booking.seatSection }})
						</div>
						<h3 class="text-white fw-semibold mb-3" style="font-family: Georgia, serif;">
							{{ booking.eventName }}
						</h3>

						<div class="row g-2 mb-3">
							<div class="col-md-4">
								<div class="p-2 px-3 rounded bg-dark border border-subtle h-100">
									<div class="text-vault-muted" style="font-size: 0.65rem;">DATE &amp; TIME</div>
									<div class="text-white fw-semibold small">{{ formatDate(booking.eventDate) }}</div>
									<div class="text-vault-muted" style="font-size: 0.7rem;">{{ formatTime(booking.eventDate) }}</div>
								</div>
							</div>
							<div class="col-md-4">
								<div class="p-2 px-3 rounded bg-dark border border-subtle h-100">
									<div class="text-vault-muted" style="font-size: 0.65rem;">INDIVIDUAL SEAT CODE</div>
									<div class="text-white fw-semibold small font-monospace text-gold">{{ booking.seatCodes[0] }}</div>
									<div class="text-vault-muted" style="font-size: 0.7rem;">Single Pass Allocation</div>
								</div>
							</div>
							<div class="col-md-4">
								<div class="p-2 px-3 rounded bg-dark border border-subtle h-100">
									<div class="text-vault-muted" style="font-size: 0.65rem;">PASS TARIFF PRICE</div>
									<div class="text-white fw-semibold small">₱{{ booking.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</div>
									<div class="text-vault-muted" style="font-size: 0.7rem;">Dedicated Seat Pass</div>
								</div>
							</div>
						</div>
					</div>

					<div class="d-flex flex-wrap gap-2 pt-2">
						<button type="button" class="btn btn-gold btn-sm px-3 py-2">View Encrypted Pass / NFC</button>
						<button type="button" class="btn btn-outline-light btn-sm px-3 py-2 border-subtle">Download E-PDF</button>
					</div>
				</div>

				<div class="col-12 col-lg-4 p-4 d-flex flex-column justify-content-between bg-black bg-opacity-25">
					<div class="d-flex justify-content-between align-items-center">
						<span class="text-vault-muted" style="font-size: 0.65rem;">INDIVIDUAL ACCESS STUB</span>
						<span class="badge bg-dark border border-subtle text-gold" style="font-size: 0.65rem;">{{ booking.seatSection }}</span>
					</div>

					<!-- Stylized Gold QR Key Box -->
					<div class="my-3 text-center">
						<div class="d-inline-flex flex-column align-items-center justify-content-center p-3 rounded-3 border border-subtle bg-dark" style="width: 130px; height: 130px;">
							<div class="border border-2 border-warning rounded p-2 text-gold fw-bold small lh-sm">
								[ QR ]<br><span style="font-size: 0.55rem;">SEAT: {{ booking.seatCodes[0] }}</span>
							</div>
						</div>
						<div class="text-vault-muted mt-2 font-monospace" style="font-size: 0.65rem;">PASS: {{ booking.bookingCode }}</div>
					</div>

					<div class="border-top border-subtle pt-2" style="font-size: 0.7rem;">
						<div class="d-flex justify-content-between text-vault-muted">
							<span>ASSIGNED SEAT</span>
							<span class="text-warning font-monospace fw-bold">{{ booking.seatCodes[0] }}</span>
						</div>
						<div class="d-flex justify-content-between text-vault-muted">
							<span>PRIMARY HOLDER</span>
							<span class="text-white">{{ booking.fullName }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>