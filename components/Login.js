import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLogin, setIsLogin] = useState(true)

    const {login, signup, currentUser} = useAuth()

    console.log(currentUser)

    async function submitHandler(){
        if (!email || !password){
            setError('Invalid email or password')
            return
        }

        if (isLogin){
            try {
                await login(email, password)
            } catch (err) {
                setError('Incorrect Email or Password')
            }
            return
        }
        try{
            await signup(email, password)
        } catch (err) {
            setError('Failed to create an account')

        }

    }

  return (
    <div className = "flex-1 flex flex-col justify-center items-center text-xs sm:text-sm gap-2 sm:gap-4">
        <h1 className = "font-extrabold text-4xl sm:text-6xl select-none">{isLogin ? 'Login' : 'Sign Up'}</h1>
        {error && <div className = "w-full max-w-[40ch] border-rose-400 border text-center text-rose-400 py-2">{error}</div>}
        <input type="text" 
        className= "outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-4 border-solid- border-white focus:border-cyan-300"
        placeholder="Email Address"
        value = {email}
        onChange = {(e) => setEmail(e.target.value)}
        />

        <input type="password" className= "outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-4 border-solid- border-white focus:border-cyan-300"
        placeholder="Password"
        value = {password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <button 
        className = 'w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'
        onClick = {submitHandler}>
            <h2 className = "relative z-20"> SUBMIT </h2>
        </button>
        <h2 className = "duration-300 hover:opacity-40 cursor-pointer" 
        onClick = {()=>{setIsLogin(!isLogin)}}> {!isLogin ? 'Login' : 'Sign Up'}</h2>


    </div>
  )
}
