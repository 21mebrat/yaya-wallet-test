import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL:
    import.meta.env.VITE_YAYA_BASE_URL || "https://yayawallet.com/api/en",
  headers: {
    "Content-Type": "application/json",
    "YAYA-API-KEY": import.meta.env.VITE_YAYA_API_KEY || "",
  },
});

// Fetch transactions
export const getTransactions = async (page = 1, limit = 20) => {
  try {
    const endpoint = import.meta.env.VITE_YAYA_BASE_URL;
    const response = await axios.get(endpoint, {
      params: { p: page, limit },
    });
    const transactions = response.data.transactions || response.data.data || [];
    const total = response.data.total || transactions.length;

    return {
      data: transactions.map((tx) => ({
        id: tx.id || tx.transaction_id || "",
        sender: tx.sender || tx.sender_name || "",
        receiver: tx.receiver || tx.receiver_name || "",
        amount: tx.amount || 0,
        currency: tx.currency || "ETB",
        cause: tx.cause || tx.description || "",
        created_at: tx.created_at || new Date().toISOString(),
      })),
      total,
      page,
      limit,
      total_pages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

// Search transactions
export const searchTransactions = async (query, page = 1, limit = 20) => {
  try {
    const endpoint = import.meta.env.VITE_YAYA_BASE_URL;
    const response = await api.post(endpoint, { query });

    const transactions = response.data.transactions || response.data.data || [];
    const total = response.data.total || transactions.length;

    return {
      data: transactions.map((tx) => ({
        id: tx.id || tx.transaction_id || "",
        sender: tx.sender || tx.sender_name || "",
        receiver: tx.receiver || tx.receiver_name || "",
        amount: tx.amount || 0,
        currency: tx.currency || "ETB",
        cause: tx.cause || tx.description || "",
        created_at: tx.created_at || new Date().toISOString(),
      })),
      total,
      page,
      limit,
      total_pages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Error searching transactions:", error);
    throw error;
  }
};
