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
        console.log(JSON.stringify({data: user}));
        
        const response = await fetch("/api/users/login", {
          method: "POST",
          body: JSON.stringify({data: user}),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        if (response.ok) {
          const data = await response.json(); 
          let id = data.user.id
          router.push(`/profile/${id}`);
        } else if (response.status === 400) {
          alert("Invalid email or password.");
        } else if (response.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert("Unexpected error. Please try again.");
        }
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