import React, { useEffect, useState } from 'react';
import TodoTile from '../TodoTile/TodoTile';
import './TodoList.css';
import { get, post } from '../../api/api';
const TodoList = ({ window }) => {
  const [windowData, setWindowData] = useState([]);

  const addTodo = async () => {
    try {
      const response = await post('/todo/create', {
        text: 'Default Todo',
        window,
      });
      console.log(response);
      setWindowData([...windowData, { ...response.todo }]);
    } catch (err) {}
  };

  const fetchAllWindowData = async () => {
    try {
      const response = await get('/todo/todos/' + window);
      console.log(response);
      setWindowData(response.todos);
    } catch (err) {}
  };

  useEffect(() => {
    fetchAllWindowData();
  }, [window]);

  return (
    <div className="todo-container">
      <h1>Todo List {window}</h1>
      <button className="add-button" onClick={addTodo}>
        ADD TODO
      </button>
      <ul className="todo-list-container">
        {windowData?.map((todo, index) => {
          return (
            <TodoTile
              key={index + 'windowData'}
              title={todo.text}
              id={todo._id}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
