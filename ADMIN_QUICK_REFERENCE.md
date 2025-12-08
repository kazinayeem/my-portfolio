# 🛠️ Admin Dashboard - Quick Reference

## 🌐 Access Points

| Page | URL | Purpose |
|------|-----|---------|
| Admin Dashboard | `/admin` | Overview & navigation |
| Skills Manager | `/admin/skills` | Manage skill categories |
| Projects Manager | `/admin/projects` | Manage portfolio projects |
| New Skill | `/admin/skills/new` | Create skill category |
| New Project | `/admin/projects/new` | Create project |
| Edit Project | `/admin/projects/[id]` | Edit existing project |

## 📡 API Endpoints

### Skills API
```
GET    /api/admin/skills              - Get all skills with categories
POST   /api/admin/skills              - Create skill/category
PUT    /api/admin/skills              - Update skill/category
DELETE /api/admin/skills?id=X&type=Y  - Delete skill/category
```

### Projects API
```
GET    /api/admin/projects            - Get all projects
GET    /api/admin/projects/[id]       - Get single project
POST   /api/admin/projects            - Create project
PUT    /api/admin/projects/[id]       - Update project
DELETE /api/admin/projects/[id]       - Delete project
```

## 🎨 Skill Category Colors (Tailwind Gradients)

```
Frontend      : from-blue-500 to-cyan-500
Backend       : from-green-500 to-emerald-500
Database      : from-orange-500 to-red-500
DevOps & Cloud: from-purple-500 to-pink-500
Other Skills  : from-yellow-500 to-orange-500
```

## 💾 Database Commands

```bash
# Run seed (initial data)
npm run seed

# View database UI
npx prisma studio

# Create new migration
npx prisma migrate dev --name your_migration_name

# Reset database (⚠️ Deletes all data)
npx prisma migrate reset

# Check migration status
npx prisma migrate status

# Generate Prisma Client
npx prisma generate
```

## 📋 Project Form Fields

### Required Fields
- **Title** - Project name
- **Short Description** - 1-2 sentence summary
- **GitHub Link** - GitHub repository URL

### Optional Fields
- **Full Description** - Detailed project overview
- **Image URL** - Project preview image
- **Live Link** - Deployed project URL
- **YouTube Demo** - Demo video URL
- **Technologies** - Comma-separated list (e.g., React, Next.js, TypeScript)
- **Features** - Comma-separated features list
- **Is Team Project** - Checkbox for team projects
- **Is Featured** - Checkbox to show on homepage
- **Order** - Display order (lower number = higher priority)

## 🎯 Common Tasks

### Add a New Skill Category
1. Go to `/admin/skills`
2. Click "Add Category"
3. Fill in:
   - **Name**: Category name (e.g., "Frontend")
   - **Color**: Select from gradient options
   - **Icon**: Icon name (e.g., "Globe", "Code", "Database")
   - **Order**: Display order
4. Click "Create"

### Add a Skill to Category
1. Go to `/admin/skills`
2. Find the category
3. Click "Add Skill"
4. Enter skill name (e.g., "React.js")
5. Select category
6. Click "Create"

### Create a New Project
1. Go to `/admin/projects`
2. Click "New Project"
3. Fill in project details:
   ```
   Title: E-commerce Platform
   Short Description: Full-stack e-commerce with payment integration
   Full Description: Built a complete e-commerce platform...
   Image URL: https://example.com/project.jpg
   GitHub Link: https://github.com/user/project
   Technologies: React, Next.js, Node.js, MongoDB
   Features: User Auth, Payment, Admin Dashboard
   Is Featured: ✓ (checked)
   ```
4. Click "Create Project"

### Edit an Existing Project
1. Go to `/admin/projects`
2. Click "Edit" on project card
3. Modify details as needed
4. Click "Update Project"

### Feature/Unfeature a Project
1. Go to `/admin/projects`
2. Click eye icon (👁️) on project card
3. Only featured projects show on homepage

### Delete a Project
1. Go to `/admin/projects`
2. Click trash icon on project card
3. Confirm deletion

## 🔍 Filtering & Sorting

### Projects Display
- **Featured Only**: Homepage shows only `isFeatured: true` projects
- **Sorted by Order**: Lower order number = higher priority
- **Team Projects**: Marked with "Team Project" badge

### Skills Display
- **Categorized**: Skills grouped by SkillCategory
- **Ordered**: Within category, sorted by order number
- **Colored**: Each category has its own color gradient

## 🚀 Performance Tips

1. **Optimize Images**: Use compressed project images
2. **Keep Descriptions Short**: 2-3 sentences for short descriptions
3. **Use Meaningful Names**: Help with organization and SEO
4. **Order Strategically**: Put best projects first
5. **Update Regularly**: Keep portfolio current

## 🛡️ Security Notes

- Admin routes are protected by JWT authentication
- API endpoints check admin status before operations
- Never share admin credentials
- Logout when done with admin panel
- Use strong passwords for admin account

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| Changes not showing | Try hard refresh (Ctrl+Shift+R) or clear cache |
| API error 401 | Re-login to admin panel |
| Database connection fails | Check DATABASE_URL in .env |
| Image not loading | Verify image URL is accessible |
| Prisma type errors | Run `npx prisma generate` |

## 🎨 Customization

### Add New Skill Category Color
Edit in `prisma/schema.prisma`:
```prisma
model SkillCategory {
  color String @default("from-blue-500 to-cyan-500")
}
```

Then update UI components to show color options.

### Change Project Grid Layout
Edit in `components/ProjectsClient.tsx`:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

Change `lg:grid-cols-3` to different values (e.g., `lg:grid-cols-4`)

## 📖 Related Files

- **Schema**: `prisma/schema.prisma`
- **Seed Data**: `prisma/seed.ts`
- **API Routes**: `app/api/admin/`
- **Admin Pages**: `app/admin/`
- **Components**: `components/skills.tsx`, `components/Projects.tsx`

---

**Last Updated**: December 2025
**Version**: 1.0
