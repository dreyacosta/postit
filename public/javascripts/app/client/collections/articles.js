Postit.Collections.Articles = Backbone.Collection.extend({
    url: "/articlespublished",

    model: Postit.Models.Article,

    name: "articles",

    initialize: function() {
        var self = this;
        if (this.size() === 0) {
            this.fetch();
            console.log('Articles fetch');
        }
    }
});