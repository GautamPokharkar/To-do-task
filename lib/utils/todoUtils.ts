import { Todo, Priority, Status } from '@/lib/features/todoSlice';

export const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'Low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

export const getStatusColor = (status: Status) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'Pending':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

export const getPriorityValue = (priority: Priority): number => {
  switch (priority) {
    case 'High': return 3;
    case 'Medium': return 2;
    case 'Low': return 1;
    default: return 0;
  }
};

export const filterAndSortTodos = (
  todos: Todo[],
  searchQuery: string,
  statusFilter: 'All' | Status,
  priorityFilter: 'All' | Priority,
  sortBy: 'dueDate' | 'priority' | 'createdAt',
  sortOrder: 'asc' | 'desc'
): Todo[] => {
  let filtered = todos.filter(todo => {
    const matchesSearch = searchQuery === '' || 
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || todo.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || todo.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return filtered.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'dueDate':
        const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        comparison = aDate - bDate;
        break;
      case 'priority':
        comparison = getPriorityValue(b.priority) - getPriorityValue(a.priority);
        break;
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
};

export const groupTodosByStatus = (todos: Todo[]): Record<Status, Todo[]> => {
  return todos.reduce((groups, todo) => {
    const status = todo.status;
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(todo);
    return groups;
  }, {} as Record<Status, Todo[]>);
};