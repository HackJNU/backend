require("dotenv").config();

const mongoose=require("mongoose");
const express = require("express");
const { connectMongoDb } = require("./connection");
const bodyParser = require("body-parser");
const jwt=require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const userRoutes=require("./routes/userRoutes.js");
const fieldsRoutes=require("./routes/fieldRoutes.js");


app.use("/user",userRoutes);
app.use("/fields",fieldsRoutes);

connectMongoDb(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected!"));

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}!`));



