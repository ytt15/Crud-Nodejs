function index(req, res) {
    res.render('login/index');
}

function register(req, res) {
    res.render('login/register');
}

function storeUsers(req, res){
    const data = req.body;
    console.log(data);
}

module.exports = {
    login: index, 
    register,
    storeUsers,
}