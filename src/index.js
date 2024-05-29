import dotenv from "dotenv"
// import mongoose from 'mongoose';
// import { DB_NAME } from './constants';
import connectToDB from './db/mongoose_connect.js';

dotenv.config({
    path: './env'
})

connectToDB()
.then(() => {
    app.listen(process.env.PORT|| 8000, () => {
        console.log(`⚙️ Server is running at port ${process.env.PORT}`);
    })

    app.on("error", () =>{
        console.log("Error: ", error);
        throw error
    })

})
.catch((err) => {
    console.log("MONGO_DB CONNECTION FAILED!! ", err);
})



















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

