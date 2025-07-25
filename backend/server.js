import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import dotenv from "dotenv";
import path from "path";
import {Server} from "socket.io";
import registerSocketHandler from "./socket.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);



const server=app.listen(5000, () => {
  console.log("server started on port 5000");
});

const io = new Server(server,{
  cors:{
    origin:"*",
    methods:["GET", "POST"]
  }
  
})
registerSocketHandler(io);
