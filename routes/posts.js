const express = require('express');

const router = express.Router();
const Post = require('../models/Post');
const path = require('path');
const checkAuth =require('../checkauth')

router.post('/', checkAuth,(req, res) => {
  const { post_image } = req.files;

  post_image.mv(
    path.resolve(__dirname, '../public/img/postimages', post_image.name),
  );
  Post.create({
    ...req.body,
    post_image: `img/postimages/${post_image.name}`,
  });
  res.redirect('/posts');
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  const posts = await Post.find({});
  const categories=await Categories.find({})
  res.render('site/blog-single', {
    post,
    posts,
    categories
  });
});

const mongoose = require('mongoose');
const Categories = require('../models/Categories');

// ...

router.post('/edit', async (req, res) => {
  try {
    const postId = req.files.id;
    const updatedData = {
      title: req.body.title,
      content: req.body.content,
    };

    const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).send('Güncellenecek post bulunamadı.');
    }

    console.log(`Post with ID ${postId} has been updated.`);
    res.redirect('/posts'); // Güncelleme işlemi başarılıysa isteği yönlendir
  } catch (error) {
    console.error(error);
    res.status(500).send(`Bir hata oluştu: ${error.message}`); // Hata durumunda uygun bir hata mesajı gönder
  }
});

module.exports = router;
