const express = require('express')
const Note = require('../models/note')
const router = new express.Router()
const checkAuth = require("../middleware/check-auth");

router.get("/getall",checkAuth ,(req,res)=>{
    Note.find({},(err,fData)=>{
        res.send(fData);
    });
});

router.get("/user/getall",checkAuth ,(req,res)=>{
    //console.log(req.userData.userId);
    Note.find({creator:req.userData.userId},(err,fData)=>{
        res.send(fData);
    });
});

router.post("/user/addnote",checkAuth,(req,res)=>{
    console.log(req.userData.userId + " - addednote");
    const newnote = new Note({
        Ntitle: req.body.title,
        Ncontent: req.body.content,
        creator : req.userData.userId,
        postDate : new Date().toISOString()
    });
    newnote.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
            Note.find({creator:req.userData.userId},(err,fData)=>{
                res.send(fData);
            }); 
        }
    });
});

router.post("/user/deletenote",checkAuth,(req,res)=>{
    console.log(req.userData.userId + " - delete");
    Note.findByIdAndRemove(req.body.id,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            Note.find({creator:req.userData.userId},(err,fData)=>{
                res.send(fData);
            }); 
        }
    });
});

router.post("/user/editnote",checkAuth,(req,res)=>{
    console.log(req.userData.userId + " - edited");
    Note.findByIdAndUpdate(req.body.id,
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

module.exports = router