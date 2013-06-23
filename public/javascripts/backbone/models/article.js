Postit.Models.Article = Backbone.Model.extend({
    idAttribute: "_id",
    attributes: {},
    urlRoot:app.url
});

Postit.Collections.Articles = Backbone.Collection.extend({
    url: "/articles",

    model: Postit.Models.Article,

    name: "articles",

    initialize: function() {
        if (this.size() === 0) {
            this.fetch();
        }
    }
});