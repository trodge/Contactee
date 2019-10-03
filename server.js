const express = require('express');
const mongojs = require('mongojs');

const app = express();

app.use(allow);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const db = mongojs(process.env.MONGODB_URI, ['messages']);

app.post('/', (req, res) => {
    db.messages.insert(req.body, () => res.sendStatus(200));
});

app.get('/', (req, res) => {
    db.messages.find((err, docs) => {
        res.json(docs);
    })
});

app.listen(process.env.PORT);

function allow(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
};