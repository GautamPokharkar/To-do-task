'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setSearchQuery } from '@/lib/features/todoSlice';
import { Search } from 'lucide-react';

export function SearchBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.todos.searchQuery);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-6">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search tasks by title or description..."
        className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 placeholder-gray-600 dark:placeholder-gray-300 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-white/30 transition-all duration-200"
      />
    </div>
  );
}