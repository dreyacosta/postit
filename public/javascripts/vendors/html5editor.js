var html5editor = (function() {
    this.editor = document.querySelector("[data-html5editor-role='editor']");
    this.preview = document.querySelector("[data-html5editor-role='preview']");
    this.styles = Array.prototype.slice.call(document.querySelectorAll("[data-html5editor-tagName]"));

    this.styles.forEach(function(style) {
        style.addEventListener('click', function() {
            var tagName = this.getAttribute("data-html5editor-tagName");
            var className = this.getAttribute("data-html5editor-className");

            if (className) {
                addStyle(tagName, className);
            } else {
                addStyle(tagName);
            }
        });
    });

    this.editor.addEventListener('keyup', function() {
        html5editor.linebreaksToParagraphs(html5editor.editor.value);
    });

    var addStyle = function(tagName) {
        var className = arguments[1];

        var editorVal = html5editor.editor.value;

        var selected_txt = editorVal.substring(html5editor.editor.selectionStart, html5editor.editor.selectionEnd);
            
        var before_txt = editorVal.substring(0, html5editor.editor.selectionStart);
        var after_txt = editorVal.substring(html5editor.editor.selectionEnd, editorVal.length);
            
        if (className) {
            html5editor.editor.value = before_txt + '<' + tagName + ' class="' + className + '">' + selected_txt + '</' + tagName + '>' + after_txt;
        } else {
            html5editor.editor.value = before_txt + '<' + tagName + '>' + selected_txt + '</' + tagName + '>' + after_txt;
        }

        html5editor.linebreaksToParagraphs(html5editor.editor.value);
    }

    return {
        editor: this.editor,
        preview: this.preview,
        linebreaksToParagraphs: function(editorVal) {
            var formattedContent = "";
            var paragraphs = html5editor.editor.value.split('\n');

            for (var i in paragraphs) {
                if (paragraphs[i]) {
                    paragraphs[i] = '<p>' + paragraphs[i] + '</p>';
                    formattedContent = formattedContent + paragraphs[i];
                }
            }

            html5editor.preview.innerHTML = formattedContent;
            return formattedContent;
        },
        onLoadFormat: function(dbValue) {
            var previewVal = dbValue;
            
            previewVal = previewVal.replace(/<p>/g, '');
            previewVal = previewVal.replace(/<\/p>/g, '\n\n');

            previewVal = previewVal.trim();
            return previewVal;
        }
    }
})();