module.exports = function(app, db, query) {
    app.get('/articles', function(req, res) {
        query.getPostByDate(function(posts) {
            res.send(posts);
        });
    });

    app.post('/articles', function(req, res) {
        console.log('Articles posts');
        console.log(req.body);
        console.log(req.user);

        var newArticle = new db.Article();

        req.body.content = req.body.content.replace(/<script>.*<\/script>/gi, "");

        req.body._id = newArticle._id;

        newArticle.title = req.body.title;
        newArticle.author = req.user.username;
        newArticle.slug = req.body.slug;
        newArticle.category = req.body.category;
        newArticle.tags = req.body.tags;
        newArticle.content = req.body.content;
        newArticle.state = req.body.state;

        newArticle.save();

        io.sockets.emit('articles::create', newArticle);
        io.sockets.emit('notifications', '<div class="bck b_green_light text color c_green padding_small"><div>' + newArticle.title + '</div> created by <strong>' + req.user.username + '</strong></div>');

        res.send(200, {status:"Ok", id: req.body._id});
    });

    app.put('/articles/:id', function(req, res) {
        console.log('Articles put');
        console.log(req.body);
        console.log(req.params.id);

        var id = req.params.id;

        req.body.content = req.body.content.replace(/<script>.*<\/script>/gi, "");
    
        query.getPostById(id, function (article) {
            article.title = req.body.title;
            article.slug = req.body.slug;
            article.category = req.body.category;
            article.tags = req.body.tags;
            article.content = req.body.content;

            article.save();

            io.sockets.emit('articles::update', req.body);
            io.sockets.emit('notifications', '<div class="bck b_green_light text color c_green padding_small"><div>' + article.title + '</div> <strong>updated</strong></div>');

            res.send(200, {status:"Ok"});
        });
    });

    app.delete('/articles/:id', function(req, res) {
        console.log('Articles delete');
        console.log(req.body);
        console.log(req.params.id);

        var id = req.params.id;
    
        query.getPostById(id, function (article) {
            io.sockets.emit('notifications', '<div class="bck b_red_light text color c_red padding_small"><div>' + article.title + '</div> <strong>removed</strong></div>');

            article.remove();

            io.sockets.emit('articles::remove', id);

            res.send(200, {status:"Ok"});
        });
    });
}