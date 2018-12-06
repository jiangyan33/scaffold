//通用的工具类
const crypts = require('crypts');

//加密字符串
function sha256(string) {
    let jm = crypts.sha256(string + '');
    console.log('原字符串:' + string, '加密后的字符串:' + jm);
    return jm;
}

//响应信息成功
function responseSuccess(res, data) {
    res.status(200);
    let info = {
        success: true,
        message: data
    }
    res.json(info);
}

//响应错误信息
function responseFail(res, message) {
    res.status(200);
    let info = {
        success: false,
        message: message
    }
    res.json(info);
}

module.exports = {
    sha256,
    responseSuccess,
    responseFail
}