$(document).ready(function () {
    $('.user-list').click(function () {
        var get_userId = $(this).attr('data-id');
        receiver_id = get_userId;
        $("#chat-container").html('');
        $('.start-head').hide();
        $('.chat-section').show();
        loadOldchat();
    });
    $('#chat-form').submit(function (e) {
        e.preventDefault();
        var mesg = $('#message').val(); // .val() should be used to get the input value, not .value.
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: 'send', // Use the dynamic URL here
            type: "POST",
            data: { s_id: sender_id, r_id: receiver_id, msg: mesg },
            success: function (res) {
                if (res.success) {
                    $('#message').val(''); // Clear the message input
                    let chat = res.data.message;
                    let html1 = "<div class='current-user-chat'>" + "<h3>" + chat + "</h3>" + "</div>";
                    $("#chat-container").append(html1);
                } else {
                    alert(res.msge);
                }
            }
        });
    });
});
function loadOldchat() {
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: 'loadOldChat',
        type: 'POST',
        data: { sender_id: sender_id, receiver_id: receiver_id },
        success: function (result) {
            if (result.success) {
                let chat = result.data;
                let name = '';
                let html4 = "";
                for (x = 0; x < chat.length; x++) {
                    let addclass = '';
                    if (chat[x].sender_id == sender_id) {
                        addclass = "current-user-chat";
                        name = result.s;
                    } else {
                        addclass = "distance-user-chat";
                        name = result.r;
                    }
                    html4 += "<div class='" + addclass + "'><h3>" + chat[x].message + "<sup >" + name + "</sup></h3></div>";
                }
                $("#chat-container").append(html4);
            }
            else {
                alert(result.msg);
            }
        }
    });
}
Echo.join('status-update')
    .here((user) => {
        for (x = 0; x < user.length; x++) {
            if (sender_id != user[x]['id']) {
                $('#' + user[x]['id'] + '-status').removeClass('offline-status');
                $('#' + user[x]['id'] + '-status').addClass('online-status');
                $('#' + user[x]['id'] + '-status').text('online');
            }
        }

    }).joining((user) => {
        // console.log(user.name + 'joined');
        $('#' + user.id + '-status').removeClass('offline-status');
        $('#' + user.id + '-status').addClass('online-status');
        $('#' + user.id + '-status').text('online');
    }).leaving((user) => {
        // console.log(user.name + 'leaved');
        $('#' + user.id + '-status').addClass('offline-status');
        $('#' + user.id + '-status').removeClass('online-status');
        $('#' + user.id + '-status').text('offline');
    }).listen('UserStatusEvent', (ei) => {
        // console.log(ei);
    });
Echo.private('broadcast-message').listen('.getchatMessage', (eventdata) => {
    // console.log(eventdata + " sender_id" + sender_id + " receiverid " + eventdata.chat.receiver_id);
    // console.log(sender_id + " " + eventdata.chat.receiver_id + "  " + receiver_id + " " + eventdata.chat.sender_id);
    if (sender_id == eventdata.chat.receiver_id && receiver_id == eventdata.chat.sender_id) {
        let html = "<div class='distance-user-chat'>" + "<h3>" + eventdata.chat.message + "</h3>" + "</div>";
        $("#chat-container").append(html);
    }
});