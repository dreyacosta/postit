var express         = require('express'),
    passport        = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    db              = require('./routes/mongodb/schemas'),
    path            = require('path');

var app             = express();
    server          = require('http').createServer(app),
    io              = require('socket.io').listen(server);

var query           = require('./routes/functions')(app, db);

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'monkey'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

require('./routes/api/articles')(app, db, query);
require('./routes/api/users')(app, db, query);
require('./routes/views/client')(app);
require('./routes/views/admin')(app, passport);
require('./routes/auth')(app, db, passport, TwitterStrategy);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});