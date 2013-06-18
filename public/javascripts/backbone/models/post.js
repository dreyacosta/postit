Postit.Models.Article = Backbone.Model.extend({
    idAttribute: "_id",
    attributes: {},
    urlRoot:"/articles"
});

Postit.Collections.Articles = Backbone.Collection.extend({
    model: Postit.Models.Article,
    name: "articles"
});