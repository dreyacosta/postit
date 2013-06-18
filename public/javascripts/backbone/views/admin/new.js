Postit.Views.New = Backbone.View.extend({
    events: {
        "click button": "save",
        "keyup h2": "slugGenerate"
    },

    initialize: function() {
        
    },

    destroy: function(){
        this.remove();
        this.unbind();
    },

    slugGenerate: function() {
        var title = this.$el.find('[data-label="title"]').html();

        title = title.replace(/[^\w\s]/g, '');
        title = title.replace(/\s/gi, "-");
        title = title.toLowerCase();

        this.$el.find('[data-label="slug"]').html(title);
    },

    save: function() {
        console.log('Saving new article...');

        var self = this;

        var title = this.$el.find('[data-label="title"]').html();
        var slug = this.$el.find('[data-label="slug"]').html();
        var category = this.$el.find('[data-label="category"]').html();
        var tags = this.$el.find('[data-label="tags"]').html();
        var content = this.$el.find('[data-label="content"]').html();

        console.log('Some data: ' + title + slug + content);

        var model = new Postit.Models.Article({
            title : title,
            slug : slug,
            category : category,
            tags : tags,
            content : content
        });

        var xhr = model.save();

        xhr.done(function(data){
            console.log('New article saved');

            self.render();
        });
    },

    render: function() {
        var self = this;

        this.$el.empty();

        $.get("/templates/admin/articleNew.html", function(html) {
            var template = _.template(html);
            $(self.el).html(template());
        });
        
        return this;
    }
});