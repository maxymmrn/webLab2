$('#submit').on('click',  () => {
    const comment = $('#comment');
    console.log(comment.val());
    if (comment.val() === '') {
        alert('Write your comment first')
    } else {
        console.log("yep");
        const appeal = formComment(comment.val());
        $('#appeals').append(appeal);
        comment.val('');
    }
});

const pad = n => {
    return (n < 10) ? ('0' + n) : n;
};

const formComment = (description) => {
    const date_obj = new Date();

    let li = $('<li class="appeal"></li>');

    let msg_head = $('<div class="msg_head"></div>');
    let name = $('<p></p>');
    let time = $('<p></p>');
    let date = $('<p></p>');

    let msg_info = $('<div class="msg_info"></div>');
    let info = $('<p></p>');

    const hours = pad(date_obj.getHours());
    const minutes = pad(date_obj.getMinutes());
    const day = pad(date_obj.getDate());
    const month = pad(date_obj.getMonth() + 1);
    const year = pad(date_obj.getFullYear());
    name.text('User');
    time.text(`${hours}:${minutes}`);
    date.text(`${day}.${month}.${year}`);

    info.text(description);

    msg_head.append(name);
    msg_head.append(time);
    msg_head.append(date);

    msg_info.append(info);

    li.append(msg_head);
    li.append(msg_info);

    return li;
};