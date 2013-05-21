module.exports = function(app, config, post, user, pass, functions) {

    app.get('/register', function (req, res) {
        functions.getUsers(function (users) {
            if (req.session.username || !users) {
                res.render('register', { title: 'User registration | ' + config.blogName,
                    description: 'User register',
                    session: req.session,
                    config: config
                });
                req.session.msg = '';
            } else if (users) {
                console.log(users);
                res.redirect('/');
            }
        });
    });

    app.post(config.url.create.user, function (req, res) {
        var username = req.param('username');
        var fullName = req.param('fullName');
        var email = req.param('email');
        var group = req.param('group');
        var password = req.param('pass');
        var confirmPass = req.param('confirmPass');

        var thisUser = new user();

        functions.getUserByUsername(username, function (user) {
            if (user) {
                req.session.msg = 'Username already exists';
                res.redirect(config.url.admin.users);
            } else {
                if (password == confirmPass) {
                    pass.hash(password, function(err, salt, hash){
                        thisUser.salt = salt;
                        thisUser.pass = hash;

                        thisUser.username = username;
                        thisUser.fullName = fullName;
                        thisUser.email = email;
                        thisUser.role = group;

                        thisUser.save();
                    
                        req.session.msg = 'Complete registration';
                        res.redirect(config.url.admin.users);
                    });
                }
            }
        });
    });
};