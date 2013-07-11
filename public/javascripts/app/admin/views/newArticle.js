Postit.Views.NewArticle = Backbone.View.extend({
    className: "bck b_white padding_medium",

    events: {
        "click button[data-role='publish']": "publish",
        "click button[data-role='draft']": "draft",
        "keyup input[data-label='title']": "slugGenerate",
        "click #back": "back"
    },

    initialize: function() {

    },

    back: function() {
        Backbone.history.navigate('articles', {trigger: true});
    },

    slugGenerate: function() {
        var title = this.$el.find('input[data-label="title"]').val();

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

    publish: function() {
        this.postState = "Publish";
        this.save();
    },

    save: function() {
        var self = this;

        var title = this.$el.find('[data-label="title"]').val();
        var slug = this.$el.find('[data-label="slug"]').html();
        var category = this.$el.find('[data-label="category"]').val();
        var description = this.$el.find('[data-label="description"]').val();
        var content = this.$el.find('[data-label="content"]').val();

        content = html5editor.lineBreak(content);

        title = title.replace(/<script>.*<\/script>/gi, "");
        category = category.replace(/<script>.*<\/script>/gi, "");
        description = description.replace(/<script>.*<\/script>/gi, "");
        content = content.replace(/<script>.*<\/script>/gi, "");

        var model = new Postit.Models.Article({
            title : title,
            slug : slug,
            category : category,
            description : description,
            state : this.postState,
            content : content
        });

        var xhr = model.save();

        xhr.done(function(data){
            self.render();
        });
    },

    render: function() {
        var self = this;

        this.$el.empty();

        $(self.el).html(app.templates.articleNew());

        html5editor({
            editor: "data-html5editor-role='editor'",
            preview: "data-html5editor-role='preview'",
            tagName: "data-html5editor-tagName",
            className: "data-html5editor-className"
        });

        return this;
    }
});