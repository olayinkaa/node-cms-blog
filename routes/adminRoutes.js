const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');


router.all('/*',(req,res,next) =>{

        req.app.locals.layout = 'admin'; //set your layout here

        next(); // pass control to the next handler

});


/*

router.route('/admin') ---this is the standard unseen form of the route
router.route('/admin/post/') ---this is the standard unseen form of the route
router.route('/admin/post/create') ---this is the standard unseen form of the route

this is because the "/admin" has being included in the route.js file



*/


router.route('/')
    .get(adminController.index)


router.route('/post')
        .get(adminController.getPosts)
        .post(adminController.submitPost)

        
router.route('/post/create')
        .get(adminController.createPost)

    



module.exports = router;