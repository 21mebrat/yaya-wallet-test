import React from "react";
import { TransactionTable } from "./components/data-table";
import { transactionColumns } from "./components/columens";
import { useTransactions } from "./hooks/useTransactions";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { LoadingSpinner } from "./components/LoadingSpinner";
import DashboardCards from "./components/cards";
import SearchInput from "./components/searchInput";

export default function App() {
  const {
    transactions,
    loading,
    error,
    dashboard,
    page,
    totalPages,
    handlePrevious,
    handleNext,
  } = useTransactions();

  const currentUser = "Surafel Araya";

  return (
    <Card className="shadow-none border-none">
      <CardHeader className="pb-2 px-3 sm:px-4">
        <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 text-center sm:text-left">
          Transaction History
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 px-3 sm:px-4">
        <DashboardCards dashboard={dashboard} />

        {loading && (
          <div className="flex justify-center py-6">
            <LoadingSpinner message="Loading transactions..." />
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-red-500 py-6 text-sm sm:text-base">
            Error loading transactions
          </p>
        )}

        {!loading && !error && (
          <div className="grid gap-3 sm:gap-4">
            <SearchInput />
            <div className="overflow-x-auto">
              <TransactionTable
                data={transactions}
                columns={transactionColumns}
                currentUser={currentUser}
                page={page}
                totalPages={totalPages}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
