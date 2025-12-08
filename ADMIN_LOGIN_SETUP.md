# 🔐 Admin Login - Setup & Troubleshooting

## ✅ Fixed Issue

The login page was returning 307 redirects because it was being caught by the admin layout which requires authentication. This has been fixed by creating a separate login layout that bypasses authentication.

## 🚀 Quick Start

### 1. First Time Setup - Create Admin Account

If you don't have an admin account yet:

1. Go to `/admin/login`
2. Click "Need to create an admin account?"
3. Fill in:
   - **Name**: Your name
   - **Email**: admin@example.com (or your email)
   - **Password**: A strong password
4. Click "Create Account"
5. Switch back to login mode
6. Sign in with your credentials

**Note**: Only the FIRST admin account can be created this way. After that, registration is disabled.

### 2. Regular Login

1. Go to `/admin/login`
2. Enter your email and password
3. Click "Sign In"
4. You'll be redirected to `/admin` dashboard

## 🔧 If Login Still Doesn't Work

### Check Database
```bash
npx prisma studio
```
Then navigate to the `Admin` table. If empty, you need to create an account first.

### Check Environment Variables
Make sure these are set in `.env`:
```
JWT_SECRET=your-super-secret-key
DATABASE_URL=your-database-url
```

### Clear Browser Cache
- Clear cookies for the site
- Hard refresh (Ctrl+Shift+R)
- Try login again

### Check Console for Errors
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for error messages
4. Check Network tab for API responses

## 📝 Default Test Credentials

If you want to seed an admin account during development, add to `prisma/seed.ts`:

```typescript
import bcrypt from "bcryptjs";

const hashedPassword = await bcrypt.hash("admin123", 12);

const admin = await prisma.admin.create({
  data: {
    email: "admin@example.com",
    password: hashedPassword,
    name: "Admin User",
  },
});
```

Then run:
```bash
npx prisma db seed
```

## 🔒 Security Notes

1. **Change the default JWT_SECRET** in production
2. **Use strong passwords** for admin accounts
3. **Don't share credentials** with others
4. **Use HTTPS in production** (secure cookies)
5. **Set NODE_ENV=production** when deploying

## 🚀 Test Login Workflow

1. Start dev server: `npm run dev`
2. Navigate to `http://localhost:3000/admin/login`
3. Create admin account (first time only)
4. Login with credentials
5. Should redirect to `/admin` dashboard
6. Sidebar should appear with all menu options

## 📊 What Happens on Login

```
User enters credentials
        ↓
POST /api/admin/auth
        ↓
Verify email exists
        ↓
Hash password matches?
        ↓
If YES: Create JWT token
        ↓
Set HttpOnly cookie
        ↓
Redirect to /admin
        ↓
Admin layout checks token
        ↓
Shows dashboard
```

## 🆘 Troubleshooting Checklist

- [ ] Database is connected and running
- [ ] Admin table has at least one record
- [ ] JWT_SECRET is set in .env
- [ ] Cookies are enabled in browser
- [ ] You're using correct email/password
- [ ] No 307 redirects in Network tab
- [ ] Check `/api/admin/auth` API response in Network tab

## 📱 Works On

✅ Desktop browsers
✅ Tablet browsers
✅ Mobile browsers
✅ Dark mode
✅ Light mode

## 🎯 API Routes Used

- `POST /api/admin/register` - Create first admin account
- `POST /api/admin/auth` - Login with credentials
- `DELETE /api/admin/auth` - Logout (delete token)

---

**The login page should now work correctly!** 🎉
