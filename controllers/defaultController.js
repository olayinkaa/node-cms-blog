const Post = require('../models/PostModel');
const Category = require('../models/CategoryModel')



module.exports = {

    index: async (req,res)=>{

        mysort = {CreationDate:-1}
        const posts = await Post.find().sort(mysort);
        const categories = await Category.find();
        

        res.render('default/index',{posts:posts,categories:categories})

    },

    loginGet: (req,res)=>{
        res.render('default/login')
    },

    loginPost: (req,res)=>{
        
        res.send("You've successfully login")
    },

    registerGet: (req,res)=>{
        res.render('default/register')
    },

    registerPost: (req,res)=>{
        res.send("You've successfully register")

    }
}