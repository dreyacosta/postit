var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/blogio', function(err) {
    if (err) throw err;
});

var userSchema = mongoose.Schema({
    uid: String,
    username: String,
    fullName: String,
    provider: String,
    image: String,
    role: {
        type: String,
        default: 'user'
    },
    email: String,
    registerDate: {
        type: Date,
        default: Date.now
    },
    accountState: {
        type: String,
        default: 'waiting'
    },
    pass: String,
    salt: String
});

var articleSchema = mongoose.Schema({
    title: String,
    slug: String,
    category: {
        type: String,
        default: 'No category'
    },
    content: String,
    postDate: {
        type: Date,
        default: Date.now
    },
    postDescription: String,
    tags: Array,
    state: String,
    views: {
        type: Number,
        default: 0
    },
    comments: String,
    author: Object
});

module.exports = {
    User: mongoose.model('user', userSchema),
    Article: mongoose.model('article', articleSchema)
};