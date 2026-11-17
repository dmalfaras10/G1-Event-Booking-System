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

<style scoped>
/* Footer Start */

.footer-section {
    background-color: var(--bg-surface);
    border-top: 1px solid var(--border-subtle);
    color: var(--text-muted);
}

.footer-section .footer-brand {
    color: var(--text-main);
    font-weight: 800;
    font-size: 1.4rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    text-decoration: none;
}

.footer-section .footer-brand:hover {
    color: var(--text-main);
}

.footer-brand-emblem {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: linear-gradient(135deg, rgba(243, 198, 79, 0.2), rgba(243, 198, 79, 0.05));
    border: 1px solid rgba(243, 198, 79, 0.35);
    color: var(--gold-accent);
    font-size: 1.1rem;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.footer-section .footer-brand:hover .footer-brand-emblem {
    box-shadow: 0 0 15px rgba(243, 198, 79, 0.35);
    transform: rotate(15deg);
}

.footer-brand-hyphen {
    color: var(--gold-accent);
}

.footer-col-title {
    color: var(--text-main);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 1.1rem;
}

.footer-text-gold {
    color: var(--gold-accent);
}

.footer-text-main {
    color: var(--text-main);
}

.footer-section a:not(.footer-brand):not(.footer-social-btn) {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s ease, transform 0.2s ease;
    display: inline-block;
}

.footer-section a:not(.footer-brand):not(.footer-social-btn):hover {
    color: var(--gold-accent);
}

.footer-section ul a:hover {
    transform: translateX(4px);
}

.footer-social-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background-color: var(--bg-primary);
    border: 1px solid var(--border-subtle);
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}

.footer-social-btn:hover {
    background-color: var(--bg-surface-hover);
    border-color: var(--gold-accent);
    color: var(--gold-accent);
    transform: translateY(-2px);
}

.footer-divider-row {
    border-bottom: 1px solid var(--border-subtle);
}

.footer-newsletter-input {
    background-color: var(--bg-primary);
    border: 1px solid var(--border-subtle);
    border-right: none;
    color: var(--text-main);
    font-size: 0.875rem;
    padding: 0.55rem 0.85rem;
    border-radius: 8px 0 0 8px;
    transition: border-color 0.2s ease;
}

.footer-newsletter-input::placeholder {
    color: var(--text-muted);
}

.footer-newsletter-input:hover,
.footer-newsletter-input:focus {
    background-color: var(--bg-primary);
    border-color: var(--gold-accent);
    color: var(--text-main);
    box-shadow: none;
}

.footer-submit-btn {
    background-color: var(--gold-accent);
    color: var(--bg-primary);
    border: 1px solid var(--gold-accent);
    border-radius: 0 8px 8px 0;
    font-weight: 600;
    transition: all 0.2s ease;
}

.footer-submit-btn:hover {
    background-color: var(--gold-accent-hover);
    border-color: var(--gold-accent-hover);
    color: var(--bg-primary);
    box-shadow: 0 0 14px rgba(243, 198, 79, 0.35);
}

/* Footer End  */
</style>