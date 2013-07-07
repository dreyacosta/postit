var mongoose    = require('mongoose'),
    config      = require('../config');

mongoose.connect('mongodb://' + config.mongodb.credentials + config.mongodb.host + config.mongodb.port + '/' + config.mongodb.dbName, function(err) {
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
    description: String,
    tags: Array,
    state: String,
    views: {
        type: Number,
        default: 0
    },
    comments: Array,
    author: Object
});

module.exports = {
    User: mongoose.model('user', userSchema),
    Article: mongoose.model('article', articleSchema)
};