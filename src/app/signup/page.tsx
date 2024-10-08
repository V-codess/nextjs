"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


export default function signUpScreen() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username:"",
        confirmPassword:""
    })
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
      if(user.password.length >= 8 && user.email && user.confirmPassword.length >= 8 && user.username){
        setDisabled(false)
      }
      else{
        setDisabled(true)
      }
    }, [user])
    const signup = async() => {
      try {
        setLoading(true)
        const response = await fetch("/api/users/signup", {
          method: "POST",
          body: JSON.stringify({ user })
        });
        router.push("/login")
      } catch (error) {
        alert("Unable to signup" + error)
      }
      finally{
        setLoading(false)
      }
    }
  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
        <h1 className="text-3xl font-bold py-3">Signup</h1>
        <input id="username" type="text" value={user.username} onChange={(e)=> setUser({...user, username: e.target.value})} className="text-black rounded-lg my-1 py-2 px-2 font-sans" placeholder="username"></input>
        <input id="email" type="text" value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})} className="text-black rounded-lg py-2 px-2 my-1 font-sans" placeholder="email"></input>
        <input id="password" type="password" value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})} className="text-black rounded-lg my-1 py-2 px-2 font-sans" placeholder="****"></input>
        <input id="confirmPass" type="password" value={user.confirmPassword} onChange={(e)=> setUser({...user, confirmPassword: e.target.value})} className="text-black rounded-lg my-1 py-2 px-2 font-sans" placeholder="****"></input>
        <button onClick={()=> signup()} disabled={disabled === true ? true : false} className={disabled === true ? "flex px-4 text-black my-3 py-2 rounded-lg bg-slate-400" : "border bg-black flex px-4 text-white my-3 py-2 rounded-lg"}>{loading ? "Saving your data" : "Signup"}</button>
        <Link className="text-white" href="/login">Have an account already? Login</Link>
    </div>
  )
}