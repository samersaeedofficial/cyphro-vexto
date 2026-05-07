# APSACS Connect

A modern full-stack school management platform built with React, Supabase, Tailwind, and Vite.

## 🚀 What is this project?

`apsacs-connect` is a polished school management system for institutes, designed for role-based administration, academic workflows, communication, AI-powered assistance, and offline-capable experiences.

## ✨ Key features

- Role-based access control for:
  - Super Admin
  - Principal
  - Section Head
  - Teacher
  - Student
  - Accountant
  - Clerk
- Dynamic class, section, and timetable management
- Student onboarding, attendance, finance, and performance modules
- AI-powered assistant integrations for smarter workflows
- Supabase backend for auth, storage, and realtime data
- PWA-ready frontend with offline caching and fast loading
- GraphQL + Supabase API usage for flexible data access

## 🧱 Architecture

- `src/`: main React application
- `src/features/`: feature-driven modules and onboarding workflows
- `src/Apps/`: role-specific application views and pages
- `src/routes/`: route configuration for each role
- `src/lib/`: shared utilities, GraphQL client, Supabase setup, and helpers
- `src/shared/`: reusable UI components and overlays
- `offline-app/`: separate offline-ready application bundle
- `sql/`: database scripts and schema helpers
- `public/`: static assets and redirect rules

## 🛠️ Tech stack

- React 19
- Vite
- Tailwind CSS v4
- Supabase
- GraphQL
- Radix UI
- Framer Motion
- TypeScript tooling support via `@types/*`
- PWA support through `vite-plugin-pwa`

## ⚙️ Setup

```bash
npm install
```

Copy environment files and add your Supabase settings in a `.env` file if needed.

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 🔧 Notes

- The app uses an alias `@` for `./src` configured in `vite.config.js`.
- Supabase GraphQL requests are handled through `src/lib/graphqlClient.js`.
- Section and class flows are handled through feature-specific pages, including onboarding and timetable components.
- Offline support is enabled by the PWA plugin and an `offline-app` folder for fallback behavior.

## 📁 Notable folders

- `src/features/onboarding/`: onboarding flows for students, teachers, and section heads
- `src/Apps/Principle/`: admin dashboards and school-level management views
- `src/Apps/SectionHead/`: section head dashboards, attendance, and student management
- `src/shared/ui/`: common UI elements and form controls
- `src/lib/`: shared helpers and client utilities

## 🎯 Goals

This repository is built to support a modern school operations platform with:

- strong role segregation,
- scalable data management,
- polished UX,
- offline resilience,
- AI and analytics capabilities.

---

If you want, I can also add a dedicated `Environment Variables` section with Supabase config examples and a high-level architecture diagram.
