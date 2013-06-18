Postit.Routers.AdminRouter = Backbone.Router.extend({
    routes: {
        "": "reset",
        "articles": "showArticles",
        "articles/new": "newArticle",
        "articles/:id": "article",
        "users": "showUsers",
        "users/:id": "user"
    },

    initialize: function(app) {
        this.articles = app.articles;
        this.users = app.users;

        if (!this.menuView) {
            this.menuView = new Postit.Views.Menu();
            this.menuView.render().$el.appendTo('#sidebar');
        }

        Postit.articles.on('add', function(article) {
            app.model = article;
            app.state = "articles";

            var articleView = new Postit.Views.Model(app);
            articleView.render().$el.prependTo('#articles');
        });
    },
 
    reset: function(){
        console.log('Router homeAdmin');

        if (this.addArticleView) {
            this.addArticleView.destroy();
            delete this.addArticleView;
        }

        if (this.articlesListView) {
            this.articlesListView.destroy();
            delete this.articlesListView;
        }
        
        if (this.newArticleView) {
            this.newArticleView.destroy();
            delete this.newArticleView;
        }

        if (this.articleEditionView) {
            this.articleEditionView.destroy();
            delete this.articleEditionView;
        }

        if (this.addUserView) {
            this.addUserView.destroy();
            delete this.addUserView;
        }

        if (this.userListView) {
            this.userListView.destroy();
            delete this.userListView;
        }

        if (this.userEditionView) {
            this.userEditionView.destroy();
            delete this.userEditionView;
        }
    },
    
    showArticles: function() {
        console.log('Router showArticles');

        if (app.state != "articles") {
            this.reset();
            app.state = "articles";
        }

        if (!this.addArticleView) {
            this.addArticleView = new Postit.Views.Add(app);
            this.addArticleView.render().$el.appendTo('#sidebar');
        }

        if (!this.articlesListView) {
            this.articlesListView = new Postit.Views.List();
            this.articlesListView.render().$el.appendTo('#sidebar');

            this.articles.each(function(article){
                app.model = article;

                var articleView = new Postit.Views.Model(app);
                articleView.render().$el.appendTo('#articles');
            });
        }
    },

    newArticle: function () {
        console.log('Router newArticle');

        if (app.state != "articles") {
            this.reset();
            this.showArticles();
            app.state = "articles";
        }

        app.state = "articles";

        this.newArticleView = new Postit.Views.New();
        $('#container').html(this.newArticleView.render().el);
    },

    article: function(id) {
        console.log('Router article ' + id);

        if (app.state != "articles") {
            this.reset();
            this.showArticles();
            app.state = "articles";
        }

        var model = this.articles.find(function(article) {
            return article.get('_id') === id;
        });

        if (!model) {
            console.log('Article not found');
            return;
        }

        app.model = model;

        this.articleEditionView = new Postit.Views.Edition(app);
        $('#container').html(this.articleEditionView.render().el);
    },

    showUsers: function() {
        console.log('Router showUsers');

        if (app.state != "users") {
            this.reset();
            app.state = "users";
        }

        if (!this.userListView) {
            this.userListView = new Postit.Views.List(app);
            this.userListView.render().$el.appendTo('#sidebar');

            this.users.each(function(user){ 
                app.model = user;

                var userView = new Postit.Views.Model(app);
                userView.render().$el.appendTo('#articles');
            });
        }

        Postit.users.on('add', function(user) {
            app.model = user;
            app.state = "articles";

            var userView = new Postit.Views.Model(app);
            userView.render().$el.prependTo('#articles');
        });
    },

    user: function(id) {
        console.log('Router user ' + id);

        if (app.state != "users") {
            this.reset();
            app.state = "users";
        }

        var model = this.users.find(function(user) {
            return user.get('_id') === id;
        });

        if (!model) {
            console.log('User not found');
            return;
        }

        app.model = model;

        this.userEditionView = new Postit.Views.Edition(app);
        $('#container').html(this.userEditionView.render().el);
    }
});