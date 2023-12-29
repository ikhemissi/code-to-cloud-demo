import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Categories from './Categories.jsx';
import Tasks from './Tasks.jsx';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  async function loadTodos() {
    const response = await fetch('/api/todos');
    const todos = await response.json();
    setTodos(todos);
  }

  async function loadCategories() {
    const response = await fetch('/api/categories');
    const categories = await response.json();
    setCategories(categories);
  }

  async function createCategory(category) {
    const response = await fetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify(category),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const newCategory = await response.json();
    setCategories([newCategory, ...categories]);
  }

  async function createTask(todo) {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const newTodo = await response.json();
    setTodos([newTodo, ...todos]);
  }

  async function updateTask(todoId, updates) {
    if (!todoId || !Object.keys(updates).length) {
      return;
    }

    const response = await fetch(`/api/todos/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const updatedTodo = await response.json();
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return updatedTodo;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (newTask) {
      createTask({task: newTask});
      setNewTask('');
    }
  }, [newTask]);

  useEffect(() => {
    if (newCategory) {
      createCategory({label: newCategory});
      setNewCategory('');
    }
  }, [newCategory]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h1" component="h2" p={8} textAlign="center">
        Smart tasks
      </Typography>
      <Grid container spacing={10} justifyContent="center">
        <Grid item xs={3}>
          <Categories categories={categories} createCategory={setNewCategory} />
        </Grid>
        <Grid item xs={6}>
          <Tasks todos={todos} categories={categories} createTask={setNewTask} updateTask={updateTask} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App
