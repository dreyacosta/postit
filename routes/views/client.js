module.exports = function(app, config, query) {
    
    if (config.public.url.blog === "") {
        homeURL = "/";
    } else {
        homeURL = config.public.url.blog;
    }

    app.get(homeURL, function(req, res) {
        console.log(req.user);

        res.render('client/index', {
            user: req.user,
            env: config.env,
            config: config.public,
            data: {
                title: config.public.blogName,
                description: config.public.blogDescription
            }
        });
    });

    app.get(config.public.url.blog + '/:id', function(req, res) {
        console.log(req.user);
        
        query.getPostBySlug(req.params.id, function(article) {
            res.render('client/index', {
                user: req.user,
                env: config.env,
                config: config.public,
                data: article
            });
        });
    });

    app.get(config.public.url.blog + '/category/:id', function(req, res) {
        console.log(req.user);

        res.render('client/index', {
            user: req.user,
            env: config.env,
            config: config.public,
            data: {
                title: config.public.blogName,
                description: config.public.blogDescription
            }
        });
    });
};