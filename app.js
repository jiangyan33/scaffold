const http = require('http');
const config = require('config');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const AccessLogger = require('./utils/logger');


(async () => {
    const app = express();
    const server = http.createServer(app);

    // body解析
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // 生产环境下记录access日志
    if (app.get('env') !== 'test') {
        app.use(AccessLogger);
    }

    app.use((req, res, next) => {
        //跨域问题, 有个第三方库https://github.com/expressjs/cors
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "token,Content-Type");
        res.header("Access-Control-Max-Age", 1728000);
        if (req.method == 'OPTIONS') {
            res.send(true);
        } else {
            next();
        }
    });
    //初始化路由
    require('./routes/index')(app);

    // 挂载session
    app.use(session({
        secret: config.app['session-secret'],
        resave: false,
        saveUninitialized: false
    }));

    // error事件监听
    server.on('error', console.error);

    // 启动服务
    server.listen(config.app.port, () => console.log(`listening on ${config.app.port}...`));

    // 进程事件的监听
    process.on('uncaughtException', error => { // 未捕获的异常事件
        console.log("[App] 发现一个未处理的异常: ", error);
    }).on('unhandledRejection', (reason, p) => { // 未处理的rejection事件
        console.log("[App] 发现一个未处理的rejection: ", p, "原因: ", reason);
    });
})();