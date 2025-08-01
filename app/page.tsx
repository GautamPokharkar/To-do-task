'use client';

import { ThemeToggle } from '@/components/ThemeToggle';
import { SearchBar } from '@/components/SearchBar';
import { FilterSort } from '@/components/FilterSort';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { Toast, useToast } from '@/components/Toast';

export default function Home() {
  const { toast, hideToast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 dark:from-teal-900 dark:via-teal-800 dark:to-slate-900 transition-all duration-500">
      <ThemeToggle />
      
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-800 dark:text-gray-100 mb-2 tracking-tight">
            ToDo-List
          </h1>
          <div className="w-24 h-1 bg-gray-800 dark:bg-gray-100 mx-auto rounded-full"></div>
        </div>

        <SearchBar />
        <FilterSort />
        <TodoForm />
        <TodoList />

      
      </div>
      
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}