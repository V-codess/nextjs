import { connect } from "@/connectDB/connectdb";
import User from "@/models/Users";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
connect()

// post request 
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody.data;
        const user = await User.findOne({email})
        const comparedPassword = await bcryptjs.compare(password, user.password);
        const tokenData = {
            id: user.id,
            name: user.name,
            email: user.email
        }
        const tokenCreate = await jwt.sign(tokenData, process.env.KEY!,{expiresIn: '1hr'})
        if(!user){
           return NextResponse.json({message: "No user found"},{status: 400})
        }
        if(comparedPassword === false || email !== user.email){
            return NextResponse.json({message: "Incorrect details", saved: false },{status: 400})
        }
        else{ 
        return NextResponse.json({message: "User logged in!", saved: true, user },{status: 201})
        } 
    } catch (error) {
        console.log("error", error)
        return NextResponse.json({message: error},{status: 500})
        
    }
}