const path = require('path');

const morgan = require('morgan');
const fileStreamRotator = require('file-stream-rotator');

morgan.token('user', (req, res) => {
    return req.headers['token'] || '-'
});

morgan.token('params', (req, res) => {
    return JSON.stringify(req.query.keys ? req.query : req.body)
});

morgan.format('myproject', ':remote-addr - :remote-user :date[iso] :method :url :user :params :status :response-time[digits]ms :user-agent');

const AccessLogger = morgan('myproject', {
    stream: fileStreamRotator.getStream({
        date_format: 'YYYYMMDD',
        filename: path.join(__dirname, '../log', 'access-%DATE%.log'),
        frequency: 'daily',
        verbose: false
    })
});
module.exports = AccessLogger;
