import React from 'react';

const ButtonContainer = ({
  handleUpdateTodo,
  handleStartEdit,
  handleDeleteTodo,
  todo,
}) => {
  return (
    <div className='btn-container'>
      <i
        className={`bi ${
          todo.completed ? 'bi-x-lg' : 'bi bi-check-square'
        } mark-btn`}
        onClick={() => handleUpdateTodo(todo.id, !todo.completed)}
      >
        {`Mark as ${todo.completed ? 'incomplete' : 'Completed'}`}
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
  );
};

export default ButtonContainer;
