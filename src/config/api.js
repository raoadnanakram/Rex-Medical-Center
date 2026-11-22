// Base URL of the forms/auth backend.
//
// - Live website (npm run build / npm run deploy): https://api.rexmedcomplex.com
// - Local development (npm run dev):               http://localhost:5000
// - Kabhi bhi badalna ho to .env / .env.production mein VITE_API_URL likh dein.
const LIVE_API = 'https://api.rexmedcomplex.com';
const LOCAL_API = 'http://localhost:5000';
// "../config" se import karne wali files (jaise AdminDashboard.jsx, BookConsult.jsx)
// ko yahan se API ka address mil jata hai. Asli address src/config/api.js mein hi rehta hai.

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? LOCAL_API : LIVE_API)
).replace(/\/+$/, '');