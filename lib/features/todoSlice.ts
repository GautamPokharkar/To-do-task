import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Pending' | 'In Progress' | 'Completed';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
  status: Status;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TodoState {
  todos: Todo[];
  searchQuery: string;
  statusFilter: 'All' | Status;
  priorityFilter: 'All' | Priority;
  sortBy: 'dueDate' | 'priority' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

const initialState: TodoState = {
  todos: [],
  searchQuery: '',
  statusFilter: 'All',
  priorityFilter: 'All',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>>) => {
      const now = new Date().toISOString();
      const newTodo: Todo = {
        ...action.payload,
        id: Date.now().toString(),
        completed: action.payload.status === 'Completed',
        createdAt: now,
        updatedAt: now,
      };
      state.todos.push(newTodo);
    },
    updateTodo: (state, action: PayloadAction<{ id: string; updates: Partial<Todo> }>) => {
      const { id, updates } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        Object.assign(todo, updates, { 
          updatedAt: new Date().toISOString(),
          completed: updates.status === 'Completed' || updates.completed
        });
      }
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.status = todo.completed ? 'Completed' : 'Pending';
        todo.updatedAt = new Date().toISOString();
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<'All' | Status>) => {
      state.statusFilter = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<'All' | Priority>) => {
      state.priorityFilter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'dueDate' | 'priority' | 'createdAt'>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  addTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  setSearchQuery,
  setStatusFilter,
  setPriorityFilter,
  setSortBy,
  setSortOrder,
} = todoSlice.actions;

export default todoSlice.reducer;