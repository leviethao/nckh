var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
    content_cm: {type: String, required: true},
    created_cm: {type: Date, required: true, default: Date.now},
    comment_user: {type: Schema.ObjectId, ref: "User", required: true},
    in_post: {type: Schema.ObjectId, ref: "Post", required: true}
});

//Export model
module.exports = mongoose.model("Comment", CommentSchema);