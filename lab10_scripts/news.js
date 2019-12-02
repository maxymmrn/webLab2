const xhr = new XMLHttpRequest();

const readNews = () => {
    xhr.open("GET", "http://localhost:8000/news");
    let news;

    xhr.onload = () => {
        $('main').empty();
        news = JSON.parse(xhr.response);
        for (let item of news) {
            let topic = item.topic;
            let description = item.description;
            let imgSrc = item.imgSrc;
            let post = formNew(topic, description, imgSrc);
            $('main').append(post);
        }
    };

    xhr.send();

};

const formNew = (topic, description, imgSrc) => {
    const div = $("<div class='news_item'></div>");
    const img = $(`<img src='${imgSrc}' alt="">`);
    const title = $(`<p>${topic}</p>`);
    const desc = $(`<p>${description}</p>`);

    div.append(img);
    div.append(title);
    div.append(desc);

    return div;
};
