$(function() {

    Postit.articles = new Postit.Collections.Articles();

    app.articles = Postit.articles;

    Postit.clientRouter = new Postit.Routers.ClientRouter(app);

    var xhr = $.get('/articles');

    xhr.done(function(articles){
        console.log(articles);

        articles.forEach(function(article){
            Postit.articles.add(article);
        });

        Backbone.history.start({
            root : "",
            pushState : true,
            silent : false
        });
    });

    socket.on('articles::create', function(data) {
        console.log('Articles::create ' + data);
        Postit.articles.add(data, {at: 0});
    });

    socket.on('articles::update', function(data) {
        var item = Postit.articles.find(function(item){
            return item.get('_id') === data._id;
        });

        // Item could have been removed before
        if(!item){
            return;
        }

        item.set(data);
    });
    
});

var socket = io.connect();