# Kliti Photography - Project Setup Guide

## Overview

This guide will walk you through setting up the Kliti Photography web application from scratch.

## Prerequisites

- Node.js 18+ and pnpm installed
- Firebase account
- Cloudinary account
- Mega.nz account
- Contentful account

---

## 1. Firebase Setup

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name: `kliti-web` (or your preferred name)
4. Disable Google Analytics (optional for MVP)

### 1.2 Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** (optional, add OAuth client ID later if needed)

### 1.3 Create Firestore Database

1. Go to **Firestore Database** > **Create database**
2. Choose **Start in production mode**
3. Select a location (closest to your users)

### 1.4 Set Firestore Security Rules

Go to **Firestore Database** > **Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read their own data, admins can read all
    match /users/{userId} {
      allow read: if request.auth != null &&
                     (request.auth.uid == userId ||
                      request.auth.token.admin == true);
      allow write: if request.auth != null &&
                      request.auth.token.admin == true;
    }

    // Orders collection
    match /orders/{orderId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null &&
                       request.auth.token.admin == true;
    }

    // Email collection (for admin notifications)
    match /sil-mail/{emailId} {
      allow create: if request.auth != null;
      allow read, delete: if request.auth != null &&
                             request.auth.token.admin == true;
    }
  }
}
```

### 1.5 Get Firebase Config

1. Go to **Project Settings** > **General**
2. Scroll to "Your apps" > click web icon `</>`
3. Register app: `kliti-web-app`
4. Copy the config object values to `.env.local`

### 1.6 Setup Firebase Admin SDK

1. Go to **Project Settings** > **Service Accounts**
2. Click "Generate new private key"
3. Save the JSON file securely
4. Extract values and add to `.env.local`:
   - `FIREBASE_ADMIN_PROJECT_ID`
   - `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `FIREBASE_ADMIN_PRIVATE_KEY` (keep the `\n` characters)

### 1.7 Set Admin User (via Firebase CLI)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Set custom claim for admin user (replace with actual UID after first signup)
firebase auth:export users.json --project your-project-id
# Then run this in Node.js console or create a script:
```

Create a file `scripts/set-admin.js`:

```javascript
const admin = require('firebase-admin')
const serviceAccount = require('./path-to-service-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const uid = 'USER_UID_HERE' // Replace with photographer's UID after they register

admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('Admin claim set successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error setting admin claim:', error)
    process.exit(1)
  })
```

Run: `node scripts/set-admin.js`

---

## 2. Cloudinary Setup

### 2.1 Create Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account

### 2.2 Create Folder Structure

1. Go to **Media Library**
2. Create a folder named `previews` (this is where watermarked images will be uploaded)
3. Inside `previews`, subfolders will be created automatically per user (named by UUID)

### 2.3 Get API Credentials

1. Go to **Dashboard**
2. Copy **Cloud name**, **API Key**, and **API Secret** to `.env.local`

### 2.4 Configure Upload Presets (Optional)

1. Go to **Settings** > **Upload**
2. Create an upload preset for watermarked previews
3. Add watermark transformation

---

## 3. Mega.nz Setup

### 3.1 Create Account

1. Go to [Mega.nz](https://mega.nz/)
2. Sign up for an account (free tier is sufficient for MVP)

### 3.2 Organize Folders

1. Create a main folder for your photography business
2. Inside, create subfolders for each client (initially can be named by event or UUID)
3. Upload original high-res photos/videos here

### 3.3 Add Credentials to Env

- Add `MEGA_EMAIL` and `MEGA_PASSWORD` to `.env.local`

**Security Note**: For production, consider using Mega API keys instead of password auth.

---

## 4. Contentful CMS Setup

### 4.1 Create Account & Space

1. Go to [Contentful](https://www.contentful.com/)
2. Sign up and create a new space: "Kliti Photography"

### 4.2 Create Content Models

#### Portfolio Gallery Model

- Name: `Gallery`
- Fields:
  - **Title** (Short text, required)
  - **Slug** (Short text, required, unique)
  - **Category** (Short text, required) - e.g., "Weddings", "Birthdays", etc.
  - **Description** (Long text)
  - **Featured Image** (Media, required)
  - **Gallery Images** (Media, multiple)
  - **Date** (Date & time)

#### About Page Model

- Name: `About Page`
- Fields:
  - **Title** (Short text)
  - **Hero Image** (Media)
  - **Content** (Rich text)
  - **Team Members** (Reference, multiple) - optional

#### Contact Info Model

- Name: `Contact Info`
- Fields:
  - **Phone** (Short text)
  - **WhatsApp** (Short text)
  - **Email** (Short text)
  - **Address** (Long text)
  - **Social Media Links** (JSON object)

### 4.3 Get API Keys

1. Go to **Settings** > **API keys**
2. Create a new API key or use the default
3. Copy **Space ID** and **Content Delivery API - access token** to `.env.local`

---

## 5. Email Notifications Setup (Firebase Extensions)

### 5.1 Install Trigger Email Extension

```bash
firebase ext:install firestore-send-email --project=your-project-id
```

### 5.2 Configure Extension

- Collection path: `sil-mail`
- SMTP Connection URI: Use Gmail or SendGrid
  - Gmail: `smtps://your-email@gmail.com:your-app-password@smtp.gmail.com:465`
  - (Enable 2FA and create app password in Google Account settings)

