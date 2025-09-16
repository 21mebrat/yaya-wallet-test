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
      <CardHeader className="pb-2">
        <CardTitle className="text-lg sm:text-xl font-semibold text-gray-700">
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <DashboardCards
          totalPages={totalPages}
          dashboard={dashboard}
        />
        {loading && (
          <div className="flex justify-center py-6">
            <LoadingSpinner message="loading transaction..." />
          </div>
        )}
        {error && !loading && (
          <p className="text-center text-red-500 py-6">
            Error loading transactions
          </p>
        )}

        {!loading && !error && (

          <div>
            <SearchInput />
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
        )}
      </CardContent>
    </Card>
  );
}
