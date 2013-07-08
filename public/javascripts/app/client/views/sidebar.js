Postit.Views.Sidebar = Backbone.Marionette.CompositeView.extend({
    events: {

    },

    itemView: "",

    itemViewContainer: "",

    template: function(){
        return app.templates.sidebar();
    },

    onRender: function() {
        this.$el.find('[data-link="admin"]').attr('href', app.config.url.admin);
    }
});