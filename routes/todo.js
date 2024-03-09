const express = require('express');
const router = express.Router();
const {
  allTodos,
  createNewTodo,
  getTodoById,
  updateTodoDetails,
} = require('../controllers/user');
const countApi = require('../controllers/middleware/countApi');

router.get('/todos/:id', allTodos);
router.post('/create', countApi, createNewTodo);
router.get('/:id', getTodoById);
router.put('/:id', countApi, updateTodoDetails);

module.exports = router;
