let newsDB = new IndexDB();

const isOnline = () => {
    return window.navigator.onLine;
};

const sendToServer = () => {};

$('.submit').on('click',  () => {
    const newImg = $('.new_img');
    const topic = $('.topic');
    const description = $('.description');
    if (topic.val().trim() === '') {
        alert('Topic is empty');
    } else if (description.val().trim() === '') {
        alert('Where is description?');
    } else if (newImg.attr('src') === 'images/add-image.svg') {
        alert("Add some picture");
    } else {
        alert("Well done");
        if (isOnline()) {
            sendToServer();
            newImg.attr('src', 'images/add-image.svg');
            topic.val('');
            description.val('');
        } else {
            newsDB.saveNews(newImg.attr('src'), topic.val(), description.val());
            newImg.attr('src', 'images/add-image.svg');
            topic.val('');
            description.val('');
        }
    }
});


$('.file_reader').on('change', ev => {
    let file = ev.target.files[0];
    let fr = new FileReader();

    fr.onload = ev2 => {
        console.dir(ev2);
        $('.new_img').attr('src', ev2.target.result);
    };

    fr.readAsDataURL(file);
});

$('.new_img').on('click', () => {
    $('.file_reader').trigger('click');
});