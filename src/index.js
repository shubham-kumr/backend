import dotenv from "dotenv"
// import mongoose from 'mongoose';
// import { DB_NAME } from './constants';
import connectToDB from './db/mongoose_connect.js';

dotenv.config({
    path: './env'
})

connectToDB()



















/*
import express from "express"
const app = express()

( async() => {
    try{
        mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error", () =>{
            console.log("Error: ", error);
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch(error) {
        console.error("Error: ", error)
        throw ErrorEvent
    }
})()
*/

