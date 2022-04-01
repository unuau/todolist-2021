import React, {useState, useRef, useEffect} from 'react';
import Todolost from './Todolost';
import "./styles.css";

const local_storage_key = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem
    (local_storage_key))
    if (storedTodos) setTodos(storedTodos)},
    [])

  useEffect(() => {
    localStorage.setItem(local_storage_key, JSON.stringify(todos))}, 
    [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo=> todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: Math.random() * 1000, name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <div className='main-content'>
        <div className='form-container'>
          <div className='Form'>Type the thing to do:<div className='checkbox'><input ref={todoNameRef} type="text"/></div></div>
          <button className='buttons' onClick={handleAddTodo}> Add Todo</button>
          <button className='buttons' onClick={handleClearTodos}>Clear Done</button>
        </div>
        <div className='leftodo'>{todos.filter(todo => !todo.complete).length} left to do</div>
        <Todolost todos={todos} toggleTodo={toggleTodo}/>
      </div>
    </>
  )
}

export default App;
