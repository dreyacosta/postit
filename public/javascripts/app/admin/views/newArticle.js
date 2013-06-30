Postit.Views.NewArticle = Backbone.View.extend({
    className: "bck b_white padding_medium",

    events: {
        "click button": "save",
        "keyup input[data-label='title']": "slugGenerate",
        "click #back": "back"
    },

    initialize: function() {

    },

    destroy: function(){
        this.remove();
        this.unbind();
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

    save: function() {
        console.log('Saving new article...');

        var self = this;

        var title = this.$el.find('[data-label="title"]').val();
        var slug = this.$el.find('[data-label="slug"]').html();
        var category = this.$el.find('[data-label="category"]').val();
        var tags = this.$el.find('[data-label="tags"]').val();
        var content = this.$el.find('[data-label="content"]').val();

        var state = "Publish";

        content = html5editor.linebreaksToParagraphs(content);

        content = content.replace(/<script>.*<\/script>/gi, "");

        var model = new Postit.Models.Article({
            title : title,
            slug : slug,
            category : category,
            tags : tags,
            state : state,
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

        $(self.el).html(app.templates.articleNew());

        return this;
    }
});