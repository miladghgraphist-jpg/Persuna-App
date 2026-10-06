# Persuna App — v0.2

Private internal operations app for Persuna Studio.

## Stack
- React + TypeScript + Vite
- Supabase Auth + PostgreSQL + RLS
- GitHub source control
- Netlify-ready deployment

## Current scope
- Owner authentication
- Secure first-owner bootstrap for the Persuna Studio workspace
- Live dashboard metrics from Supabase
- Premium dark UI with purple accent
- Netlify SPA routing configuration

## Environment
Copy `.env.example` to `.env` for local development. The publishable Supabase key is safe for client-side use; never place a service-role key in frontend code.

## Build
`npm install`
`npm run build`
