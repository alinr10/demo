const express = require("express");
const router=express.Router()
const Post=require('../models/Post')

  router.get("/",(req,res)=>{

res.render("site/post",{layout:null})

})

router.post("/",(req,res)=>{
    
    Post.create(req.body)

    
    
res.redirect("/")

})

  module.exports=router

