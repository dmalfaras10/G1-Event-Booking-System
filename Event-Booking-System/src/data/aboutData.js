export const companyStats = [
  { value: "150+", label: "Live Events Hosted" },
  { value: "24/7", label: "Digital Ticket Access" },
  { value: "3 Tiers", label: "VIP Membership Perks" },
];

export const servicesData = [
  {
    code: "SERVICE // 01",
    icon: "bi-compass",
    title: "Centralized Event Discovery",
    description:
      "Browse upcoming concerts, orchestral galas, and intimate lounge shows across Metro Manila with real-time availability badges and multi-criteria filtering.",
    meta: "Live Schedule & Calendar",
  },
  {
    code: "SERVICE // 02",
    icon: "bi-grid-1x2",
    title: "Interactive Seat Reservations",
    description:
      "Select preferred ticket tiers and exact venue seats with temporary checkout holds that protect your selection from double-booking while you complete payment.",
    meta: "Real-Time Seat Locking",
  },
  {
    code: "SERVICE // 03",
    icon: "bi-gem",
    title: "VIP Memberships & Presale Access",
    description:
      "Unlock Bronze, Silver, and Gold subscription benefits including automatic ticket discounts, early presale windows, and exclusive member-only promotions.",
    meta: "Bronze • Silver • Gold",
  },
  {
    code: "SERVICE // 04",
    icon: "bi-qr-code-scan",
    title: "Verified Digital E-Tickets",
    description:
      "Receive instant booking confirmations and downloadable QR-coded digital passes straight to your account dashboard for fast, paperless venue entry.",
    meta: "Instant Pass Generation",
  },
];

export const contactDetails = {
  officeName: "G-ONE Headquarters & Patron Desk",
  addressLine1: "12th Floor, High Street South Corporate Plaza",
  addressLine2: "Bonifacio Global City, Taguig, Metro Manila",
  phonePrimary: "+63 (02) 8555-0192",
  phoneMobile: "+63 917 840 7277",
  emailSupport: "support@g-one-events.com",
  emailPartnerships: "partners@g-one-events.com",
  supportHours: "Monday – Sunday, 9:00 AM – 10:00 PM PHT",
};

export const socialLinks = [
  {
    name: "Facebook",
    icon: "bi-facebook",
    handle: "@GOneEventsPH",
    url: "https://facebook.com",
  },
  {
    name: "Instagram",
    icon: "bi-instagram",
    handle: "@g.one.events",
    url: "https://instagram.com",
  },
  {
    name: "X / Twitter",
    icon: "bi-twitter-x",
    handle: "@GOneTicketing",
    url: "https://x.com",
  },
  {
    name: "TikTok",
    icon: "bi-tiktok",
    handle: "@goneevents",
    url: "https://tiktok.com",
  },
];

export const inquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "booking", label: "Booking & Ticket Concern" },
  { value: "membership", label: "Membership & VIP Support" },
  { value: "feedback", label: "Feedback & Suggestions" },
  { value: "partnership", label: "Event Organizer / Partnership" },
];

export const policiesData = [
  {
    id: "terms",
    icon: "bi-file-earmark-text",
    title: "Terms of Service",
    summary:
      "Platform usage rules, account responsibilities, and acceptable conduct.",
    updated: "October 2026",
    content:
      "By creating an account or booking tickets through G-ONE, you agree to provide accurate registration information and maintain the confidentiality of your credentials. Tickets issued through G-ONE are strictly for personal use and may not be resold above face value on unauthorized platforms.",
  },
  {
    id: "privacy",
    icon: "bi-shield-lock",
    title: "Privacy Policy",
    summary:
      "How G-ONE collects, hashes, stores, and safeguards your personal data.",
    updated: "October 2026",
    content:
      "G-ONE collects only the information necessary to manage your account, process ticket bookings, and verify membership eligibility. Passwords are securely hashed, payment details are processed exclusively through external payment gateways, and personal data is never sold to third parties.",
  },
  {
    id: "refunds",
    icon: "bi-arrow-counterclockwise",
    title: "Refund & Cancellation Policy",
    summary:
      "Eligible cancellation windows, event rescheduling, and refund processing.",
    updated: "October 2026",
    content:
      "Confirmed bookings may be cancelled within the event’s specified refund window via the My Tickets dashboard. If an event is cancelled by the organizer, ticket holders are automatically eligible for a full refund or priority credit toward the rescheduled date.",
  },
  {
    id: "seathold",
    icon: "bi-hourglass-split",
    title: "Ticket & Seat Hold Policy",
    summary:
      "How temporary checkout timers and digital QR e-ticket verification work.",
    updated: "October 2026",
    content:
      "When you proceed to checkout, G-ONE temporarily locks your selected seats for a limited countdown window to prevent double-booking. If payment is not completed before the timer expires, the hold is automatically released back to public inventory. Each digital QR ticket is valid for single-entry redemption.",
  },
];

export const faqsData = [
  {
    id: 1,
    number: "01.",
    question: "How long are my selected seats held during checkout?",
    answer:
      "Once you proceed to checkout, G-ONE creates a temporary hold on your chosen seats and displays a live countdown timer. Completing payment before the timer expires confirms your booking and issues your digital tickets immediately.",
  },
  {
    id: 2,
    number: "02.",
    question: "How do Bronze, Silver, and Gold membership discounts apply?",
    answer:
      "If you hold an active subscription, our system automatically validates your membership tier during checkout and applies your eligible discount to the booking total before payment.",
  },
  {
    id: 3,
    number: "03.",
    question: "Where can I access or download my digital tickets?",
    answer:
      "After payment is verified, your unique QR e-tickets are immediately available inside the My Tickets section of your account, where you can view ticket statuses or download a PDF copy.",
  },
  {
    id: 4,
    number: "04.",
    question: "Can I cancel a confirmed booking or request a refund?",
    answer:
      "Yes, bookings can be cancelled directly from your Booking History table as long as the request falls within the event’s designated refund window. Cancelled tickets are invalidated and the seats return to available inventory.",
  },
];
