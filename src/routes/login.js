const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/login', LoginController.login);
router.get('/register', LoginController.register);
router.post('/register', LoginController.storeUsers);

module.exports = router;