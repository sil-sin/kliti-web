# Kliti Photography Web App

A Next.js-based photographer client management and media delivery platform.

## Project Overview

Full-stack web application for professional photographers to manage client registrations, media uploads, and order fulfillment. Clients can register, view watermarked previews, select media, and place orders for digital/printed photos.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TailwindCSS, Framer Motion
- **Backend**: Firebase (Auth, Firestore), Cloudinary (watermarked previews), Mega.js (original file storage)
- **CMS**: Contentful (static content: homepage, portfolio galleries, about, contact)

## Key Features

### For Photographers (Admin)

- **Dashboard**: User management table with columns for:
  - Name, email, phone, registration date
  - Media link status (linked to Mega folder or not)
  - Payment status (manual or auto-set)
  - Order status (digital/printed/CD, sent/pending)
- **Media Linking**: Select Mega folder → auto-upload watermarked previews to Cloudinary (folder named by user UUID)
- **Email Notifications**:
  - New user registration alert with link to link media
  - Upload complete notification with link to dashboard + option to notify user or postpone (1-day reminder)
- **Manual Controls**: Mark payment as received, mark orders as shipped

### For Clients (Users)

- **Registration**: Email/password or Google OAuth → email verification required
- **Profile Page**:
  - Shows "Email not verified" until verified
  - Once media is ready: folder(s) with date → gallery of watermarked photos/videos from Cloudinary
- **Order Flow**:
  - Select media (individual or whole folder)
  - Choose format: digital, printed, CD, or combination
  - Payment: cash (MVP), PayPal/card (future)
  - Cash orders: photographer manually marks as paid → originals from Mega become available for digital orders
  - Digital orders: download originals from Mega after payment confirmation

### Static Pages (via Contentful CMS)

- Homepage (hero, services overview)
- Portfolio/Gallery (categories: birthdays, weddings, video clips, musical productions, ads, etc.)
- About
- Contact

## MVP Scope (Cash-only payments)

1. User registration + email verification
2. Admin notification on new user
3. Admin links user ID to Mega folder → uploads watermarked previews to Cloudinary
4. User views gallery of watermarked media
5. User selects media + order type (digital/printed/CD)
6. Cash payment flow: photographer manually confirms payment in dashboard
7. Digital originals available from Mega after payment confirmed

## Environment Variables

Create `.env.local`:

```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin (server-side)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Mega
MEGA_EMAIL=
MEGA_PASSWORD=

# Contentful
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=

# Admin notifications
NEXT_PUBLIC_ADMIN_EMAIL=
```

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

Recommended: Vercel with environment variables configured in project settings.
