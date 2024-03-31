import { useAuth } from '@/context/AuthContext'
import React, { useEffect, useState } from 'react'
import TodoCard from './TodoCard'
import {doc, setDoc, getDoc, getFirestore} from 'firebase/firestore'
import {db} from '@/firebase'
import useFetchTodos from '@/hooks/fetchTodos'

export default function UserDashboard() {
  const {userInfo, currentUser} = useAuth()
  const [addTodo, setAddTodo] = useState(false)
  const [todo, setTodo] = useState('')
  const [todoList, setTodoList] = useState({})
  const {todos, loading, error} = useFetchTodos()

  useEffect(()=>{
    if (todos){
      setTodoList(todos)
    }
  }, [todos])

  async function handleAddTodo(){
    if (!todo){return}

    const new_index = Object.keys(todoList).length === 0 ? 1 : Object.keys(todoList).length + 1
    const newTodo = {
      [new_index]: todo
    }

    setTodoList({...todoList, ...newTodo})
    setTodo('')
    const userRef = doc(db, 'users', currentUser.uid)
    await setDoc(userRef, {'todolist': {...todoList, ...newTodo}}, { merge: false })

  }

  async function deleteTodo(todo, todoID, full_list_of_todos){
    delete full_list_of_todos[todoID]

    const newTodoList = {}
    let index = 1
    for (const key in full_list_of_todos){
      newTodoList[index] = todoList[key];
      index++;
    }
    setTodoList(newTodoList)
    const userRef = doc(db, 'users', currentUser.uid)
    await setDoc(userRef, {'todolist': {...newTodoList}}, { merge: false })
  }

  async function editTodo(newTodo, todoID, full_list_of_todos){
    full_list_of_todos[todoID] = newTodo
    setTodoList({...full_list_of_todos})
    const userRef = doc(db, 'users', currentUser.uid)
    await setDoc(userRef, {'todolist': {...full_list_of_todos}}, { merge: false })
   return  
  }

  return (
    <div className = "w-full max-w-[65ch] mx-auto flex flex-col gap-3 sm:gap-5 flex-1">
      <div className = 'flex items-stretch'>
        <input type = "text" placeholder = "Enter todo" value = {todo} onChange ={(e)=>{setTodo(e.target.value)}} 
        className='outline-none p-2 text-base sm:text-lg text-slate-900 flex-1'/>
        <button className="w-fit px-4 sm:px-6 py-2 bg-amber-400 text-white font-medium text-base duration-300 hover:opacity-40"
        onClick = {handleAddTodo}>
          ADD
          </button>
      </div>
      {(userInfo && loading) && (<div className="flex-1 grid place-items-center text-6xl">
        <i className="fa-solid fa-spinner animate spin"></i>
      </div>)}
      {userInfo && (
        <>
          {Object.keys(todoList).map((todo, i) => {
            return (
              <TodoCard key={i} deleteTodo = {deleteTodo} editTodo = {editTodo} todoList = {todoList} todoID = {todo}>
                {todoList[todo]}
              </TodoCard>
            )
          })}
        </>
        )}
    </div>
  )
}
