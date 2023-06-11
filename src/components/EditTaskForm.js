import React from 'react';

const EditTaskForm = ({
  editedTitle,
  setEditedTitle,
  handleSaveEdit,
  handleCancelEdit,
  todo,
}) => {
  return (
    <>
      <input
        type='text'
        className='edit-input'
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <div className='btn-container'>
        <button className='save-btn' onClick={() => handleSaveEdit(todo.id)}>
          Save
        </button>
        <button className='cancel-btn' onClick={handleCancelEdit}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditTaskForm;
