const Post = require('../models/PostModel');
const User = require('../models/UserModel');
const Category = require('../models/CategoryModel');
const bcrypt = require('bcryptjs');



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
        let errors = [];
 ///////////////////////////////////////
        if(!req.body.surname)
        {
            errors.push({message:'Surname field is required'})
        }
        if(!req.body.firstname)
        {
            errors.push({message:'firstname field is required'})
        }
        if(!req.body.email)
        {
            errors.push({message:'Email field is required'})
        }
        if(req.body.password !== req.body.confirmPassword)
        {
            errors.push({message:'Password do not match'})
        }
//////////////////////////////////////
        if(errors.length>0){

            res.render('default/register',{
                errors:errors,
                surname: req.body.surname,
                firstname: req.body.firstname,
                email: req.body.email
            });
        }
        else
        {
            User.findOne({email:req.body.email})
                .then(user=>{

                    if(user)
                    {
                        req.flash('error-message','Email Already exists, try login.');
                        res.redirect('/login');
                    }
                    else
                    {
                        const newUser = new User(req.body);
                        bcrypt.genSalt(10,(err,salt)=>{
                            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                                newUser.password = hash;
                                newUser.save().then(user=>{
                                    req.flash('success-message','you are now registered');

                                    res.redirect('/login');
                                })
                            })
                        })
                    }
                   
                })
        }
////////////////////////////////

    }
}