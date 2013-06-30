Postit.Views.Edition = Backbone.View.extend({
    className: "bck b_white padding_medium",

    events: {
        "click button[data-role='update']": "update",
        "click button[data-role='draft']": "draft",
        "click button[data-role='delete']": "delete",
        "keyup h2": "slugGenerate",
        "click #back": "back"
    },

    initialize: function() {
        var self = this;

        this.state = app.state;
        this.model = app.model;

        this.model.on('change', function() {
            console.log("model change");
            self.render();
        });

        this.model.on('remove', function() {
            console.log("model self destroy");
            self.destroy();
        });
    },

    delete: function() {
        this.model.destroy();
    },

    back: function() {
        Backbone.history.navigate('', {trigger: true});
        $('html').attr('class', 'isList');
    },

    slugGenerate: function() {
        var title = this.$el.find('[data-label="title"]').html();

        title = title.replace(/[^\w\s]/g, '');
        title = title.replace(/\s/gi, "-");
        title = title.replace(/nbsp/gi, "-");
        title = title.toLowerCase();

        this.$el.find('[data-label="slug"]').html(title);
    },

    draft: function() {
        console.log('Saving draft...');

        this.postState = "Draft";
        this.save();
    },

    update: function() {
        console.log('Saving update...');

        this.postState = "Publish";
        this.save();
    },

    save: function() {
        console.log('Saving article...');

        var model = this.model;

        var title = this.$el.find('[data-label="title"]').html();
        var slug = this.$el.find('[data-label="slug"]').html();
        var category = this.$el.find('[data-label="category"]').html();
        var tags = this.$el.find('[data-label="tags"]').html();
        var content = this.$el.find('[data-label="content"]').val();

        content = html5editor.linebreaksToParagraphs(content);

        content = content.replace(/<script>.*<\/script>/gi, "");

        model.set({
            title : title,
            slug : slug,
            category : category,
            tags : tags,
            content : content,
            state : this.postState
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
            var article = self.model.toJSON();

            var previewVal = article.content;

            previewVal = previewVal.replace(/<p>/g, '');
            previewVal = previewVal.replace(/<\/p>/g, '\n\n');

            previewVal = previewVal.trim();

            locals.article = previewVal;

            $(self.el).html(app.templates.articleEdition(locals));
        }

        if (this.state == "users") {
            $(self.el).html(app.templates.userEdition(locals));
        }

        return this;
    }
});