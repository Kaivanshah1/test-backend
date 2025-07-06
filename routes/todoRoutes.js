const express = require('express');
const TodoController = require('../controllers/todoController');

const router = express.Router();

/**
 * Todo routes
 */

// GET /api/todos - Get all todos
router.get('/', TodoController.getAllTodos);

// POST /api/todos - Create a new todo
router.post('/', TodoController.createTodo);

// PUT /api/todos/:id - Update a todo
router.put('/:id', TodoController.updateTodo);

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;