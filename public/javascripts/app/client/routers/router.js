Postit.Routers.ClientRouter = Backbone.Router.extend({
    routes: {
        "": "home",
        ":id": "articlePage"
    },

    initialize: function() {
        console.log('Initializing router...');
    },

    home: function() {
        console.log('Router home');

        app.state = "articles";

        this.articlesView = new Postit.Views.Articles({collection: app.articles});
        MyApp.articles.show(this.articlesView);

        this.sidebarView = new Postit.Views.Sidebar();
        MyApp.sidebar.show(this.sidebarView);
    },

    articlePage: function(id) {
        console.log('Router articlePage', id);

        app.state = "articlePage";

        var article = app.articles.find(function(article2) {
            return article2.get('slug') === id;
        });

        this.articleView = new Postit.Views.Article({model: article});
        MyApp.articles.show(this.articleView);

        article.save();
    }
});