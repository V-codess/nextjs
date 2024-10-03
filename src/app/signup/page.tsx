"use client"

import Link from "next/link";
import { useRouter } from "next/router";
import React, { use } from "react";


export default function loginScreen() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username:"",
        confirmPassword:""
    })

    const signup = async() => {
      console.log(user);
    }
  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
        <h1 className="text-3xl font-bold py-3">Signup</h1>
        <input id="username" type="text" value={user.username} onChange={(e)=> setUser({...user, username: e.target.value})} className="text-black rounded-lg my-1 py-2 px-2 font-sans" placeholder="username"></input>
        <input id="email" type="text" value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})} className="text-black rounded-lg py-2 px-2 my-1 font-sans" placeholder="email"></input>
        <input id="password" type="password" value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})} className="text-black rounded-lg my-1 py-2 px-2 font-sans" placeholder="****"></input>
        <input id="confirmPass" type="password" value={user.confirmPassword} onChange={(e)=> setUser({...user, confirmPassword: e.target.value})} className="text-black rounded-lg my-1 py-2 px-2 font-sans" placeholder="****"></input>
        <button onClick={()=> signup()} className="flex bg-slate-50 px-4 text-black my-3 py-2 rounded-lg">login</button>
        <Link className="text-white" href="/login">Have an account already? Login</Link>
    </div>
  )
}