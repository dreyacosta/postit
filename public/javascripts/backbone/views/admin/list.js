Postit.Views.List = Backbone.View.extend({
    id: 'articles',
    tagName: 'section',
    className: 'scroll',

    initialize: function() {

    },

    destroy: function(){
        this.remove();
        this.unbind();
    },

    render: function() {
        var self = this;

        this.$el.empty();

        $(self.el).append();
        
        return this;
    }
});