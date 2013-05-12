module.exports = function(app, config, post, user, pass, functions) {
    
    app.get(config.url.blogHome, function (req, res) {
        functions.getPostByDate(function (posts) {
            if (posts) {
                functions.getCategories(function (categories) {
                    if (categories) {
                        res.render('index', {
                            title: config.blogName,
                            description: config.blogDescription,
                            session: req.session,
                            posts: posts,
                            categories: categories,
                            config: config
                        });
                    }
                });
            }
        });
    });

};