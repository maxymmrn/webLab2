const xhr = new XMLHttpRequest();

const isOnline = () => {
    return window.navigator.onLine;
};

const sendToServer = (imgSrc, topic, description) => {
    xhr.open("POST", "http://localhost:8000/news");

    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log("Prepared");
        }
    };

    xhr.send(JSON.stringify({
        imgSrc: imgSrc,
        topic: topic,
        description: description
    }));
};


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
            sendToServer(newImg.attr('src'), topic.val(), description.val());
            newImg.attr('src', 'images/add-image.svg');
            topic.val('');
            description.val('');
        } else {
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