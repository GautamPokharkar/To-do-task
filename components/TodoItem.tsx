'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { toggleTodo, deleteTodo, Todo } from '@/lib/features/todoSlice';
import { getPriorityColor, getStatusColor } from '@/lib/utils/todoUtils';
import { Check, Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { TodoForm } from './TodoForm';
import { ConfirmDialog } from './ConfirmDialog';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    setShowDeleteConfirm(false);
  };

  if (isEditing) {
    return <TodoForm editingTodo={todo} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <>
      <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-white/20 transition-all duration-200 hover:bg-white/30 dark:hover:bg-white/15 group">
        <div className="flex items-start gap-4">
          <button
            onClick={() => dispatch(toggleTodo(todo.id))}
            className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              todo.completed
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-white/50 dark:bg-white/20 text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
            }`}
            aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <Check size={14} />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className={`text-lg font-semibold transition-all duration-200 ${
                todo.completed 
                  ? 'text-gray-500 dark:text-gray-400 line-through' 
                  : 'text-gray-800 dark:text-gray-100'
              }`}>
                {todo.title}
              </h3>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-8 h-8 rounded-full bg-blue-500/80 hover:bg-blue-500 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                  aria-label="Edit task"
                >
                  <Edit size={14} />
                </button>
                
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                  aria-label="Delete task"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {todo.description && (
              <p className={`text-sm mb-3 ${
                todo.completed 
                  ? 'text-gray-500 dark:text-gray-400' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}>
                {todo.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                {todo.priority} Priority
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(todo.status)}`}>
                {todo.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              {todo.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>Due: {format(new Date(todo.dueDate), 'MMM dd, yyyy')}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>Created: {format(new Date(todo.createdAt), 'MMM dd, yyyy')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </>
  );
}