import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();  // it is important because by using it we can use .env data at anywhere without import ok
import { runDefault } from "./utils/byDefaultCreated.js";
import {connectDB}  from "./config/dbConfig.js"
const PORT = process.env.PORT || 3000;

connectDB().then(()=>{
    console.log("Connection stabilished successfully");
    app.listen(PORT, ()=>{
        console.log("Server is listening on", PORT);
        });
        runDefault();
}).catch((err)=>{
    console.log("Connection is not estabilished");
});