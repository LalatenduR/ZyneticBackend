import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
app.use(express.json({}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import bookRouter from "./routes/book.route.js";
app.use("/api/v1/users",userRouter);
app.use("/api/v1/books",bookRouter);

export {app}