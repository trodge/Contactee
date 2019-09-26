const express = require('express');
const mongojs = require('mongojs');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const db = mongojs('contactee', ['messages']);

app.post('/message', (req, res) => {
    db.messages.insert(req.body, () => res.sendStatus(200));
});

app.get('/messages', (req, res) => {
    db.messages.find((err, docs) => {
        res.json(docs);
    })
});

app.listen(process.env.PORT);