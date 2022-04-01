import React from 'react'
import Todo from './Todo'
import "./styles.css";

export default function Todolost({todos, toggleTodo}) {
  return (
    todos.map(todo => {
      return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
    })
  )
}