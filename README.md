# 🏛️ JMRH | Journal of Modern Research in Humanities

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

> **"Bridging the gap between theoretical inquiry and practical societal impact through rigorous, open-access scholarship."**

Welcome to **JMRH** - a premium academic journal platform with world-class design, real-time database features, and comprehensive user management system.

---

## ✨ Features

- 🎨 **Premium Design**: Academic luxury aesthetic with warm ivory, deep charcoal, and subtle gold
- 🔐 **Secure Authentication**: Supabase-powered user authentication and authorization
- 📄 **Paper Management**: Complete submission, review, and publication workflow
- 👨‍💼 **Admin Dashboard**: Powerful control panel with real-time updates
- 🚀 **Real-Time Updates**: Live database synchronization across all users
- 📱 **Fully Responsive**: Beautiful on desktop, tablet, and mobile
- ✨ **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- 🎯 **Role-Based Access**: User and Admin roles with different permissions

---

## 🔐 Admin Access Credentials

### Primary Admin Account
**These credentials are HARDCODED in the source code and cannot be changed through the application.**

| Field | Value |
|-------|-------|
| **Email** | `admin@jmrh.org` |
| **Password** | `JMRHAdmin@2025!Secure` |
| **Role** | Super Administrator |
| **Access Level** | Full Control |

### Backup Admin Account
In case you forget the primary credentials:

| Field | Value |
|-------|-------|
| **Email** | `superadmin@jmrh.org` |
| **Password** | `SuperJMRH@Master2025` |
| **Role** | Super Administrator |

### Admin Dashboard Access
- **Login URL**: `http://yourdomain.com/admin/login`
- **Dashboard URL**: `http://yourdomain.com/admin/dashboard` (after login)

**⚠️ IMPORTANT**: 
- These credentials are stored in `src/utils/adminCredentials.ts`
- They are UNCHANGEABLE through the application interface
- For production, you can modify the credentials directly in the source code file
- Never share these credentials publicly
- The admin login checks these hardcoded credentials first before any database check

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sparrow-003/JMRH.git
cd JMRH
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project dashboard.

4. **Set up Supabase database**
Follow the instructions in `SUPABASE_SETUP.md` to create the required tables and configure Row Level Security.

5. **Run the development server**
```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

6. **Build for production**
```bash
npm run build
```

---

## 🏗️ Project Structure

```
JMRH/
├── src/
│   ├── pages/
│   │   ├── Home.tsx                    # Public landing page
│   │   ├── admin/
│   │   │   ├── AdminLogin.tsx         # Admin login page
│   │   │   ├── AdminDashboard.tsx     # Admin control panel
│   │   │   └── AdminArchives.tsx      # Archives management
│   │   ├── user/
│   │   │   ├── UserLogin.tsx          # User login page
│   │   │   ├── UserRegister.tsx       # User registration
│   │   │   ├── UserSubmitPaper.tsx    # Paper submission form
│   │   │   └── UserPapers.tsx         # User's paper dashboard
│   │   └── docs/
│   │       └── DocsViewer.tsx         # Documentation viewer
│   ├── utils/
│   │   ├── AuthContext.tsx            # Authentication context
│   │   ├── supabaseClient.ts          # Supabase client setup
│   │   └── adminCredentials.ts        # Hardcoded admin credentials
│   ├── styles/
│   │   └── index.css                  # Global styles
│   ├── App.tsx                        # Main app component
│   └── main.tsx                       # Entry point
├── .env                               # Environment variables
├── package.json                       # Dependencies
├── README.md                          # This file
├── SUPABASE_SETUP.md                  # Database setup guide
└── IMPLEMENTATION_GUIDE.md            # Complete implementation guide
```

---

## 🎯 User Flow

### For Regular Users (Authors)

1. **Visit Home Page** → Beautiful landing page with features
2. **Click "Submit Paper"** → Redirected to login if not authenticated
3. **Register/Login** → Create account or sign in
4. **Submit Paper** → Fill comprehensive form with:
   - Title
   - Authors
   - Abstract
   - Keywords
   - PDF file upload
5. **Track Papers** → View all submissions in "My Papers" dashboard
6. **Real-time Updates** → Status changes reflect immediately

### For Administrators

1. **Visit Admin Login** → `http://yourdomain.com/admin/login`
2. **Enter Credentials** → Use hardcoded admin credentials
3. **Access Dashboard** → Full control panel with:
   - **Overview**: System statistics and recent activity
   - **Papers**: Manage all submissions (approve, reject, publish)
   - **Users**: View all registered users
   - **Settings**: System configuration
4. **Manage Papers** → Change status, view details, download files
5. **Real-time Monitoring** → All changes sync live

---

## 🎨 Design System

### Color Palette
- **Background**: `#FAF9F6` (Warm Ivory)
- **Primary**: `#2C2C2C` (Deep Charcoal)
- **Secondary**: `#334155` (Muted Navy)
- **Accent**: `#C5A065` (Subtle Gold)
- **Text**: `#4B5563` (Clean Gray)

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Outfit (Sans-serif)

### Components
All components use the premium academic luxury theme with:
- Smooth transitions
- Hover effects
- Glassmorphism
- Gradient accents
- Micro-animations

