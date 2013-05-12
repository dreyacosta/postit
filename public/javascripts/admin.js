$(document).on("ready", iniciar);

var socket = io.connect();

function iniciar() {

    // Sockets events

    socket.on('message', function (data) {
        console.log('data ' + data);
        if (data == 'Saved') {
            $('[data-message]').removeClass('b_red_light b_white c_red');
            $('[data-message]').addClass('b_green_light c_green');
        }
        if (data == 'User update'){
            $('[data-message]').removeClass('b_green_light b_white c_green');
            $('[data-message]').addClass('b_green_light c_red');
        }
        if (data == 'The post ID exist. Change the slug ;-)') {
            $('[data-message]').removeClass('b_green_light b_white c_red');
            $('[data-message]').addClass('b_red_light c_green');
        }
        $('[data-message]').html(data);
        $('[data-message]').fadeIn().delay(1000);
    });

    // Button actions

    $('textarea').autosize();

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

    $('[name="updatePost"]').on('click', function () {
        var id = $(this).closest('article').attr('id');
        var newId = $('#' + id).find('[data-titleid]').html();
        var title = $('#' + id).find('[data-title]').html();
        var content = $('#' + id).find('[data-content]').val();
        var tags = $('#' + id).find('[data-tags]').html();
        var category = $('#' + id).find('[data-category]').html();
        var toSend = {
            newId: newId,
            id: id,
            title: title,
            category: category,
            tags: tags,
            content: content
        };

        console.log(toSend);

        socket.emit('updateArticle', toSend);
    });

    $('button[name="removePost"]').on('click',function() {
        var id = $(this).attr('id');
        console.log('Remove id ' + id);
        $.ajax({
            type: "POST",
            url: "/remove/post/",
            data: {id: id}
        });
    });

    $('button[name="userUpdate"]').bind('click', function () {
        var username = $('[data-username]').attr('id');
        var fullName = $('#' + username).find('input[name="fullName"]').val();
        var email = $('#' + username).find('input[name="email"]').val();
        var accountState = $('#' + username).find('input[name="accountState"]').val();
        var role = $('#' + username).find('input[name="role"]').val();

        var toSend = {
            username: username,
            fullName: fullName,
            email: email,
            accountState: accountState,
            role: role
        };

        socket.emit('updateUser', toSend);
    });

    $('button[name="removeUser"]').bind('click',function() {
        var id = $(this).attr('id');
        $.ajax({
            type: "POST",
            url: "/remove/user/",
            data: {id: id}
        });
        $('#' + id).remove();
        $('[data-role]').hide();
    });

}