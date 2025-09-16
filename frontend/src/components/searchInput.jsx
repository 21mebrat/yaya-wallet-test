import { Loader2, Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { useTransactions } from "@/hooks/useTransactions";

const SearchInput = () => {
    const { query, setQuery, loading, refetch } = useTransactions();

    return (
        <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4 items-stretch sm:items-center md:justify-end">
            <div className="flex w-full sm:max-w-md items-center gap-2 border rounded-lg px-2 sm:px-3 py-1 bg-transparent shadow-xs h-10 sm:h-9 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <Search className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <Input
                    placeholder="Search by sender, receiver, cause, or ID..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 text-xs sm:text-sm md:text-base min-w-0"
                />
            </div>
            <button
                onClick={refetch}
                disabled={loading || !query}
                className={`flex items-center justify-center gap-2 px-2 sm:px-3 py-2 sm:py-1 rounded-lg bg-blue-500 text-white text-xs sm:text-sm md:text-base font-medium shadow transition ${loading || !query
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-blue-700 cursor-pointer"
                    }`}
            >
                {loading && query && <Loader2 size={14} className="animate-spin" />}
                <span>Search</span>
            </button>
        </div>
    );
};

export default SearchInput;
