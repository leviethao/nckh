var Post = require('../models/post');
var Account = require("../models/account");
var User = require("../models/account");

var async = require("async");
var {body, validationResult} = require("express-validator/check");
var {sanitizeBody} = require("express-validator/filter");


//Dislay home page
exports.index = function (req, res, next) {
    if (req.isAuthenticated() == false) {
        res.redirect("/login");
        return;
    }

    async.parallel({
        account: function (callback) {
            User.findOne()
            .where("loginname").equals(req.session.passport.user)
            .populate("user")
            .exec(callback);
        },
        posts: function (callback) {
            Post.find()
            .populate("poster")
            .exec(callback)
        }        
    }, function (err, results) {
        if (err) {
            return next(err);
        }

        res.render("index", {title: "Trang chủ", posts: results.posts, user: results.account.user});
    });
}

// Display list of all post.
exports.post_list = function(req, res) {
    res.send('NOT IMPLEMENTED: post list');
};

// Display detail page for a specific post.
exports.post_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: post detail: ' + req.params.id);
};

// Display post create form on GET.
exports.post_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: post create GET');
};

// Handle post create on POST.
exports.post_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post create POST');
};

// Display post delete form on GET.
exports.post_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: post delete GET');
};

// Handle post delete on POST.
exports.post_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post delete POST');
};

// Display post update form on GET.
exports.post_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: post update GET');
};

// Handle post update on POST.
exports.post_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post update POST');
};

exports.post_submit = [
    body("content").isLength({min: 1}).trim().withMessage("Nội dung bài đăng không được để trống"),
    sanitizeBody("content").trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        Account.findOne()
        .where("loginname").equals(req.session.passport.user)
        .populate("user")
        .exec(function (err, account) {
            if (err) {return next(err);}
            if (account != null) {

                let post = new Post({
                    content_p: req.body.content,
                    exchange_condition: req.body.condition,
                    poster: account.user._id,
                    post_category:[],
                    post_folower: [account.user._id]
                });

                if (!errors.isEmpty()) {
                    //There are errors. Render form again with sanitized value/error message
                    //res.render("/catalog", {});
                }
                else {
                    //Data from form is valid
                    post.save(function (err) {
                        if (err) {return next(err);}    
                    });

                    res.redirect("/catalog");
                }
        
            }
        });        
    }
];
