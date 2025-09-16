import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [dashboard, setDashbord] = useState({ incomingSum: 0, outgoingSum: 0, total: 0 })
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      let response;

      if (query) {
        response = await axios.post(`${baseUrl}/search`, { query });
        console.log(response)
        setTransactions(response.data?.data ?? []);
        setTotalPages(1);
        setDashbord({
          incomingSum: response?.data?.incomingSum,
          outgoingSum: response?.data?.outgoingSum,
        })
        setPage(1);
      } else {
        console.log('hell o previosu')
        response = await axios.get(`${baseUrl}/get?p=${page}`);
        console.log(response)
        setTransactions(response.data?.data ?? []);
        setDashbord({
          incomingSum: response?.data?.incomingSum,
          outgoingSum: response?.data?.outgoingSum,
        })
        setTotalPages(response.data?.total ?? 1);
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch transactions";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [page, query]);
  useEffect(() => {
    fetchTransactions();
  }, [page, query, fetchTransactions]);

  const handlePrevious = () => {
    if (!query) {
      setPage((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleNext = () => {
    if (!query) {
      setPage((prev) => Math.min(prev + 1, totalPages));
    }
    console.log('hell o  next previosu')

  };

  return {
    transactions,
    loading,
    error,
    page,
    setPage,
    totalPages,
    query,
    setQuery,
    handlePrevious,
    handleNext,
    dashboard,
    refetch: fetchTransactions,
  };
}
