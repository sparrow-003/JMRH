# JMRH | Journal of Multidisciplinary Research Horizon

![Version](https://img.shields.io/badge/Version-3.0.0-gold)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Theme](https://img.shields.io/badge/Theme-Premium%20Academic%20Luxury-F5F5DC)

> **"Bridging the gap between theoretical inquiry and practical societal impact through rigorous, open-access scholarship."**

Welcome to the digital repository of **JMRH**, a premium academic journal platform designed with an "Academic Luxury" aesthetic. This project moves away from generic startup designs, embracing a timeless, print-inspired interface that conveys authority, trust, and scholarly depth.

---

## 🏛️ Design Philosophy: "Academic Luxury"

The User Interface is crafted to feel like a high-value institutional platform (e.g., Oxford, Harvard, Nature).
-   **Palette**: Warm Ivory (`#FAF9F6`) backgrounds, Deep Charcoal (`#2C2C2C`) typography, and Subtle Gold (`#C5A065`) accents.
-   **Typography**: *Playfair Display* (Serif) for authoritative headlines and *Outfit* (Sans-serif) for clean, breathable body text.
-   **Surface**: "Crystal Cards" with soft shadows and refined borders (`1px solid rgba(44,44,44,0.08)`).
-   **Motion**: Deliberate, slow editorial fades (`1.5s duration`) rather than flashy startup animations.

---

## 🚀 Key Features

### 1. Public Scholarly Portal
-   **Editorial Spotlight**: Dedicated section showcasing the Editor-in-Chief with a "Profile Card" and "Biography Panel".
-   **Repository Access**: Clean, list-based archives for browsing research papers.
-   **Submission Gateway**: Clear call-to-actions for manuscript submission.

### 2. 🔐 Secure Administrative Core (Hidden)
*For security reasons, the admin portal is not linked in the main navigation.*
-   **Gateway**: [`/system/control-panel/login`](./src/pages/AdminLogin.tsx)
-   **Capabilities**:
    -   Real-time visitor analytics.
    -   Researcher verification and governance.
    -   Audit logs of all secure asset downloads.

### 3. Researcher Ecosystem
-   **Scholar Access**: A friction-less login system for submitting and tracking papers.
-   **Dashboard**: Personalized view for researchers to manage their publications.

---

## 🛠️ Technology Stack

Built on a modern, performance-first stack:
-   **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Styling**: [Twind](https://twind.dev/) (Tailwind-in-JS for zero-runtime overhead)
-   **Animation**: [Framer Motion](https://www.framer.com/motion/) (Interactions) + [GSAP](https://greensock.com/) (Editorial Entrances)
-   **Icons**: [Lucide React](https://lucide.dev/) (Clean, consistent iconography)

---

## 💻 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/jmrh-platform.git
    cd jmrh-platform
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Access the site at `http://localhost:3000`.

4.  **Build for Production**
    ```bash
    npm run build
    ```

---

## ☁️ Deployment on Vercel

This project is optimized for [Vercel](https://vercel.com/).

1.  **Push to GitHub**: Ensure your code is committed and pushed.
2.  **Import Project**: Go to Vercel Dashboard -> Add New -> Project -> Import from GitHub.
3.  **Configure**:
    -   **Framework Preset**: Vite
    -   **Build Command**: `npm run build`
    -   **Output Directory**: `dist`
4.  **Deploy**: Click "Deploy".
    *Note: A `vercel.json` file is included to handle Single Page Application (SPA) routing.*

---

## 📂 Project Structure

```
/src
  ├── /components     # Reusable UI (Navbar, Layout, AuthContext)
  ├── /pages          # Route components (Home, Dashboard, EditorialBoard)
  ├── /lib            # Utilities (Supabase client, etc.)
  ├── App.tsx         # Main Router & Provider setup
  ├── style.css       # Global CSS Variables & Typography
  └── constants.tsx   # Config (Menu links, Journal Metadata)
```

---

## 📜 License

© 2025 **JMRH Publications**. All Rights Reserved.
*Published from Gudalur, The Nilgiris, Tamil Nadu, India.*