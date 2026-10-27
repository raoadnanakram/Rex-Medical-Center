// Base URL of the forms/auth backend (SEO audit issue 07).
// Set VITE_API_URL in .env.production to the live backend, e.g. https://api.rexmedcomplex.com
// Without it the build falls back to the local development server.
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');
