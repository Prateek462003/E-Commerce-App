const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./Routes/auh.js");
const userRoute = require("./Routes/users.js");
const productRoute = require("./Routes/product.js");
const orderRoute = require("./Routes/order.js");
const cartRoute = require("./Routes/cart.js");
dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("Mongo DB Connected"))
    .catch((err)=>{console.log(err);})

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);

app.listen(process.env.port || 5000, ()=>{
    console.log("Backend Server Running")
})