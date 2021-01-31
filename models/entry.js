const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
    video_link: {
        type: String,
        required: false
    }
}, { timestamps: true});

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry;