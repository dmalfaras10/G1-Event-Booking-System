<script setup>
import { useGlobalStore} from '../stores/global.js';
const { user } = useGlobalStore();
</script>

<template>
    <footer class="footer-section pt-5 pb-4 mt-auto">
        <div class="container">
            <div class="row g-4 pb-4 footer-divider-row">
                <!-- Brand Column -->
                <div class="col-lg-4">
                    <router-link class="footer-brand d-inline-flex align-items-center gap-2 mb-3" to="/">
                        <span class="footer-brand-emblem">
                            <i class="bi bi-vinyl-fill"></i>
                        </span>
                        <span class="footer-brand-text">G<span class="footer-brand-hyphen">-</span>ONE</span>
                    </router-link>
                    <p class="small mb-3 pe-lg-4">
                        Your premier destination for exclusive live events, VIP experiences, and unforgettable performances.
                    </p>
                    <!-- Social Icons -->
                    <div class="d-flex gap-2">
                        <a href="#" class="footer-social-btn" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                        <a href="#" class="footer-social-btn" aria-label="Twitter / X"><i class="bi bi-twitter-x"></i></a>
                        <a href="#" class="footer-social-btn" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
                        <a href="#" class="footer-social-btn" aria-label="Spotify"><i class="bi bi-spotify"></i></a>
                    </div>
                </div>
                <!-- Quick Links -->
                <div class="col-6 col-md-4 col-lg-2">
                    <h6 class="footer-col-title">Quick Links</h6>
                    <ul class="list-unstyled small d-flex flex-column gap-2">
                        <li><router-link to="/"><i class="bi bi-chevron-right small me-1 footer-text-gold"></i>Home</router-link></li>
                        <li><router-link to="/events"><i class="bi bi-chevron-right small me-1 footer-text-gold"></i>Events</router-link></li>
                        <li><a href="#"><i class="bi bi-chevron-right small me-1 footer-text-gold"></i>VIP</a></li>
                        <li><a href="#"><i class="bi bi-chevron-right small me-1 footer-text-gold"></i>About</a></li>
                        <li><a href="#"><i class="bi bi-chevron-right small me-1 footer-text-gold"></i>Contact</a></li>
                    </ul>
                </div>
                <!-- Account & Support -->
                <div class="col-6 col-md-4 col-lg-3">
                    <h6 class="footer-col-title">Account &amp; Support</h6>
                    <ul class="list-unstyled small d-flex flex-column gap-2">
                        <li><router-link :to="user?.email ? '' : '/register'"><i class="bi bi-chevron-right small me-1 footer-text-gold"></i>Create Account</router-link></li>
                        <li><router-link :to="user?.email ? '' : '/login'"><i class="bi bi-chevron-right small me-1 footer-text-gold"></i>Member Login</router-link></li>
                        <li><a href="#"><i class="bi bi-chevron-right small me-1 footer-text-gold"></i>Help Center</a></li>
                    </ul>
                </div>
                <!-- Newsletter -->
                <div class="col-md-4 col-lg-3">
                    <h6 class="footer-col-title">Stay Updated</h6>
                    <p class="small mb-3">
                        Subscribe to receive updates on upcoming events and VIP access.
                    </p>
                    <form class="input-group footer-newsletter-group" @submit.prevent>
                        <input
                            type="email"
                            class="form-control footer-newsletter-input"
                            placeholder="Enter your email"
                            aria-label="Email address"
                            required
                        />
                        <button class="btn footer-submit-btn px-3" type="submit" aria-label="Subscribe">
                            <i class="bi bi-send-fill"></i>
                        </button>
                    </form>
                </div>
            </div>
            <!-- Bottom Copyright Bar -->
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-4 gap-2 small">
                <div>
                    <i class="bi bi-c-circle me-1"></i>2026 <span class="footer-text-main fw-semibold">G-ONE</span>. All rights reserved.
                </div>
                <div class="d-flex gap-3">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
</template>