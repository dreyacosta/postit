module.exports = function(app, config, post, user, pass, functions) {
	
	/*******************
	 * Admin home page
	 *******************/

	app.get(config.url.admin.index, function (req, res) {
		res.render('admin/index', {
			title: 'Administration | ' + config.blogName,
			description: 'Blogio admin page',
			session: req.session,
			config: config
		});
	});

	// Login form
	
	app.post(config.url.admin.index, function(req, res) {
		var username = req.param('user');
		var password = req.param('pass');

		functions.getUserByUsername(username, function (user) {
			if (user) {
				pass.hash(password, user.salt, function(err, hash){
					if (user.pass == hash) {
						req.session.regenerate(function(){
							req.session.username = user.username;
							res.redirect('back');
						});
					}
				});
			}
		});
	});

};