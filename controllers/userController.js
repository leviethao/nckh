var User = require("../models/user");

//Dislay list of all user
exports.user_list = function (req, res) {

}

//Dislay detail page for a specific User.
exports.user_detail = function (req, res) {

}

//Dislay User create form GET
exports.user_create_get = function (req, res) {
    res.render("user_create_get_form", {title: "Create new user"});
}

//Handle User create on POST
exports.user_create_post = function (req, res) {

}

//Dislay User delete form on GET
exports.user_delete_get = function (req, res) {

}

//Handle user delete on POST
exports.user_delete_post = function (req, res) {

}

//Dislay user update form on GET
exports.user_update_get = function (req, res) {

}

//Handle user update on POST
exports.user_update_post = function (req, res) {
    
}