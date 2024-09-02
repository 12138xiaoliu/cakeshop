// 引入后台资源
// const mysql = require('mysql')
import { createRequire } from 'module';
import mysql from 'mysql'
import cors from 'cors'
import { error } from 'console';
const require = createRequire(import.meta.url);
const express = require('express')
const app = express()
app.use(express.json())
app.use(cors())

// 数据库连接对象
const client = mysql.createConnection({
    host: 'localhost', //数据域名 地址
    user: 'root', //数据名称
    password: '209354',
    database: 'node_db',
})
let Sql_result
// 数据库查询函数
function Sql_func(sql) {
    return new Promise((resolve, reject) => {
        client.query(sql, (err, res) => {
            if (err)
                reject("执行sql查询失败")
            console.log("--sql_result--", JSON.parse(JSON.stringify(res)));
            resolve(JSON.parse(JSON.stringify(res)))
        })
    })
}

app.get('/test', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // *表示都可以跨域访问

    // 拿取返回结果时需要注意异步操作
    let result = Sql_func('select * from user').then((result) => {
        res.send(result)
    })
})

app.get('/test2', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // *表示都可以跨域访问
    Sql_func2('select * from user').then((result) => {
        console.log("result", result);
        res.send(result)
    })

})


app.listen(8899, () => {
    console.log("后台服务开启")
})