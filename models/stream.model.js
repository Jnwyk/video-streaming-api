const mongoose = require('mongoose')
const { Schema } = mongoose

const streamSchema = new Schema({
    title: { type: String, required: [true, "Title is required"] },
    category: { type: String, required: [true, "Category is required"] },
    url: { type: String, required: [true, "Category is required"] }
},
{
    timestamps: true
});

module.exports = mongoose.model("Stream", streamSchema);