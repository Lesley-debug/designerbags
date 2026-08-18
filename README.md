# Designer Bags Boutique

Premium e-commerce platform for Designer Bags Boutique.

The platform is being built as a scalable fashion e-commerce system supporting products, variants, customers, wishlists, orders, payments, inventory, notifications and business administration.

## Technology Stack

- Laravel 13
- PHP
- React 19
- Inertia.js 3
- TypeScript
- Tailwind CSS 4
- Vite 8
- MySQL
- Git/GitHub

## Architecture

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
   ├── Routes
   ├── Controllers
   ├── Form Requests
   ├── Models
   ├── Services
   └── Authentication / Authorization
          │
          ▼
        MySQL