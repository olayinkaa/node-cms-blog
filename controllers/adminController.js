// const Post = require('../models/PostModel').Post;
const Post = require('../models/PostModel');


module.exports = {
//start bracket

    index: (req,res)=>{

        res.render('admin/index')
    },
    getPosts: (req,res)=>{

        Post.find()
            .then(posts=>{
                res.render('admin/posts/index',{
                    posts:posts
                })
            })
            .catch(err=>{
                console.log(err)
            })
    },

    submitPost: (req,res)=>{

        const newPost = new Post({
            title:req.body.title,
            description:req.body.description,
            status:req.body.status
        })

        newPost.save()
                .then(post=>{
                    console.log(post);
                    req.flash('success-message','Post Created successfully')
                    res.redirect('/admin/posts')
                })
                .catch(err=>{
                    console.log("error in submission "+err)
                });

    },
    
    createPost: (req,res)=>{

        res.render('admin/posts/create')
    }


//-----------------------end bracket
}