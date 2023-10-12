/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Categories = require('../models/Categories');
const checkAuth = require('../checkauth');
const truncateText=require('../truncateText')
const path = require('path')
router.get('/', (req, res) => {
  console.log(req.session);
  res.render('site/index');
});

router.get('/filter', async (req, res) => {
  try {
    const distinctAuthors = await Post.distinct('author'); // Tüm farklı yazar isimlerini getir
    const { author, startDate, endDate } = req.query;

    let authorPosts = [];

    // Eğer yazar seçildiyse ve tarih aralığı belirlendiyse
    if (author && startDate && endDate) {
      // Tarihleri JavaScript Date objelerine çevirin
      const start = new Date(startDate);
      const end = new Date(endDate);

      console.log(start)

      console.log(end)
      
      // Belirli yazarın ve belirli tarih aralığının yazılarını getir
      authorPosts=await Post.find({
        author: author,
        date: { $gte: start, $lte: end }
      });
    } else if (author) {
      // Eğer sadece yazar seçildiyse, tarih aralığı olmadan sorguyu yapın
      authorPosts = await Post.find({ author: author });
    }

    // Elde edilen sonuçları kullanarak işlemlerinizi gerçekleştirin
    // ...

    res.render('site/filtered-post', { layout: null, authorPosts, distinctAuthors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/filt', async (req, res) => {
  try {
    const distinctAuthors = await Post.distinct('author'); // Tüm farklı yazar isimlerini getir
    const { author, startDate, endDate } = req.query;

    let authorPosts = [];

    // Eğer yazar seçildiyse ve tarih aralığı belirlendiyse
    if (author && startDate && endDate) {
      // Tarihleri JavaScript Date objelerine çevirin
      const start = new Date(startDate);
      const end = new Date(endDate);

      console.log(start)

      console.log(end)
      
      // Belirli yazarın ve belirli tarih aralığının yazılarını getir
      authorPosts=await Post.find({
        author: author,
        date: { $gte: start, $lte: end }
      });
    } else if (author) {
      // Eğer sadece yazar seçildiyse, tarih aralığı olmadan sorguyu yapın
      authorPosts = await Post.find({ author: author });
    }

    // Elde edilen sonuçları kullanarak işlemlerinizi gerçekleştirin
    // ...

    res.render('site/filtered-blog', {authorPosts, distinctAuthors});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.get('/filterblog', async (req, res) => {
//   try {
//     const distinctAuthors = await Post.distinct('author'); // Tüm farklı yazar isimlerini getir
//     const { author, startDate, endDate } = req.query;

//     let authorPosts = [];

//     // Eğer yazar seçildiyse ve tarih aralığı belirlendiyse
//     if (author && startDate && endDate) {
//       // Tarihleri JavaScript Date objelerine çevirin
//       const start = new Date(startDate);
//       const end = new Date(endDate);

//       console.log(start)

//       console.log(end)
      
//       // Belirli yazarın ve belirli tarih aralığının yazılarını getir
//       authorPosts=await Post.find({
//         author: author,
//         date: { $gte: start, $lte: end }
//       });
//     } else if (author) {
//       // Eğer sadece yazar seçildiyse, tarih aralığı olmadan sorguyu yapın
//       authorPosts = await Post.find({ author: author });
//     }

//     // Elde edilen sonuçları kullanarak işlemlerinizi gerçekleştirin
//     // ...

//     res.render('site/blog', { authorPosts:authorPosts, distinctAuthors:distinctAuthors });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



router.get('/about', (req, res) => {
  res.render('site/about');
});




router.get('/blog', async (req, res) => {
  try {


    const distinctAuthors = await Post.distinct('author'); // Tüm farklı yazar isimlerini getir
    const { author, startDate, endDate } = req.query;

    let authorPosts = [];

    // Eğer yazar seçildiyse ve tarih aralığı belirlendiyse
    if (author && startDate && endDate) {
      // Tarihleri JavaScript Date objelerine çevirin
      const start = new Date(startDate);
      const end = new Date(endDate);

      console.log(start)

      console.log(end)
      
      // Belirli yazarın ve belirli tarih aralığının yazılarını getir
      authorPosts=await Post.find({
        author: author,
        date: { $gte: start, $lte: end }
      });
    } else if (author) {
      // Eğer sadece yazar seçildiyse, tarih aralığı olmadan sorguyu yapın
      authorPosts = await Post.find({ author: author });
    }

    
    // Post collection'ından veri çekme
    const posts = await Post.find({}).sort({date:'desc'});

    // Categories collection'ından veri çekme
    const categories = await Categories.find({});

    // Verileri template'e gönderme
    res.render('site/blog', { posts, categories,authorPosts, distinctAuthors});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/contact', (req, res) => {
  res.render('site/contact');
});

router.get('/admin', checkAuth,(req, res) => {
  console.log(req.session);
    res.render('site/admin', { layout: null });
 
});


router.get("/posts",checkAuth,async (req,res)=>{

  try{

   const distinctAuthors = await Post.distinct('author'); // Tüm farklı yazar isimlerini getir
    const { author } = req.query;

    let authorPosts = [];
    if (author) {
      authorPosts = await Post.find({ author: author }).sort({date:'desc'}); // Belirli yazarın yazılarını getir
    }
  
const posts= await Post.find({})

res.render("site/posts",{posts:posts,layout:null,distinctAuthors})

}catch(error){
console.error(error);
  res.status(500).send(`Bir hata oluştu: ${error.message}`); // Hata durumunda uygun bir hata mesajı gönder
}




})


router.get('/add-post', checkAuth,async (req, res) => {

try{
  const post = await Post.find({});

  const categories = await Categories.find({});
  res.render('site/add-post', { layout: null, post, categories });
}catch (error) {
  console.error(error);
  res.status(500).send(`Bir hata oluştu: ${error.message}`); // Hata durumunda uygun bir hata mesajı gönder
}

});

router.get('/category',checkAuth, async (req, res) => {
  try {
    // Post collection'ından veri çekme

    // Categories collection'ından veri çekme
    const categories = await Categories.find({});

    // Verileri template'e gönderme
    res.render('site/category', { layout: null, categories });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/posts/delete/:id',checkAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    console.log(`Post with ID ${postId} has been deleted.`);
    res.redirect('/posts');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/posts/edit/:id', checkAuth, async(req, res) => {
  const postId = req.params.id;
  try{
const post= await Post.findById(postId) 
const categories= await Categories.find({})
res.render('site/edit-post', { layout:null, postId ,categories,post});
  }catch(error) {
    console.error(error);
    // Hata durumunda uygun bir hata mesajı göndermek veya hata sayfasına yönlendirmek gibi işlemler yapabilirsiniz.
    res.status(500).send('Bir hata oluştu.');
  }
});
router.post('/posts/edit/:id', checkAuth,async (req, res) => {
  try {

    const { post_image } = req.files;

    post_image.mv(
      path.resolve(__dirname, '../public/img/postimages', post_image.name),
    )
    const postId = req.params.id;
    const { title, content, author,category} = req.body; // req.body'den title ve content alanlarını al

    // Veritabanında postId'ye sahip yazıyı bul ve güncelle
    const updatedPost = await Post.findByIdAndUpdate(postId, {title,content,author,category,post_image: `img/postimages/${post_image.name}`}, { new: true });

    // Veriyi başarıyla güncellediğinizden emin olun, ardından başka bir sayfaya yönlendirme veya render işlemi yapabilirsiniz.
    res.redirect(`/posts`);
  } catch (error) {
    console.error(error);
    // Hata durumunda uygun bir hata mesajı göndermek veya hata sayfasına yönlendirmek gibi işlemler yapabilirsiniz.
    res.status(500).send('Bir hata oluştu.');
  }
});

router.get('/login', (req, res) => {
  if (req.session.userId) {
    res.render('site/admin');
  } else {
    res.render('login',{ layout: null });
  }
});

module.exports = router;