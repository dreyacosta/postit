Postit.Views.Edition = Backbone.View.extend({
    className: "bck b_white padding_medium",

    events: {
        "click button[data-role='update']": "update",
        "click button[data-role='draft']": "draft",
        "click button[data-role='delete']": "articleDelete",
        "keyup h2": "slugGenerate",
        "click #back": "back"
    },

    initialize: function() {
        var self = this;

        this.state = app.state;
        this.model = app.model;

        this.model.on('change', function() {
            self.render();
        });

        this.model.on('remove', function() {
            self.articleDelete();
        });
    },

    articleDelete: function() {
        this.model.destroy();
        Backbone.history.navigate('', {trigger: true});
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
        this.postState = "Draft";
        this.save();
    },

    update: function() {
        this.postState = "Publish";
        this.save();
    },

    save: function() {
        var model = this.model;

        var title = this.$el.find('[data-label="title"]').html();
        var slug = this.$el.find('[data-label="slug"]').html();
        var category = this.$el.find('[data-label="category"]').html();
        var description = this.$el.find('[data-label="description"]').html();
        var content = this.$el.find('[data-label="content"]').val();

        content = html5editor.lineBreak(content);

        content = content.replace(/<script>.*<\/script>/gi, "");

        model.set({
            title : title,
            slug : slug,
            category : category,
            description : description,
            content : content,
            state : this.postState
        });

        var xhr = model.save();

        xhr.done(function(data){

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

            locals.article = html5editor.onLoadFormat(article.content);

            $(self.el).html(app.templates.articleEdition(locals));

            $('textarea').autosize();
        }

        if (this.state == "users") {
            $(self.el).html(app.templates.userEdition(locals));
        }

        html5editor({
            editor: "data-html5editor-role='editor'",
            preview: "data-html5editor-role='preview'",
            tagName: "data-html5editor-tagName",
            className: "data-html5editor-className"
        });
        
        return this;
    }
});