# YaYa Wallet — Transactions Dashboard (React + Express)

A secure, responsive dashboard to monitor transactions for a YaYa Wallet account.

- **Frontend:** React (Vite), Tailwind, shadcn/ui, @tanstack/react-table  
- **Backend:** Node.js, Express, Axios  
- **Features:** Pagination (`?p=`), search (sender/receiver/cause/ID), incoming/outgoing indicators, responsive table  
- **Security:** All YaYa API credentials are kept **server-side** in environment variables; the frontend never sees them.

---

## ✨ Demo (What It Does)

- Displays transactions in a table with:
  - Transaction ID  
  - Sender  
  - Receiver  
  - Amount  
  - Currency  
  - Cause  
  - Created At  
  - **Incoming vs Outgoing**:  
    -  Incoming → green indicator (receiver is current user or top-up)  
    -  Outgoing → red indicator (receiver is not current user)  
- **Pagination**: uses `p` query param → “Prev/Next” controls  
- **Search**: by **sender**, **receiver**, **cause**, or **transaction ID**  
- **Responsive**: mobile-friendly, clean layout  

---




