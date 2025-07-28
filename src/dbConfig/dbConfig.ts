import mongoose from "mongoose";

export async function connectDb(){
    try{

        await mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("Mongo DB Connected Successfully");
        })
        connection.on("error", (err)=>{
            console.log("Mongo DB Connection Error", err);
            process.exit(1);
        })
    }catch(error){
        console.log("MongoDB connection failed", error);
    }
} 