$(function() {

    $.get("/templates/admin/userEdition.html", function(html) {
        app.templates.userEdition = _.template(html);
    });

    $.get("/templates/admin/article.html", function(html) {
        app.templates.article = _.template(html);
    });

    $.get("/templates/admin/articleNew.html", function(html) {
        app.templates.articleNew = _.template(html);
    });

    $.get("/templates/admin/menu.html", function(html) {
        app.templates.menu = _.template(html);
    });

    $.get("/templates/admin/menu.html", function(html) {
        app.templates.menu = _.template(html);
    });

    $.get("/templates/admin/user.html", function(html) {
        app.templates.user = _.template(html);
    });

    $.get("/templates/admin/articleEdition.html", function(html) {
        app.templates.articleEdition = _.template(html);
    });

    Postit.articles = new Postit.Collections.Articles;
    Postit.users = new Postit.Collections.Users;

    app.articles = Postit.articles;
    app.users = Postit.users;

    Postit.adminRouter = new Postit.Routers.AdminRouter(app);

    function loadData(callback) {
        var xhrArticles = $.get('/articles');

        xhrArticles.done(function(data){
            console.log('Articles loaded', data);

            data.forEach(function(article){
                Postit.articles.add(article);
            });

            var xhrUsers = $.get('/users');

            xhrUsers.done(function(data){
                console.log('Users loaded', data);

                data.forEach(function(user){
                    Postit.users.add(user);
                });

                callback();
            });

            xhrUsers.fail(function(data) {
                console.log('Users 401');
            });
        });
    }

    loadData(function() {
        Backbone.history.start({
            root : "admin",
            pushState : true,
            silent : false
        });
    });

    // Sockets events

    socket.on('notifications', function(data) {
        console.log('notifications ' + data);
        $('#notifications').html(data);

        setTimeout(function() {
            $('#notifications').html('<strong>Notifications</strong>');
        }, 5000);
    });

    socket.on('articles::create', function(data) {
        console.log('Articles::create ' + data);
        Postit.articles.add(data);
    });

    socket.on('users::create', function(data) {
        console.log('Users::create ' + data);
        Postit.users.add(data);
    });

    socket.on('articles::update', function(data) {
        var item = Postit.articles.find(function(item){
            return item.get('_id') === data._id;
        });

        if(!item){
            return;
        }

        item.set(data);
    });
    
});

var socket = io.connect();