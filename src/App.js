import React, { useEffect, useState } from "react";
import './App.css';
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa"

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTital, setNewTital] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [CompletedTodos, setCompletedTodos] = useState('');


  const handleAddTodo = () => {
    let newTodoItem = {
      tital: newTital,
      description: newDescription
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todo-list', JSON.stringify(updatedTodoArr))
  }

   const handleDeleteCompletedTodo = (index) => {
    let reduceTodo = [...CompletedTodos];
    reduceTodo.splice(index);
    localStorage.setItem('CompletedTodos', JSON.stringify(reduceTodo))
    setCompletedTodos(reduceTodo)
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todo-list'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  }, [])

  const handleDeleteTodo = (index) => {
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index);
    localStorage.setItem('todo-list', JSON.stringify(reduceTodo))
    setTodos(reduceTodo)
  }

  const handleComplete = index => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let CompletedOn =
      dd + '-' + mm  +  '-' +  yyyy  + 'at' +  h + ':'  + m  + ':'  + s;

    let filteredItem = {
      ...allTodos[index],
      CompletedOn: CompletedOn
    }

    let updatedCompletedArr = [...CompletedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
  }


  return (
    <>
      <div className="App">
        <h1>My ToDo'S</h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label>Title  </label>
              <input type="text" value={newTital} onChange={(e) => setNewTital(e.target.value)} placeholder="add item.." />
            </div>
            <div className="todo-input-item">
              <label>Description  </label>
              <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="add Description about.." />
            </div>

            <div className="todo-input-item">
              <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button>
            </div>
          </div>
          <div className="btn-area">
            <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}> Todo  </button>
            <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>  Completed</button>
          </div>
          <div className="todo-list">

            {isCompleteScreen === false && allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.tital}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <MdDeleteOutline className="icon" onClick={() => handleDeleteTodo(index)} title="delect?" />
                    <FaCheck className="check-icon" onClick={() => handleComplete(index)} title="complete" />
                  </div>
                </div>
              );
            })
            }

              {isCompleteScreen === true && CompletedTodos.map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.tital}</h3>
                      <p>{item.description}</p>
                      <p><small>Completed on : {item.CompletedOn}</small></p>
                    </div>
                    <div>
                      <MdDeleteOutline className="icon" onClick={() => handleDeleteCompletedTodo(index)} title="delete?" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      
    </>
  );
}

export default App;