# Admin Management Scripts

Scripts to manage admin users for Kliti Photography web app.

## Prerequisites

1. Install firebase-admin as a dev dependency:

```bash
pnpm add firebase-admin --save-dev
```

2. Download your Firebase service account JSON:
   - Go to Firebase Console > Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the downloaded file as `service-account.json` in the project root
   - **IMPORTANT**: This file contains sensitive credentials. Never commit it to Git!
   - It's already in `.gitignore` for safety

## Usage

### Set a user as admin

```bash
node scripts/set-admin.js <USER_UID>
```

Example:

```bash
node scripts/set-admin.js abc123def456ghi789
```

### Remove admin privileges

```bash
node scripts/remove-admin.js <USER_UID>
```

## Finding the User UID

1. Go to Firebase Console
2. Navigate to Authentication
3. Find the user in the list
4. Copy their UID (a long alphanumeric string)

## Important Notes

- After setting/removing admin claim, the user **must sign out and sign back in** for the change to take effect
- Admin users will see a "Dashboard" link in the navbar
- Admin users can access `/admin/dashboard` and manage other users
- Only set admin claim for trusted users (the photographer)

## Troubleshooting

### Error: Cannot find module 'service-account.json'

- Make sure you've downloaded the service account JSON from Firebase Console
- Place it in the project root as `service-account.json`
- Or set the environment variable: `FIREBASE_SERVICE_ACCOUNT_PATH=/path/to/your/service-account.json`

### Error: User not found

- Verify the UID is correct
- Ensure the user has registered through your app first

### Admin claim not working

- Make sure the user signed out and signed back in after the claim was set
- Check browser console for any auth errors
- Verify the claim was set: check Firebase Console > Authentication > Users > click user > Custom claims
