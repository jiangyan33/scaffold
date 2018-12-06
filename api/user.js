/**
 * 用户模块接口详情
 */
const utils = require('../utils/utils');
const execute = require('../utils/mysql');


//登陆接口
async function login(req, res) {
    try {
        let { username, password } = req.query;
        if (!username || !password) {
            return utils.responseFail(res, '请求参数有误');
        }
        password = utils.sha256(password);
        let sql = `select * from demo.user where username = ? and password = ? limit 1`;
        let userList = await execute(sql, username, password);
        if (!userList || userList.length === 0) {
            return utils.responseFail(res, '用户名或者密码有误');
        }
        return utils.responseSuccess(res, { token: userList[0].token });
    } catch (error) {
        utils.responseFail(res, 'user_login');
    }
}

module.exports = {
    login
}