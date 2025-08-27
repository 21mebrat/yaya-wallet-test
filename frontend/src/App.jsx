import React from "react";
import { TransactionTable } from "./components/data-table";
import { transactionColumns } from "./components/columens";
import { useTransactions } from "./hooks/useTransactions";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { LoadingSpinner } from "./components/LoadingSpinner";
import DashboardCards from "./components/cards";

export default function App() {
  const { transactions, loading, error, setSearch } = useTransactions();

  const currentUser = "Surafel Araya";

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <Card className="rounded-2xl bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-700">
            Transaction History
          </CardTitle>
        </CardHeader>

        <CardContent>
          <DashboardCards />
          {loading && <LoadingSpinner />}

          {error && !loading && (
            <p className="text-center text-red-500 py-6">
              Error loading transactions
            </p>
          )}

          {!loading && !error && (
            <TransactionTable
              data={transactions}
              columns={transactionColumns}
              currentUser={currentUser}
              onSearch={setSearch}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
