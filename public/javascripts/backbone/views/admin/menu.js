Postit.Views.Menu = Backbone.View.extend({
    className: 'flex text center color c_white',

    events: {
        "click [data-link=index]": "home",
        "click [data-link=articles]": "showArticles",
        "click [data-link=users]": "showUsers"
    },

    initialize: function() {
        
    },

    home: function() {
        console.log('Navigate to /admin');
        Backbone.history.navigate('', {trigger: true});
    },

    showArticles: function() {
        console.log('Navigate to /articles');
        
        Backbone.history.navigate('articles', {trigger: true});
    },

    showUsers: function() {
        console.log('Navigate to /users');
        
        Backbone.history.navigate('users', {trigger: true});
    },

    render: function() {
        console.log('Render Menu');

        var self = this;

        $.get("/templates/admin/menu.html", function(html) {
            var template = _.template(html);
            $(self.el).html(template());
        });
        
        return this;
    }
});