const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, minlength: 1, maxlength: 300 },
    likes: { type: Number, min: 0, default: 0 },
}, { timestamps: true })

const postModel = mongoose.model("Post", postSchema)

module.exports = postModel