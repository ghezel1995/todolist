import React, { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '') {
      onAddTask(title);
      setTitle('');
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter task title'
        value={title}
        className='add-input'
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className='add-task' type='submit'>Add Task</button>
    </form>
  );
};

export default AddTaskForm;
