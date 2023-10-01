const express=require('express')
const path=require('path')
const app=express()
const port=3000
const exphbs = require('express-handlebars');


app.use(express.static('public'))

app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars');


app.get("/",(req,res)=>{

res.render('site/index')


})

app.get("/about",(req,res)=>{

    res.render('site/about')
    
    
    })
    app.get("/blog",(req,res)=>{

        res.render('site/blog')
        
        
        })
        app.get("/contact",(req,res)=>{

            res.render('site/contact')
            
            
            })
            app.get("/blog-single",(req,res)=>{

                res.render('site/blog-single')
                
                
                })

                app.get('/login', (req, res) => {
                    res.render('login', { layout: null });
                });
                app.get('/admin', (req, res) => {
                    res.render('site/admin', { layout: null });
                });

                app.get('/category', (req, res) => {
                    res.render('site/category', { layout: null });
                });

app.listen(port,()=>{
    console.log(`Sunucu ${port} numaralı portta çalışıyor`)
})