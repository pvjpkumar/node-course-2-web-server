const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `{now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Welcome to My HBS Page in Express',
        welcomeDesc: 'This is the description of the page. I have created this using NodeJS, Express and HandleBars aka HBS',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle:'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error Response as no data'
        });
});

app.listen(3000, () => {
    console.log("Server is up and running on port 3000")
});