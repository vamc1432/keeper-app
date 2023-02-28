const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
const mongoose = require("mongoose")
const db = require("./database/db")
const cors = require("cors");
require("dotenv").config();

const authAppID = "application-keeperapp-tomwn";
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

const noteRouter = require("./Routes/note");
const userRoutes = require("./Routes/user");

app.use("/api/notes", noteRouter)
app.use("/api/user", userRoutes);

app.get("/test",(req,res)=>{
    console.log(new Date().toISOString());
    res.send({token:"test123"});
});


app.listen(port,(req,res)=>{
    console.log("server started at "+port);
});