Postit.Views.Sidebar = Backbone.View.extend({
    events: {
        "click h4": "test"
    },

    initialize: function(app) {
        var self = this;

        this.$el = app.$el;

        this.state = app.state;
    },

    test: function() {
        console.log('Click h4');
    },

    destroy: function(){
        this.remove();
        this.unbind();
    },

    render: function() {
        console.log('Render sidebar');

        var self = this;
        
        $.get("/templates/client/sidebar.html", function(html) {
            var template = _.template(html);
            self.$el.html(template());
        });

        return this;
    }
});