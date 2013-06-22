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
        console.log('Initialize admin router', app);

        // this.articles = app.articles;
        // this.users = app.users;

        if (!this.menuView) {
            app.$el = $('#menu');

            this.menuView = new Postit.Views.Menu(app);
            // this.menuView.render().$el.appendTo('#sidebar');
        }

        // Postit.articles.on('add', function(article) {
        //     console.log('Router add collection');
        //     app.model = article;
        //     app.state = "articles";

        //     var articleView = new Postit.Views.Model(app);
        //     articleView.render().$el.prependTo('#articles');

        //     app.state = '';
        // });
    },
 
    reset: function(){
        console.log('Router reset', app);

        if (this.articlesView) {
            console.log('articlesView exist');

            this.articlesView.destroy();
            delete this.articlesView;
        }

        if (this.usersView) {
            console.log('usersView exist');

            this.usersView.destroy();
            delete this.usersView;
        }

        if (this.newArticleView) {
            console.log('newArticleView exist');

            this.newArticleView.destroy();
            delete this.newArticleView;
        }

        // if (this.newArticleView) {
        //     this.newArticleView.destroy();
        //     delete this.newArticleView;
        // }

        // if (this.articleEditionView) {
        //     this.articleEditionView.destroy();
        //     delete this.articleEditionView;
        // }

        // if (this.addUserView) {
        //     this.addUserView.destroy();
        //     delete this.addUserView;
        // }

        // if (this.userEditionView) {
        //     this.userEditionView.destroy();
        //     delete this.userEditionView;
        // }

        // $('[data-role="addButton"]').html('');
    },
    
    showArticles: function() {
        console.log('Router showArticles', app);

        
        
        if (app.state != "articles") {
            this.reset();

            app.state = "articles";
            app.$el = $('#articles');

            this.articlesView = new Postit.Views.Collection(app);
        }

        $('html').attr('class', 'isList');

        // if (app.state != "articles") {
        //     this.reset();
        //     app.state = "articles";

        //     this.articles.each(function(article){
        //         app.model = article;

        //         var articleView = new Postit.Views.Model(app);
        //         articleView.render().$el.appendTo('#articles');
        //     });

        //     app.$el = $('[data-role="addButton"]');

        //     this.addArticleView = new Postit.Views.Add(app);
        //     this.addArticleView.render().$el;
        // }

        // var byCategory = this.articles.where({category: "Demo"});

        // for (var article in byCategory) {
        //     console.log(byCategory[article].toJSON());
        // }
    },

    newArticle: function () {
        console.log('Router newArticle', app);

        

        this.showArticles();

        this.newArticleView = new Postit.Views.New();
        $('#container').html(this.newArticleView.render().el);

        $('html').attr('class', 'isContent');

        // if (app.state != "articles") {
        //     this.reset();
        //     this.showArticles();
        //     app.state = "articles";
        // }

        // app.state = "articles";

        // this.newArticleView = new Postit.Views.New();
        // $('#container').html(this.newArticleView.render().el);
    },

    article: function(id) {
        console.log('Router article', app, id);

        

        this.showArticles();

        var article = app.articles.find(function(article) {
            return article.get('_id') === id;
        });

        if (!article) {
            console.log('Article not found');
            return;
        }

        app.model = article;
        this.articleEditionView = new Postit.Views.Edition(app);
        $('#container').html(this.articleEditionView.render().el);

        $('html').attr('class', 'isContent');

        // if (app.state != "articles") {
        //     this.reset();
        //     this.showArticles();
        //     app.state = "articles";
        // }

        // var model = this.articles.find(function(article) {
        //     return article.get('_id') === id;
        // });

        // if (!model) {
        //     console.log('Article not found');
        //     return;
        // }

        // app.model = model;

        // this.articleEditionView = new Postit.Views.Edition(app);
        // $('#container').html(this.articleEditionView.render().el);
    },

    showUsers: function() {
        console.log('Router showUsers', app);

        if (app.state != "users") {
            this.reset();

            app.state = "users";
            app.$el = $('#articles');

            this.usersView = new Postit.Views.Collection(app);
        }
        

        // if (app.state != "users") {
        //     this.reset();
        //     app.state = "users";
        // }

        // this.users.each(function(user){ 
        //     app.model = user;

        //     var userView = new Postit.Views.Model(app);
        //     userView.render().$el.appendTo('#articles');
        // });

        // Postit.users.on('add', function(user) {
        //     app.model = user;
        //     app.state = "articles";

        //     var userView = new Postit.Views.Model(app);
        //     userView.render().$el.prependTo('#articles');
        // });
        
    },

    user: function(id) {
        console.log('Router user', id);

        

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

        // if (app.state != "users") {
        //     this.reset();
        //     app.state = "users";
        // }

        // var model = this.users.find(function(user) {
        //     return user.get('_id') === id;
        // });

        // if (!model) {
        //     console.log('User not found');
        //     return;
        // }

        // app.model = model;

        // this.userEditionView = new Postit.Views.Edition(app);
        // $('#container').html(this.userEditionView.render().el);
    }
});