const Post = require('../models/PostModel');
const User = require('../models/UserModel');
const Category = require('../models/CategoryModel');
const bcrypt = require('bcryptjs');

// const { check, validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');



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

    logOut: (req,res)=>{

        req.logout();
        res.redirect('/login');
    },

    registerGet: (req,res)=>{
        res.render('default/register')
    },


    registerPost: (req,res)=>{


        // check('surname')
        //     .isLength({ min: 1 })
        //     .withMessage('Message is required')
        //     .trim(),
        // check('firstname')
        //     .isEmail()
        //     .withMessage('That email doesn‘t look right')
        //     .trim()
        //     .normalizeEmail()
            
        // const errors = validationResult(req);
        
        //  if(errors){

        //      res.render('default/register', {
        //         data: req.body,
        //         errors: errors.mapped()
        //       })
        //  }  

  

        let errors = [];
        ///////////////////////////////////////
        const regexp1 =new RegExp("[^a-z|^A-Z]");
        let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    
        if(!req.body.surname)
        {
            errors.push({message:'Surname field is required'})
        }
        if(regexp1.test(req.body.surname))
        {
            errors.push({message:'Surname field can only be alphabet'})
        }
        if(!req.body.firstname)
        {
            errors.push({message:'firstname field is required'})
        }
        if(regexp1.test(req.body.firstname))
        {
            errors.push({message:'firstname field can only be alphabet'})
        }
        if(!req.body.email)
        {
            errors.push({message:'Email field is required'})
        }
        if(!strongRegex.test(req.body.password))
        {
            errors.push({message:'The password must be Minimum eight characters, at least one upper letter, one number and one special character'})
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
    

    //////end----------------------------------
}
