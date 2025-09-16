# YaYa Wallet — Transactions Dashboard (React + Express)

A **secure**, **responsive**, and **user-friendly** dashboard for monitoring transactions on a YaYa Wallet account.

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, shadcn/ui, @tanstack/react-table  
- **Backend:** Node.js, Express, Axios  
- **Features:**  
  - Pagination (`?p=`)  
  - Search by sender, receiver, cause, or transaction ID  
  - Visual indicators for incoming/outgoing transactions  
  - Fully responsive table  
- **Security:**  
  - API credentials are stored **server-side** in environment variables  
  - Frontend never directly accesses sensitive keys

---

## Assumptions

- `.env` file is added **only for testing purposes** to provide API keys and endpoints.  
  > **Important:** It is not secure to commit `.env` to a repository. In production, API keys should never be exposed.  
- Current user is hardcoded in the frontend for identifying incoming/outgoing transactions.  
- The backend proxy is optional but recommended for secure API access.  
- Top-up transactions are considered incoming (sender = receiver).  

---

## Features & Functionality

The dashboard provides a clean, intuitive interface to explore transactions:

- **Transaction Table:** Displays all relevant details:
  - Transaction ID  
  - Sender  
  - Receiver  
  - Amount  
  - Currency  
  - Cause  
  - Created At  
- **Incoming vs Outgoing:**  
  - **Incoming:** Green indicator (receiver is current user or top-up transaction)  
  - **Outgoing:** Red indicator (receiver is not current user)  
- **Search:** Filter transactions quickly by sender, receiver, cause, or ID  
- **Pagination:** Navigate through large sets of transactions easily  
- **Responsive Design:** Optimized for mobile, tablet, and desktop screens  
- **Loading & Error Handling:** Clear feedback while fetching data or when errors occur  

---

## Setup & Run

## 2. clone the repo
git clone https://github.com/21mebrat/yaya-wallet-test.git
cd yaya-wallet-test

## 2. Backend Setup

1. **Navigate to the backend folder:**

```bash
cd backend
Install dependencies:
npm install
Start the server:
npm start
Available Endpoints:

Method	Endpoint	Description
GET	/transactions?p=1	Fetch paginated transactions
POST	/transactions/search	Search transactions with { "query": "" }

The backend handles API key signing and forwards requests to the YaYa Wallet sandbox.

3. Frontend Setup

Navigate to the frontend folder:
cd frontend
Install dependencies:
npm install
Start the development server:
npm run dev
Open the app in your browser:
http://localhost:5173


