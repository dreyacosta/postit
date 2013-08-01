module.exports = function(app, config, db, passport, TwitterStrategy) {
    passport.use(new TwitterStrategy({
            consumerKey: config.twitter.consumerKey,
            consumerSecret: config.twitter.consumerSecret,
            callbackURL: config.domain.host + ":" + config.domain.port + config.public.url.authTwitterCallback
        },

        function(token, tokenSecret, profile, done) {
            console.log(profile);
            db.User.findOne({uid: profile.id}, function(err, user) {

                if(user) {
                    done(null, user);
                } else {
                    var newUser = new db.User();

                    newUser.uid = profile.id;
                    newUser.username = profile.username;
                    newUser.fullName = profile.displayName;
                    newUser.image = profile._json.profile_image_url;
                    newUser.provider = 'twitter';
                    newUser.save(function(err) {
                        if(err) { throw err; }
                        done(null, newUser);
                    });
                    io.sockets.emit('users::create', newUser);
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

    app.get(config.public.url.authTwitter, passport.authenticate('twitter'), function(req, res){
        // The request will be redirected to Twitter for authentication, so this
        // function will not be called.
        console.log(req.user.username);
    });

    app.get(config.public.url.authTwitterCallback, passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
        res.redirect(config.domain.host + ":" + config.domain.port + config.public.url.admin);
    });
};