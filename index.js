const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


app.set('view engine', 'pug');
app.set('views', './views');

const monk = require('monk');

// Connection URL
const url = 'localhost:27017/MeanSanta';

const db = monk(url);
const usersCollection = db.get('users', {});

// usersCollection.insert({name: 1})
//     .then(() => {
//         return usersCollection.update({a: 2}, {$set: {b: 1}})
//     })
//     .then(() => db.close());

// usersCollection.findOne({name: "Matt"})
//     .then(console.log);

db.then(() => {
    console.log('Connected correctly to server');
});

app.get('/', (req, res) => {
    res.render('index', {title: 'Hey', message: 'Happy 2020 :)'})
});


app.get('/login', (req, res) => res.send(`Welcome to secret <b>login</b> page`));

app.get('/users', (req, res) => {

    usersCollection.find({}, {name})
        .then((user) => {
            res.render('userProfile', {userName: user.name, userOccupation: user.occupation})
        });
});

app.get('/users/:userGUID', (req, res) => {

    usersCollection.findOne({_id: req.params.userGUID})
        .then((user) => {
            res.render('userProfile', {userName: user.name, userOccupation: user.occupation})
        });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

