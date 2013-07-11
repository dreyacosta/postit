Postit.Views.Article = Backbone.Marionette.ItemView.extend({
    tagName: "article",

    events: {
        "click [data-label='category']": "goToCategory",
        "click [data-label='title']": "articleExtended"
    },

    modelEvents: {
        "change": "render",
        "remove": "remove"
    },

    className: "border solid bottom_small padding_bottom_big margin_bottom_big",

    template: function(model){
        if (app.state === "articles") {
            return app.templates.article(model);
        }

        if (app.state === "articlePage") {
            return app.templates.articlePage(model);
        }
    },

    articleExtended: function(e) {
        e.preventDefault();

        Backbone.history.navigate(this.model.get('slug'), {trigger: true});
    },

    goToCategory: function(e) {
        e.preventDefault();

        Backbone.history.navigate('category/' + this.model.get('category'), {trigger: true});
    },

    onRender: function(){
        jQuery("abbr.timeago").timeago();
    }
});