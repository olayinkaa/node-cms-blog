const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

const {isUserAuthenticated} = require('../config/customFunctions');


router.all('/*', isUserAuthenticated ,(req,res,next) =>{

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
        .put(adminController.updatePost)
        
router.route('/post/delete/:id')
        .delete(adminController.deletePost)


// ADMIN CATEGORY ROUTES

router.route('/category')
        .get(adminController.getCategories)
        .post(adminController.postCategory)

router.route('/category/delete/:id')
        .delete(adminController.deleteCategory)

router.route('/category/edit/:id')
        .get(adminController.editCategoriesGetRoute)
        .put(adminController.editCategoriesUpdateRoute)


module.exports = router;