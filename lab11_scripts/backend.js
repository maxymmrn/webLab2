const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://iotuser:iotuser@cluster0-azkwk.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.json({
    limit: "50mb"
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: "50mb"
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => console.log("Listening at http://localhost:" + port));

app.get('/appeals', (request, response) => {
    MongoClient.connect(url, (err, database) => {
        database.db("database").collection("appeals").find({}).toArray((err, result) => {
            if (err) throw err;
            let appeals = JSON.stringify(result);
            response.end(appeals);
        });
        database.close();
    });
});

app.post('/appeals', (request, response) => {
    MongoClient.connect(url, (err, database) => {
        database.db("database").collection("appeals")
            .insertOne(request.body, (error, result) => {
                if (error) throw error;
                response.end(JSON.stringify(request.body));
            });
        database.close();
    });
});

app.get('/news', (request, response) =>  {
    MongoClient.connect(url, (err, database) => {
        database.db("database").collection("news").find({}).toArray((err, result) => {
            if (err) throw err;
            let news = JSON.stringify(result);
            response.end(news);
        });
        database.close();
    });
});

app.post('/news', (request, response) => {
    MongoClient.connect(url, (err, database) => {
        database.db("database").collection("news")
            .insertOne(request.body, (error, result) => {
                if (error) throw error;
                response.end(JSON.stringify(request.body));
            });
        database.close();
    });
});