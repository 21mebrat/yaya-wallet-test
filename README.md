# YaYa Wallet — Transactions Dashboard (React + Express)

A secure, responsive dashboard to monitor transactions for a YaYa Wallet account.

- **Frontend:** React (Vite), Tailwind, shadcn/ui, @tanstack/react-table  
- **Backend:** Node.js, Express, Axios  
- **Features:** Pagination (`?p=`), search (sender/receiver/cause/ID), incoming/outgoing indicators, responsive table  
- **Security:** All YaYa API credentials are kept **server-side** in environment variables; the frontend never sees them.

---

## What It Does

- Displays transactions in a table with:
  - Transaction ID  
  - Sender  
  - Receiver  
  - Amount  
  - Currency  
  - Cause  
  - Created At  
  - **Incoming vs Outgoing**:  
    - Incoming → green indicator (receiver is current user or top-up)  
    - Outgoing → red indicator (receiver is not current user)  
- **Pagination**: uses `p` query param → “Prev/Next” controls  
- **Search**: by **sender**, **receiver**, **cause**, or **transaction ID**  
- **Responsive**: mobile-friendly, clean layout  

---

## Project Structure

frontend/ (Vite React app)
├─ src/
│ ├─ components/
│ │ ├─ data-table.jsx # TransactionTable (UI only)
│ │ ├─ columens.js # Column definitions for react-table
│ │ └─ ui/* # shadcn/ui wrappers
│ ├─ hooks/useTransactions.js # Data fetching + pagination + search
│ └─ App.jsx # Main dashboard layout
└─ .env # VITE_API_URL, VITE_CURRENT_USER_ACCOUNT

backend/ (Express API proxy)
├─ server.js # Exposes /api/transactions & /api/search
├─ .env # YAYA_API_KEY, YAYA_API_SECRET, CURRENT_USER_ACCOUNT
└─ package.json

yaml
Copy
Edit

**Why this design?**

- API keys and secrets **never touch the browser**.  
- Frontend communicates only with our **backend proxy**.  
- Backend handles YaYa Wallet API calls securely with proper headers.  
- Hook (`useTransactions`) centralizes data fetching and state → table stays **presentational only**.

---
Backend attaches the required auth headers securely.  

---

## Setup & Running

### Backend
```bash
cd backend
npm install
npm start
