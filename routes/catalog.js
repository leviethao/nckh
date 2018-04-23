var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');
var post_controller = require('../controllers/postController');
var comment_controller = require('../controllers/commentController');
var post_category_controller = require('../controllers/postCategoryController');
var account_controller = require("../controllers/accountController");

/// USER ROUTES ///

// GET catalog home page.
router.get('/', post_controller.index);

// GET request for creating a User. NOTE This must come before routes that display user (uses id).
router.get('/user/create', user_controller.user_create_get);

// POST request for creating user.
router.post('/user/create', user_controller.user_create_post);

// GET request to delete user.
router.get('/user/:id/delete', user_controller.user_delete_get);

// POST request to delete user.
router.post('/user/:id/delete', user_controller.user_delete_post);

// GET request to update user.
router.get('/user/:id/update', user_controller.user_update_get);

// POST request to update user.
router.post('/user/:id/update', user_controller.user_update_post);

// GET request for one user.
router.get('/user/:id', user_controller.user_detail);

// GET request for list of all user items.
router.get('/users', user_controller.user_list);

/// COMMENT ROUTES ///

// GET request for creating comment. NOTE This must come before route for id (i.e. display comment).
router.get('/comment/create', comment_controller.comment_create_get);

// POST request for creating comment.
router.post('/comment/create', comment_controller.comment_create_post);

// GET request to delete comment.
router.get('/comment/:id/delete', comment_controller.comment_delete_get);

// POST request to delete comment.
router.post('/comment/:id/delete', comment_controller.comment_delete_post);

// GET request to update comment.
router.get('/comment/:id/update', comment_controller.comment_update_get);

// POST request to update comment.
router.post('/comment/:id/update', comment_controller.comment_update_post);

// GET request for one comment.
router.get('/comment/:id', comment_controller.comment_detail);

// GET request for list of all comment.
router.get('/comments', comment_controller.comment_list);

/// POST ROUTES ///

// GET request for creating a post. NOTE This must come before route that displays post (uses id).
router.get('/post/create', post_controller.post_create_get);

//POST request for creating post.
router.post('/post/create', post_controller.post_create_post);

// GET request to delete post.
router.get('/post/:id/delete', post_controller.post_delete_get);

// POST request to delete post.
router.post('/post/:id/delete', post_controller.post_delete_post);

// GET request to update post.
router.get('/post/:id/update', post_controller.post_update_get);

// POST request to update post.
router.post('/post/:id/update', post_controller.post_update_post);

// GET request for one post.
router.get('/post/:id', post_controller.post_detail);

// GET request for list of all post.
router.get('/posts', post_controller.post_list);

router.post('/post_submit', post_controller.post_submit);

/// POST CATEGORY ROUTES ///

// GET request for creating a post category. NOTE This must come before route that displays post category (uses id).
router.get('/post_category/create', post_category_controller.post_category_create_get);

// POST request for creating post category. 
router.post('/post_category/create', post_category_controller.post_category_create_post);

// GET request to delete post category.
router.get('/post_category/:id/delete', post_category_controller.post_category_delete_get);

// POST request to delete post category.
router.post('/post_category/:id/delete', post_category_controller.post_category_delete_post);

// GET request to update post category.
router.get('/post_category/:id/update', post_category_controller.post_category_update_get);

// POST request to update post category.
router.post('/post_category/:id/update', post_category_controller.post_category_update_post);


// GET request for list of all post category.
router.get('/post_category_list', post_category_controller.post_category_list);


/// ACCOUNT ROUTES ///

// GET request for creating a account. NOTE This must come before route that displays post (uses id).
router.get('/account/create', account_controller.account_create_get);

//POST request for creating account.
router.post('/account/create', account_controller.account_create_post);

// GET request to delete account.
router.get('/account/:id/delete', account_controller.account_delete_get);

// POST request to delete account.
router.post('/account/:id/delete', account_controller.account_delete_post);

// GET request to update account.
router.get('/account/:id/update', account_controller.account_update_get);

// POST request to update account.
router.post('/account/:id/update', account_controller.account_update_post);

// GET request for one account.
router.get('/account/:id', account_controller.account_detail);

// GET request for list of all account.
router.get('/accounts', account_controller.account_list);

module.exports = router;
