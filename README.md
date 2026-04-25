# Royal Ember - Premium Restaurant Platform

A modern, luxurious restaurant management platform built with Next.js 16, featuring a stunning UI, staff management system, online ordering, and reservations.

![Royal Ember Preview](public/images/reservation-hero.jpg)

## Live Demo

**Live Site:** [https://royal-ember.vercel.app](https://royal-ember.vercel.app)

---

## Features

### Customer Features
- **Beautiful Landing Page** - Premium restaurant showcase with elegant animations
- **Interactive Menu** - Browse dishes by category with dietary filters
- **Online Ordering** - Add items to cart and checkout seamlessly
- **Reservation System** - Book tables with date/time selection
- **Contact Form** - Easy communication with the restaurant
- **Mobile Responsive** - Perfect experience on all devices

### Staff Portal Features
- **Secure Login** - Staff authentication with role-based access
- **Dashboard** - Real-time stats and overview
- **Staff Management** - Add, edit, delete staff members
- **Profile Management** - Staff can update their own information
- **Shift Tracking** - Morning, evening, and night shift management

### Admin Dashboard
- **Order Management** - Track and update order status
- **Reservation Management** - View and manage bookings
- **Menu Management** - Enable/disable menu items
- **Analytics** - Revenue, orders, and conversion tracking

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.2.4 (App Router) |
| **UI Library** | React 19.2.4 |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion 12 |
| **Language** | TypeScript 5 |
| **Storage** | localStorage (no backend required) |
| **Deployment** | Vercel-ready |

---

## Screenshots

### Home Page
![Home Page](public/screenshots/home.png)

### Menu
![Menu](public/screenshots/menu.png)

### Reservations
![Reservations](public/screenshots/reservations.png)

### Staff Dashboard
![Staff Dashboard](public/screenshots/staff-dashboard.png)

### Admin Dashboard
![Admin Dashboard](public/screenshots/admin-dashboard.png)

> **Note:** Screenshots should be added to `public/screenshots/` directory before use.

---

## Demo Credentials

### Staff Portal (Recommended)
| Email | Password | Role |
|-------|----------|------|
| admin@royalember.com | admin123 | Manager |
| chef@royalember.com | chef123 | Chef |
| sarah@royalember.com | sarah123 | Waiter |
| mohammad@royalember.com | mohammad123 | Bartender |
| fatima@royalember.com | fatima123 | Host |

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hamzaui34/modern-restaurant-web-platform.git
cd royal-ember-restaurant
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

---

## Project Structure

```
royal-ember-restaurant/
├── app/                        # Next.js App Router pages
│   ├── page.tsx              # Home/landing page
│   ├── menu/                 # Menu page
│   ├── reservations/          # Reservation booking
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout flow
│   ├── order-confirmation/   # Order success page
│   ├── about/               # About page
│   ├── contact/             # Contact form
│   └── staff/               # Staff portal
│       ├── login/           # Staff login
│       ├── dashboard/        # Staff dashboard
│       ├── admin/           # Staff management
│       └── profile/         # Staff profile
│
├── components/               # React components
│   ├── layout/             # Header, Footer, Nav
│   ├── home/              # Home sections
│   ├── menu/             # Menu components
│   ├── ui/               # Reusable UI components
│   └── staff/            # Staff system components
│
├── public/                # Static assets
│   └── images/           # Hero images
│
├── lib/                   # Utilities
├── package.json
└── next.config.ts
```

---

## Deployment

### Deploy to Vercel

1. Push to GitHub:
```bash
git add .
git commit -m "Royal Ember - Premium Restaurant Platform v1.0"
git push -u origin main
```

2. Connect to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js configuration
   - Click "Deploy"

---

## Customization

### Changing Restaurant Details
- `components/layout/Footer.tsx` - Contact info, hours
- `app/about/page.tsx` - About content
- `components/home/HeroSection.tsx` - Hero banner

### Modifying Menu Items
Edit `app/menu/page.tsx` - Modify items in `MENU_ITEMS` array

### Adding New Staff
Use the Staff Admin panel at `/staff/admin`

---

## License

This project is licensed for commercial use. Built for demonstration purposes.

---

**Royal Ember** - Where Every Bite Tells a Story