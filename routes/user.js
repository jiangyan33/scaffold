const router = require('express').Router();
const user = require('../api/user');

//用户模块的路由
router.get('/user', user.login);


module.exports = router;