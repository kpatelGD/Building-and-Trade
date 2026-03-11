# Building and Trade Industry Inc. (BTI) Website

## Overview
A fully functional home renovation company website for Building and Trade Industry Inc., serving the Chicagoland area. Built with a modern full-stack architecture featuring a landing page with services, gallery, testimonials, and a contact form that persists inquiries to a PostgreSQL database.

## Architecture
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: wouter (frontend), Express (backend API)
- **State Management**: TanStack React Query

## Key Features
- Responsive landing page with hero section, services, about, gallery, testimonials, and contact form
- Contact/quote request form with Zod validation, persisted to PostgreSQL
- Dynamic project gallery loaded from database
- Client testimonials loaded from database
- Smooth scroll navigation
- Professional warm color theme (amber/brown tones)

## Database Schema
- `inquiries` - Customer quote requests (name, email, phone, service, message)
- `testimonials` - Client reviews (name, location, rating, text, service)
- `projects` - Portfolio items (title, description, service, imageUrl, featured)

## File Structure
- `client/src/pages/home.tsx` - Main landing page
- `client/src/components/` - All UI sections (navbar, hero, services, about, gallery, testimonials, contact, footer)
- `server/routes.ts` - API endpoints (POST /api/inquiries, GET /api/testimonials, GET /api/projects)
- `server/storage.ts` - Database storage layer
- `server/db.ts` - Database connection
- `server/seed.ts` - Seed data for testimonials and projects
- `shared/schema.ts` - Drizzle ORM schemas and Zod validation
- `client/public/images/` - AI-generated renovation photos

## API Endpoints
- `POST /api/inquiries` - Submit a quote request
- `GET /api/testimonials` - Get all testimonials
- `GET /api/projects` - Get all portfolio projects

## Theme
Warm renovation theme with amber/brown primary colors (hsl 25 75% 47%), Montserrat + Open Sans fonts, light mode with dark mode support.
