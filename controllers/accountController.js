var Account = require("../models/account");
var User = require("../models/user");

var async = require("async");
var {body, validationResult} = require("express-validator/check");
var {sanitizeBody} = require("express-validator/filter");


//Dislay list of all account
exports.account_list = function (req, res) {

}

//Dislay detail page for a specific account.
exports.account_detail = function (req, res, next) {
    Account.findById(req.params.id)
    .exec(function (err, account) {
        if (err) return next(err);
        res.render("account_detail", {account: account});
    });
}

//Dislay account create form GET
exports.account_create_get = function (req, res) {
    res.render("account_create_get", {title: "Tạo tài khoản mới"});
}

//Handle account create on POST
exports.account_create_post = [
    //Validate fields
    body("username").isLength({min: 1}).trim().withMessage("Tên người dùng không được để trống"),

    body("loginname").isLength({min: 1}).trim().withMessage("Tên đăng nhập không được để trống")
    .isAlphanumeric().withMessage("Tên đăng nhập phải là các ký tự chữ hoặc số"),

    body("password").isLength({min: 6}).trim().withMessage("Mật khẩu tối thiểu 6 ký tự").isAlphanumeric().withMessage("Mật khẩu phải là các ký tự chữ hoặc số"),

    //Sanitize fields
    sanitizeBody("username").trim().escape(),
    sanitizeBody("loginname").trim().escape(),
    sanitizeBody("password").trim().escape(),

    //Process request after validation and sanitization
    (req, res, next) => {
        //Extract the validation errors from request
        const errors = validationResult(req);

        //Create user object with escaped and trimmed data.
        var user = new User({
            name: req.body.username
        });

        //Create account object with escaped and trimmed data.
        var account = new Account({
            loginname: req.body.loginname,
            password: req.body.password,
            user: user._id
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized value/error message
            res.render("account_create_post", {title: "Tạo tài khoản mới", account: account, user: user, errors: errors.array()});
        }
        else {
            //Data from form is valid
            user.save(function (err) {
                if (err) {return next(err);}
                //successful
                account.save(function (err) {
                    if (err) {return next(err);}
                    //successful - redirect to new account record
                    res.render("create_account_success", {title: "Tạo tài khoản mới"});
                });
            });
        }
    }
];

//Dislay account delete form on GET
exports.account_delete_get = function (req, res) {

}

//Handle account delete on POST
exports.account_delete_post = function (req, res) {

}

//Dislay account update form on GET
exports.account_update_get = function (req, res) {

}

//Handle account update on POST
exports.account_update_post = function (req, res) {
    
}