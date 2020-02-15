const mongoose = require('mongoose');
const BookmarkSchema = mongoose.Schema({
    'user': String,
    'url': String,
    'title': String
});

module.exports = mongoose.model('bookmarks', BookmarkSchema);