import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddTaskForm from './AddTaskForm';
import TaskFilter from './TaskFilter';
import ButtonContainer from './ButtonContainer';
import TitleContainer from './TitleContainer';
import EditTaskForm from './EditTaskForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [filter, setFilter] = useState('all');

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
  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
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
      <div className='form-container'>
        <AddTaskForm onAddTask={handleAddTask} />
        <TaskFilter onFilterChange={handleFilterChange} />
      </div>
      <ul>
        {todos
          .filter((todo) => {
            if (filter === 'completed') {
              return todo.completed;
            } else if (filter === 'incomplete') {
              return !todo.completed;
            }
            return true; // filter === 'all'
          })
          .map((todo) => (
            <li key={todo.id} className='todo-li'>
              {editingId === todo.id ? (
                <>
                  <EditTaskForm
                    editedTitle={editedTitle}
                    setEditedTitle={setEditedTitle}
                    handleSaveEdit={handleSaveEdit}
                    handleCancelEdit={handleCancelEdit}
                    todo={todo}
                  />
                </>
              ) : (
                <>
                  <TitleContainer
                    completed={todo.completed}
                    title={todo.title}
                  />

                  <ButtonContainer
                    handleUpdateTodo={handleUpdateTodo}
                    handleStartEdit={handleStartEdit}
                    handleDeleteTodo={handleDeleteTodo}
                    todo={todo}
                  />
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
