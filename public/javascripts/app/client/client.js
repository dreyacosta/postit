var appConfig = new $.Deferred();

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
        root : "",
        pushState : true,
        silent : false
    });
});

var getTemplates = function(templates, callback) {
    var deferreds = [];

    $.each(templates, function(index, view) {
        deferreds.push($.get('/templates/client/' + view + '.html', function(data) {
            app.templates[view] = _.template(data);
        }, 'html'));
    });

    $.when.apply(null, deferreds).done(callback);
};

var getCollections = function() {
    app.articles = new Postit.Collections.Articles();

    $.when(app.articles.fetch()).done(function() {
        appConfig.resolve();
    });
};

$(function() {
    var templates = ['article', 'articlePage'];

    getTemplates(templates, getCollections);

    appConfig.done(function() {
        MyApp.start();
        console.log('App started!');
    });

    // Sockets events

    socket.on('articles::create', function(data) {
        console.log('Articles::create ' + data);

        // data.postDate = jQuery.timeago(data.postDate);

        app.articles.add(data, {at: 0});
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