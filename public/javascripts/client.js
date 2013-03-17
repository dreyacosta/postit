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
		$('#' + data.titleId).remove();
	})

	socket.on('newArticle', function (data) {
		$('#posts').prepend('<article id="' + data.titleId + '"class="padding_small margin_bottom_big border_top"><header><h3 data-title="' + data.titleId + '" class="text color c_turquoise_dark normal">' + data.title + '</h3><div class="text color c_sparkle"><small>' + data.postDate +' by <strong>' + data.username + '</strong></small></div></header><div data-content="postContent" class="margin_bottom_small">' + data.content + '</div></article>');
	});

	socket.on('refreshArticle', function (data) {
		console.log(data);
		$('#' + data._id).find('[data-title]').html(data.title);
		$('#' + data._id).find('[data-content]').html(data.content);
		$('#' + data._id).find('[data-category]').html(data.category);
		$('#' + data._id).find('[data-tags]').html(data.tags);
	});
}