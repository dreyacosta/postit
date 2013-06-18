Postit.Views.Model = Backbone.View.extend({
    events: {
        "click div": "back",
        "click h2": "article"
    },

    initialize: function(app) {
        var self = this;

        this.state = app.state;
        this.model = app.model;

        this.model.on('change', function() {
            self.render();
        });
    },

    destroy: function(){
        this.remove();
        this.unbind();
    },

    article: function() {
        console.log('Navigate to /articles/id');
        Backbone.history.navigate(this.model.get('slug'), {trigger: true});
    },

    back: function() {
        Backbone.history.navigate('', {trigger: true});
    },

    render: function() {
        console.log('Render model');

        var self = this;

        var article = this.model.toJSON();
        article.content = article.content.replace(/<.*?>/g,' ');

        var extract = article.content.substring(0,255) + "...";

        var locals ={
            model: this.model.toJSON(),
            extract: extract
        };

        if (this.state == "articles") {
            $.get("/templates/client/article.html", function(html) {
                var template = _.template(html);
                $(self.el).html(template(locals));
            });
        }

        if (this.state == "articleExtended") {
            $.get("/templates/client/articleExtended.html", function(html) {
                var template = _.template(html);
                $(self.el).html(template(locals));
            });
        }

        return this;
    }
});