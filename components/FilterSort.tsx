'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  setStatusFilter,
  setPriorityFilter,
  setSortBy,
  setSortOrder,
  Status,
  Priority,
} from '@/lib/features/todoSlice';
import { ChevronDown, ArrowUpDown } from 'lucide-react';

export function FilterSort() {
  const dispatch = useAppDispatch();
  const { statusFilter, priorityFilter, sortBy, sortOrder } = useAppSelector(
    (state) => state.todos
  );

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      {/* Status Filter */}
      <div className="relative">
        <select
          value={statusFilter}
          onChange={(e) => dispatch(setStatusFilter(e.target.value as 'All' | Status))}
          className="appearance-none bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-lg px-4 py-2 pr-8 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-white/30 transition-all duration-200"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-300 pointer-events-none" />
      </div>

      {/* Priority Filter */}
      <div className="relative">
        <select
          value={priorityFilter}
          onChange={(e) => dispatch(setPriorityFilter(e.target.value as 'All' | Priority))}
          className="appearance-none bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-lg px-4 py-2 pr-8 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-white/30 transition-all duration-200"
        >
          <option value="All">All Priority</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-300 pointer-events-none" />
      </div>

      {/* Sort By */}
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as 'dueDate' | 'priority' | 'createdAt'))}
          className="appearance-none bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-lg px-4 py-2 pr-8 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-white/30 transition-all duration-200"
        >
          <option value="createdAt">Sort by Created</option>
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-300 pointer-events-none" />
      </div>

      {/* Sort Order */}
      <button
        onClick={() => dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'))}
        className="flex items-center gap-2 bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-white/30 dark:hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-white/30 transition-all duration-200"
      >
        <ArrowUpDown className="h-4 w-4" />
        {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      </button>
    </div>
  );
}