---

## 🔐 Security Features

1. **Hardcoded Admin Credentials**
   - Cannot be changed through UI
   - Stored in source code only
   - Bypasses database for admin auth

2. **Supabase Authentication**
   - Secure user registration and login
   - JWT-based sessions
   - Row Level Security (RLS)

3. **Protected Routes**
   - Paper submission requires authentication
   - Admin routes check for valid session
   - Automatic redirects for unauthorized access

4. **Real-time Security**
   - User can only see their own papers
   - Admin can see everything
   - Database rules enforce access control

---

## 📊 Database Schema

### Tables

#### `documents`
```sql
- id: UUID (primary key)
- title: TEXT
- authors: TEXT
- abstract: TEXT
- keywords: TEXT
- description: TEXT
- file_url: TEXT
- file_path: TEXT
- uploaded_by: UUID (foreign key to auth.users)
- uploaded_at: TIMESTAMP
- status: TEXT (pending, under_review, published, rejected)
- is_public: BOOLEAN
```

### Supabase Storage
- **Bucket**: `papers`
- **Access**: Public URLs for approved papers
- **Path**: `papers/{user_id}/{timestamp}_{filename}`

---

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to vercel.com
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration

3. **Add Environment Variables**
In Vercel dashboard settings:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Deploy**
   - Vercel automatically builds and deploys
   - Your site will be live at `your-project.vercel.app`

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 18**  | UI library with hooks |
| **TypeScript** | Type safety and better DX |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Supabase** | Backend, Auth, Database, Storage |
| **React Router** | Client-side routing |

---

## 📝 Admin Dashboard Features

### Overview Tab
- Total papers count
- Pending reviews count
- Published papers count
- Total users count
- Recent activity feed

### Papers Tab
- Full list of all submissions
- Filter by status
- Update paper status (pending, under_review, published, rejected)
- View paper details
- Download PDF files
- Delete papers

### Users Tab
- List all registered users
- View user details
- Manage user accounts

### Settings Tab
- Admin information
- Quick actions:
  - Export all data
  - Generate reports
  - Backup database
  - System maintenance

### Real-time Features
- Automatic updates when papers are submitted
- Live status changes
- No page refresh needed

---

## 🎓 User Features

### For Authors
- Submit research papers
- Track submission status
- View all submitted papers
- Download submitted files
- Real-time status updates
- Beautiful, intuitive interface

### Paper Submission Form
- Title (required)
- Authors (required)
- Abstract (required)
- Keywords (required)
- PDF Upload (required)
- Additional notes (optional)

### My Papers Dashboard
- View all submissions
- Status indicators with colors:
  - 🟡 **Pending**: Awaiting review
  - 🔵 **Under Review**: Being evaluated
  - 🟢 **Published**: Accepted and published
  - 🔴 **Rejected**: Not accepted
- Download your papers
- View detailed information

---

## 🔧 Configuration

### Admin Credentials Configuration
To change admin credentials, edit `src/utils/adminCredentials.ts`:

```typescript
export const ADMIN_CREDENTIALS = {
  EMAIL: 'your-admin@email.com',
  PASSWORD: 'YourSecurePassword',
  ROLE: 'SUPER_ADMIN'
}
```

**Warning**: After changing credentials, redeploy the application.

### Supabase Configuration
Update `.env` file with your Supabase credentials:
- Get URL and keys from Supabase dashboard
- Configure storage bucket for file uploads
- Set up Row Level Security policies

---

## 🐛 Troubleshooting

### Admin Can't Login
1. Check credentials in `src/utils/adminCredentials.ts`
2. Clear browser cache and localStorage
3. Verify you're using the correct email/password

### Papers Not Showing
1. Check Supabase connection
2. Verify environment variables are set
3. Check browser console for errors
4. Ensure user is logged in

### Real-time Updates Not Working
1. Check Supabase real-time is enabled
2. Verify network connection
3. Check browser console for subscription errors

### File Upload Fails
1. Verify Supabase storage bucket exists
2. Check bucket permissions (should be public)
3. Ensure file size is within limits
4. Check file type is allowed (.pdf, .doc, .docx)

---

## 📚 Documentation

- **SUPABASE_SETUP.md**: Complete database setup guide
- **IMPLEMENTATION_GUIDE.md**: Detailed implementation documentation
- **Comments in Code**: Inline documentation throughout codebase

---

## 🤝 Contributing

This is a complete, production-ready application. If you want to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄  License

© 2024 JMRH Publications. All Rights Reserved.

---

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the implementation guide
3. Check Supabase dashboard for errors
4. Verify all environment variables are set correctly

---

## 🎉 Features Summary

✅ Public home page for everyone
✅ Secure user authentication
✅ Protected paper submission
✅ Real-time database updates
✅ Admin dashboard with full control
✅ Hardcoded admin credentials (unchangeable via UI)
✅ Beautiful, responsive design
✅ Smooth animations throughout
✅ Error handling and validation
✅ File upload and management
✅ Status tracking and updates
✅ Production-ready deployment
✅ Comprehensive documentation

---

**Your JMRH website is a world-class academic journal platform! 🎓✨**

For detailed implementation information, see `IMPLEMENTATION_GUIDE.md`.
