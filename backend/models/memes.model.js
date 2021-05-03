const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memeSchema = new Schema({
    name: {type: String, required: true},
    caption: {type: String, required: true},
    url: {type: String, required:true},
    likeCount: {type: Number, default:0},
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Meme = mongoose.model('meme', memeSchema);

module.exports = Meme;