Postit.Models.User = Backbone.Model.extend({
    urlRoot: function() {
        return this.urlRoot;
    },

    idAttribute: "_id",
    
    attributes: {},

    initialize: function() {
        this.urlRoot = app.config.api.users;
    }
});