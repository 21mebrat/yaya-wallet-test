import { Loader2, Search } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'
import { useTransactions } from '@/hooks/useTransactions';

const SearchInput = () => {
    const {
        query,
        setQuery,
        loading,
    } = useTransactions();
    return (
        <div className="flex w-full flex-col sm:flex-row justify-end sm:items-center gap-3 sm:gap-4">
            <div className="flex sm:max-w-md items-center selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 bg-transparent px-3 py-1 text-base shadow-xs gap-2 rounded-lg border focus-within:ring-2 focus-within:ring-blue-500 transition">
                <Search className="text-gray-500 w-5 h-5" />
                <Input
                    placeholder="Search by sender, receiver, cause, or ID..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 text-sm sm:text-base"
                />
            </div>
            <button
                onClick={() => setQuery(query)}
                disabled={!loading}
                className={`px-3 py-1 cursor-pointer ${loading || !query ? "cursor-not-allowed opacity-25" : ""} rounded-lg flex items-center gap-2 bg-blue-500 text-white text-sm sm:text-base font-medium hover:bg-blue-700 transition shadow`}
            >
                {loading && <Loader2 size={14} className='animate-spin' />} <span>Search</span>
            </button>
        </div>
    )
}

export default SearchInput
