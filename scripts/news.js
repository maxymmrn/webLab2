let newsDB = new IndexDB();

const readNews = () => {
    if (isOnline()) {
        setTimeout(() => {
            newsDB.news.onsuccess = event => {
                let news = event.target.result;
                for (let item of news) {
                    let topic = item.topic;
                    let description = item.description;
                    let imgSrc = item.imgSrc;
                    let news = formNew(topic, description, imgSrc);
                    $('main').append(news);
                }
            }
        }, 1000);
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



const db = new IndexDB();