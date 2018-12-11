const router = require('express').Router();
const User = require('../api/user');

//用户模块的路由
router.get('/user', User.login);


module.exports = router;