module.exports = function(app, config, passport) {
    app.get(config.public.url.admin, function(req, res) {
        console.log(req.user);

        res.render('admin/index', {
            title: 'Postit admin',
            env: config.env,
            session: req.user
        });
    });

    app.get(config.public.url.admin + config.public.api.articles, function(req, res) {
        console.log(req.user);

        res.render('admin/index', {
            title: 'Postit admin',
            env: config.env,
            session: req.user
        });
    });

    app.get(config.public.url.admin + config.public.api.articles + '/:id', function(req, res) {
        console.log(req.user);

        res.render('admin/index', {
            title: 'Postit admin',
            env: config.env,
            session: req.user
        });
    });

    app.get(config.public.url.admin + config.public.api.users, function(req, res) {
        console.log(req.user);
        
        res.render('admin/index', {
            title: 'Postit admin',
            env: config.env,
            session: req.user
        });
    });

    app.get(config.public.url.admin + config.public.api.users + '/:id', function(req, res) {
        console.log(req.user);
        
        res.render('admin/index', {
            title: 'Postit admin',
            env: config.env,
            session: req.user
        });
    });
};