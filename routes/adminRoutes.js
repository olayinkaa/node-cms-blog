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


router.route('/posts')
        .get(adminController.getPosts)

        
router.route('/post/create')
        .get(adminController.createPost)
        .post(adminController.submitPost)
        
        
router.route('/post/edit/:id')
        .get(adminController.editPost)
        // .post(adminController.submitPost)
        
router.route('/post/delete/:id')
        .delete(adminController.deletePost)


module.exports = router;