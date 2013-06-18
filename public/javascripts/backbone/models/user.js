Postit.Models.User = Backbone.Model.extend({
    idAttribute: "_id",
    attributes: {},
    urlRoot:"/users"
});

Postit.Collections.Users = Backbone.Collection.extend({
    model: Postit.Models.Article,
    name: "users"
});