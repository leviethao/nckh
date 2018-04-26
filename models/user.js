var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    gender: {type: String, default: "Nam"},
    avatar: {type: String, default: "/images/avatar.png"},
    date_of_birth: {type: Date, default: new Date(1997, 12, 17)},
    address: {type: String, default: ""},
    phone_number: {type: String, default: ""}
});

//Virtual for user's url
UserSchema.virtual("url").get(function () {
    return "/catalog/user/" + this._id;
});

//Export model
module.exports = mongoose.model("User", UserSchema);