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
        const {email, username, password} = reqBody;
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({message: "User already exists"},{status: 400})
        }
        // hashing passwrod
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(reqBody.user.password, salt)
        const createNewUser = new User({
            email: reqBody.user.email,
            username: reqBody.user.username,
            password: hashedPassword,
            id: Math.floor(Math.random()* 1000)
        })
        const savedUser = await createNewUser.save()
        return NextResponse.json({message: "User created!", saved: true, savedUser },{status: 201})
    } catch (error) {
        console.log("error", error)
        return NextResponse.json({message: error},{status: 500})
        
    }
}