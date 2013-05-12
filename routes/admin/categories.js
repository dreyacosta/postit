module.exports = function(app, config, post, user, pass, functions) {

    /*****************************
     * Categories administration
     *****************************/

    app.get(config.url.admin.categories, function (req, res) {
        functions.getCategories(function (categories) {
            res.render('admin/categories', {
                title: 'Administration articles | ' + config.blogName,
                description: 'Admin categories',
                session: req.session,
                categories: categories,
                config: config
            });
            req.session.msg = '';
        });
    });

    app.post(config.url.admin.categories, function (req, res) {
        var category = req.param('category');
        var newCategory = req.param('newCategory');

        functions.getPostByCategory(category, function (posts) {
            posts.forEach(function (post) {
                post.category = newCategory;
                post.save();
                req.session.msg = 'Category name changed';
                res.redirect(config.url.admin.categories);
            });
        });
    });

};