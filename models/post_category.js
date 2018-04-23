var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PostCategorySchema = new Schema({
    name: {type: String, required: true}
});

//Export model
module.exports = mongoose.model("PostCategory", PostCategorySchema);