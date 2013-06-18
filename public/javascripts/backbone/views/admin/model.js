Postit.Views.Model = Backbone.View.extend({
    events: {
        "click div": "edition"
    },

    initialize: function(app) {
        var self = this;

        this.state = app.state;
        this.model = app.model;

        this.model.on('change', function() {
            self.render();
        });
    },

    edition: function() {
        if (this.state == "articles") {
            console.log('Navigate to /articles/id');
            Backbone.history.navigate('articles/' + this.model.get('_id'), {trigger: true});
        }

        if (this.state == "users") {
            console.log('Navigate to /users/id');
            Backbone.history.navigate('users/' + this.model.get('_id'), {trigger: true});
        }
    },

    render: function() {
        var self = this;

        var locals ={
            model: this.model.toJSON()
        };

        if (this.state == "articles") {
            $.get("/templates/admin/article.html", function(html) {
                var template = _.template(html);
                $(self.el).html(template(locals));
            });
        }

        if (this.state == "users") {
            $.get("/templates/admin/user.html", function(html) {
                var template = _.template(html);
                $(self.el).html(template(locals));
            });
        }

        return this;
    }
});