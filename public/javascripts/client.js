$(document).on("ready", iniciar);

var socket = io.connect();

function iniciar() {

    $('#username').on('keyup', function () {
        socket.emit('getUser', $('#username').val());
    });

    $('#confirmPass').on('keyup', function () {
        if ($('#pass').val() == $('#confirmPass').val()) {
            $('#confirmPass').removeClass('bck b_red_light');
            $("#send").removeAttr('disabled').removeClass('b_sparkle_light');
        } else {
            $('#confirmPass').addClass('bck b_red_light');
            $("#send").attr('disabled','disabled').addClass('b_sparkle_light');
        }
    });

    
    // Sockets on events

    socket.on('getUser', function (data) {
        if (data == 'exist') {
            $('#username').addClass('bck b_red_light');
            $("#send").attr('disabled','disabled').addClass('b_sparkle_light');
        }
        if (data == 'notexist') {
            $('#username').removeClass('bck b_red_light');
            $("#send").removeAttr('disabled').removeClass('b_sparkle_light');
        }
    });

    socket.on('removePost', function (data) {
        $('#' + data._id).remove();
    });

    socket.on('newArticle', function (data) {
        $('#posts').prepend('<article id="' + data._id + '"class="text color c_jet margin_bottom_big"><header><h3 data-title="' + data.titleId + '" class="text normal">' + data.title + '</h3><div><small><i class="icon-calendar"></i> ' + data.postDate +' by <strong>' + data.username + '</strong></small><small> in <strong>' + data.category + '</strong></small></div></header><div data-content="postContent" class="margin_bottom_small">' + data.content + '</div><div class="bck b_jet_light padding_small text color c_jet_medium">Tagged as: ' + data.tags + '</div></article>');
    });

    socket.on('refreshArticle', function (data) {
        console.log(data);
        $('#' + data._id).find('[data-title]').html(data.title);
        $('#' + data._id).find('[data-content]').html(data.content);
        $('#' + data._id).find('[data-category]').html(data.category);
        $('#' + data._id).find('[data-tags]').html(data.tags);
    });
}