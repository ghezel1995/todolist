import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTasks,
  deleteTask,
  updateTask,
  toggleTask,
} from '../store/actions';
import AddTaskForm from './AddTaskForm';
import TaskFilter from './TaskFilter';
import ButtonContainer from './ButtonContainer';
import TitleContainer from './TitleContainer';
import EditTaskForm from './EditTaskForm';

const TodoList = () => {
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state);
  const [todos, setTodos] = useState(allTodos);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    filterTasks();
  }, [allTodos, filter]);

  const filterTasks = () => {
    switch (filter) {
      case 'completed':
        setTodos(allTodos.filter((todo) => todo.completed));
        break;
      case 'incomplete':
        setTodos(allTodos.filter((todo) => !todo.completed));
        break;
      default:
        setTodos(allTodos);
    }
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleUpdate = (todo) => {
    setEditingTaskId(todo.id);
    setEditedTaskTitle(todo.title);
  };
  const handleSave = (e) => {
    e.preventDefault();

    if (editedTaskTitle.trim() === '') {
      return;
    }

    const updatedTask = {
      id: editingTaskId,
      title: editedTaskTitle,
      completed: false,
    };

    dispatch(updateTask(updatedTask));
    setEditingTaskId(null);
    setEditedTaskTitle('');
  };
  const handleCancel = () => {
    setEditingTaskId(null);
    setEditedTaskTitle('');
  };

  const handleToggle = (todo) => {
    dispatch(toggleTask(todo));
  };
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  return (
    <div className='todo-container'>
      <h1>Todo List</h1>
      <div className='form-container'>
        <AddTaskForm />
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
              {editingTaskId === todo.id ? (
                <>
                  <EditTaskForm
                    taskId={todo.id}
                    initialTitle={todo.title}
                    onSave={handleSave}
                    onCancel={handleCancel}
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
                    handleUpdateTodo={() => handleToggle(todo)}
                    handleStartEdit={() => handleUpdate(todo)}
                    handleDeleteTodo={() => handleDelete(todo.id)}
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
