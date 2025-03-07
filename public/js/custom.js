
$(document).ready(function () {
    $('.user-list').click(function () {
        $('.start-head').hide();
        $('.chat-section').show();
    });
});
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