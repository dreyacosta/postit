MyApp = new Backbone.Marionette.Application();

MyApp.on("initialize:after", function(){
    app.adminRouter = new Postit.Routers.AdminRouter();

    Backbone.history.start({
        root : app.config.url.admin,
        pushState : true,
        silent : false
    });
});

var getTemplates = function(templates, callback) {
    var dTemplates = Q.defer();

    var deferreds = [];

    $.each(templates, function(index, view) {
        deferreds.push($.get('/templates/admin/' + view + '.html', function(data) {
            app.templates[view] = _.template(data);
        }, 'html'));
    });

    $.when.apply(null, deferreds).done(function() {
        dTemplates.resolve();
    });

    return dTemplates.promise;
};

var getConfig = function() {
    var dConfig = Q.defer();

    var xhr = $.get('/postit/config');

    xhr.done(function(data) {
        app.config = data;
        dConfig.resolve();
    });

    return dConfig.promise;
};

var getCollections = function() {
    var dCollections = Q.defer();

    app.articles = new Postit.Collections.Articles();
    app.users = new Postit.Collections.Users();

    $.when(app.articles.fetch(), app.users.fetch()).done(function() {
        dCollections.resolve();
    });

    return dCollections.promise;
};

$(function() {
    var templates = ['article', 'articleEdition', 'articleNew', 'user', 'userEdition', 'sidebar'];

    getTemplates(templates).then(function() {
        return getConfig();
    }).then(function() {
        return getCollections();
    }).then(function() {
        MyApp.start();
    });

    // Sockets events

    socket.on('notifications', function(data) {
        $('#notifications').html(data);

        setTimeout(function() {
            $('#notifications').html('<strong>Notifications</strong>');
        }, 5000);
    });

    socket.on('articles::create', function(data) {
        app.articles.add(data, {at: 0});
    });

    socket.on('users::create', function(data) {
        app.users.add(data);
    });

    socket.on('users::remove', function(data) {
        app.users.fetch();
    });

    socket.on('articles::update', function(data) {
        var item = app.articles.find(function(item){
            return item.get('_id') === data._id;
        });

        if(!item){
            return;
        }

        item.set(data);
    });

    socket.on('articles::remove', function(data) {
        app.articles.fetch();
    });
});

var socket = io.connect();