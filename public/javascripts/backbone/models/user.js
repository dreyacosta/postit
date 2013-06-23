Postit.Models.User = Backbone.Model.extend({
    idAttribute: "_id",
    attributes: {},
    urlRoot:"/users"
});

Postit.Collections.Users = Backbone.Collection.extend({
    url: "/users",

    model: Postit.Models.Article,

    name: "users",

    initialize: function() {
        if (this.size() === 0) {
            this.fetch();
        }
    }
});