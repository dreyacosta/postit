Postit.Collections.Users = Backbone.Collection.extend({
    url: "/users",

    model: Postit.Models.User,

    name: "users",

    initialize: function() {

    }
});