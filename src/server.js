import app from "./app.js";

import {connectDB}  from "./config/dbConfig.js"

connectDB().then(()=>{
    console.log("Connection stabilished successfully");
    app.listen("7776", ()=>{
        console.log("Server is listening on 7776");
        });
}).catch((err)=>{
    console.log("Connection is not estabilished");
});