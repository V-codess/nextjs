import { connect } from "@/connectDB/connectdb";
import User from "@/models/Users";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect()

// post request 
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        const user = await User.findOne({email})
        const comparedPassword = await bcryptjs.compare(password, user.password)
        console.log(comparedPassword);
        if(!user){
           return NextResponse.json({message: "No user found"},{status: 400})
        }
        else{
        return NextResponse.json({message: "User logged in!", saved: true },{status: 201})
        } 
    } catch (error) {
        console.log("error", error)
        return NextResponse.json({message: error},{status: 500})
        
    }
}