class IndexDB {

    constructor() {
        let request = indexedDB.open("Database", 4);

        request.onupgradeneeded = event => {
            console.log("Upgrade");

            this.db = event.target.result;
            this.db.createObjectStore("appeals", {
                autoIncrement: true
            });
            this.db.createObjectStore("news", {
                autoIncrement: true
            });
        };

        request.onsuccess = event => {
            console.log("Success");
            this.db = event.target.result;
        };

        request.onerror = error => {
            console.log(error);
        };
    }

    get appeals() {
        let tx = this.db.transaction("appeals", "readonly");

        tx.oncomplete = event => {
            console.log("getting appeals");
        };

        let data = tx.objectStore("appeals").getAll();
        data.onsuccess = () => {
            console.log("transaction ended");
        };

        return data;
    }

    get news() {
        let tx = this.db.transaction("news", "readonly");

        tx.oncomplete = event => {
            console.log(event);
        };

        return tx.objectStore("news").getAll();
    }

    saveAppeal(comment) {
        let tx = this.db.transaction("appeals", "readwrite");

        tx.oncomplete = event => {
            console.log(event);
        };

        tx.objectStore("appeals").add({
            comment: comment
        });
    }

    saveNews(imgSrc, topic, description) {
        let tx = this.db.transaction("news", "readwrite");

        tx.oncomplete = event => {
            console.log(event);
        };

        tx.objectStore("news").add({
            imgSrc: imgSrc,
            topic: topic,
            description: description
        });
    }
}