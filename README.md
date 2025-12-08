# Mohammad Ali Nayeem - Portfolio Website

A modern, full-featured portfolio website built with **Next.js 15**, **React 19**, **Prisma**, **PostgreSQL**, and **TypeScript**. This portfolio showcases projects, skills, experience, and includes a powerful admin dashboard for content management.

![Next.js](https://img.shields.io/badge/Next.js-15.4.8-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.1-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06b6d4?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-6.14.0-2d3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql)

## 🌟 Features

### Public Portfolio
- **Hero Section** - Eye-catching introduction with animated terminal
- **About Me** - Detailed background and expertise
- **Skills** - Categorized technical skills with drag-and-drop admin control
- **Projects** - Featured projects showcase with filtering and sorting
- **Experience & Education** - Timeline of professional journey
- **Blog** - Dynamic blog with rich text editor
- **Contact** - Email contact system with validation
- **Chat Integration** - Real-time chat functionality
- **Dark Mode** - Seamless light/dark theme switching with system preference detection
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **PWA Support** - Progressive Web App capabilities for offline access

### Admin Dashboard
- **Secure Authentication** - JWT-based login system with bcrypt password hashing
- **Skills Management** - Create, edit, delete skills with category organization
- **Projects Management** - Manage featured projects with full CRUD operations
- **Experience Management** - Edit work experience and timeline
- **Education Management** - Manage educational background
- **Blog Management** - Create and publish blog posts with rich text editor
- **Achievements Management** - Track and display achievements
- **Real-time Sync** - Changes instantly reflect on the public site

### Technical Features
- **Server-Side Rendering (SSR)** - Optimized performance with Next.js App Router
- **API Routes** - RESTful API endpoints for all operations
- **Database** - PostgreSQL with Prisma ORM for reliable data management
- **Authentication** - Secure JWT tokens with httpOnly cookies
- **Form Validation** - React Hook Form with Zod schemas
- **Animations** - Framer Motion for smooth, professional transitions
- **3D Graphics** - Three.js globe visualization
- **Code Highlighting** - Syntax highlighting for code snippets
- **SEO Optimized** - Metadata, Open Graph, Twitter cards
- **Analytics** - Vercel Analytics integration
- **Image Optimization** - Next.js Image component for fast loading

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm/yarn
- **PostgreSQL** database (local or cloud)
- **Environment variables** configured

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd my-portfolio
```

2. **Install dependencies**
```bash
yarn install
# or
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db

# JWT Secret
JWT_SECRET=your_super_secret_key_here_change_in_production

# Google AI (for content generation)
GOOGLE_GENAI_API_KEY=your_google_api_key

# Admin Email (optional)
ADMIN_EMAIL=your_email@example.com
```

4. **Set up the database**
```bash
# Generate Prisma client
yarn prisma:generate

# Run migrations
yarn prisma:migrate

# (Optional) Seed the database with sample data
yarn prisma db seed
```

5. **Run the development server**
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 📝 Usage Guide

### For Users

**Visit the Portfolio:**
- Navigate to `http://localhost:3000`
- Explore all sections: Hero, About, Skills, Projects, Experience, Education, Blog, Contact
- Use dark mode toggle in the navbar
- Fill out the contact form to send messages
- Chat with the AI assistant

### For Admin

**Access the Dashboard:**
1. Go to `http://localhost:3000/admin`
2. Click "Create Account" to register your admin account
3. Use your credentials to log in
4. Manage portfolio content from the dashboard

**Quick Admin Actions:**
- **Skills**: Add/edit/delete skills and organize by category
- **Projects**: Add featured projects with images, descriptions, and links
- **Experience**: Add work experiences with dates and descriptions
- **Education**: Manage educational qualifications
- **Blog**: Create and publish blog posts
- **Achievements**: Add and track achievements

## 📁 Project Structure

```
my-portfolio/
├── app/
│   ├── admin/                 # Admin dashboard pages
│   │   ├── login/            # Login page
│   │   ├── skills/           # Skills management
│   │   ├── projects/         # Projects management
│   │   ├── experience/       # Experience management
│   │   ├── education/        # Education management
│   │   └── achievements/     # Achievements management
│   ├── api/                  # API routes
│   │   ├── admin/           # Admin endpoints
│   │   ├── skills/          # Skills endpoints
│   │   ├── projects/        # Projects endpoints
│   │   └── ...              # Other API routes
│   ├── blog/                # Blog pages
│   ├── login/               # User login page
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── components/
│   ├── Hero.tsx             # Hero section
│   ├── Projects.tsx         # Projects section
│   ├── Skills.tsx           # Skills section
│   ├── Contact.tsx          # Contact form
│   ├── aboutme.tsx          # About me section
│   ├── navbar.tsx           # Navigation bar
│   ├── footer.tsx           # Footer
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── auth.ts              # Authentication utilities
│   ├── prisma.ts            # Prisma client
│   ├── store.ts             # Redux store
│   └── services/            # API services
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── migrations/          # Database migrations
│   └── seed.ts              # Database seed script
├── public/                  # Static assets
└── package.json             # Dependencies and scripts
```

## 🗄️ Database Schema

The portfolio uses PostgreSQL with the following main models:

```prisma
model User {
  id              String    @id @default(cuid())
  email           String    @unique
  passwordHash    String
  role            String    @default("admin")
  createdAt       DateTime  @default(now())
}

model Project {
  id                  String    @id @default(cuid())
  title               String
  shortDescription    String
  fullDescription     String
  imageSrc            String
  githubLink          String
  liveLink            String?
  technologies        String[]
  features            String[]
  isTeamProject       Boolean   @default(false)
  isFeatured          Boolean   @default(true)
  order               Int
  createdAt           DateTime  @default(now())
}

model Skill {
  id                  String    @id @default(cuid())
  name                String
  category            String
  proficiency         String
  order               Int
  createdAt           DateTime  @default(now())
}

model Experience {
  id                  String    @id @default(cuid())
  company             String
  position            String
  description         String
  startDate           DateTime
  endDate             DateTime?
  order               Int
  createdAt           DateTime  @default(now())
}

model Education {
  id                  String    @id @default(cuid())
  institution         String
  degree              String
  field               String
  startDate           DateTime
  endDate             DateTime?
  order               Int
  createdAt           DateTime  @default(now())
}
```

## 🔐 Authentication

- **JWT-based** authentication with secure httpOnly cookies
- **Bcrypt** password hashing for security
- **Role-based** access control (Admin)
- **Token refresh** mechanism for extended sessions
- **CSRF protection** on state-changing operations

## 🎨 Styling & UI

- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Shadcn/ui** - High-quality React components
- **Framer Motion** - Smooth animations and transitions
- **Custom Theme** - Light and dark mode with CSS variables
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints

## 🚀 Performance Optimizations

- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic with Next.js
- **Turbopack** - Fast builds with Turbopack in dev mode
- **Data Revalidation** - ISR (Incremental Static Regeneration)
- **API Caching** - SWR hooks for client-side data fetching
- **PWA** - Install as app with offline support
- **Bundle Analysis** - Optimized bundle size

## 📊 Available Scripts

```bash
# Development
yarn dev              # Start dev server with Turbopack
yarn build            # Build for production
yarn start            # Start production server
yarn lint             # Run ESLint

# Database
yarn prisma:generate  # Generate Prisma client
yarn prisma:migrate   # Run pending migrations
yarn prisma studio    # Open Prisma Studio (visual DB editor)

# Database seeding
yarn prisma db seed   # Seed database with sample data
```

## 🌐 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Create admin account
- `POST /api/admin/logout` - Admin logout

### Projects
- `GET /api/projects` - Get all featured projects
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/[id]` - Update project (admin)
- `DELETE /api/projects/[id]` - Delete project (admin)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill (admin)
- `PUT /api/skills/[id]` - Update skill (admin)
- `DELETE /api/skills/[id]` - Delete skill (admin)

### Experience
- `GET /api/experience` - Get all experiences
- `POST /api/experience` - Create experience (admin)
- `PUT /api/experience/[id]` - Update experience (admin)
- `DELETE /api/experience/[id]` - Delete experience (admin)

### Education
- `GET /api/education` - Get all education
- `POST /api/education` - Create education (admin)
- `PUT /api/education/[id]` - Update education (admin)
- `DELETE /api/education/[id]` - Delete education (admin)

### Messages
- `POST /api/sendMessage` - Send contact message
- `GET /api/messages` - Get all messages (admin)

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Development

### Setup Development Environment
```bash
# Install dependencies
yarn install

# Create .env.local with your configuration
# Run migrations
yarn prisma:migrate

# Start dev server
yarn dev
```

### Making Changes
- Edit components in `/components`
- Add/modify API routes in `/app/api`
- Update database schema in `/prisma/schema.prisma`
- Run migrations after schema changes

### Testing
Follow the complete testing checklist in `LOGIN_AND_TESTING.md`

## 📚 Documentation

For detailed documentation, see:
- **Setup Guide**: `ADMIN_DASHBOARD_GUIDE.md`
- **Quick Reference**: `QUICK_REFERENCE.md`
- **Authentication**: `AUTHENTICATION_FLOW.md`
- **Complete Implementation**: `COMPLETE_IMPLEMENTATION.md`
- **Admin System**: `README_ADMIN_SYSTEM.md`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Set environment variables in project settings
4. Vercel will auto-build and deploy

```bash
# Or deploy via CLI
vercel deploy
```

### Deploy to Other Platforms

Ensure you have:
- Node.js 18+ runtime
- PostgreSQL database
- Environment variables configured
- Run `npm run build` before starting

### Production Checklist
- [ ] Update `JWT_SECRET` with a strong random key
- [ ] Configure PostgreSQL connection string
- [ ] Set up database backups
- [ ] Enable HTTPS
- [ ] Configure domain name
- [ ] Set up email service for notifications
- [ ] Configure analytics tracking
- [ ] Test all features in production

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check DATABASE_URL in .env.local
# Ensure PostgreSQL is running
# Verify credentials are correct
# Run migrations: yarn prisma:migrate
```

### Login Issues
See `LOGIN_FIX_SUMMARY.md` for detailed troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
yarn install
yarn build
```

## 📄 License

This project is personal and proprietary. All rights reserved.

## 🤝 Contact

**Mohammad Ali Nayeem**
- Email: nayeem2305341022@diu.edu.bd
- LinkedIn: [Profile](https://linkedin.com/in/nayeem)
- GitHub: [Profile](https://github.com/kazinayeem)
- Portfolio: [nayeem.dev](https://nayeem.dev)

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org) - React framework
- [Prisma](https://prisma.io) - Database ORM
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Framer Motion](https://framer.com/motion) - Animation library
- [Shadcn/ui](https://ui.shadcn.com) - Component library
- [Vercel](https://vercel.com) - Hosting platform

---

**Last Updated**: December 2025
**Status**: ✅ Production Ready
