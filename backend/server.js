import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import dotenv from "dotenv";



dotenv.config()
const app =express();

app.use(express.json());

// database connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log(err))

app.get('/',(req,res)=>{
    res.send("Welcome")
})

app.use("/api/users",userRoutes);
app.listen(5000,()=>{console.log("server started on port 5000")})