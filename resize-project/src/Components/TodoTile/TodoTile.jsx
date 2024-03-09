import React, { useRef, useState } from 'react';
import './TodoTile.css';
import { put } from '../../api/api';
const TodoTile = ({ title, id }) => {
  const updateById = async () => {
    try {
      const response = await put('/todo/' + id, {
        text,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const inputRef = useRef(null);

  const enableEdit = e => {
    inputRef.current.focus();
    setIsEditable(true);
  };

  const [text, setText] = useState(title);

  const [isEditable, setIsEditable] = useState(false);

  return (
    <div className="todo-tile-container" id={id}>
      {
        <input
          // disabled={!isEditable}
          className="input-todo-tile"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          id={'input-todo-tile' + id}
          ref={inputRef}
          onBlur={e => {
            setIsEditable(false);
            updateById();
          }}
        />
      }
      {isEditable ? (
        <img src="/save.svg" alt="edit icon" key={id + 'saveedit'} />
      ) : (
        <img
          src="/edit.svg"
          alt="edit icon"
          onClick={e => {
            enableEdit(e);
          }}
          key={id + 'edit'}
        />
      )}
    </div>
  );
};

export default TodoTile;
