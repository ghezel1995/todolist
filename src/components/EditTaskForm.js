import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../store/actions';

const TaskEditForm = ({ taskId, initialTitle, onCancel }) => {
  const [editedTaskTitle, setEditedTaskTitle] = useState(initialTitle);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setEditedTaskTitle(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (editedTaskTitle.trim() === '') {
      return;
    }

    const updatedTask = {
      id: taskId,
      title: editedTaskTitle,
      completed: false,
    };

    dispatch(updateTask(updatedTask));
    onCancel();
  };

  return (
    <form className='edit-form' onSubmit={handleSave}>
      <input
        className='edit-input'
        type='text'
        value={editedTaskTitle}
        onChange={handleInputChange}
      />
      <div className='btn-container'>
        <button className='save-btn' type='submit'>
          Save
        </button>
        <button className='cancel-btn' type='button' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskEditForm;
