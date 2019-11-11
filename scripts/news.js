const readNews = () => {
    if (isOnline()) {
        for (let key in localStorage) {
            console.log(key.substring(0, 4));
            if (key.substring(0, 4) === `news`) {
                let args = JSON.parse(localStorage.getItem(key));
                let topic = args[0];
                let description = args[1];
                let imgSrc = args[2];
                let news = formNew(topic, description, imgSrc);
                $('main').append(news);
            }
        }
        localStorage.clear();
    }
};

const isOnline = () => {
    return window.navigator.onLine;
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