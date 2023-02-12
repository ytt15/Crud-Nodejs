const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const morgan = require('morgan');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');

const loginRoutes = require('./routes/login');

const app = express();
app.set('port', 4500);

//LLAMADO DE VISTAS EN EL DIRECTORIO DE VIEWS
app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs',
}))

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//CONEXION BD
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

//Starting in the server
app.listen(app.get('port'), () => {
    console.log('prueba puerto', app.get('port'));
});

app.use('/', loginRoutes);

app.get('/', (req, res) => {
    res.render('home');
});
