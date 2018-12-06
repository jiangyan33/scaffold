/**
 * 路由的主文件
 */
const user = require('./user');


function routes(app) {
    //用户模块
    app.use('/api/user', user);
}




//导出一个初始化路由的方法
module.exports = routes;