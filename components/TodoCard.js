import React, { useState } from 'react'

export default function TodoCard(props) {
    const {children, deleteTodo, editTodo, todoID, todoList } = props
    const [edit, setEdit] = useState(false)

  return (
    <div className = "border relative p-2 border-solid border-white flex items-stretch">
        <div className = 'flex-1'>
          {
          !edit ? <>{children}</> : <input className = 'bg-white text-slate-900 p-1' value={children} onChange={(e) => {editTodo(e.target.value, todoID, todoList)}}/>
          }
        </div>
        <div className = "flex items-center">
            { !edit ? <i onClick={()=> setEdit(true)} className="fa-regular fa-pen-to-square duration-300 hover:opacity-40 cursor-pointer px-2"/> : 
            <i onClick={()=> setEdit(false)} className="fa-solid fa-check duration-300 hover:opacity-40 cursor-pointer px-2"/>
            }
            <i onClick={()=>deleteTodo(children, todoID, todoList)} className="fa-solid fa-trash duration-300 hover:opacity-40 cursor-pointer px-2"></i>        
        </div>
    </div>
  )
}