### 5.3 Test Email

After registration, check Firestore `sil-mail` collection for email documents.

---

## 6. Install Dependencies

```bash
cd /path/to/kliti-web
pnpm install
```

---

## 7. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with all the credentials from steps 1-4.

---

## 8. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 9. Initial Setup Checklist

- [ ] Firebase project created
- [ ] Authentication enabled (Email/Password, Google)
- [ ] Firestore database created with security rules
- [ ] Firebase Admin SDK configured
- [ ] Cloudinary account setup with `previews` folder
- [ ] Mega.nz account with organized folders
- [ ] Contentful space created with content models
- [ ] `.env.local` configured with all credentials
- [ ] Dependencies installed
- [ ] Dev server running
- [ ] First user registered (photographer)
- [ ] Admin claim set for photographer user
- [ ] Email notifications working

---

## 10. Post-Setup Tasks

### Set First Admin User

1. Register via `/auth` page with photographer's email
2. Copy the UID from Firebase Console > Authentication
3. Run `scripts/set-admin.js` with that UID
4. Refresh the app and verify Dashboard link appears in navbar

### Test User Flow

1. Register a test user
2. Check admin email for registration notification
3. Link media via admin dashboard (TODO: implement link-media page)
4. Verify watermarked previews appear in user profile

### Populate CMS Content

1. Add portfolio galleries in Contentful
2. Add About page content
3. Add Contact information
4. Update homepage hero and services sections

---

## Next Steps (Beyond MVP)

- [ ] Implement media linking flow (Mega → Cloudinary upload)
- [ ] Add selection and cart functionality for users
- [ ] Build order placement flow
- [ ] Integrate PayPal/Stripe for online payments
- [ ] Add print order management
- [ ] Build download originals feature (after payment confirmed)
- [ ] Email notifications for media ready, payment received, etc.
- [ ] Admin dashboard analytics
- [ ] Mobile-responsive improvements

---

## Troubleshooting

### Firebase Auth Not Working

- Check `.env.local` has correct `NEXT_PUBLIC_` prefixed variables
- Restart dev server after env changes
- Verify domain is authorized in Firebase Console > Authentication > Settings

### Cloudinary Images Not Loading

- Check API route `/api/image/[...public_id]/route.ts` is working
- Verify Cloudinary credentials in `.env.local`
- Check browser console for errors

### Mega Connection Fails

- Verify email/password are correct
- Check Mega account is not locked
- Ensure `megajs` package is installed correctly

### Emails Not Sending

- Verify Firebase extension is installed and configured
- Check Firestore `sil-mail` collection for documents
- Verify SMTP settings (Gmail app password, etc.)

---

## Security Reminders

1. **Never commit `.env.local`** to Git (it's in `.gitignore`)
2. Keep Firebase Admin private key secure
3. Use Firebase Security Rules to restrict data access
4. For production, enable Firebase App Check
5. Use HTTPS in production (Vercel/Netlify handle this automatically)
6. Rotate API keys periodically

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
pnpm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Project Settings > Environment Variables
# Add all variables from .env.local
```

---

## Support

For questions or issues:

- Email: photographer@klitiphotography.com
- GitHub Issues: [repo-url]/issues
