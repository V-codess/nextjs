"use client"

import Link from "next/link";
import { useRouter } from "next/router";
import React, { use } from "react";


export default function profileScreen({params}: any) {
  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
        <h1>Hey! {params.id}</h1>
    </div>
  )
}