var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SearchStorageSchema = new Schema({
    search_user: {type: Schema.ObjectId, ref: "User", required: true},
    search_content: {type: String, required: true},
    created: {type: Date, default: Date.now},
    search_results: [{type: Schema.ObjectId, ref: "Post"}]
});

//Virtual for search storage's url
SearchStorageSchema.virtual("url").get(function () {
    return "/catalog/search_storage/" + this._id;
});

//Export model
module.exports = mongoose.model("SearchStorage", SearchStorageSchema);