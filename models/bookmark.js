const {mongoose} = require('../server/server'),
    timestamp = require('mongoose-timestamp');


const BookmarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required : true,
        trim: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    }
},{collection: 'Bookmark'});


BookmarkSchema.plugin(timestamp);


module.exports = {
    Bookmark: mongoose.model('Bookmark',BookmarkSchema)
};