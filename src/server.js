import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();  // it is important because by using it we can use .env data at anywhere without import ok
import { runDefault } from "./utils/byDefaultCreated.js";
import {connectDB}  from "./config/dbConfig.js"
import { createServer } from "http";
const PORT = process.env.PORT || 7776;

// Create an HTTP server instance
const server = createServer(app); // for web socket

// using websocket
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  // it is used for recieving msg from postman body or client 
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  // it is showing msg when connection is established in postman not vs code and it is used to send data in postman or client
  ws.send('websocket is connected');
  console.log("Web socket is connected"); // it is used to show msg in vs code
});


connectDB().then(()=>{
    console.log("Connection stabilished successfully");
    server.listen(PORT, ()=>{
        console.log("Server is listening on", PORT);
        });
        runDefault();
}).catch((err)=>{
    console.log("Connection is not estabilished");
});