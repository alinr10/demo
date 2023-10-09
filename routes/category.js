const express = require("express");
const router = express.Router();
const Categories = require("../models/Categories");
const path = require("path");
const Post = require("../models/Post");


router.post("/categories", (req, res) => {

    Categories.create(req.body)

    res.redirect("/category");
})


router.get("/categories/edit/:id", (req,res ) => {

    const editid=req.params.id

    res.render("site/category-edit", { layout: null,editid:editid })


})


router.post("/categories/edit/:id", async (req, res) => {
    const { name } = req.body; // "name" alanını req.body içinden alıyoruz
  
    try {
      const updatedCategory = await Categories.findByIdAndUpdate(
        req.params.id,
        { name }, // "name" alanını güncelliyoruz
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).send("Kategori bulunamadı");
      }
  
      res.redirect("/category");
    } catch (error) {
      console.error(error);
      res.status(500).send("Sunucu hatası");
    }
  });
  


  router.get("/blog/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const categories=await Categories.find({})
      const posts = await Post.find({ category: category });
  
      res.render("site/category-page", { posts: posts,categories:categories  });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// router.get("/blog/:category",async (req,res)=>{

// const posts=await Post.find({category:req.params.category})

// res.render("site/category-page",{posts:posts})

// })



router.get("/categories/delete/:id", async (req, res) => {

    try {

        const deletedCategori = await Categories.findByIdAndDelete(req.params.id)

        if (!deletedCategori) {
            console.log("Post bulunamadı")
        }

        res.redirect("/category")
    } catch (error) {

        console.log(error)

    }




})

module.exports = router;