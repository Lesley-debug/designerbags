# Designer Bags Boutique — Project Documentation

## 1. Project Overview

Designer Bags Boutique is a premium e-commerce platform for a fashion business selling handbags and additional products.

The initial catalog may contain only a few products, but the architecture must support a larger catalog in the future.

The goal is to build a real e-commerce system rather than a simple product showcase.

---

## 2. Business Requirements

### Customers

The platform targets:

- Men
- Women
- Multiple age groups
- Customers in Bamenda
- Customers throughout Cameroon

### Products

Products may contain:

- Name
- Description
- Price
- Images
- Category
- Color
- Size
- Material
- Stock quantity
- Variants
- Discount information

The business currently expects approximately three initial products, but the system must scale.

### Customer Accounts

Customers should be able to:

- Register
- Login
- Logout
- Manage their profile
- Manage addresses
- Add products to wishlist
- Add products to cart
- Place orders
- View previous orders
- Track orders

### Wishlist

Customers should be able to:

- Add products
- Remove products
- View saved products
- Move products to cart

### Inventory

The system should support:

- Stock quantities
- Product variants
- Low-stock detection
- Out-of-stock status
- Inventory adjustments
- Automatic stock changes after orders

### Delivery

Current requirements:

- Business is based in Bamenda
- Delivery throughout Cameroon
- Same delivery price currently expected for all locations
- Bamenda customers may collect orders physically
- Orders outside Bamenda can be delivered

Final delivery rules will be confirmed with the client.

### Payments

Potential payment methods:

- MTN Mobile Money
- Orange Money
- Bank/card gateway
- Existing merchant account

The final payment integration depends on the merchant facilities available to the business.

### Notifications

Customers should receive:

- Welcome message
- Order confirmation
- Order updates
- Promotional updates
- Other important notifications

Potential channels:

- Email
- WhatsApp

### Business Administration

The business owner(s) need an administrative dashboard.

Potential administrator features:

- Products
- Categories
- Variants
- Inventory
- Orders
- Customers
- Discounts
- Notifications
- Reports
- Settings

Approximately three business administrators may eventually use the system.

---

# 3. Brand Direction

The client currently does not have a logo.

The visual direction should communicate:

- Luxury
- Elegance
- Affordability
- Fashion
- Modernity
- Trust
- Premium quality

The final logo, colors and brand identity will be confirmed later.

---

# 4. Technology Stack

## Backend

Laravel 13.

## Frontend

React 19.

## Bridge

Inertia.js 3.

## Language

TypeScript.

## Styling

Tailwind CSS 4.

## Build Tool

Vite 8.

## Database

MySQL.

---

# 5. Architecture

```text
                         BROWSER
                            │
                            ▼
                   React + TypeScript
                            │
                            │ Inertia
                            ▼
                       Laravel 13
                            │
            ┌───────────────┼───────────────┐
            │               │               │
         Routes        Controllers       Services
            │               │               │
            └───────────────┼───────────────┘
                            │
                         Models
                            │
                            ▼
                          MySQL