var html5editor = function(config) {

    var editor = document.querySelector("[" + config.editor + "]");
    var preview = document.querySelector("[" + config.preview + "]");
    var tagName = Array.prototype.slice.call(document.querySelectorAll("[" + config.tagName + "]"));

    if (!editor) {
        console.log('You need to define and editor');
        return;
    }

    if (tagName) {

        tagName.forEach(function(style) {

            style.addEventListener('click', function() {

                var tagName = this.getAttribute(config.tagName);
                var className = this.getAttribute(config.className);

                if (className) {
                    addStyle(tagName, className);
                } else {
                    addStyle(tagName);
                }

            });

        });

    }
    
    var addStyle = function(tagName) {

        var className = arguments[1];

        var editorVal = editor.value;

        var selected_txt = editorVal.substring(editor.selectionStart, editor.selectionEnd);
            
        var before_txt = editorVal.substring(0, editor.selectionStart);
        var after_txt = editorVal.substring(editor.selectionEnd, editorVal.length);
            
        if (className) {
            editor.value = before_txt + '<' + tagName + ' class="' + className + '">' + selected_txt + '</' + tagName + '>' + after_txt;
        } else {
            editor.value = before_txt + '<' + tagName + '>' + selected_txt + '</' + tagName + '>' + after_txt;
        }

        var formattedContent = html5editor.lineBreak(editor.value);

        if (preview) {
            preview.innerHTML = formattedContent;
        }

    }

    editor.addEventListener('keyup', function() {
        var formattedContent = html5editor.lineBreak(editor.value);

        if (preview) {
            preview.innerHTML = formattedContent;
        }
    });

};

html5editor.lineBreak = function(text) {

    var formattedContent = "";
    var paragraphs = text.split('\n');

    for (var i in paragraphs) {
        if (paragraphs[i]) {
            paragraphs[i] = '<p>' + paragraphs[i] + '</p>';
            formattedContent = formattedContent + paragraphs[i];
        }
    }

    return formattedContent;

}

html5editor.onLoadFormat = function(dbValue) {

    var previewVal = dbValue;
    
    previewVal = previewVal.replace(/<p>/g, '');
    previewVal = previewVal.replace(/<\/p>/g, '\n\n');
    previewVal = previewVal.trim();

    return previewVal;

}