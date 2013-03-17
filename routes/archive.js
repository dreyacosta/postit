module.exports = function(app, config, post, user, pass, functions) {
	
	app.get('/tag/:id', function (req, res) {
		var tag = req.param('id');
		var re = new RegExp(tag, 'i');
		
		functions.getPostByTag(re, function (posts) {
			if (posts) {
				functions.getCategories(function (categories) {
					res.render('archive', {
						title: tag,
						description: 'Post by tag ' + tag,
						session: req.session,
						posts: posts,
						categories: categories,
						config: config
					});
				});
			}
		});
	});

	app.get('/category/:id', function (req, res) {
		var category = req.param('id');
		
		functions.getPostByCategory(category, function (posts) {
			if (posts) {
				functions.getCategories(function (categories) {
					res.render('archive', {
						title: category,
						description: 'Post by category ' + category,
						session: req.session,
						posts: posts,
						categories: categories,
						config: config
					});
				});
			}
		});
	});

};