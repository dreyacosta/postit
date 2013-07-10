module.exports = function(app, db) {
    return {
        getUsers: function (callback) {
            db.User.find(function (err, users) {
                if (users.length > 0) {
                    callback(users);
                } else {
                    callback(null);
                }
            });
        },

        getUserById: function (id, callback) {
            db.User.findOne({_id: id}, function (err, user) {
                if (user) {
                    callback(user);
                } else {
                    callback(null);
                }
            });
        },

        getUserByUsername: function (username, callback) {
            db.User.findOne({username: username}, function (err, user) {
                if (user) {
                    callback(user);
                } else {
                    callback(null);
                }
            });
        },

        getPostById: function (id, callback) {
            db.Article.findOne({_id: id}, function (err, post) {
                if (post) {
                    callback(post);
                } else {
                    callback(post);
                }
            });
        },

        getPostBySlug: function (slug, callback) {
            db.Article.findOne({slug: slug}, function (err, post) {
                if (post) {
                    callback(post);
                } else {
                    callback(post);
                }
            });
        },

        getPostByTitleId: function (titleId, callback) {
            db.Article.findOne({titleId: titleId}, function (err, post) {
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
            db.Article.find().sort('-postDate').find(function (err, posts) {
                callback(posts);
            });
        },

        getPostByDateP: function (callback) {
            var publishPosts = [];
            db.Article.find().sort('postDate').find(function (err, posts) {
                posts.forEach(function(thisPost) {
                    if (thisPost.state === "Publish") {
                        publishPosts.push(thisPost);
                    }
                });
                callback(publishPosts);
            });
        },

        getPostByCategory: function (category, callback) {
            db.Article.find({category: category}).sort('-postDate').exec(function (err, posts) {
                if (posts) {
                    callback(posts);
                } else {
                    console.log('No post found');
                }
            });
        },

        getCategories: function (callback) {
            db.Article.find().distinct('category', function (err, categories) {
                callback(categories);
            });
        },

        getPostByTag: function (regex, callback) {
            db.Article.find().sort('-postDate').where('tags').regex(regex).exec(function (err, posts) {
                if (posts) {
                    callback(posts);
                } else {
                    console.log('No post found');
                }
            });
        }
    };
};