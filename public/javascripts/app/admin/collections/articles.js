Postit.Collections.Articles = Backbone.Collection.extend({
    url: function() {
        return this.url;
    },

    model: Postit.Models.Article,

    name: "articles",

    initialize: function() {
        this.url = app.config.api.articles;
    }
});