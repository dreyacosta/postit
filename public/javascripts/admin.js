function main() {
    $('textarea').autosize();

    var logs = $('[data-label="logs"]');
    var postSelect = $('[data-label="postSelect"]');
    var postit = $('[data-label="postit"]');
    var postForm = $('[data-label="postForm"]');

    var postID = 'data-postid';
    var postTitle = $('[data-label="postTitle"]');
    var postSlug = $('[data-label="postSlug"]');
    var postCategory = $('[data-label="postCategory"]');
    var postTags = $('[data-label="postTags"]');
    var postContent = $('[data-label="postContent"]');

    var addPost = $('[data-role="addPost"]');
    var updatePost = $('[data-role="updatePost"]');
    var removePost = $('[data-role="removePost"]');

    var urls;

    $.ajax({
        type: "GET",
        url: "/config"
    }).done(function(data) {
        urls = data;
    }).fail(function(msg) {
        logs.html("Config can't be loaded");
    });

    postSelect.on('click', function() {
        postForm.addClass('hide_display');
        postit.removeClass('hide_display');

        var id = $(this).attr('id');

        postit.attr(postID, id);

        $.ajax({
            type: "GET",
            url: urls.edit.post + "/" + id
        }).done(function(data) {
            postTitle.html(data.title);
            postSlug.html(data.titleId);
            postCategory.html(data.category);

            var tags = data.tags.join();

            postTags.html(tags);
            postContent.val(data.content).trigger('autosize');
        });
    });

    $("#back").click( function(e){
        $("html").attr("class", "isList");
    });

    addPost.on('click', function() {
        postit.addClass('hide_display');
        postForm.removeClass('hide_display');
    });

    updatePost.on('click', function() {
        var id = postit.attr(postID);

        toSend = {
            id: id,
            title: postTitle.html(),
            slug: postSlug.html(),
            category: postCategory.html(),
            tags: postTags.html(),
            content: postContent.val()
        };

        console.log(toSend);

        $('#' + id).find('h5').html(postTitle.html());

        socket.emit('updateArticle', toSend);
    });

    removePost.on('click', function() {
        var id = postit.attr(postID);

        $.ajax({
            type: "POST",
            url: urls.remove.post,
            data: {id: id}
        }).done(function() {
            postit.addClass('hide_display');
            logs.html('<div class="bck b_red_light text center bold color c_red">Post deleted</div>');
            setTimeout(function() {
                logs.html('<div class="text center bold"><a href="' + urls.blogHome + '">postit</a></div>');
            }, 2000);
        });
    });

    postTitle.on('keyup', function () {
        var title = postTitle.html();
        title = title.replace(/[^\w\s]/g, '');
        title = title.replace(/\s/gi, "-");
        title = title.toLowerCase();

        postSlug.html(title);
    });

    postContent.on('keyup', function() {
        var id = postit.attr(postID);

        toSend = {
            id: id,
            title: postTitle.html(),
            slug: postSlug.html(),
            category: postCategory.html(),
            tags: postTags.html(),
            content: postContent.val()
        };

        socket.emit('postEdition', toSend);
    });

    $('input#title').on('keyup', function () {
        var title = $('#title').val();
        title = title.replace(/[^\w\s]/g, '');
        title = title.replace(/\s/gi, "-");
        title = title.toLowerCase();

        $('#titleId').val(title);
    });

    $('h4#title').on('keyup', function () {
        var title = $('#title').html();
        title = title.replace(/[^\w\s]/g, '');
        title = title.replace(/\s/gi, "-");
        title = title.toLowerCase();

        $('#titleId').html(title);
    });



    var addUser = $('[data-role="addUser"]');
    var updateUser = $('[data-role="updateUser"]');
    var removeUser = $('[data-role="removeUser"]');

    var user = $('[data-label="user"]');
    var userSelect = $('[data-label="userSelect"]');
    var userForm = $('[data-label="userForm"]');

    var userID = 'data-userid';
    var username = $('input[name=username]');
    var fullName = $('input[name=fullName]');
    var email = $('input[name=email]');
    var accountState = $('input[name=accountState]');
    var registerDate = $('input[name=registerDate]');
    var role = $('input[name=role]');

    addUser.on('click', function() {
        username.val('');
        fullName.val('');
        email.val('');
        accountState.val('');
        registerDate.val('');

        user.addClass('hide_display');
        userForm.removeClass('hide_display');
    });

    userSelect.on('click', function() {
        userForm.addClass('hide_display');
        user.removeClass('hide_display');

        var id = $(this).attr('id');

        user.attr(userID, id);

        $.ajax({
            type: "GET",
            url: urls.edit.user + "/" + id
        }).done(function(data) {
            username.val(data.username);
            fullName.val(data.fullName);
            email.val(data.email);
            accountState.val(data.accountState);
            registerDate.val(data.registerDate);
            role.val(data.role);
        });
    });

    updateUser.on('click', function () {
        var id = user.attr(userID);

        var toSend = {
            id: id,
            username: username.val(),
            fullName: fullName.val(),
            email: email.val(),
            accountState: accountState.val(),
            role: role.val()
        };

        console.log(toSend);

        socket.emit('updateUser', toSend);
    });

    removeUser.on('click',function() {
        var id = user.attr(userID);

        if (username.val() == 'postit') {
            logs.html('<div class="bck b_red_light text center bold color c_red">This is a demo</div>');
            setTimeout(function() {
                logs.html('<div class="text center bold"><a href="' + urls.blogHome + '">postit</a></div>');
            }, 2000);
        } else {
            $.ajax({
                type: "POST",
                url: urls.remove.user,
                data: {id: id}
            }).done(function() {
                user.addClass('hide_display');
                $('#' + id).remove();
                logs.html('<div class="bck b_red_light text center bold color c_red">User deleted</div>');
                setTimeout(function() {
                    logs.html('<div class="text center bold"><a href="' + urls.blogHome + '">postit</a></div>');
                }, 2000);
            });
        }
    });


    postSelect.click( function(e){
        $("html").attr("class", "isContent");
    });

    addPost.click( function(e){
        $("html").attr("class", "isContent");
    });

    addUser.click( function(e){
        $("html").attr("class", "isContent");
    });

    userSelect.click( function(e){
        $("html").attr("class", "isContent");
    });

    // Sockets events

    socket.on('postEdition', function(data) {
        $('[data-postid=' + data.id + ']').find('[data-label="postTitle"]').html(data.title);
        $('[data-postid=' + data.id + ']').find('[data-label="postSlug"]').html(data.slug);
        $('[data-postid=' + data.id + ']').find('[data-label="postCategory"]').html(data.category);
        $('[data-postid=' + data.id + ']').find('[data-label="postTags"]').html(data.tags);
        $('[data-postid=' + data.id + ']').find('[data-label="postContent"]').val(data.content).trigger('autosize');
    });

    socket.on('message', function (data) {
        logs.html(data);
        setTimeout(function() {
            logs.html('<div class="text center bold"><a href="' + urls.blogHome + '">postit</a></div>');
        }, 2000);
    });

}

var socket = io.connect();
$(document).on("ready", main);