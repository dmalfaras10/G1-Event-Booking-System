# Technical Specifications Document

## 1. Title Page
- **Project Name**: G1: Event Booking System
- **Version**: 1.0
- **Date**: October 19, 2026
- **Author(s)**: Dan Michael Alfaras, Matthew Antonio Bulaong, Jovie Cleofas, Aaron Angelo Crisologo

## 2. Table of Contents
1. [Introduction](#3-introduction)
2. [Overall Description](#4-overall-description)
3. [Visual Mockup Reference](#5-visual-mockup-reference)
4. [Features](#6-features)
5. [Functional Requirements](#7-functional-requirements)
6. [Non-Functional Requirements](#8-non-functional-requirements)
7. [Data Requirements](#9-data-requirements)
8. [External Interface Requirements](#10-external-interface-requirements)
9. [Glossary](#11-glossary)
10. [Appendices](#12-appendices)

## 3. Introduction
- **Purpose**: To develop a web-based event ticketing platform that enables users to discover events, reserve seats, purchase digital tickets, and subscribe to tiered memberships (Bronze, Silver, Gold), while providing administrators with tools to manage events, venues, inventory, users, and bookings.
- **Scope**: Includes user authentication, event discovery and filtering, seat-hold checkout, digital ticket generation, membership subscriptions, and administrative CRUD operations. Excludes physical ticket printing/delivery, travel/accommodation booking, physical venue management, and native mobile applications.
- **Definitions, Acronyms, and Abbreviations**:
  - **G1 Event Booking System**: The web application for browsing events and booking tickets.
  - **User**: A guest or registered attendee browsing events, booking tickets, or managing their profile.
  - **Admin**: An authorized user managing events, venues, memberships, users, and bookings.
  - **Booking**: A reservation record holding selected ticket tiers, seats, and checkout status.
  - **MEVN**: MongoDB, Express.js, Vue.js, and Node.js technology stack.
  - **JWT**: JSON Web Token used for stateless authentication and role-based access control.
- **References**:
  - Coulouris, G., Dollimore, J., Kindberg, T., & Blair, G. (2011). *Distributed systems: Concepts and design* (5th ed.). Addison-Wesley.
  - Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database system concepts* (7th ed.). McGraw-Hill Education.
  - Sommerville, I. (2016). *Software engineering* (10th ed.). Pearson.

## 4. Overall Description
- **Product Perspective**: A centralized client-server web application built on the MEVN stack that streamlines online concert and event ticketing, seat reservation, membership perks, and back-office administration.
- **Product Functions**:
  - User registration, authentication, and profile management
  - Event browsing, searching, filtering, and interactive calendar discovery
  - Administrative management of events, venues, memberships, users, and bookings
  - Event booking, temporary seat-hold locking, and payment processing
  - Digital e-ticket generation (`ticketCode`) and booking history management
  - Tiered membership subscriptions (Bronze, Silver, Gold) with automated checkout discounts
- **User Classes and Characteristics**:
  - **Users / Attendees**: Customers who browse events, lock seats, purchase tickets, download e-tickets, and enroll in membership plans. Access is restricted to personal account data and public listings.
  - **System Admins**: Platform managers who create/update events, configure ticket tiers and membership plans, manage user roles, and monitor/override bookings and payments.
- **Operating Environment**:
  - **Client**: Modern desktop, tablet, and mobile browsers (Chrome, Edge, Firefox, Safari).
  - **Application**: Vue.js frontend SPA; Node.js and Express.js REST API backend.
  - **Database**: MongoDB Atlas with Mongoose ODM.
  - **Hosting & Security**: GitHub Pages (frontend), AWS/Cloud hosting (backend), HTTPS encryption, Bcrypt password hashing, and JWT role-based access control.
- **Assumptions and Dependencies**:
  - **Assumptions**: Users and admins have reliable internet access and provide accurate information; third-party payment gateway and email notification integrations are post-MVP deliverables.
  - **Dependencies**: MongoDB Atlas, MEVN stack runtime, cloud hosting infrastructure, and external payment/email providers (post-MVP).

## 5. Visual Mockup Reference
- **Link or Screenshot**: [G1: Event Booking System Figma Mockup](https://www.figma.com/design/GEkylbxWNNZ7c7XL5YBRtb/Event-Booking-Side-Project?node-id=0-1&t=MZUb4SSz7qulHcHh-1)

## 6. Features
- **Search & Navigation**: Global search bar (events and venues) and header navigation across main platform pages.
- **User Accounts & Profile Management**: Registration, JWT login/logout, password updates, profile editing, and booking history.
- **Homepage & Featured Shows**: Hero carousel, featured/upcoming event highlights, quick links, and FAQs.
- **Event Listings**: Filterable catalog by category, date, venue, location, price, and genre, plus an interactive calendar view.
- **Event Details & Booking**: Event rules, performer/venue info, ticket tier comparison, seat selection, temporary seat-hold timer, checkout summary, and e-ticket issuance.
- **Contact Us and About Us Page**: Organization overview, support contact details, and inquiry submission form.
- **Membership and Subscriptions**: Side-by-side comparison of Bronze, Silver, and Gold plans, perk checklists, enrollment, and status tracking.
- **Email and Notifications**: Automated transactional emails for booking confirmations, e-tickets, membership updates, and event reminders (post-MVP).
- **Administrative Management**: Role-restricted dashboard for full CRUD control over events, ticket tiers, membership plans, user accounts, and booking statuses.

## 7. Functional Requirements
### Use Cases
- **Use Case 1**: Register and Manage User Account
  - **Title**: User Account Registration and Profile Management
  - **Description**: Allows users to register, authenticate, update profile details, and view booking history.
  - **Actors**: Guest, Registered User
  - **Preconditions**: Guest has a valid, unregistered email address.
  - **Postconditions**: Account is created, authenticated, or updated.
  - **Main Flow**: User selects Register/Login > Enters credentials/details > System validates input and hashes password > System creates account or issues JWT > User accesses profile.
  - **Alternate Flows**: Invalid format, weak password, duplicate email, or wrong credentials > System rejects request and displays specific error message; Forgot password > System sends reset link.

- **Use Case 2**: Browse Events and View Event Details
  - **Title**: Event Listings
  - **Description**: Allows users to search, filter, and inspect detailed event and ticket tier information.
  - **Actors**: Guest, Registered User
  - **Preconditions**: Published events exist in the database.
  - **Postconditions**: User views matching events, venue details, and real-time tier/seat availability.
  - **Main Flow**: User opens Event Listings > Searches or filters by category, date, venue, price, or genre > Selects an event > System displays full schedule, venue, rules, and ticket tiers.
  - **Alternate Flows**: No matching events or sold-out tiers > System shows "No results found" or disables sold-out tier selection; Load error > System prompts retry.

- **Use Case 3**: Book Tickets and Complete Payment
  - **Title**: Event Booking and Payment
  - **Description**: Allows users to select ticket tiers and seats, hold inventory temporarily, and complete payment.
  - **Actors**: Registered User, Payment Gateway
  - **Preconditions**: User is authenticated; event tickets and seats are available.
  - **Postconditions**: Booking and seats are marked confirmed/booked, payment is logged, and digital tickets are generated.
  - **Main Flow**: User selects event, ticket tier, quantity, and seats > System calculates total (applying active membership discounts) > User proceeds to checkout > System creates `pending` booking with `expiresAt` timer and locks selected seats (`lockedBy`) > User submits payment > System verifies payment > System updates booking/payment to `confirmed`, marks seats `booked`, and issues `Tickets`.
  - **Alternate Flows**: Seat already locked/booked or quantity exceeds limit > System prompts reselection; Hold timer expires or user cancels > System sets booking to `cancelled` and releases seat locks; Payment fails > System logs failed payment and allows retry within hold window.

- **Use Case 4**: Manage Events and System Records
  - **Title**: Administrative Management
  - **Description**: Allows admins to create, update, archive, or delete events, tiers, memberships, users, and bookings.
  - **Actors**: System Administrator
  - **Preconditions**: Admin is authenticated with `isAdmin: true`.
  - **Postconditions**: Target database records are created, updated, or removed.
  - **Main Flow**: Admin logs in > System verifies admin role > Admin selects management module > Creates, updates, or deletes record > System validates and saves changes.
  - **Alternate Flows**: Unauthorized user > System denies access; Record in use (e.g., event with active bookings) > System blocks deletion and offers archival/cancellation; Validation conflict > System rejects save.

- **Use Case 5**: Membership and Subscription Benefits
  - **Title**: Membership and Subscription
  - **Description**: Allows users to compare Bronze, Silver, and Gold tiers, subscribe, and manage renewals.
  - **Actors**: Registered User, Payment Gateway
  - **Preconditions**: User is logged in; active membership plans exist.
  - **Postconditions**: `User_Subscriptions` and `Payments` records are created or updated.
  - **Main Flow**: User opens Membership page > Compares plans and selects tier > Reviews plan details > Confirms and completes payment > System activates subscription and displays perks.
  - **Alternate Flows**: User already subscribed > System offers renewal or tier upgrade; Payment fails or pending > System withholds activation until verified.

- **Use Case 6**: Receive Email Notifications
  - **Title**: Email and Notifications
  - **Description**: Sends automated emails for bookings, payments, e-tickets, memberships, and event updates.
  - **Actors**: Registered User, Notification Service
  - **Preconditions**: Triggering system event occurs and user has a valid email.
  - **Postconditions**: Notification email is dispatched and delivery status is logged.
  - **Main Flow**: System detects trigger event > Formats email payload > Sends via notification service > Logs delivery status > User receives email.
  - **Alternate Flows**: Service unavailable > System queues for retry; Email bounces > System marks undelivered while keeping tickets accessible in "My Tickets".

### System Features
- **Feature 1**: Search and Navigation
  - **Description**: Keyword search and top-level page routing.
  - **Priority**: High
  - **Inputs**: Search query, navigation selection
  - **Processing**: Query database across events/venues; route client view
  - **Outputs**: Matching results or target page
  - **Error Handling**: Display "No results found" or page load error

- **Feature 2**: User Accounts and Profile Management
  - **Description**: Registration, JWT login/logout, profile updates, and password management.
  - **Priority**: High
  - **Inputs**: Name, email, password, mobile number
  - **Processing**: Validate fields, hash password with Bcrypt, issue/revoke JWT, update `Users` collection
  - **Outputs**: Auth tokens, updated profile, booking history
  - **Error Handling**: Reject invalid inputs, duplicate emails, or unauthorized requests

- **Feature 3**: Homepage and Featured Shows
  - **Description**: Hero banner slider, featured events, and FAQs.
  - **Priority**: Medium
  - **Inputs**: Featured event query, user slide selection
  - **Processing**: Fetch active featured events from `Events`
  - **Outputs**: Hero carousel, event cards, FAQ section
  - **Error Handling**: Show fallback message if featured content is empty

- **Feature 4**: Event Discovery and Listings
  - **Description**: Searchable, filterable event catalog and calendar view.
  - **Priority**: High
  - **Inputs**: Category, date range, location, venue, price range, genre
  - **Processing**: Filter and paginate `Events` using indexed queries
  - **Outputs**: Paginated event cards and calendar grouping
  - **Error Handling**: Notify user when filters return zero matches

- **Feature 5**: Event Details and Booking
  - **Description**: Tier/seat selection, temporary seat locking, checkout calculation, and ticket generation.
  - **Priority**: High
  - **Inputs**: `event_id`, `ticketType_id`, `ticketQuantity`, `seat_ids`, payment details
  - **Processing**: Verify inventory, lock `Seats`, create `Bookings` with `expiresAt`, apply membership discounts, verify `Payments`, generate `Tickets`
  - **Outputs**: `bookingRef`, payment confirmation, QR `ticketCode`
  - **Error Handling**: Prevent overselling/double-locking, expire stale holds, block unverified ticket issuance

- **Feature 6**: About Us and Contact Us
  - **Description**: Company background and user inquiry form.
  - **Priority**: Medium
  - **Inputs**: Sender details, inquiry message
  - **Processing**: Validate form fields and store/forward inquiry
  - **Outputs**: Submission confirmation message
  - **Error Handling**: Highlight missing/invalid form fields

- **Feature 7**: Membership and Subscription
  - **Description**: Tier comparison (Bronze, Silver, Gold), enrollment, and perk validation.
  - **Priority**: Medium
  - **Inputs**: `subscriptionPlan_id`, user credentials, payment details
  - **Processing**: Validate plan availability, process payment, create `User_Subscriptions` record with `startDate` and `endDate`
  - **Outputs**: Active membership status and checkout discounts
  - **Error Handling**: Block duplicate active enrollments and handle failed payments

- **Feature 8**: Email and Notifications
  - **Description**: Transactional email dispatch for bookings, tickets, and memberships.
  - **Priority**: Medium
  - **Inputs**: User email, booking/payment/membership payload
  - **Processing**: Generate email template and send via external notification service
  - **Outputs**: Email confirmation and delivery log
  - **Error Handling**: Queue and retry failed deliveries without blocking core booking transactions

- **Feature 9**: Administrative Management
  - **Description**: Back-office CRUD for events, venues, tiers, memberships, users, and bookings.
  - **Priority**: High
  - **Inputs**: Admin auth token, entity payloads, status overrides
  - **Processing**: Verify `isAdmin`, validate relational integrity, execute CRUD updates
  - **Outputs**: Updated system records and inventory logs
  - **Error Handling**: Deny non-admin access, reject invalid date/price values, prevent deleting events with active bookings

## 8. Non-Functional Requirements
- **Performance**:
  - Fast page loads and API responses using MongoDB indexes and cursor-based pagination.
  - Atomic concurrency control on seat locks and ticket quantities to prevent overselling during traffic spikes.
- **Security**:
  - Passwords hashed via Bcrypt; authentication and RBAC enforced via short-lived JWT access tokens and server-persisted refresh tokens.
  - Backend input validation, HTTPS transport encryption, environment-isolated secrets, and signature-verified payment webhooks.
- **Usability**:
  - Responsive layout across desktop, tablet, and mobile browsers guided by WCAG 2.2 Level AA principles.
  - Clear visual indicators for seat-hold countdowns, ticket availability badges, and ticket/payment statuses.
- **Reliability**:
  - Idempotent webhook and payment handling to prevent duplicate bookings or double-charged transactions.
  - Transactional consistency across `Bookings`, `Seats`, `Payments`, and `Tickets`, with automatic release of expired seat holds.
- **Supportability**:
  - Modular MEVN codebase, documented REST API endpoints, Git version control, and extensible Mongoose schemas.

## 9. Data Requirements
- **Data Models**:
  - **Users**: `{ _id, firstName, lastName, email, password, mobileNo, isAdmin, createdAt, updatedAt }`
  - **Subscription_Plan**: `{ _id, user_id (FK -> Users), subscriptionType, subscriptionPrice, subscriptionPerks, subscriptionStatus, createdAt, updatedAt }`
  - **User_Subscriptions**: `{ _id, user_id (FK -> Users), subscriptionPlan_id (FK -> Subscription_Plan), subscriptionStatus, startDate, endDate, createdAt, updatedAt }`
  - **Venues**: `{ _id, venueName, venueAddress, mapURL, venueCapacity, createdAt, updatedAt }`
  - **Events**: `{ _id, user_id (FK -> Users), venue_id (FK -> Venues), eventImage, eventName, eventDescription, eventCategory, eventStartDateTime, eventEndDateTime, eventStatus, ticketType: [{ ticketType_id, ticketType, ticketPrice, ticketPerks, ticketDescription, availableQuantity }], artistName, createdAt, updatedAt }`
  - **Seats**: `{ _id, venue_id (FK -> Venues), event_id (FK -> Events), seatSection, seatRow, seatNumber, seatStatus, expiresAt, lockedBy (FK -> Users), isActive }`
  - **Bookings**: `{ _id, user_id (FK -> Users), event_id (FK -> Events), items: [{ ticketType_id, ticketType, ticketQuantity, ticketPrice, seat_ids: [ObjectId (FK -> Seats)] }], bookingStatus, expiresAt, totalAmount, bookingRef, createdAt, updatedAt }`
  - **Payments**: `{ _id, booking_id (FK -> Bookings), userSubscription_id (FK -> User_Subscriptions), paymentMethod, paymentStatus, totalAmount, transactionRef, paidAt, createdAt, updatedAt }`
  - **Tickets**: `{ _id, booking_id (FK -> Bookings), ticketType_id (FK -> Events.ticketType), seat_id (FK -> Seats), ticketCode, ticketStatus, createdAt, updatedAt }`
- **Database Requirements**:
  - MongoDB Atlas with Mongoose ODM schemas; `ObjectId` references for relational integrity; `Decimal128` for monetary fields; indexed fields for search, seat locks, and booking lookups.
- **Data Storage and Retrieval**:
  - All CRUD operations pass exclusively through Express.js backend routes; temporary checkout holds are stored as `pending` bookings with locked `Seats` prior to payment verification and e-ticket generation.

## 10. External Interface Requirements
- **User Interfaces**:
  - **Public Pages**: Homepage (`/`), Event Listings (`/events`), Event Details (`/events/:id`), Venue Details (`/venues/:id`), Memberships (`/membership`), Sign In / Register (`/auth/:mode`), Contact / About (`/contact`).
  - **Authenticated User Pages**: Checkout (`/checkout/:bookingId`), Booking Confirmation (`/checkout/:bookingId/confirmation`), Profile (`/account/profile`), My Tickets (`/account/tickets`).
  - **Admin Pages**: Admin Dashboard (`/admin`).
  - **Key Reusable UI Components**: Global Search Bar, Header Navigation, Hero Carousel, Event Card, Ticket Selection Table, Interactive Calendar, Seat-Hold Countdown Timer, Membership Plan Comparison, Payment Status Panel, Booking History Table.
- **API Interfaces** (Base path `/api/v1`, JSON REST API with `Authorization: Bearer <token>`):
  - **Public / Guest**: `POST /auth/register`, `POST /auth/login`, `GET /events`, `GET /events/:id`, `GET /events/calendar`, `GET /membership`, `GET /membership/:id`, `GET /search`, `POST /contact`.
  - **Registered User**: `GET /users/me`, `PATCH /users/me`, `POST /users/logout`, `PATCH /users/me/password`, `GET /bookings/:id`, `POST /bookings/:id`, `GET /bookings/:id/ticket`, `GET /bookings/:id/ticket.pdf`, `DELETE /bookings/:id/delete`, `POST /payments/intent`, `GET /payments/:id`, `GET /membership/subscriptions/me`, `POST /membership/subscriptions`.
  - **System Admin**: `GET/POST /admin/events`, `PATCH/DELETE /admin/events/:id`, `GET /admin/bookings`, `PATCH /admin/bookings/:id`, `GET /admin/contact`, `GET /admin/users`, `PATCH /admin/users/:id`, `GET /admin/subscriptions`, `POST /admin/membership`, `PATCH/DELETE /admin/membership/:id`, `GET /admin/payments`, `GET /admin/tickets`.
- **Hardware Interfaces**:
  - Standard commodity desktop computers, laptops, tablets, and smartphones.
- **Software Interfaces**:
  - **Database Service**: MongoDB Atlas accessed via official Node.js driver connection pooling and IP allowlisting.
  - **Authentication Store**: Server-side JWT issuance and revocable refresh-token persistence.
  - **Payment Gateway (Post-MVP)**: External payment processor integrated via idempotent, signature-verified backend webhooks.

## 11. Glossary
- **BSON**: Binary-encoded JSON format used by MongoDB.
- **Concurrency Control**: Database locking mechanism preventing simultaneous booking of the same seat or ticket inventory.
- **Cursor-Based Pagination**: Sequential record fetching using an identifier pointer for consistent query performance.
- **E-Ticket**: Digital ticket containing a unique verification `ticketCode` (QR/barcode) issued upon confirmed payment.
- **Idempotency**: Guarantee that repeated webhook or API requests do not duplicate bookings, payments, or inventory deductions.
- **Membership Plan**: Recurring subscription tier (Bronze, Silver, Gold) granting discounts, presale access, and exclusive perks.
- **Mongoose (ODM)**: Object Data Modeling library used to enforce schemas and relationships in MongoDB.
- **RBAC**: Role-Based Access Control restricting routes by `guest`, `user`, and `admin` roles.
- **Seat Hold**: Temporary checkout lock (`expiresAt`, `lockedBy`) reserving specific seats while payment is completed.
- **Webhook**: Automated HTTP callback from the payment provider notifying the backend of transaction status changes.

## 12. Appendices
- **Supporting Information**:
  - Entity Relationship Diagram (ERD) and High-Level Data Model Diagram (see TSD PDF Section: Data Requirements)
  - [Figma Visual Wireframes & Mockups](https://www.figma.com/design/GEkylbxWNNZ7c7XL5YBRtb/Event-Booking-Side-Project?node-id=0-1&t=MZUb4SSz7qulHcHh-1)
- **Revision History**:
  - **v1.0**: Initial consolidated specification with revised 9-collection ERD and seat-hold booking architecture - October 19, 2026