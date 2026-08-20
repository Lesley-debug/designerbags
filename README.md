# Designer Bags Boutique

A premium, full-stack e-commerce platform for **Designer Bags Boutique**, designed to provide a modern, elegant and highly dynamic online shopping experience for fashion products.

The platform is being developed with a scalable architecture that supports product management, categories, variants, inventory, customer accounts, wishlists, shopping carts, orders, payments, delivery management and an administrative dashboard.

---

## ✨ Project Overview

Designer Bags Boutique is an e-commerce platform focused primarily on handbags and watches, serving both male and female customers.

The system is designed to combine:

- Luxury and affordable fashion
- Modern e-commerce functionality
- Responsive design
- Secure customer accounts
- Product and inventory management
- Online ordering
- Payment integration
- Order tracking
- Customer notifications
- Administrative management

The architecture is intentionally designed to allow the business to expand its product catalog and introduce additional product categories in the future.

---

## 🛍️ Product Categories

### Handbags

The handbag catalog supports multiple subcategories for both men and women.

Potential categories include:

#### Women's Bags
- Tote Bags
- Shoulder Bags
- Crossbody Bags
- Handbags / Top-Handle Bags
- Clutches
- Mini Bags
- Backpacks

#### Men's Bags
- Shoulder Bags
- Crossbody / Sling Bags
- Messenger Bags
- Backpacks
- Waist / Belt Bags
- Briefcases / Work Bags

### Watches

The platform also supports watches with room for additional subcategories and collections.

The category system is database-driven, allowing the business to add new categories without changing the application's core architecture.

---

## 🚀 Technology Stack

### Backend

- Laravel 13
- PHP
- MySQL
- Laravel Eloquent ORM

### Frontend

- React 19
- TypeScript
- Inertia.js 3
- Tailwind CSS 4

### Development & Build Tools

- Vite 8
- NPM
- Composer
- Git
- GitHub

---

## 🏗️ Architecture

The project uses Laravel and React together through Inertia.js.

```text
                    Browser
                       │
                       ▼
              React + TypeScript
                       │
                       │ Inertia.js
                       ▼
                  Laravel 13
                       │
          ┌────────────┼────────────┐
          │            │            │
       Routes      Controllers    Services
          │            │            │
          └────────────┼────────────┘
                       │
                    Models
                       │
                       ▼
                     MySQL