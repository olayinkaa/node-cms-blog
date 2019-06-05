const express = require('express');
const router = express.Router();

const defaultController = require('../controllers/defaultController');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;




router.all('/*',(req,res,next)=>{

    req.app.locals.layout = 'default';

    next();

});


// router.get('/',defaultController.index);
router.route('/')
    .get(defaultController.index);

// defining local strategy
passport.use(new LocalStrategy({

    usernameField: 'email',
    passReqToCallback: true
},(req,email,password,done)=>{

        User.findOne({email:email}).then(user=>{
            if(!user)
            {
                return done(null,false,req.flash('error-message','Invalid Username or Password'));
            }
            bcrypt.compare(password,user.password,(err,passwordMatched)=>{
                if(err)
                {
                    return err
                }

                if(!passwordMatched)
                {
                    return done(null,false,req.flash('error-message','Invalid Username or Password'));
                    
                }

                return done(null,user,req.flash('success-message','Login Successful'));
                
            })
        })
}))


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


//   login route--------------------------------------------------------------------------
router.route('/login')
    .get(defaultController.loginGet)
    .post(passport.authenticate('local',{
        successRedirect:'/admin',
        failureRedirect:'/login',
        failureFlash:true,
        successFlash: true,
        session:true
    }),defaultController.loginPost)
    

router.route('/logout')
        .get(defaultController.logOut)

router.route('/register')
    .get(defaultController.registerGet)
    .post(defaultController.registerPost)




module.exports = router;