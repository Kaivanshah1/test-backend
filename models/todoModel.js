const { v4: uuidv4 } = require('uuid');

/**
 * In-memory storage for todos (in production, use a database)
 */
let todos = [
  {
    id: uuidv4(),
    title: 'Welcome to your Todo App!',
    description: 'This is your first todo. You can mark it as complete or delete it.',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Try adding a new todo',
    description: 'Use the form on the left to add your own todos.',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

/**
 * Todo model with CRUD operations
 */
class TodoModel {
  /**
   * Get all todos
   */
  static getAllTodos() {
    return todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  /**
   * Get a todo by ID
   */
  static getTodoById(id) {
    return todos.find(todo => todo.id === id);
  }

  /**
   * Create a new todo
   */
  static createTodo(todoData) {
    const newTodo = {
      id: uuidv4(),
      title: todoData.title,
      description: todoData.description || '',
      completed: false,
      createdAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    return newTodo;
  }

  /**
   * Update a todo
   */
  static updateTodo(id, updates) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return null;
    }

    todos[todoIndex] = {
      ...todos[todoIndex],
      ...updates,
    };

    return todos[todoIndex];
  }

  /**
   * Delete a todo
   */
  static deleteTodo(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return false;
    }

    todos.splice(todoIndex, 1);
    return true;
  }
}

module.exports = TodoModel;