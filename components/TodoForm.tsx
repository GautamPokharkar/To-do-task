'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch } from '@/lib/hooks';
import { addTodo, updateTodo, Priority, Status, Todo } from '@/lib/features/todoSlice';
import { ChevronDown, Plus, X } from 'lucide-react';

const todoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['Low', 'Medium', 'High']),
  status: z.enum(['Pending', 'In Progress', 'Completed']),
});

type TodoFormData = z.infer<typeof todoSchema>;

interface TodoFormProps {
  editingTodo?: Todo;
  onCancel?: () => void;
}

export function TodoForm({ editingTodo, onCancel }: TodoFormProps) {
  const [isExpanded, setIsExpanded] = useState(!!editingTodo);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: editingTodo ? {
      title: editingTodo.title,
      description: editingTodo.description || '',
      dueDate: editingTodo.dueDate || '',
      priority: editingTodo.priority,
      status: editingTodo.status,
    } : {
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium' as Priority,
      status: 'Pending' as Status,
    },
  });

  const onSubmit = (data: TodoFormData) => {
    if (editingTodo) {
      dispatch(updateTodo({
        id: editingTodo.id,
        updates: data,
      }));
      onCancel?.();
    } else {
      dispatch(addTodo(data));
      reset();
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    if (editingTodo) {
      onCancel?.();
    } else {
      setIsExpanded(false);
      reset();
    }
  };

  if (!isExpanded && !editingTodo) {
    return (
      <div className="w-full max-w-2xl mx-auto mb-8">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center gap-3 px-6 py-4 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/15 transition-all duration-200"
        >
          <Plus className="h-5 w-5" />
          Add a task...
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-white/20 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {editingTodo ? 'Edit Task' : 'Add New Task'}
          </h3>
          {!editingTodo && (
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 hover:bg-white/20 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
        </div>

        {/* Title */}
        <div>
          <input
            {...register('title')}
            placeholder="Task title *"
            className="w-full px-4 py-3 rounded-lg bg-white/30 dark:bg-white/20 border border-white/40 dark:border-white/30 placeholder-gray-600 dark:placeholder-gray-300 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-white/30 transition-all duration-200"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            {...register('description')}
            placeholder="Description (optional)"
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-white/30 dark:bg-white/20 border border-white/40 dark:border-white/30 placeholder-gray-600 dark:placeholder-gray-300 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-white/30 transition-all duration-200 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Due Date */}
          <div>
            <input
              {...register('dueDate')}
              type="date"
              className="w-full px-4 py-3 rounded-lg bg-white/30 dark:bg-white/20 border border-white/40 dark:border-white/30 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-white/30 transition-all duration-200"
            />
          </div>

          {/* Priority */}
          <div className="relative">
            <select
              {...register('priority')}
              className="w-full appearance-none px-4 py-3 pr-10 rounded-lg bg-white/30 dark:bg-white/20 border border-white/40 dark:border-white/30 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-white/30 transition-all duration-200"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-300 pointer-events-none" />
          </div>

          {/* Status */}
          <div className="relative">
            <select
              {...register('status')}
              className="w-full appearance-none px-4 py-3 pr-10 rounded-lg bg-white/30 dark:bg-white/20 border border-white/40 dark:border-white/30 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-white/30 transition-all duration-200"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-300 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-white/90 dark:bg-pink-400 text-gray-800 dark:text-gray-900 rounded-lg hover:bg-white dark:hover:bg-pink-300 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {editingTodo ? 'Update Task' : 'Add Task'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 bg-white/50 dark:bg-white/20 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-white/70 dark:hover:bg-white/30 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}