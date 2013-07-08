Postit.Collections.Users = Backbone.Collection.extend({
    url: function() {
        return this.url;
    },

    model: Postit.Models.User,

    name: "users",

    initialize: function() {
        this.url = app.config.api.users;
    }
});