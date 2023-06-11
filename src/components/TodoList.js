import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddTaskForm from './AddTaskForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=6'
      );
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTask = (title, completed) => {
    const newTask = {
      id: todos.length + 1,
      title: title,
      completed: completed,
    };
    setTodos([newTask, ...todos]);
  };

  const handleUpdateTodo = async (id, completed) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ completed }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      if (response.ok) {
        setTodos(
          todos.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                completed: !item.completed,
              };
            }
            return item;
          })
        );
      } else {
        console.error('Error updating todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleEditTodo = async (id, newTitle) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ title: newTitle }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      if (response.ok) {
        const updatedTodo = await response.json();
        const updatedTodos = todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
        setTodos(updatedTodos);
      } else {
        console.error('Error updating todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleStartEdit = (id, title) => {
    setEditingId(id);
    setEditedTitle(title);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedTitle('');
  };

  const handleSaveEdit = (id) => {
    handleEditTodo(id, editedTitle);
    setEditingId(null);
    setEditedTitle('');
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      } else {
        console.error('Error deleting todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className='todo-container'>
      <h1>Todo List</h1>
      <AddTaskForm onAddTask={handleAddTask} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className='todo-li'>
            {editingId === todo.id ? (
              <>
                <input
                  type='text'
                  className='edit-input'
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <div className='btn-container'>
                  <button
                    className='save-btn'
                    onClick={() => handleSaveEdit(todo.id)}
                  >
                    Save
                  </button>
                  <button className='cancel-btn' onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span
                  className='title-container'
                  style={{
                    textDecoration: todo.underline ? 'underline' : 'none',
                  }}
                >
                  <i
                    className={`bi ${
                      todo.completed ? 'bi-check-square' : 'bi-hourglass-split' 
                    }`}
                  />
                  {todo.title}
                </span>
                <div className='btn-container'>
                  <i
                    className={`bi ${
                      todo.completed ? 'bi-x-lg' : 'bi bi-check-square'
                    } mark-btn`}
                    onClick={() => handleUpdateTodo(todo.id, !todo.completed)}
                  >
                    {`Mark ${todo.completed ? 'incomplete' : 'Completed'}`}
                  </i>
                  <i
                    onClick={() => handleStartEdit(todo.id, todo.title)}
                    className='bi bi-pencil-square edit-btn'
                  ></i>
                  <i
                    className='bi bi-trash3 delete-btn'
                    onClick={() => handleDeleteTodo(todo.id)}
                  ></i>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
