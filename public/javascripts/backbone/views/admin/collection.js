Postit.Views.Collection = Backbone.View.extend({
    events: {

    },

    initialize: function(app) {
        console.log('Initialize Collection View', app);

        var self = this;

        this.$el = app.$el;
        this.articles = app.articles;
        this.users = app.users;

        this.articles.on('add', function(article) {
            app.model = article;
            var articleView = new Postit.Views.Model(app);
            self.$el.prepend(articleView.render().el);
        });

        this.render();
    },

    destroy: function(){
        this.$el.html('');
        $('[data-role="addButton"]').html('');
        this.unbind();
    },

    render: function() {
        console.log('Render View Collection');

        var self = this;

        if (app.state == "articles") {
            console.log('Articles');

            app.$el = $('[data-role="addButton"]');
            var addButtonView = new Postit.Views.Add(app);
            addButtonView.render().el;

            this.articles.each(function(article) {
                console.log('Render article', article);
                app.model = article;

                var articleView = new Postit.Views.Model(app);
                self.$el.append(articleView.render().el);
            });
        }

        if (app.state == "users") {
            console.log('Users');

            this.users.each(function(user) {
                console.log('Render user', user);
                app.model = user;

                var userView = new Postit.Views.Model(app);
                self.$el.append(userView.render().el);
            });
        }

        

        

        // var self = this;

        // $.get("/templates/admin/menu.html", function(html) {
        //     var template = _.template(html);
        //     $(self.el).html(template());
        // });
        
        return this;
    }
});