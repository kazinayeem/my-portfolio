# Quick Reference Guide

## 🚀 Getting Started

### Start Development Server
```bash
npm run dev
```
Then open `http://localhost:3000` in your browser.

### Access Login Page
```
http://localhost:3000/login
```

---

## 📋 Quick Actions

### Create Admin Account (First Time)
1. Visit `/login`
2. Click "Need to create an admin account?"
3. Fill in: Name, Email, Password
4. Click "Create Account"

### Login
1. Visit `/login`
2. Enter Email and Password
3. Click "Sign In"
4. Redirected to `/admin`

### Manage Skills
1. Login (see above)
2. Click "Skills" in sidebar
3. View/add/edit/delete skill categories

### Manage Projects
1. Login (see above)
2. Click "Projects" in sidebar
3. Click "Create Project" to add new
4. Click edit icon to modify
5. Click delete icon to remove

### Logout
1. Click "Logout" button in admin sidebar
2. Redirected to `/login`

---

## 🔗 Important URLs

| URL | Purpose | Auth Required |
|-----|---------|---------------|
| `/` | Homepage | ❌ No |
| `/login` | Login/Register | ❌ No |
| `/blog` | Blog | ❌ No |
| `/admin` | Dashboard | ✅ Yes |
| `/admin/skills` | Skill Management | ✅ Yes |
| `/admin/projects` | Project Management | ✅ Yes |
| `/admin/projects/new` | Create Project | ✅ Yes |
| `/admin/projects/:id` | Edit Project | ✅ Yes |

---

## 🔑 Test Credentials (After Creating Admin Account)

Create your own with any of these:
```
Email: admin@example.com
Password: password123

OR

Email: your-email@example.com
Password: your-secure-password
```

---

## 📁 Files to Know

### Key Files
- `/app/login/page.tsx` → Login/Register UI
- `/app/admin/layout.tsx` → Protection layer
- `/lib/auth.ts` → Auth verification logic
- `/app/api/admin/auth/route.ts` → Login API
- `/app/api/admin/register/route.ts` → Register API
- `prisma/schema.prisma` → Database structure

### API Endpoints
- `POST /api/admin/register` → Create admin account
- `POST /api/admin/auth` → Login
- `DELETE /api/admin/auth` → Logout
- `GET/POST /api/admin/skills` → Manage skills
- `GET/POST /api/admin/projects` → Manage projects

---

## 🛠️ Common Commands

### Seed Database
```bash
npx prisma db seed
```

### Check Database
```bash
npx prisma studio
```

### Check Database Status
```bash
npx prisma migrate status
```

### Reset Database
```bash
npx prisma migrate reset
```

### Build for Production
```bash
npm run build
```

### Start Production
```bash
npm run start
```

---

## 🐛 Troubleshooting

### Issue: Still seeing 307 redirects at `/login`
**Solution**: 
1. Clear browser cookies (DevTools → Application → Cookies)
2. Hard refresh (Ctrl+Shift+R)
3. Check that you're visiting `/login` (not `/admin/login`)

### Issue: Cannot login after creating account
**Solution**:
1. Double-check email and password
2. Check browser console for errors
3. Verify database connection (check `.env.local`)
4. Try creating a new admin account

### Issue: Logged out suddenly
**Solution**:
1. Token might have expired (7-day limit)
2. Try logging in again
3. Check browser for JavaScript errors

### Issue: Admin dashboard looks broken
**Solution**:
1. Hard refresh (Ctrl+Shift+R)
2. Check browser console (F12) for errors
3. Verify all API routes are working
4. Check database connection

---

## 🎯 Features Implemented

✅ User authentication (JWT + cookies)
✅ Admin dashboard with sidebar
✅ Skill category management (CRUD)
✅ Project management (CRUD)
✅ Server-side rendering (SSR)
✅ Database integration (Prisma + PostgreSQL)
✅ Responsive design (dark/light mode)
✅ Protected routes
✅ Logout functionality
✅ Login/Register page

---

## 🔒 Security Features

✅ Passwords hashed with bcryptjs (12 rounds)
✅ JWT tokens with 7-day expiration
✅ HttpOnly cookies (JavaScript cannot access)
✅ SameSite protection against CSRF
✅ Secure flag for HTTPS
✅ Server-side authentication checks
✅ First admin only (registration disabled after first account)

---

## 📱 Responsive Design

All pages are responsive and work on:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

Dark mode automatically follows system preferences.

---

## 🎨 Customization

### Change JWT Expiry
Edit `/app/api/admin/auth/route.ts`:
```typescript
{ expiresIn: "7d" }  // Change this
```

### Change JWT Secret
Set in `.env.local`:
```
JWT_SECRET="your-custom-secret-key-here"
```

### Change Redirect URL
Edit `/app/admin/layout.tsx`:
```typescript
redirect("/login")  // Change destination
```

### Change Cookie Name
Edit `/app/api/admin/auth/route.ts`:
```typescript
response.cookies.set("admin_token", token, {})
//                    ^^^^^^^^^^^ Change this
```

---

## 📚 Documentation Files

- `LOGIN_AND_TESTING.md` - Detailed testing guide
- `LOGIN_FIX_SUMMARY.md` - What was fixed and why
- `AUTHENTICATION_FLOW.md` - Complete auth flow diagrams
- `ADMIN_LOGIN_SETUP.md` - Initial setup (reference)
- `ADMIN_DASHBOARD_GUIDE.md` - Admin features (reference)
- `ADMIN_USER_GUIDE.md` - How to use admin panel (reference)
- `ADMIN_QUICK_REFERENCE.md` - Quick reference (reference)
- `IMPLEMENTATION_CHECKLIST.md` - Implementation progress (reference)
- `IMPLEMENTATION_SUMMARY.md` - Summary of all features (reference)

---

## ❓ Need Help?

1. Check the documentation files above
2. Look at browser console (F12) for error messages
3. Check terminal for server errors
4. Verify `.env.local` has correct `DATABASE_URL` and `JWT_SECRET`
5. Ensure database is running and migration is applied

---

## ✨ What's Next?

1. ✅ Test login at `/login` (should work now!)
2. ✅ Create your admin account
3. ✅ Login to dashboard
4. ✅ Add real projects and skills
5. ✅ Customize content on your portfolio
6. ✅ Deploy to production

**Start here**: `http://localhost:3000/login`
