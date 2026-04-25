# Royal Ember - Premium Restaurant Platform

A modern, luxurious restaurant management platform built with Next.js 16, featuring a stunning UI, staff management system, online ordering, and reservations.

![Royal Ember](https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop)

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

## Demo Credentials

### Staff Portal (Recommended)
- **Email:** admin@royalember.com
- **Password:** admin123
- **Role:** Manager

Other staff accounts:
| Email | Password | Role |
|-------|----------|------|
| chef@royalember.com | chef123 | Chef |
| sarah@royalember.com | sarah123 | Waiter |
| mohammad@royalember.com | mohammad123 | Bartender |
| fatima@royalember.com | fatima123 | Host |

## Tech Stack

- **Framework:** Next.js 16.2.4 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **Animations:** Framer Motion
- **Language:** TypeScript
- **Storage:** localStorage (no backend required)
- **Deployment:** Vercel-ready

## Getting Started

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

## Project Structure

```
app/
├── page.tsx              # Home/landing page
├── menu/page.tsx         # Menu with categories
├── reservations/page.tsx # Reservation booking
├── cart/page.tsx         # Shopping cart
├── checkout/page.tsx     # Checkout flow
├── order-confirmation/   # Order success
├── about/page.tsx       # About page
├── contact/page.tsx      # Contact form
└── staff/               # Staff portal
    ├── login/           # Staff login
    ├── dashboard/        # Staff dashboard
    ├── admin/            # Staff management
    └── profile/          # Staff profile

components/
├── layout/               # Header, Footer, Nav
├── home/                 # Home sections
├── menu/                 # Menu components
├── ui/                   # Reusable UI components
└── staff/                # Staff system components
```

## Deployment to Vercel

1. Push to GitHub:
```bash
git add .
git commit -m "Royal Ember - Premium Restaurant Platform v1.0"
git branch -M main
git remote add origin https://github.com/hamzaui34/modern-restaurant-web-platform.git
git push -u origin main
```

2. Connect to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import the GitHub repository
   - Vercel will auto-detect Next.js configuration
   - Deploy!

## Customization

### Changing Restaurant Details
Edit these files:
- `components/layout/Footer.tsx` - Contact info, hours
- `app/about/page.tsx` - About content
- `components/home/HeroSection.tsx` - Hero banner

### Modifying Menu Items
Edit `app/menu/page.tsx` - Add, remove, or modify menu items in `MENU_ITEMS` array

### Adding New Staff
Use the Staff Admin panel at `/staff/admin` or add to `staffTypes.ts`

## License

This project is licensed for commercial use. Built for demonstration purposes.

---

**Royal Ember** - Where Every Bite Tells a Story