import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { api } from '../../services/api';

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTodos = async () => {
    try {
      const data = await api.getTodos();
      setTodos(data);
    } catch (err: any) {
      setError('Failed to fetch todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = () => {
    setEditingTodo(null);
    setTitle('');
    setDescription('');
    setOpenDialog(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingTodo) {
        await api.updateTodo(editingTodo._id, { title, description });
      } else {
        await api.createTodo({ title, description });
      }
      setOpenDialog(false);
      fetchTodos();
    } catch (err: any) {
      setError('Failed to save todo');
    }
  };

  const handleToggleComplete = async (todo: Todo) => {
    try {
      await api.updateTodo(todo._id, { completed: !todo.completed });
      fetchTodos();
    } catch (err: any) {
      setError('Failed to update todo');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteTodo(id);
      fetchTodos();
    } catch (err: any) {
      setError('Failed to delete todo');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          My Todo List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          sx={{ mb: 2 }}
        >
          Add New Todo
        </Button>
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo._id}
              sx={{
                borderBottom: '1px solid #eee',
                '&:last-child': { borderBottom: 'none' }
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo)}
              />
              <ListItemText
                primary={todo.title}
                secondary={todo.description}
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none'
                }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditTodo(todo)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(todo._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editingTodo ? 'Edit Todo' : 'Add New Todo'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingTodo ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TodoList;