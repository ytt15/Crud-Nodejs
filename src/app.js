const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');

const loginRoutes = require('./routes/login');

const app = express();
app.set('port', 4500);

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs',
}))

app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'nodeCrud'
}));

app.use(session({
    secret: 'secret',
    resave: true, 
    saveUninitialized: true
}))

app.listen(app.get('port'), () => {
    console.log('prueba puerto', app.get('port'));
});

app.use('/', loginRoutes);

app.get('/', (req, res) => {
    res.render('home');
});
