module.exports = function(app, config, post, user, pass, functions) {
    
    app.get(config.url.blog.post + '/:titleid', function (req, res) {
        var titleId = req.param('titleid');

        functions.getPostByTitleId(titleId, function (post) {
            if (post) {
                functions.getCategories(function (categories) {
                    if (categories) {
                        res.render('post', {
                            title: post.title,
                            description: post.postDescription,
                            session: req.session,
                            post: post,
                            categories: categories,
                            config: config
                        });
                    }
                });
            } else {
                res.render('404', {
                    title: '404 Page not found',
                    description: '404 Page not found'
                });
            }
        });
    });

};