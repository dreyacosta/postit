module.exports = function(app, config, post, user, pass, functions) {

    /**************************
     * Users administration
     **************************/

    app.get(config.url.admin.users, function (req, res) {
        functions.getUsers(function (users) {
            res.render('admin/users', {
                title: 'Users administration | ' + config.blogName,
                description: 'Users page',
                session: req.session,
                users: users,
                config: config
            });
        });
    });

    // New user

    app.get(config.url.create.user, function (req, res) {
        functions.getUsers(function (users) {
            res.render('admin/new_user', {
                title: 'New user | ' + config.blogName,
                description: 'Users page',
                session: req.session,
                users: users,
                config: config
            });
        });
    });

    // Edit user

    app.get(config.url.edit.user + '/:id', function (req, res) {
        var id = req.param('id');

        functions.getUserById(id, function (user) {
            res.send(user);

            // res.render('admin/edit_user', {
            //     title: 'User edition | ' + config.blogName,
            //     description: 'Users page',
            //     session: req.session,
            //     user: user,
            //     config: config
            // });
        });
    });

    // Remove user

    app.post(config.url.remove.user, function (req, res) {
        var id = req.param('id');

        if (req.session.username) {
            functions.getUserById(id, function (user) {
                user.remove();
                res.redirect(config.url.admin.users);
            });
        } else {
            res.redirect(config.url.admin.users);
        }
    });

};