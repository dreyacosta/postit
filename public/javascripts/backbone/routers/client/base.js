Postit.Routers.ClientRouter = Backbone.Router.extend({
    routes: {
        "": "home",
        ":id": "article"
    },

    initialize: function(app) {
        console.log('Initialize Client Router');

        this.articles = app.articles;
        this.users = app.users;

        app.$el = $('#sidebar');
        this.sidebarView = new Postit.Views.Sidebar(app);
        this.sidebarView.render();

        Postit.articles.on('add', function(article) {
            app.model = article;
            
            if (app.state == "articles") {
                var articleView = new Postit.Views.Model(app);
                articleView.render().$el.prependTo('#articles');
            }
        });
    },

    reset: function() {
        console.log('Router reset views');

        if (this.articleView) {
            this.articleView.destroy();
            delete this.articleView;
        }

        if (this.articleExtendedView) {
            this.articleExtendedView.destroy();
            delete this.articleExtendedView;
        }

        $('#articles').html('');
    },

    home: function() {
        console.log('Router home');

        this.reset();
        app.state = "articles";
        
        if (!this.articleView) {
            console.log('Creating articleView');

            app.state = "articles";

            this.articles.each(function(article){
                app.model = article;
                var articleView = new Postit.Views.Model(app);
                articleView.render().$el.appendTo('#articles');
            });
        }
    },

    article: function(id) {
        console.log('Router article', id);

        app.state = "articleExtended";

        var model = this.articles.find(function(article) {
            return article.get('slug') === id;
        });

        app.model = model;

        var articleExtendedView = new Postit.Views.Model(app);
        $('#articles').html(articleExtendedView.render().el);
    }
});