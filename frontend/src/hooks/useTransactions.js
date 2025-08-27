import axios from "axios";
import { useState, useEffect } from "react";

export function useTransactions(initialPage = 1, initialSearch = "") {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  console.log(transactions);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (search) {
        res = await axios.post(
          "http://127.0.0.1:8000/api/transactions/search",
          {
            query: search,
          }
        );
      } else {
        res = await axios.get("http://127.0.0.1:8000/api/transactions/get", {
          params: { p: page },
        });
      }

      setTransactions(res.data?.data || []);
      setTotalPages(res.data?.totalPages || 1);
    } catch (err) {
      setError(err.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    console.log(transactions);
  }, [page, search]);

  return {
    transactions,
    loading,
    error,
    page,
    setPage,
    search,
    setSearch,
    totalPages,
    refetch: fetchTransactions,
  };
}
