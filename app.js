import  express  from "express";
// import mongoose, { Schema } from "mongoose";
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
// import { connectDB } from "./data/database.js";
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from 'cors';


export const app = express();
// connectDB()
config({
    path:'./data/config.env',
})

//to access data from json data we use this middleware
app.use(express.json());
app.use(cookieParser());
// use for deployment of nodejs
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET','POST','PUT','DELETE'],
    credentials:true //this is must
}));

app.use("/api/v1/users" ,userRouter)
app.use("/api/v1/task" ,taskRouter)

app.get('/', (req, res) => {
    res.send("nice working")
})

//using error middleware
app.use(errorMiddleware)


