Postit.Collections.Articles = Backbone.Collection.extend({
    url: "/articles",

    model: Postit.Models.Article,

    name: "articles",

    initialize: function() {

    }
});