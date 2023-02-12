const bcrypt = require('bcrypt');

function index(req, res) {
    res.render('login/index');
}

function register(req, res) {
    res.render('login/register');
}

function storeUsers(req, res){
    const data = req.body;
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) =>{
            if(userdata.length > 0){
               res.render('login/register', {error: 'Error: Ese usuario ya existe!' })
            }else{
                bcrypt.hash(data.password, 12).then(hash => {
                    data.password = hash;

                    req.getConnection((err, conn) => {
                        conn.query('INSERT INTO users SET ?', [data], (err, rows) => {
                            res.redirect('/');
                        })
                    })
                })
            }
        })
    })
}

module.exports = {
    login: index, 
    register,
    storeUsers,
}