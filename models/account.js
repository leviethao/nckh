var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AccountSchema = new Schema({
    loginname: {type: String, required: true},
    password: {type: String, required: true},
    user: {type: Schema.ObjectId, ref: "User", required: true}
});

//Virtual for account's url
AccountSchema.virtual("url").get(function () {
    return "/catalog/account/" + this._id;
});

//Export model
module.exports = mongoose.model("Account", AccountSchema);