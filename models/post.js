var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    created_p: {type: Date, default: Date.now},
    content_p: {type: String, required: true},
    exchange_condition: {type: String, default: ""},
    poster: {type: Schema.ObjectId, ref: "User", required: true},
    post_category:[{type: Schema.ObjectId, ref: "PostCategory", required: true}],
    post_folower: [{type: Schema.ObjectId, ref: "User"}]
});

//Virtual for post's url
PostSchema.virtual("url").get(function () {
    return "/catalog/post/" + this._id;
});

//Export model
module.exports = mongoose.model("Post", PostSchema);