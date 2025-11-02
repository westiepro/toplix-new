# Testing Email Authentication Flow

## Quick Start Testing Guide

### Step 1: Configure Supabase (First Time Only)

1. **Go to Supabase Dashboard**: https://app.supabase.com
2. **Select or create your project**
3. **Get your credentials**:
   - Go to **Settings** → **API**
   - Copy **Project URL**
   - Copy **anon/public key**

4. **Create `.env.local` file** in project root with:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

5. **Configure Email Settings in Supabase**:
   - Go to **Authentication** → **Providers**
   - Ensure **Email** is enabled (should be by default)
   - Go to **Authentication** → **URL Configuration**
   - Set **Site URL**: `http://localhost:3000`
   - Add **Redirect URLs**:
     - `http://localhost:3000/verify`
     - `http://localhost:3000/dashboard`

6. **Configure Email Templates** (Optional but recommended):
   - Go to **Authentication** → **Email Templates**
   - Select "Confirm signup" template
   - Verify the confirmation link points to: `{{ .SiteURL }}/verify`

### Step 2: Start Development Server

```bash
npm run dev
```

Wait for the server to start on http://localhost:3000

### Step 3: Test New User Signup (Email Flow)

#### 3.1 Open the App
- Navigate to http://localhost:3000
- Click **"Login"** button in the navbar

#### 3.2 Enter Email
- A modal will open with title "Sign in or Create Account"
- You'll see Google and Apple buttons (OAuth - optional to test)
- Scroll to the email input field
- Enter a **real email address** (you need to access it to get the verification link)
- Click **"Continue with e-mail"**

#### 3.3 Expected Behavior
The app will:
- Check if the email exists in the database
- Since it's new, send a verification email via Supabase
- Show a success message: "Check your email"
- Display the email address you entered

**What the modal should show:**
```
✉️ Check your email

We've sent a verification link to
your.email@example.com

Click the link in the email to verify your account and set a password.

[Back button]
```

#### 3.4 Check Your Email
- Open your email inbox
- Look for an email from Supabase (check spam if not in inbox)
- Subject should be similar to: "Confirm your signup"
- Click the verification link in the email

