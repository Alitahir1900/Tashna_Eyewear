# Tashna Eyewear - E-Commerce Store

A full-featured e-commerce platform for selling premium eyewear products including frames, sunglasses, vision glasses, and contact lenses.

## Features

### Customer Features
- Browse products by category (Frames, Sunglasses, Vision Glasses, Contact Lenses)
- Product search and filtering
- Detailed product pages with variants (color, size, material)
- Shopping cart functionality
- Guest and registered user checkout
- Multiple payment methods (JazzCash, Easypaisa, Cards, Bank Transfer, COD)
- Prescription upload and entry for vision products
- User account management (orders, wishlist, addresses, reviews)
- Product reviews and ratings

### Admin Features
- Complete admin dashboard
- Product management (CRUD operations, variants, inventory)
- Order management and fulfillment
- Customer management
- Review moderation
- Analytics and reporting
- Role-based access control (Admin, Manager, Order Fulfillment)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js v5
- **Styling:** TailwindCSS
- **UI Components:** Radix UI
- **File Storage:** Cloudinary
- **Email:** Resend
- **Forms:** React Hook Form + Zod

## Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
cd Tashna_Eyewear
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tashna_eyewear"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"  # Generate with: openssl rand -base64 32

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Resend (for email notifications)
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="Tashna Eyewear <noreply@tashnaeyewear.com>"
ADMIN_EMAIL="admin@tashnaeyewear.com"

# Payment Gateway (optional for development)
PAYMENT_GATEWAY_API_KEY="your-payment-gateway-key"
PAYMENT_GATEWAY_SECRET="your-payment-gateway-secret"
PAYMENT_GATEWAY_MERCHANT_ID="your-merchant-id"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
CURRENCY="PKR"
```

### 4. Set up the database

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev --name init
```

### 5. Seed the database

Populate the database with initial data (categories, admin user, sample products):

```bash
npm run prisma:seed
```

This will create:
- 4 product categories (Frames, Sunglasses, Vision Glasses, Contact Lenses)
- Admin user: `admin@tashnaeyewear.com` / `Admin@123`
- Test customer: `customer@example.com` / `Customer@123`
- 2 sample products with variants

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run prisma:seed` - Seed the database

## Project Structure

```
Tashna_Eyewear/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding script
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── (auth)/           # Auth pages (login, register)
│   │   ├── (customer)/       # Customer-facing pages
│   │   ├── admin/            # Admin dashboard
│   │   ├── api/              # API routes
│   │   └── page.tsx          # Homepage
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   ├── layout/           # Header, Footer, Navigation
│   │   ├── product/          # Product-related components
│   │   └── admin/            # Admin-specific components
│   ├── lib/
│   │   ├── prisma.ts         # Prisma client singleton
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── cloudinary.ts     # Cloudinary client
│   │   ├── email.ts          # Email utilities
│   │   ├── validations.ts    # Zod schemas
│   │   └── utils.ts          # Utility functions
│   └── types/
│       └── index.ts          # TypeScript types
├── public/                    # Static files
├── .env.example              # Environment variables template
└── package.json
```

## Key Routes

### Customer Routes
- `/` - Homepage
- `/shop` - All products
- `/category/[slug]` - Category page
- `/product/[slug]` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout flow
- `/account` - User account dashboard
- `/account/orders` - Order history
- `/account/wishlist` - Wishlist

### Auth Routes
- `/login` - User login
- `/register` - User registration

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/customers` - Customer management
- `/admin/reviews` - Review moderation
- `/admin/analytics` - Analytics and reports

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User** - User accounts with role-based access
- **Category** - Product categories
- **Product** - Products with base information
- **ProductVariant** - Product variations (color, size, material)
- **ProductImage** - Product images
- **Order** - Customer orders
- **OrderItem** - Order line items
- **CartItem** - Shopping cart items
- **WishlistItem** - Wishlist items
- **Review** - Product reviews
- **Address** - Saved shipping addresses

## Authentication

The application uses NextAuth.js v5 for authentication with:

- Email/password credentials
- Session-based authentication
- Role-based access control (Customer, Admin, Manager, Order Fulfillment)
- Protected routes with middleware

## Payment Integration

The application supports multiple payment methods for the Pakistani market:

- **Mobile Wallets:** JazzCash, Easypaisa
- **Cards:** Credit/Debit cards (Visa, Mastercard)
- **Bank Transfer:** Direct bank transfer
- **Cash on Delivery (COD)**

Integration with PayPro or Safepay payment gateway (configuration required).

## Image Management

Product images are stored and optimized using Cloudinary:

- Automatic format conversion (WebP for modern browsers)
- On-the-fly image transformations
- CDN delivery for fast loading
- Support for multiple images per product

## Email Notifications

Email notifications are sent via Resend for:

- Order confirmations
- Order status updates
- Welcome emails
- Password resets
- Admin notifications (new orders, low stock, reviews)

## Admin Access

After seeding the database, you can access the admin dashboard at:

- URL: `http://localhost:3000/admin`
- Email: `admin@tashnaeyewear.com`
- Password: `Admin@123`

**Important:** Change the default admin password in production!

## Production Deployment

### Recommended Platforms

- **Frontend/Backend:** Vercel (optimized for Next.js)
- **Database:** Neon, Supabase, or Railway (PostgreSQL)
- **File Storage:** Cloudinary
- **Email:** Resend

### Deployment Steps

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy the application
5. Run database migrations: `npx prisma migrate deploy`
6. Seed the database (if needed)
7. Configure payment gateway webhooks
8. Set up custom domain

## Security Considerations

- Passwords are hashed with bcrypt
- Session cookies are HTTP-only and secure in production
- CSRF protection via NextAuth
- Input validation with Zod
- Role-based access control on all admin routes
- Server-side permission checks
- Environment variables for sensitive data

## Future Enhancements

- Advanced search with filters
- Product recommendations
- Discount codes and promotions
- Newsletter subscription
- Social media authentication
- Multi-language support
- Advanced analytics
- Inventory alerts
- Customer support chat
- Mobile app

## Support

For issues and feature requests, please contact the development team or create an issue in the repository.

## License

This project is proprietary and confidential. All rights reserved.