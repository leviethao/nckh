var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    gender: {type: String},
    avatar: {type: String, default: "default avatar link"},
    date_of_birth: {type: Date},
    address: {type: String},
    phone_number: {type: String}
});

//Virtual for user's url
UserSchema.virtual("url").get(function () {
    return "/catalog/user/" + this._id;
});

//Export model
module.exports = mongoose.model("User", UserSchema);