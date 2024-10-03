import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.URL!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("Connected to the DB successfully");
        })
        connection.on('error',(err)=>{
            console.log("Make sure your db is connected" + err);
            process.exit()
        })
    } catch (error) {
        console.log("Something went wrong");
        
    }
}