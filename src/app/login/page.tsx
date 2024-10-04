"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";


export default function loginScreen() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const login = async() => {
      try {
        const response = await fetch("/api/users/login", {
          method: "POST",
          body: JSON.stringify(user)
        });
        console.log(response)
        router.push("/profile")
      } catch (error) {
        console.log("Unable to login")
      }
    }
  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
        <h1 className="text-3xl font-bold py-3">Login</h1>
        <input id="username" type="text" value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})} className="text-black rounded-lg my-1 py-2 px-2 font-sans" placeholder="email"></input>
        <input id="password" type="password" value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})} className="text-black rounded-lg py-2 px-2 my-1 font-sans" placeholder="password"></input>
        <button onClick={()=> login()} className="flex bg-slate-50 px-4 text-black my-3 py-2 rounded-lg">login</button>
        <Link className="text-white" href="/signup">No account? Signup</Link>
    </div>
  )
}