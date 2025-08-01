'use client';

import { useAppSelector } from '@/lib/hooks';
import { TodoItem } from './TodoItem';
import { filterAndSortTodos, groupTodosByStatus } from '@/lib/utils/todoUtils';
import { Status } from '@/lib/features/todoSlice';

export function TodoList() {
  const { todos, searchQuery, statusFilter, priorityFilter, sortBy, sortOrder } = useAppSelector(
    (state) => state.todos
  );

  const filteredAndSortedTodos = filterAndSortTodos(
    todos,
    searchQuery,
    statusFilter,
    priorityFilter,
    sortBy,
    sortOrder
  );

  const groupedTodos = groupTodosByStatus(filteredAndSortedTodos);

  if (filteredAndSortedTodos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {todos.length === 0 
            ? "No tasks yet. Add one above to get started! ✨"
            : "No tasks match your current filters. Try adjusting your search or filters."
          }
        </p>
      </div>
    );
  }

  const statusOrder: Status[] = ['Pending', 'In Progress', 'Completed'];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {statusOrder.map((status) => {
        const statusTodos = groupedTodos[status];
        if (!statusTodos || statusTodos.length === 0) return null;

        return (
          <div key={status} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {status}
              </h2>
              <span className="px-3 py-1 bg-white/20 dark:bg-white/10 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                {statusTodos.length}
              </span>
            </div>
            <div className="grid gap-4">
              {statusTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}