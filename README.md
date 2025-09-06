# Stackkart

[Live Demo](https://stackkart.vercel.app)

Stackkart is a full-stack e-commerce platform built with React (Vite) for the frontend and Node.js/Express/MongoDB for the backend. It supports user authentication, product browsing, cart management, order processing, and admin features.

## Features
- User authentication (login, signup, JWT-based sessions)
- Product catalog with categories, search, and filtering
- Shopping cart and checkout flow
- Stripe payment integration
- Order history and profile management
- Admin dashboard for managing products, categories, orders, and users
- Responsive UI with Tailwind CSS and MUI components

## Tech Stack
- **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS, MUI, Radix UI, Stripe.js
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Stripe, Cloudinary (image uploads)

## Project Structure
```
client/   # React frontend (Vite)
  src/
    components/   # UI and feature components
    layouts/      # Layout wrappers
    pages/        # Route pages (Home, Cart, Admin, etc.)
    services/     # API service modules
    store/        # Redux slices and store
server/   # Node.js backend (Express)
  controllers/    # Route handlers
  models/         # Mongoose schemas
  routes/         # API route definitions
  utils/          # Helpers (DB, cloudinary, etc.)
```

## Local Development
### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (local or Atlas)

### Setup
1. Clone the repo and install dependencies:
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```
2. Configure environment variables in `client/.env.local` and `server/.env` (see example files).
3. Start backend:
   ```sh
   npm run dev
   ```
4. Start frontend:
   ```sh
   npm run dev
   ```
5. Visit [http://localhost:5173](http://localhost:5173) (or as shown in terminal)

## Deployment
- Frontend: Vercel ([Live Demo](https://stackkart.vercel.app))
- Backend: Deployable to any Node.js host (e.g., Render, Heroku)

## Key Files
- `client/src/services/` - API calls and integration
- `client/src/store/` - Redux state management
- `server/routes/` - API endpoints
- `server/controllers/` - Business logic

## License
MIT
