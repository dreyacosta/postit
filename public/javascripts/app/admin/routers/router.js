Postit.Routers.AdminRouter = Backbone.Router.extend({
    routes: {
        "articles/new": "newArticle",
        "articles/:id": "articleEdition",
        "users/:id": "userEdition"
    },

    initialize: function() {
        console.log('Initializing router...');

        this.sidebarView = new Postit.Views.Sidebar({el: $('#sidebar')});
        this.sidebarView.showArticles();
    },

    newArticle: function() {
        console.log('Router newArticle');

        this.newArticle = new Postit.Views.NewArticle();
        $('#container').html(this.newArticle.render().el);
    },

    articleEdition: function(id) {
        console.log('Router articleEdition');

        app.state = "articles";

        var article = app.articles.find(function(article) {
            return article.get('_id') === id;
        });

        if (!article) {
            console.log('Article not found');
            return;
        }

        app.model = article;

        this.articleEditionView = new Postit.Views.Edition();
        $('#container').html(this.articleEditionView.render().el);
        $('textarea').autosize();

        $('html').attr('class', 'isContent');
    },

    userEdition: function(id) {
        console.log('Router userEdition');

        var user = app.users.find(function(user) {
            return user.get('_id') === id;
        });

        if (!user) {
            console.log('User not found');
            return;
        }

        app.model = user;

        this.userEditionView = new Postit.Views.Edition(app);
        $('#container').html(this.userEditionView.render().el);

        $('html').attr('class', 'isContent');
    }
});