#### 3.5 Set Your Password
After clicking the link, you'll be redirected to:
- URL: `http://localhost:3000/verify`
- Page title: "Set Your Password"
- You'll see:
  - Password input field
  - Confirm password input field
  - Requirements text
  - "Save Password and Continue" button

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- At least 1 special character (!@#$%^&*, etc.)

Example valid password: `SecurePass123!`

#### 3.6 Complete Signup
- Enter a password that meets the requirements
- Confirm the password (must match)
- Click **"Save Password and Continue"**
- You'll see a success checkmark: "Email Verified!"
- Automatic redirect to `/dashboard`

#### 3.7 Verify You're Logged In
On the dashboard, you should see:
- Your email in the top section
- Avatar with your initials
- "Welcome back, [YourName]"
- Your email address displayed

### Step 4: Test Existing User Login

#### 4.1 Sign Out First
- In the navbar, click on your user icon/email
- Click **"Sign Out"** from the dropdown

#### 4.2 Click Login Again
- Click **"Login"** in the navbar
- Modal opens

#### 4.3 Enter Same Email
- Type the same email you used before
- Click **"Continue with e-mail"**

#### 4.4 Expected Behavior
The app will:
- Detect that the email already exists
- Show a **password field** (new UI state)
- Display both email and password inputs
- Show **"Sign In"** button instead of sending verification email

#### 4.5 Enter Password
- Type the password you set earlier
- Press Enter or click **"Sign In"**
- Modal closes
- You're instantly logged in
- Success toast appears: "Signed in successfully!"

### Step 5: Test Protected Routes

#### 5.1 While Logged Out
- Sign out if logged in
- Try to navigate to: http://localhost:3000/dashboard
- **Expected**: You get redirected to the home page (/)

#### 5.2 While Logged In
- Sign in
- Navigate to: http://localhost:3000/dashboard
- **Expected**: You can access the dashboard and see your information

### Step 6: Test Guest Mode (Bonus)

#### 6.1 Activate Guest Mode
- Make sure you're logged out
- Click **"Login"**
- At the bottom of the modal, click **"Continue as guest"**

#### 6.2 Expected Behavior
- Modal closes
- A blue banner appears at the top:
  - "Browsing as guest - Sign in to save favorites and access all features"
  - With a "Sign In" link

#### 6.3 Test Guest Limitations
- Try to visit `/dashboard`
- **Expected**: Still redirected (guests can't access protected routes)
- The banner persists across page navigation

#### 6.4 Convert Guest to User
- Click **"Sign In"** button in the guest banner
- Complete the normal signup/login flow
- Banner disappears after successful login

## 🐛 Troubleshooting

### "Supabase client not configured" error
- **Fix**: Add environment variables to `.env.local`
- **Then**: Restart the dev server (`Ctrl+C`, then `npm run dev`)

### Email not arriving
- Check your spam/junk folder
- Verify email provider is enabled in Supabase
- Check Supabase logs: **Authentication** → **Logs**
- Make sure you're using a real, accessible email address
- Supabase rate limits emails in development (check quota)

### "Invalid password" error when signing in
- Make sure you're entering the correct password
- Passwords are case-sensitive
- Try the password reset flow (not yet implemented)

### Verification link doesn't work
- Check that redirect URLs are configured in Supabase
- Verify the link format: `http://localhost:3000/verify?token=...`
- Check browser console for errors

### Can't access dashboard after login
- Check browser console for errors
- Verify middleware is working: check Network tab for redirects
- Make sure session cookies are being set (check Application/Storage tab)

### Password validation errors
- Ensure password meets ALL requirements:
  - 8+ characters ✓
  - Uppercase letter ✓
  - Lowercase letter ✓
  - Number ✓
  - Special character ✓

## 📊 What to Look For (Success Indicators)

### ✅ Successful New User Flow:
1. Modal opens when clicking "Login"
2. Email is accepted
3. "Check your email" message appears
4. Email arrives in inbox
5. Verification link works
6. Password page loads at `/verify`
7. Password is accepted and saved
8. Auto-redirected to `/dashboard`
9. User info displays correctly

### ✅ Successful Existing User Flow:
1. Modal opens
2. Email is recognized
3. Password field appears
4. Correct password logs you in
5. Modal closes
6. Success toast appears
7. Navbar shows user dropdown

### ✅ Successful Route Protection:
1. Logged-out users can't access `/dashboard`
2. They get redirected to home
3. Logged-in users can access `/dashboard`
4. Session persists on page reload

## 🎯 Test Checklist

Use this checklist to verify everything works:

- [ ] Environment variables configured
- [ ] Dev server running
- [ ] Login modal opens
- [ ] Can enter email
- [ ] Verification email sent
- [ ] Email received
- [ ] Verification link works
- [ ] Password page loads
- [ ] Password validation works
- [ ] Password saved successfully
- [ ] Auto-login works
- [ ] Redirected to dashboard
- [ ] User info displays
- [ ] Can sign out
- [ ] Can sign back in with password
- [ ] Protected routes blocked when logged out
- [ ] Protected routes accessible when logged in
- [ ] Guest mode activates
- [ ] Guest banner displays
- [ ] Session persists on reload

## 🚀 Next Steps After Testing

Once email flow works:
1. Test Google OAuth (requires Google Cloud setup)
2. Test Apple OAuth (requires Apple Developer account)
3. Customize email templates in Supabase
4. Add password reset functionality
5. Deploy to production with production URLs

## 📝 Notes

- **Development emails**: Supabase has rate limits (check your project tier)
- **OAuth in localhost**: May have restrictions depending on provider
- **Session duration**: Default is 1 week, configurable in Supabase
- **Email customization**: Edit templates in Supabase dashboard

