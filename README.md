# 🏛️ JMRH | Journal of Multidisciplinary Research Horizon

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Twind_V2-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75C2?style=for-the-badge&logo=google-gemini&logoColor=white)

> **"Bridging the gap between theoretical inquiry and practical societal impact through rigorous, open-access scholarship."**

Welcome to the digital repository of **JMRH**, a premium academic journal platform designed with an **"Academic Luxury"** aesthetic. This project transcends generic designs, embracing a timeless, print-inspired interface that projects authority, trust, and scholarly depth.

---

## ✨ Why JMRH is "Super"?

JMRH isn't just a website; it's a **Scholarly Ecosystem** designed for the modern researcher. It combines historical ivory-tower prestige with cutting-edge 2025 technology.

*   **💎 Academic Luxury Design System**: A bespoke UI palette (Warm Ivory, Deep Charcoal, Subtle Gold) that mimics the feel of high-end journals like *Nature* or *Oxford University Press*.
*   **🤖 Scholar Assistant (AI)**: Integrated **Google Gemini AI** that provides syntheses and insights to researchers in real-time.
*   **🚀 Ultra-Performance Architecture**: Built with **React 19** and **Vite**, featuring zero-runtime CSS via **Twind** and ultra-smooth motion via **Lenis & GSAP**.
*   **📂 Secure Footprint Session**: Advanced session persistence with **Supabase Auth**, tracking researcher "footprints" (visit logs) for security.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19 + TypeScript | Core logic and component architecture. |
| **Bundler** | Vite | Lightning-fast HMR and optimized production builds. |
| **Styling** | Twind (Tailwind-in-JS) | Type-safe, high-performance styling. |
| **Animation** | GSAP + Framer Motion | Editorial entrances and micro-interactions. |
| **Backend** | Supabase | Auth, PostgreSQL Database, and Real-time sync. |
| **AI Engine** | Google Gemini 1.5 | Research assistance and content synthesis. |
| **Utilities** | Lucide React + Lenis | Smooth scrolling and high-fidelity iconography. |

---

---

## 🔐 Administrative Control Panel

The administrative core is hidden from public view to maintain scholarly integrity. It is accessible via a high-security gateway.

### 🔑 Default Administrative Credentials
Use these **real** credentials to access the system (after completing the [Supabase Setup](./SUPABASE_SETUP.md)):

| Field | Value |
| :--- | :--- |
| **Administrator ID** | `admin@jmrh.org` |
| **Secure Key** | `ScholarAdmin@2025` |

### 📍 Accessing the Dashboard
*   **Gateway URL**: `[your-domain]/system/control-panel/login`
*   **Dashboard URL**: `[your-domain]/system/control-panel/dashboard`

> **Pro-Tip**: To initialize your database tables and triggers, please follow the [Supabase Setup Guide](./SUPABASE_SETUP.md).

### 📊 Governance Capabilities:
1.  **Universal Repository Pool**: Vet, approve, or revise submitted manuscripts.
2.  **Scholar Management**: Verify researcher identities and manage privileges.
3.  **Digital Audit Trail**: Monitor resource downloads and visit logs in real-time.
4.  **System Analytics**: Track global reach and publication statistics.

---

## 🏗️ How it All Works

### 1. **The Entry Point (`index.tsx`)**
The application initializes with an **Academic Error Boundary** and a **Twind Version 3** theme injector. It sets up the design tokens (colors, fonts, shadows) that define the "Luxury" feel.

### 2. **Fluid Intelligence (`App.tsx`)**
A **Lenis Smooth Scroll** engine handles the sensory experience, while the **Auth Provider** establishes a secure connection to the Supabase cloud. Lazy loading is utilized to ensure the initial paint is under **1s**.

### 3. **The Scholar Assistant (`gemini.ts`)**
When a user interacts with the AI, the service invokes the **Gemini 1.5 Flash** model with a specific "Scholarly Instruction" set, ensuring the AI behaves like a professional academic peer-reviewer.

### 4. **Vercel Ecosystem Deployment**
The project includes a `vercel.json` configuration that handles **SPA Routing (Rewrites)**, ensuring that any URL entered (like the admin dashboard) correctly maps to the React router.

---

## 💻 Running the Repository Locally

1.  **Clone & Install**
    ```bash
    git clone https://github.com/sparrow-003/JMRH.git
    cd JMRH
    npm install
    ```

2.  **Environment Sync**
    Create a `.env` file and add your Gemini API Key:
    ```env
    VITE_GEMINI_API_KEY=your_key_here
    ```

3.  **Launch**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to see the academic ivory tower in action.

---

## 📜 Academic Ethics & Governance

© 2025 **JMRH Publications**. All Rights Reserved.  
*Published from Gudalur, The Nilgiris, Tamil Nadu, India.*  
*Governance compliant with UGC & COPE academic ethics guidelines.*

---

<p align="center">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Graduation%20Cap.png" alt="Graduation Cap" width="100" />
</p>
- Admin Access and Supabase Setup
- Admin login uses default dev credentials for quick testing:
  - ID: jmeh@123
  - Password: jmrh@123
- For production, replace with a secure authentication flow (e.g., Supabase auth with roles).
- Supabase integration: configure SUPABASE URL and anon key in admin/login.html via data-supabase-url and data-supabase-anon-key, and ensure the CDN script for supabase-js loads on the login page
- User authentication and paper submission are implemented using Supabase Auth and Storage.
- Users can register, login, submit papers, and view/download papers in the Papers page.
- Admins can view archives and upload papers via the Archives page.
- Admin login uses default dev credentials for quick testing:
  - ID: jmeh@123
  - Password: jmrh@123
- For production, replace with a secure authentication flow (e.g., Supabase auth with roles).
- Supabase integration: configure SUPABASE URL and anon key in admin/login.html via data-supabase-url and data-supabase-anon-key, and ensure the CDN script for supabase-js loads on the login page.
- To test admin login, open /admin/login.html, login with defaults, then go to /admin/dashboard.html.

Project setup notes
- Ensure environment variables for Supabase URL/anon key are kept secret in production.
- If you port this to a framework, create a proper ThemeProvider and a secure admin auth guard.
- To test admin login, open /admin/login.html, login with defaults, then go to /admin/dashboard.html.
- To test user features, open /user/register.html, sign up, login, and navigate to /user/submit-paper.html or /user/papers.html.

Database schema notes
- A documents table stores uploaded papers with fields: id, title, description, file_url, file_path, uploaded_by, uploaded_at, is_public.
- A profiles table stores user profiles with fields: id, user_id, name, email, created_at.
- Use Supabase to manage authentication (auth.users) and association with profiles via user_id.
