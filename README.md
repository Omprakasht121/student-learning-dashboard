# Student Learning Dashboard

A premium, SaaS-style educational dashboard application built for students to track their courses, monitor learning analytics, and manage their study preferences. 

Designed with a focus on modern web aesthetics, the application features an extensive dark-mode only UI, glassmorphism elements, hardware-accelerated micro-interactions, and a bespoke theme engine—all engineered without the bloat of heavy component libraries.

---

## 🌟 Key Features

### 1. Dashboard & Course Tracking
- **Bento Grid Layout:** A responsive, asymmetrical grid housing the user's primary learning metrics.
- **Dynamic Course Cards:** Rendered dynamically via **Supabase**. Features custom hover states with spring-physics (Framer Motion), algorithmic letter grades (`A+`, `B`), and dynamic SVG progress bars.
- **Activity Heatmap:** A GitHub-style contribution graph that visualizes learning consistency over a 15+ week period.

### 2. Recruiter-Level Analytics
- **Custom SVG Charting:** A bespoke, lightweight area chart built entirely from SVG primitives featuring SVGO drop-shadow filters and Framer Motion path-drawing animations.
- **Animated KPI Grid:** Performance metrics that smoothly count up from zero on page load.
- **Achievement System:** A glowing glassmorphism badge grid for unlocking learning milestones.

### 3. Persistent Theme Engine
- **Zero-FOUC Architecture:** A robust global context provider paired with a blocking `<head>` script that ensures the user's selected theme renders perfectly on the very first paint.
- **Premium Palettes:** 
  - *Dark* (Default slate)
  - *Midnight* (Deep indigos)
  - *OLED Black* (True `#000000` for battery saving)
  - *Purple Glow* (Fuchsia ambient lighting)

### 4. Interactive Settings
- Bypasses standard HTML forms in favor of fully custom interactive UI controls.
- Features custom range sliders, mock segment controls, and highly satisfying `AnimatedSwitch` toggles.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components)
- **Database / Backend:** [Supabase](https://supabase.com/) & `@supabase/ssr`
- **Styling:** Vanilla CSS + [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript

---

## 🚀 Getting Started

### Prerequisites
You will need Node.js installed on your machine and a Supabase project created.

### 1. Installation
Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Database Configuration
1. Head over to your [Supabase Dashboard](https://app.supabase.com) and create a new project.
2. In the SQL Editor, create the following table:

```sql
create table courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer default 0,
  icon_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

3. Insert some mock data:

```sql
insert into courses (title, progress, icon_name) values 
('Advanced React Patterns', 78, 'Code'),
('UI/UX Design Fundamentals', 45, 'Palette'),
('Database Architecture', 100, 'Database');
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Architecture Overview

- **`/src/app/`**: Next.js App Router endpoints (`/dashboard`, `/analytics`, `/settings`, `/courses`).
- **`/src/components/`**: Modular, highly-reusable UI components (BentoGrid, AnimatedSwitch, CourseCard).
- **`/src/lib/`**: Supabase client configuration and server-side fetching utilities (`getCourses()`).
- **`/src/types/`**: Strict TypeScript interfaces mirroring the database schema.
- **`globals.css`**: Contains the complex CSS variables required for the dynamic Theme Engine and global ambient lighting.
