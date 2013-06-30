Postit.Views.Articles = Backbone.Marionette.CollectionView.extend({
    itemView: Postit.Views.Article,

    appendHtml: function(collectionView, itemView, index){
        collectionView.$el.prepend(itemView.el);
    },

    onRender: function(){
        jQuery("abbr.timeago").timeago();
    }
});