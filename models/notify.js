var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var NotifySchema = new Schema({
    user: {type: Schema.ObjectId, ref: "User", required: true},
    notify_content: {type: String, required: true},
    created: {type: Date, default: Date.now}
});

//Virtual for notify's url
NotifySchema.virtual("url").get(function () {
    return "catalog/notify/" + this._id;
});

//Export model
module.exports = mongoose.model("Notify", NotifySchema);