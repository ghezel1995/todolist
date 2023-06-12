import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/actions';

const AddTaskForm = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskTitle.trim() === '') {
      return;
    }

    const newTask = {
      title: taskTitle,
      completed: false,
    };

    dispatch(addTask(newTask));
    setTaskTitle('');
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter task title'
        className='add-input'
        value={taskTitle}
        onChange={handleInputChange}
      />
      <button className='add-task' type='submit'>
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
