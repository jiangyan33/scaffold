
const { createPool } = require('mysql2/promise');
//配置一个数据库就可以，写语句的时候可以加上数据库的名字
const pool = createPool(require('config').get('database')['db']);

/**
 * 执行单条SQL语句
 */
module.exports = async function execute(sql, ...params) {
    // 获取数据库连接
    let connection = await pool.getConnection();
    console.log(sql);
    console.log(params);
    try {
        // 执行SQL
        let [rows, fields] = await connection.execute(sql, params);
        // 返回SQL执行数据
        return rows;
    } finally {
        // 释放数据库连接
        connection.release();
    }
}
