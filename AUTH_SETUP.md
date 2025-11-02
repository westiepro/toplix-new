# Authentication Setup Guide

This guide will help you configure the complete email authentication system with Google and Apple OAuth support using Supabase.

## 🚀 Quick Start

### 1. Set Up Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select your existing project
3. Wait for the database to finish setting up

### 2. Configure Environment Variables

Create a `.env.local` file in the project root and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Where to find these values:**
- Go to your Supabase project dashboard
- Navigate to **Settings** → **API**
- Copy the **Project URL** and **anon/public key**

### 3. Configure Authentication Providers

#### Email Authentication

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider (should be enabled by default)
3. Configure email templates (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize the "Confirm signup" template
   - The verification link should point to: `{{ .SiteURL }}/verify`

#### Google OAuth

1. Go to **Authentication** → **Providers** in Supabase
2. Enable **Google** provider
3. Follow Supabase's instructions to:
   - Create a Google Cloud project
   - Set up OAuth consent screen
   - Create OAuth credentials
   - Add authorized redirect URIs
4. Copy the Client ID and Client Secret to Supabase

#### Apple OAuth

1. Go to **Authentication** → **Providers** in Supabase
2. Enable **Apple** provider
3. Follow Supabase's instructions to:
   - Create an Apple Developer account
   - Set up Sign in with Apple
   - Get Service ID and Key ID
4. Copy the credentials to Supabase

### 4. Configure URL Settings

In Supabase Dashboard:

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your production domain (e.g., `https://yourdomain.com`)
3. For local development, add `http://localhost:3000` to **Redirect URLs**
4. Add the following redirect URLs:
   ```
   http://localhost:3000/verify
   https://yourdomain.com/verify
   http://localhost:3000/dashboard
   https://yourdomain.com/dashboard
   ```

### 5. Password Requirements (Optional)

In Supabase Dashboard:

1. Go to **Authentication** → **Policies**
2. Configure password requirements:
   - Minimum length: 8 characters
   - Require uppercase, lowercase, numbers, special characters

## 🎯 Features Implemented

### ✅ Email Authentication
- **Sign up**: New users receive a verification email
- **Sign in**: Existing users enter email + password
- **Email verification**: Click link in email → Set password → Auto login
- **Password validation**: Strong password requirements enforced

### ✅ OAuth Social Login
- **Google Sign-In**: One-click authentication with Google
- **Apple Sign-In**: One-click authentication with Apple
- Auto-creates user account on first login

### ✅ Guest Mode
- Browse without creating an account
- Persistent guest session using localStorage
- Banner notification showing guest status
- Easy conversion to full account

### ✅ Protected Routes
- Middleware automatically protects `/dashboard` and `/admin` routes
- Redirects unauthenticated users to home page
- Session refresh handled automatically

### ✅ User Interface
- Modal-based login (matches pisos.com design)
- Responsive and accessible (Shadcn UI components)
- Dark mode support
- Toast notifications for user feedback

## 📁 File Structure

```
src/
├── app/
│   └── verify/
│       └── page.tsx              # Email verification & password setup
├── components/
│   ├── LoginModal.tsx            # Main authentication modal
│   ├── Navbar.tsx                # Updated with auth state
│   └── Providers.tsx             # App providers (includes AuthProvider)
├── contexts/
│   └── AuthContext.tsx           # Auth state management
├── lib/
│   └── supabaseClient.ts         # Supabase client configuration
└── middleware.ts                 # Route protection
```

## 🔄 User Flow

### New User Sign Up (Email)
1. User clicks "Login" → Modal opens
2. User enters email → Clicks "Continue with email"
3. System sends verification email
4. User clicks link in email → Redirected to `/verify`
5. User sets password → Auto logged in → Redirected to `/dashboard`

### Existing User Sign In (Email)
1. User clicks "Login" → Modal opens
2. User enters email → System detects existing account
3. Password field appears
4. User enters password → Signed in → Modal closes

### Social Login (Google/Apple)
1. User clicks "Login" → Modal opens
2. User clicks "Continue with Google" or "Continue with Apple"
3. OAuth flow completes → User signed in → Redirected to `/dashboard`

### Guest Mode
1. User clicks "Continue as guest"
2. Modal closes, banner appears
3. User can browse but with limited features
4. Click "Sign In" in banner to convert to full account

## 🧪 Testing the Implementation

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Email Authentication
- Click "Login" in the navbar
- Enter a test email address
- Check your email for verification link
- Click the link and set a password
- Verify you're redirected to dashboard

### 3. Test Social Login
- Click "Login" in the navbar
- Click "Continue with Google" or "Continue with Apple"
- Complete OAuth flow
- Verify you're redirected to dashboard

### 4. Test Guest Mode
- Click "Login" in the navbar
- Click "Continue as guest"
- Verify banner appears
- Test that `/dashboard` redirects to home

### 5. Test Protected Routes
- While logged out, try visiting `/dashboard`
- Verify you're redirected to home
- Sign in and try again
- Verify you can access `/dashboard`

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env.local` to version control
2. **HTTPS Only**: Use HTTPS in production for secure cookie transmission
3. **Password Policy**: Strong password requirements are enforced
4. **Session Management**: Supabase handles token refresh automatically
5. **Route Protection**: Middleware validates sessions server-side

## 📝 Customization

### Change Email Templates
Edit in Supabase Dashboard → Authentication → Email Templates

### Modify Protected Routes
Edit `src/middleware.ts` and add/remove routes in the `protectedRoutes` array

### Customize Modal Design
Edit `src/components/LoginModal.tsx` to match your brand

### Add More OAuth Providers
Enable in Supabase Dashboard and add buttons to `LoginModal.tsx`

## 🐛 Troubleshooting

### "Supabase client not configured" error
- Make sure `.env.local` exists with correct values
- Restart the development server after adding environment variables

### Email not arriving
- Check Supabase email settings
- Verify email provider is enabled
- Check spam folder
- For production, configure custom SMTP

### OAuth redirect error
- Verify redirect URLs are configured in Supabase
- Check OAuth provider settings match Supabase
- Ensure Site URL is set correctly

### Session not persisting
- Check browser cookies are enabled
- Verify `persistSession: true` in supabaseClient.ts
- Check for cookie domain issues in production

## 🎨 UI Components Used

All components are from [Shadcn UI](https://ui.shadcn.com/):
- Dialog
- Button
- Input
- Card
- DropdownMenu
- Badge
- Toaster (Sonner)

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase SSR Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Next.js Middleware Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)

## ✨ Next Steps

Consider implementing:
- Password reset flow
- Email change functionality
- Profile management page
- Two-factor authentication
- Account deletion
- Social account linking

