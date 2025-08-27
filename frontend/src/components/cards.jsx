import { useTransactions } from "@/hooks/useTransactions";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import React, { useState, useEffect } from "react";

const DashboardCards = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    const urlParams = new URLSearchParams(window.location.query);
    return parseInt(urlParams.get("p") || "1", 10);
  });
  const {
    transactions,
    loading,
    error,
    total,
    totalPages,
    searchQuery,
    handlePageChange,
    handleSearch,
    retry,
  } = useTransactions();

  // Update URL when page changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (currentPage > 1) {
      url.searchParams.set("p", currentPage.toString());
    } else {
      url.searchParams.delete("p");
    }
    window.history.replaceState({}, "", url);
  }, [currentPage]);

  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    handlePageChange(page);
  };

  const currentUser = "Surafel Araya";

  const incomingTransactions = transactions?.filter(
    (tx) =>
      tx.receiver?.name === currentUser || tx.receiver?.name === tx.sender?.name
  );
  const outgoingTransactions = transactions?.filter(
    (tx) =>
      tx.receiver?.name !== currentUser || tx.receiver?.name !== tx.sender?.name
  );
  const totalIncoming = incomingTransactions?.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );
  const totalOutgoing = outgoingTransactions?.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <DollarSign className="h-8 w-8 text-gray-400" />
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500 truncate">
              Total Transactions
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {total || transactions?.length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-green-400" />
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500 truncate">
              Incoming
            </p>
            <p className="text-lg font-semibold text-green-600">
              +ETB {totalIncoming}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <TrendingDown className="h-8 w-8 text-red-400" />
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500 truncate">
              Outgoing
            </p>
            <p className="text-lg font-semibold text-red-600">
              -ETB {totalOutgoing}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
