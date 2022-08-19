const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:admin123@cluster0.zgxwc.mongodb.net/keeperDB?retryWrites=true&w=majority",
 {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
);
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

const keeperSchema = {
    Ntitle: String,
    Ncontent: String
};
const keeperModel = new mongoose.model("note",keeperSchema);

app.get("/getall",(req,res)=>{
    keeperModel.find({},(err,fData)=>{
        res.send(fData);
    });
});

app.post("/addnote",(req,res)=>{
    const note = new keeperModel({
        Ntitle: req.body.title,
        Ncontent: req.body.content
    });
    note.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
            keeperModel.find({},(err,fData)=>{
                res.send(fData);
            }); 
        }
    });
});

app.post("/deletenote",(req,res)=>{
    keeperModel.findByIdAndRemove(req.body.id,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            keeperModel.find({},(err,fData)=>{
                res.send(fData);
            }); 
        }
    });
});

app.post("/editnote",(req,res)=>{
    keeperModel.findByIdAndUpdate(req.body.id,
        {Ntitle:req.body.title,Ncontent:req.body.content}
        ,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
           res.json("success");
        }
    });
    
});


app.listen(port,(req,res)=>{
    console.log("server started at "+port);
});