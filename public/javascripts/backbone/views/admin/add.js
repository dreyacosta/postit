Postit.Views.Add = Backbone.View.extend({
    events: {
        "click div": "new"
    },

    initialize: function(app) {
        this.state = app.state;
    },

    new: function() {
        console.log('Navigate to /articles/new');

        Backbone.history.navigate('articles/new', {trigger: true});
    },

    destroy: function(){
        this.remove();
        this.unbind();
    },

    render: function() {
        var self = this;

        if (this.state == "articles") {
            var locals = {
                buttonText: "Add new article +"
            }
        }

        if (this.state == "users") {
            var locals = {
                buttonText: "Add new user +"
            }        
        }

        $.get("/templates/admin/new.html", function(html) {
            var template = _.template(html);
            $(self.el).html(template(locals));
        });
        
        return this;
    }
});