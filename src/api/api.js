const { randomUUID } = require('crypto');
const { Router } = require('express');
const router = Router();

// Types

/**
 * @typedef {Object} Todo - A task to be done
 * @property {string} id - Task ID
 * @property {string} task - Task details
 * @property {boolean} done - Was this task completed?
 * @property {string} [categoryId] - Task category ID
 */

/**
 * @typedef {Object} Category - A task category
 * @property {string} id - Category id
 * @property {string} label - Category label
 */

// Data

/** @type {Todo[]} */
const todos = [];

/** @type {Category[]} */
const categories = [];

// Routes

router.get('/todos', (req, res) => {
  res.send(todos);
});

router.post('/todos', (req, res) => {
  /** @type {Todo} */
  const todo = req.body;
  todo.id = randomUUID();
  todos.push(todo);
  res.send(todo);
});

router.patch('/todos/:id', (req, res) => {
  const todoId = req.params.id;

  /** @type {Partial<Todo>} */
  const todoUpdates = req.body;
  const todo = todos.find(todo => todo.id === todoId);

  if (!todo) {
    res.status(404).send({ error: 'Task not found' });
    return;
  }

  Object.assign(todo, todoUpdates);

  res.send(todo);
});

router.get('/categories', (req, res) => {
  res.send(categories);
});

router.post('/categories', (req, res) => {
  /** @type {Category} */
  const category = req.body;
  category.id = randomUUID();
  categories.push(category);
  res.send(category);
});

router.patch('/categories/:id', (req, res) => {
  const categoryId = req.params.id;

  /** @type {Partial<Category>} */
  const categoryUpdates = req.body;
  let category = categories.find(category => category.id === categoryId);

  if (!category) {
    res.status(404).send({ error: 'Category not found' });
    return;
  }

  Object.assign(category, categoryUpdates);

  res.send(category);
});

module.exports = router;
