import express from "express";
import path from "path";
import Post from "../models/Post.js";
import Categories from "../models/Categories.js";
import checkAuth from "../checkauth.js";
import Bard from "bard-ai";
import AiPost from "../models/AiPost.js";



const router = express.Router();


router.post('/writingai',checkAuth,async(req,res)=>{

  const {content}=req.body

  let myBard = new Bard('cQimDbeXEnzqQZVlUrRxkceKed45Hlloc1lb0VszUhHmvzZlaANJxN9fWnCzf4wLyGROxA.',{
    verbose: true,
    fetch: fetch,
  }
  );

  // {
  //   "__Secure-1PSID":''
  //    ,
  //   '__Secure-3PSID':''
   
  // }
  const aicontent = await myBard.ask(`${content}`);

  req.session.aicontent = aicontent;

const newAiPost= await AiPost.create({content:aicontent})



res.redirect("/add-post");


})



router.post("/", checkAuth, async (req, res) => {
  const { title, content, author, category } = req.body;
  const { post_image } = req.files;

  

  try {
     const __dirname = path.resolve();
    await path.join(__dirname, 'public', 'img', 'postimages');

    const newPost = await Post.create({
      title,
      content ,
      author,
      category,
      post_image: `img/postimages/${post_image.name}`,
    });

    console.log(`New post created with ID: ${newPost._id}`);
    res.redirect("/posts");
  } catch (error) {
    console.error(error);
    res.status(500).send(`Bir hata oluştu: ${error.message}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const posts = await Post.find({});
    const categories = await Categories.find({});
    res.render("site/blog-single", {
      post,
      posts,
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Bir hata oluştu: ${error.message}`);
  }
});

router.post("/edit", async (req, res) => {
  try {
    const postId = req.body.id;
    const updatedData = {
      title: req.body.title,
      content: req.body.content,
    };

    const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).send("Güncellenecek post bulunamadı.");
    }

    console.log(`Post with ID ${postId} has been updated.`);
    res.redirect("/posts");
  } catch (error) {
    console.error(error);
    res.status(500).send(`Bir hata oluştu: ${error.message}`);
  }
});

export default router;
