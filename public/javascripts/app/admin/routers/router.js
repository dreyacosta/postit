Postit.Routers.AdminRouter = Backbone.Router.extend({
    routes: {
        "": "home",
        "articles/new": "newArticle",
        "articles/:id": "articleEdition",
        "users/:id": "userEdition"
    },

    initialize: function() {
        console.log('Initializing router...');

        this.sidebarView = new Postit.Views.Sidebar({el: $('#sidebar')});
        this.sidebarView.showArticles();
    },

    home: function() {
        $('#container').html('');
    },

    newArticle: function() {
        console.log('Router newArticle');

        this.newArticle = new Postit.Views.NewArticle();
        $('#container').html(this.newArticle.render().el);

        $('textarea').autosize();

        html5editor({
            editor: "data-html5editor-role='editor'",
            preview: "data-html5editor-role='preview'",
            tagName: "data-html5editor-tagName",
            className: "data-html5editor-className"
        });
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

        html5editor({
            editor: "data-html5editor-role='editor'",
            preview: "data-html5editor-role='preview'",
            tagName: "data-html5editor-tagName",
            className: "data-html5editor-className"
        });

        $('html').attr('class', 'isContent');
    },

    userEdition: function(id) {
        console.log('Router userEdition');

        app.state = "users";

        this.sidebarView = new Postit.Views.Sidebar({el: $('#sidebar')});
        this.sidebarView.showUsers();

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