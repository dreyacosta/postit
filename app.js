var express = require('express.io'),
    mongoose = require('mongoose'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    pass = require('pwd'),
    app = express().http().io();

// Blog config

var config = require('./routes/admin/config');

app.configure(function() {
    app.set('port', process.env.PORT || 3001);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'monkey'}));
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(function(req,res){
        res.render('404', {
            title: '404 Page not found',
            description: '404 Page not found'
        });
    });
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

mongoose.connect('mongodb://localhost/' + config.blogDbName);

var userSchema = mongoose.Schema({
    username: String,
    fullName: String,
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
var user = mongoose.model('user', userSchema);

var postSchema = mongoose.Schema({
    title: String,
    titleId: String,
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
    comments: String,
    username: String
});
var post = mongoose.model('post', postSchema);


// Global functions

var functions = require('./routes/functions')(app, post, user, pass);

// Routes socket.io

require('./routes/socketio')(app, config, post, user, pass, functions);
require('./routes/register')(app, config, post, user, pass, functions);

// Routes admin panel

require('./routes/admin/index')(app, config, post, user, pass, functions);
require('./routes/admin/posts')(app, config, post, user, pass, functions);
require('./routes/admin/users')(app, config, post, user, pass, functions);
require('./routes/admin/categories')(app, config, post, user, pass, functions);

// Routes blog

require('./routes/index')(app, config, post, user, pass, functions);
require('./routes/post')(app, config, post, user, pass, functions);
require('./routes/archive')(app, config, post, user, pass, functions);


app.listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});