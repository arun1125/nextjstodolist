import React, { useState, useEffect, useRef } from 'react'
import {doc, getDoc} from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import { db } from '@/firebase'

export default function useFetchTodos() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [todos, setTodos] = useState(null)
    
    const {currentUser} = useAuth()


    useEffect(()=>{
        async function fetchData() {
            console.log('test fetchData function')
            try {
               const docRef = doc(db, 'users', currentUser.uid) 
               const docSnap = await getDoc(docRef)
               if (docSnap.exists()){
                    setTodos(docSnap.data().todolist)
               } else {
                setTodos({})
               }
            } catch (err) {
                setError('Failed to load Todos')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

  return (
    {loading, error, todos}
  )
}
