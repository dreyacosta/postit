Postit.Views.Edition = Backbone.View.extend({
    events: {
        "click button": "save",
        "keyup h2": "slugGenerate"
    },

    initialize: function(app) {
        var self = this;
        
        this.state = app.state;
        this.model = app.model;

        this.model.on('change', function() {
            self.render();
        });
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
        console.log('Saving article...');

        var model = this.model;

        var title = this.$el.find('[data-label="title"]').html();
        var slug = this.$el.find('[data-label="slug"]').html();
        var category = this.$el.find('[data-label="category"]').html();
        var tags = this.$el.find('[data-label="tags"]').html();
        var content = this.$el.find('[data-label="content"]').html();

        console.log('Some data: ' + title + slug + content);

        model.set({
            title : title,
            slug : slug,
            category : category,
            tags : tags,
            content : content
        });

        var xhr = model.save();

        xhr.done(function(data){
            console.log('Article saved');
        });
    },

    render: function() {
        var self = this;

        this.$el.empty();
        
        var locals ={
            model: this.model.toJSON()
        };

        if (this.state == "articles") {
            $.get("/templates/admin/articleEdition.html", function(html) {
                var template = _.template(html);
                $(self.el).html(template(locals));
            });
        }

        if (this.state == "users") {
            $.get("/templates/admin/userEdition.html", function(html) {
                var template = _.template(html);
                $(self.el).html(template(locals));
            });
        }

        return this;
    }
});