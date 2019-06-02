// const Post = require('../models/PostModel').Post;
const Post = require('../models/PostModel');

// const Category = require('../models/CategoryModel').Category
const Category = require('../models/CategoryModel')


module.exports = {
//start bracket

    index: (req,res)=>{

        res.render('admin/index')
    },
    getPosts: (req,res)=>{

        mysort = {CreationDate:-1}

        Post.find().sort(mysort)
            .populate('category')
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

        //for check box which give value of ON/OFF
        const commentsAllowed = req.body.allowComments? true : false;

        const newPost = new Post({
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            allowComments:commentsAllowed,
            category:req.body.category
        })

        newPost.save()
                .then(post=>{
                    // console.log(post);
                    req.flash('success-message','Post Created successfully')
                    res.redirect('/admin/posts')
                })
                .catch(err=>{
                    console.log("error in submission "+err)
                });

    },
    
    createPost: async (req,res)=>{

        const categories = await Category.find();

        res.render('admin/posts/create',{categories:categories})
    },



    editPost: (req,res)=>{

        const id = req.params.id
        Post.findById(id)
                .then(post=>{
                    Category.find().then(cats=>{

                        res.render('admin/posts/edit',{post:post, categories:cats});

                    })
                })
                .catch(err=>{

                    console.log(err)
                })
    },

    deletePost: (req,res)=>{

        const id = req.params.id;

        Post.findByIdAndDelete(id)
                .then(deletePost=>{

                    req.flash('error-message',`The post ${deletePost.title} has been deleted`);
                    res.redirect('/admin/posts');

                });
    },


    updatePost: (req,res)=>{

        const commentsAllowed = req.body.allowComments? true : false;
        const id = req.params.id
        Post.findById(id).then(post=>{

            post.title = req.body.title,
            post.description = req.body.description,
            post.status=req.body.status,
            post.allowComments=commentsAllowed,
            post.category=req.body.category

            post.save().then(updatedPost=>{
                req.flash('success-message',`The post "${updatedPost.title}" has been updated`)
                res.redirect('/admin/posts')
            });

        });

    },


// ADMIN CATEGORIES METHODS

    getCategories: (req,res)=>{
        var mysort = {title:1};
        Category.find().sort(mysort)
                .then(cats=>{

                    res.render('admin/category/index',{categories:cats});
                    
                })

    },

    postCategory: (req,res) => {

            var categoryName = req.body.name;

            if(categoryName)
            {
                const newCategory = new Category({
                    title: categoryName
                })

                newCategory.save()
                            .then(category=>{
                                res.status(200).json(category);
                            })
            }
    },

    editCategoriesGetRoute: async (req,res)=>{

            // const catId = req.params.id;

            // const cats = await Category.find();

            // Category.findById(catId).then(cat=>{

            //     res.render('admin/category/edit',{category:cat,categories:cats})

            // })

            const id = req.params.id;
            const cat = await Category.findById(id);

            res.render('admin/category/edit',{cat:cat})
        
        
    },

    editCategoriesUpdateRoute: (req,res)=>{

            var catId = req.params.id;

            Category.findById(catId)
                    .then(cat =>  {

                cat.title = req.body.title
                cat.save().then(updatedCat=>{
                    req.flash('success-message',`The Category "${updatedCat.title}" has been updated`);
                    res.redirect('/admin/category');
                })
            })

    },

    deleteCategory: (req,res)=>{



    }


//-----------------------end bracket
}