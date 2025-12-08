# Login & Authentication Testing Guide

## Problem Fixed ✅
The login page was returning HTTP 307 redirects repeatedly. This was happening because:
- Login was at `/admin/login` (inside the admin folder)
- The admin layout (`/app/admin/layout.tsx`) checks authentication before rendering any content
- When unauthenticated users tried to access `/admin/login`, the layout's auth check triggered a redirect back to `/admin/login`
- This created an infinite redirect loop: `/admin/login` → redirect to `/admin/login` → 307 error

**Solution**: Moved login page to `/app/login/page.tsx` (outside the admin folder) so it bypasses the admin layout's auth check.

---

## How to Test the Login System

### Step 1: Start the Application
```bash
npm run dev
```
Navigate to `http://localhost:3000`

### Step 2: Create Admin Account (First Time Only)
1. Go to `http://localhost:3000/login`
2. Click on **"Need to create an admin account?"** to switch to register mode
3. Enter:
   - **Name**: Your name
   - **Email**: `admin@example.com` (or any email)
   - **Password**: `password123` (or any password)
4. Click **"Create Account"**
5. You should see a success message or be switched back to login mode

### Step 3: Login
1. You're now on the login page
2. Enter your credentials:
   - **Email**: `admin@example.com`
   - **Password**: `password123`
3. Click **"Sign In"**
4. You should be redirected to `/admin` dashboard

### Step 4: Verify Admin Dashboard Works
Once logged in, you should see:
- **Admin Dashboard** with a sidebar menu
- Options to manage:
  - Skills (view, add, edit, delete skill categories)
  - Projects (view, add, edit, delete projects)
- A **Logout** button in the sidebar

### Step 5: Test Logout
1. Click the **Logout** button in the sidebar
2. You should be redirected to `/login`
3. Try accessing `/admin` directly - you should be redirected to `/login` again

---

## Login Flow Architecture

```
User Access Flow:
├── Public Pages (No Auth Required)
│   ├── http://localhost:3000 (homepage)
│   ├── http://localhost:3000/login (login/register page)
│   └── http://localhost:3000/blog (blog page)
│
└── Protected Pages (Auth Required)
    └── /admin/* (requires JWT token in HttpOnly cookie)
        ├── /admin (dashboard)
        ├── /admin/skills (skill management)
        ├── /admin/projects (project management)
        ├── /admin/projects/new (create project)
        └── /admin/projects/[id] (edit project)
```

---

## Authentication Details

### How It Works
1. **Registration**: Creates a new admin account (only if no admin exists yet)
   - Email, password (hashed with bcryptjs), and name are stored in database
   - First admin creation disables registration for security

2. **Login**: Verifies credentials and creates JWT token
   - JWT token is stored in HttpOnly cookie (secure, httpOnly, sameSite: lax)
   - Token expires in 7 days
   - Redirect to `/admin` on successful login

3. **Admin Verification**: All protected pages check the token
   - Token is verified using `/lib/auth.ts` → `verifyAdmin()` function
   - If token is invalid or missing, user is redirected to `/login`
   - Uses Next.js server-side rendering for security

4. **Logout**: Deletes the JWT cookie
   - User is redirected to `/login`
   - Token becomes invalid

---

## Files Related to Authentication

| File | Purpose |
|------|---------|
| `/app/login/page.tsx` | **NEW** - Login/Register page (public, no auth required) |
| `/app/api/admin/auth/route.ts` | API endpoint for login (creates JWT token) |
| `/app/api/admin/register/route.ts` | API endpoint for registration (creates first admin) |
| `/lib/auth.ts` | Functions to verify and check authentication |
| `/app/admin/layout.tsx` | Protected layout that redirects unauthenticated users to `/login` |
| `/app/admin/components/AdminSidebar.tsx` | Sidebar with logout button |

---

## Troubleshooting

### Issue: Still seeing 307 redirects
- **Clear browser cookies**: Delete cookies for localhost
- **Check browser console**: Look for network tab to see redirect chain
- **Verify URL**: Make sure you're accessing `/login` (not `/admin/login`)

### Issue: Cannot create admin account
- **Check database**: Admin might already exist
- **Look at console**: Check for database connection errors
- **Verify .env file**: Make sure `DATABASE_URL` is set correctly

### Issue: Login not redirecting to admin dashboard
- **Check browser cookies**: Verify the `admin_token` cookie is set
- **Check token expiry**: Token might be expired (7-day expiration)
- **Look at console errors**: Check for JavaScript errors in browser console

### Issue: Logout not working
- **Clear cookies manually**: Go to DevTools → Application → Cookies
- **Hard refresh**: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- **Try again**: Navigate to `/login`

---

## Environment Variables Needed

Make sure your `.env.local` file has:
```
DATABASE_URL="postgresql://..."
JWT_SECRET="your-super-secret-key-change-in-production"
NODE_ENV="development"
```

---

## API Endpoints Reference

### POST /api/admin/register
**Request:**
```json
{
  "name": "Your Name",
  "email": "admin@example.com",
  "password": "password123"
}
```
**Response (Success):**
```json
{
  "success": true,
  "admin": {
    "id": "uuid",
    "email": "admin@example.com",
    "name": "Your Name"
  }
}
```
**Response (Error):**
```json
{
  "error": "Admin already exists. Registration disabled."
}
```

### POST /api/admin/auth
**Request:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```
**Response (Success):**
```json
{
  "success": true,
  "admin": {
    "id": "uuid",
    "email": "admin@example.com",
    "name": "Your Name"
  }
}
```
**Response (Error):**
```json
{
  "error": "Invalid credentials"
}
```

---

## Next Steps

After successful login:
1. Go to `/admin/skills` - Manage skill categories
2. Go to `/admin/projects` - Create and manage projects
3. Check homepage - Verify projects and skills appear dynamically
4. Customize content via admin dashboard

---

## Security Notes

✅ **What's Secure:**
- Passwords hashed with bcryptjs (12 rounds)
- JWT tokens stored in HttpOnly cookies (not accessible via JavaScript)
- Tokens have 7-day expiration
- SameSite cookie protection enabled
- Secure cookie flag enabled in production
- Server-side authentication verification

⚠️ **What to Improve (Production):**
- Change `JWT_SECRET` in `.env.local` to a strong random string
- Set `NODE_ENV=production`
- Use HTTPS in production
- Add rate limiting to login endpoint
- Add CSRF protection if needed
- Consider 2FA for admin accounts
