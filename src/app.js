
import express from  "express";
import userRoute from "./routes/userRoute.js"
import subscriptionRoute from "./routes/subscriptionRoute.js"
const app = express();

app.use(express.json());
// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form  data from postman or client side
// app.use(cookieParser());
app.use("/api", userRoute);
app.use("/api", subscriptionRoute);



export default app;
