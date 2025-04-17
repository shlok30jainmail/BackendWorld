
import express from  "express";
import userRoute from "./routes/userRoute.js"
import subscriptionRoute from "./routes/subscriptionRoute.js"
import bannerRoute from "./routes/bannerRoute.js"
import eventRoute from "./routes/eventRoute.js";
import howToGetBloodRoute from "./routes/howToGetBloodRoute.js"
import whyUnooRoute from "./routes/whyUnooRoute.js"



const app = express();

app.use(express.json());
// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form  data from postman or client side
// app.use(cookieParser());
app.use("/api", userRoute);
app.use("/api", subscriptionRoute);
app.use('/api', bannerRoute);
app.use('/api', eventRoute);
app.use('/api', howToGetBloodRoute);
app.use('/api', whyUnooRoute);







export default app;
