const TodoModel = require('../models/todoModel');

/**
 * Controller for handling todo-related requests
 */
class TodoController {
  /**
   * Get all todos
   */
  static getAllTodos(req, res) {
    try {
      const todos = TodoModel.getAllTodos();
      res.json({
        success: true,
        data: todos,
      });
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  /**
   * Create a new todo
   */
  static createTodo(req, res) {
    try {
      const { title, description } = req.body;

      // Validation
      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Title is required and must be a non-empty string',
        });
      }

      if (title.trim().length < 3) {
        return res.status(400).json({
          success: false,
          error: 'Title must be at least 3 characters long',
        });
      }

      if (title.trim().length > 100) {
        return res.status(400).json({
          success: false,
          error: 'Title must be less than 100 characters',
        });
      }

      if (description && typeof description !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Description must be a string',
        });
      }

      if (description && description.length > 500) {
        return res.status(400).json({
          success: false,
          error: 'Description must be less than 500 characters',
        });
      }

      const todoData = {
        title: title.trim(),
        description: description ? description.trim() : '',
      };

      const newTodo = TodoModel.createTodo(todoData);
      
      res.status(201).json({
        success: true,
        data: newTodo,
      });
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  /**
   * Update a todo
   */
  static updateTodo(req, res) {
    try {
      const { id } = req.params;
      const { completed } = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Todo ID is required',
        });
      }

      if (typeof completed !== 'boolean') {
        return res.status(400).json({
          success: false,
          error: 'Completed status must be a boolean',
        });
      }

      const updatedTodo = TodoModel.updateTodo(id, { completed });

      if (!updatedTodo) {
        return res.status(404).json({
          success: false,
          error: 'Todo not found',
        });
      }

      res.json({
        success: true,
        data: updatedTodo,
      });
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  /**
   * Delete a todo
   */
  static deleteTodo(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Todo ID is required',
        });
      }

      const deleted = TodoModel.deleteTodo(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Todo not found',
        });
      }

      res.json({
        success: true,
        data: { message: 'Todo deleted successfully' },
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }
}

module.exports = TodoController;