module.exports = function(app, config, post, user, pass, functions) {

    /***************************
     * Socket.io events
     ***************************/

    app.io.route('getUser', function (req, res) {
        var username = req.data;

        functions.getUserByUsername(username, function (user) {
            if (user) {
                req.io.emit('getUser', 'exist');
            } else {
                req.io.emit('getUser', 'notexist');
            }
        });
    });

    app.io.route('postEdition', function (req, res) {
        req.io.broadcast('postEdition', req.data);
        req.io.broadcast('message', '<div class="bck b_yellow_light text center bold color c_yellow">' + req.session.username + ' is editing ' + req.data.title + ' post.</div>');
    });

    app.io.route('updateArticle', function (req, res) {
        var id = req.data.id;
        var content = req.data.content;
        content = content.replace(/<script>/gi, "");
        content = content.replace(/<\/script>/gi, "");

        var postTags = req.data.tags;

        var tags = postTags.split(",");
        var temp = [];

        for (var i in tags) {
            var thisTag = tags[i].replace(/^\s+/, "");
            thisTag = thisTag.replace(/\s+$/, "");
            temp.push(thisTag);
        }

        functions.getPostByDate(function (posts) {
            var flag = 0;
            posts.forEach(function (post) {
                if (post.titleId == req.data.slug && post._id != id) {
                    req.io.emit('message', '<div class="bck b_red_light text center bold color c_red">The post SLUG exist. Change it ;-)</div>');
                    flag = 1;
                }
            });
            if (flag === 0) {
                functions.getPostById(id, function (post) {
                    if(post) {
                        post.titleId = req.data.slug;
                        post.title = req.data.title;
                        post.category = req.data.category;
                        post.tags = temp;
                        post.content = content;

                        post.save();

                        req.io.broadcast('refreshArticle', post);
                        req.io.emit('message', '<div class="bck b_green_light text center bold color c_green">Saved</div>');
                    }
                });
            }
        });
    });

    app.io.route('updateUser', function (req, res) {
        var username = req.data.username;

        functions.getUserByUsername(username, function (user) {
            if (user) {
                user.fullName = req.data.fullName;
                user.email = req.data.email;
                user.accountState = req.data.accountState;
                user.role = req.data.role;

                user.save();

                req.io.emit('message', '<div class="bck b_green_light text center bold color c_green">Saved</div>');
            }
        });
    });

};