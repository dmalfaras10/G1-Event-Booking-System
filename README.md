\# G1 Event Booking System Repository



\## 1. Title Page

\- \*\*Project Name\*\*: Simple E-commerce Application

\- \*\*Version\*\*: 1.0

\- \*\*Date\*\*: June 20, 2024

\- \*\*Author(s)\*\*: Bootcamp Group



\## 2. Table of Contents

1\. \[Introduction](#3-introduction)

2\. \[Overall Description](#4-overall-description)

3\. \[Visual Mockup Reference](#5-visual-mockup-reference)

4\. \[Features](#6-features)

5\. \[Functional Requirements](#7-functional-requirements)

6\. \[Non-Functional Requirements](#8-non-functional-requirements)

7\. \[Data Requirements](#9-data-requirements)

8\. \[External Interface Requirements](#10-external-interface-requirements)

9\. \[Glossary](#11-glossary)

10\. \[Appendices](#12-appendices)



\## 3. Introduction

\- \*\*Purpose\*\*: To develop a simple e-commerce application that allows users to browse a catalog, add items to a cart, checkout, and make payments.

\- \*\*Scope\*\*: The application will include user registration, product catalog, shopping cart, checkout process, and integration with a payment gateway. It will not include advanced features such as user reviews or order tracking.

\- \*\*Definitions, Acronyms, and Abbreviations\*\*: 

&#x20; - \*\*SKU\*\*: Stock Keeping Unit

&#x20; - \*\*API\*\*: Application Programming Interface

\- \*\*References\*\*: None



\## 4. Overall Description

\- \*\*Product Perspective\*\*: The application is a standalone web app for small businesses to sell products online.

\- \*\*Product Functions\*\*: 

&#x20; - User registration and login

&#x20; - Product browsing and search

&#x20; - Shopping cart management

&#x20; - Checkout process

&#x20; - Payment processing

\- \*\*User Classes and Characteristics\*\*: 

&#x20; - \*\*End Users\*\*: Customers who will browse and purchase products.

&#x20; - \*\*Admin Users\*\*: Business owners or employees who will manage the catalog and view orders.

\- \*\*Operating Environment\*\*: 

&#x20; - \*\*Client\*\*: Modern web browsers (Chrome, Firefox, Safari)

&#x20; - \*\*Server\*\*: Node.js backend, MongoDB database

\- \*\*Assumptions and Dependencies\*\*: 

&#x20; - Users have internet access.

&#x20; - Payment gateway API (e.g., Stripe) is available and functional.



\## 5. Visual Mockup Reference

\- \*\*Link or Screenshot\*\*: !\[Mockup](mockup\_link.png)



\## 6. Features

\- \*\*User Registration and Login\*\*: Users can create accounts and log in.

\- \*\*Product Catalog\*\*: Users can browse products by categories.

\- \*\*Search Functionality\*\*: Users can search for products.

\- \*\*Shopping Cart\*\*: Users can add, remove, and update products in their cart.

\- \*\*Checkout Process\*\*: Users can enter shipping information and review their order.

\- \*\*Payment Gateway Integration\*\*: Users can make payments securely using a payment gateway.



\## 7. Functional Requirements

\### Use Cases

\- \*\*Use Case 1\*\*: User Registration

&#x20; - \*\*Title\*\*: Register a new user

&#x20; - \*\*Description\*\*: Users can create an account with an email and password.

&#x20; - \*\*Actors\*\*: End User

&#x20; - \*\*Preconditions\*\*: User is on the registration page.

&#x20; - \*\*Postconditions\*\*: User account is created and user is logged in.

&#x20; - \*\*Main Flow\*\*: User enters email and password > User clicks "Register" > System creates account and logs in user.

&#x20; - \*\*Alternate Flows\*\*: User enters invalid email > System shows error.



\### System Features

\- \*\*Feature 1\*\*: User Registration and Login

&#x20; - \*\*Description\*\*: Allow users to register and log in.

&#x20; - \*\*Priority\*\*: High

&#x20; - \*\*Inputs\*\*: Email, password

&#x20; - \*\*Processing\*\*: Validate input, create user account

&#x20; - \*\*Outputs\*\*: User is logged in

&#x20; - \*\*Error Handling\*\*: Show error messages for invalid input



\## 8. Non-Functional Requirements

\- \*\*Performance\*\*: 

&#x20; - The application should load pages within 2 seconds.

\- \*\*Security\*\*: 

&#x20; - Passwords should be hashed and stored securely.

&#x20; - All transactions should be encrypted using HTTPS.

\- \*\*Usability\*\*: 

&#x20; - The application should be easy to navigate with a clean user interface.

\- \*\*Reliability\*\*: 

&#x20; - The application should have 99.9% uptime.

\- \*\*Supportability\*\*: 

&#x20; - The code should be well-documented and maintainable.



\## 9. Data Requirements

\- \*\*Data Models\*\*: 

&#x20; - \*\*User\*\*: { id, email, password\_hash }

&#x20; - \*\*Product\*\*: { id, name, description, price, category, stock }

&#x20; - \*\*Order\*\*: { id, user\_id, product\_ids, total\_price, shipping\_info, status }

\- \*\*Database Requirements\*\*: 

&#x20; - Use MongoDB for storing user, product, and order data.

\- \*\*Data Storage and Retrieval\*\*: 

&#x20; - Users can retrieve their account and order information.



\## 10. External Interface Requirements

\- \*\*User Interfaces\*\*: 

&#x20; - Registration/Login page

&#x20; - Product Catalog page

&#x20; - Product Detail page

&#x20; - Shopping Cart page

&#x20; - Checkout page

\- \*\*API Interfaces\*\*: 

&#x20; - Payment gateway API (e.g., Stripe API) for processing payments.

\- \*\*Hardware Interfaces\*\*: 

&#x20; - None required.

\- \*\*Software Interfaces\*\*: 

&#x20; - Interact with the MongoDB database.

&#x20; - Connect with the payment gateway for transactions.



\## 11. Glossary

\- \*\*SKU\*\*: Stock Keeping Unit

\- \*\*API\*\*: Application Programming Interface



\## 12. Appendices

\- \*\*Supporting Information\*\*: 

&#x20; - User flow diagrams

&#x20; - Wireframes

\- \*\*Revision History\*\*: 

&#x20; - \*\*v1.0\*\*: Initial version - June 20, 2024



