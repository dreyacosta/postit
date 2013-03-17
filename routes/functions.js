module.exports = function(app, post, user, blogConfig, pass) {

	return {
		getUsers: function (callback) {
			user.find(function (err, users) {
				if (err) {
					console.log('Users not found');
					callback(null);
				} else {
					callback(users);
				}
			});
		},
		getUserById: function (id, callback) {
			user.findOne({_id: id}, function (err, user) {
				if (user) {
					callback(user);
				} else {
					callback(null);
				}
			});
		},
		getUserByUsername: function (username, callback) {
			user.findOne({username: username}, function (err, user) {
				if (user) {
					callback(user);
				} else {
					callback(null);
				}
			});
		},
		getPostById: function (id, callback) {
			post.findOne({_id: id}, function (err, post) {
				if (post) {
					callback(post);
				} else {
					callback(post);
				}
			});
		},
		getPostByTitleId: function (titleId, callback) {
			post.findOne({titleId: titleId}, function (err, post) {
				if (post) {
					callback(post);
				} else {
					console.log('Post not kkk found');
					callback(null);
				}
			});
		},
		getPostByDate: function (callback) {
			var convertPosts = [];
			post.find().sort('-postDate').find(function (err, posts) {
				posts.forEach(function (thisPost) {
					var date = new Date(thisPost.postDate);
					date = date.toDateString();
					var temp = {
						_id: thisPost._id,
						title: thisPost.title,
						titleId: thisPost.titleId,
						tags: thisPost.tags,
						content: thisPost.content,
						category: thisPost.category,
						username: thisPost.username,
						postDate: date
					}
					convertPosts.push(temp);
				});
				callback(convertPosts);
			});
		},
		getPostByCategory: function (category, callback) {
			post.find({category: category}).sort('-postDate').exec(function (err, posts) {
				if (posts) {
					callback(posts);
				} else {
					console.log('No post found');
				}
			});
		},
		getCategories: function (callback) {
			post.find().distinct('category', function (err, categories) {
				callback(categories);
			});
		},
		getPostByTag: function (regex, callback) {
			post.find().sort('-postDate').where('tags').regex(regex).exec(function (err, posts) {
				if (posts) {
					callback(posts);
				} else {
					console.log('No post found');
				}
			});
		}
	}

};