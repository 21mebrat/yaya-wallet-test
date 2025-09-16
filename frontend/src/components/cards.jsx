import { useTransactions } from "@/hooks/useTransactions";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import React, { useState, useEffect } from "react";

const DashboardCards = ({ dashboard }) => {
  const {
    transactions,
    total,
  } = useTransactions();
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
              +ETB {dashboard?.incomingSum}
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
              -ETB {dashboard?.outgoingSum}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
