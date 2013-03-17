module.exports = function(app, config, post, user, pass, functions) {

	/**************************
	 * Posts administration
	 **************************/

	// Get page

	app.get(config.url.admin.posts, function (req, res) {
		functions.getPostByDate(function (posts) {
			res.render('admin/posts', {
				title: 'Posts administration | ' + config.blogName,
				description: 'Posts page',
				session: req.session,
				posts: posts,
				config: config
			});
			req.session.msg = '';
		});		
	});

	// New post

	app.get(config.url.create.post, function (req, res) {
		functions.getPostByDate(function (posts) {
			res.render('admin/new_post', {
				title: 'New post | ' + config.blogName,
				description: 'Posts page',
				session: req.session,
				posts: posts,
				config: config
			});
			req.session.msg = '';
		});		
	});

	// Save new post

	app.post(config.url.admin.posts, function (req, res) {
		var titleId = req.param('titleId');
		var thisPost = new post();

		var tags = req.param('tags').split(",");
		var temp = [];

		for (var i in tags) {
			var thisTag = tags[i].replace(/^\s+/, "");
			thisTag = thisTag.replace(/\s+$/, "");
			temp.push(thisTag);
		}

		functions.getPostByTitleId(titleId, function (post) {
			if (post) {
				req.session.msg = 'El ID está ocupado';
				res.redirect(config.url.admin.posts);
			} else {
				thisPost.title = req.param('title');
				thisPost.titleId = req.param('titleId');
				thisPost.category = req.param('category');
				thisPost.tags = temp;
				thisPost.postDescription = req.param('description');

				var content = req.param('content');
				content = content.replace(/<script>/gi, "");
				content = content.replace(/<\/script>/gi, "");

				// var paragraph = content.split('\r\n');
				// content = "";

				// for(i = 0; i < paragraph.length; i++){
				// 	paragraph[i] = ('<p>' + paragraph[i] + '</p>');
				// 	content = (content + paragraph[i]);
				// }

				thisPost.content = content;
				thisPost.username = req.session.username;
				thisPost.save();

				// Real time post published @ home page
				req.io.broadcast('newArticle', thisPost);

				req.session.msg = 'Post publicado';

				res.redirect(config.url.admin.posts);
			}
		});
	});

	// Edit post

	app.get(config.url.edit.post + '/:id', function (req, res) {
		var id = req.param('id');

		functions.getPostById(id, function (post) {
			res.render('admin/edit_post', {
				title: 'Edit posts | ' + config.blogName,
				description: 'Posts page',
				session: req.session,
				post: post,
				config: config
			});
		});
	});

	// Remove post

	app.get(config.url.remove.post + '/:id', function (req, res) {
		var id = req.param('id');

		if (req.session.username) {
			functions.getPostById(id, function (post) {
				req.io.broadcast('removePost', post);
				post.remove();

				req.session.msg = 'Post borrado';
				res.redirect(config.url.admin.posts);
			});
		} else {
			res.redirect(config.url.admin.index);
		}
	});

};