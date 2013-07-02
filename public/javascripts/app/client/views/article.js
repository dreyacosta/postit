Postit.Views.Article = Backbone.Marionette.ItemView.extend({
    tagName: "article",

    events: {
        "click a": "articleExtended"
    },

    modelEvents: {
        "change": "render",
        "remove": "remove"
    },

    className: "border solid bottom_small padding_bottom_big margin_bottom_big",

    template: function(model){
        if (app.state === "articles") {
            console.log('Article template articles');
            return app.templates.article(model);
        }

        if (app.state === "articlePage") {
            console.log('Article template articlePage');
            return app.templates.articlePage(model);
        }
    },

    articleExtended: function(e) {
        console.log('articleExtended');

        e.preventDefault();
        Backbone.history.navigate(this.model.get('slug'), {trigger: true});
    },

    onRender: function(){
        console.log('onRender');

        jQuery("abbr.timeago").timeago();
    }
});