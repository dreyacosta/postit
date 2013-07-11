MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
    articles: "#articles",
    sidebar: "#sidebar"
});

MyApp.on("initialize:before", function(){
    console.log('Starting app...');
});

MyApp.on("initialize:after", function(){
    console.log('After app started');

    app.clientRouter = new Postit.Routers.ClientRouter();

    Backbone.history.start({
        root : app.config.url.blog,
        pushState : true,
        silent : false
    });
});

var getTemplates = function(templates) {
    var dTemplates = Q.defer();

    var deferreds = [];

    $.each(templates, function(index, view) {
        deferreds.push($.get('/templates/client/' + view + '.html', function(data) {
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
        console.log(data);
        dConfig.resolve();
    });

    return dConfig.promise;
};

var getCollections = function() {
    var dCollections = Q.defer();

    app.articles = new Postit.Collections.Articles();

    var xhr = $.get(app.config.api.articlesPublished);

    xhr.done(function(data) {
        data.forEach(function(article) {
            app.articles.add(article);
        });
        dCollections.resolve();
    });

    return dCollections.promise;
};

$(function() {
    var templates = ['article', 'articlePage', 'sidebar'];

    getTemplates(templates)
        .then(function() {
            return getConfig();
        })
        .then(function() {
            return getCollections();
        })
        .then(function() {
            MyApp.start();
            console.log('App started!');
        });

    // Sockets events

    socket.on('articles::create', function(data) {
        console.log('Articles::create ' + data);

        // data.postDate = jQuery.timeago(data.postDate);

        if (data.state === "Publish") {
            app.articles.add(data);
        }
    });

    socket.on('articles::update', function(data) {
        console.log('Article update', data);

        // data.postDate = jQuery.timeago(data.postDate);

        var item = app.articles.find(function(item){
            return item.get('_id') === data._id;
        });

        if(!item){
            app.articles.add(data, {at: app.articles.length - 2});
            return;
        }

        console.log(data.state);

        if (data.state === "Draft") {
            app.articles.remove(item);
            return;
        }

        item.set(data);
    });

    socket.on('articles::remove', function(data) {
        console.log('Socket on remove', data);
        app.articles.fetch();
    });
});

var socket = io.connect();