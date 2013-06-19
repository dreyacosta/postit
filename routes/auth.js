module.exports = function(app, db, passport, TwitterStrategy) {
    passport.use(new TwitterStrategy({
            consumerKey: 'wV2KPmz9q0TrgpBBQMmw',
            consumerSecret: 'd8fbireax06EDCuM0VTd9QTKUb3jHwlUUpzkMHLzPQc',
            callbackURL: "/auth/twitter/callback"
        },
      
        function(token, tokenSecret, profile, done) {
            console.log(profile);
            db.User.findOne({uid: profile.id}, function(err, user) {
            
                if(user) {
                    done(null, user);
                } else {
                    var user = new db.User();
                    
                    user.uid = profile.id;
                    user.username = profile.username;
                    user.fullName = profile.displayName;
                    user.image = profile._json.profile_image_url;
                    user.provider = 'Twitter';
                    user.save(function(err) {
                        if(err) { throw err; }
                        done(null, user);
                    });
                    io.sockets.emit('users::create', user);
                }
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.uid);
    });

    passport.deserializeUser(function(uid, done) {
        db.User.findOne({uid: uid}, function (err, user) {
            done(err, user);
        });
    });

    app.get('/auth/twitter', passport.authenticate('twitter'), function(req, res){
        // The request will be redirected to Twitter for authentication, so this
        // function will not be called.
        console.log(req.user.username);
    });

    app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
        res.redirect('back');
    });
}