let express = require('express');
let consola = require('consola');
let router = express.Router();
//调用MySQL模块
const mysql = require('mysql');




/* GET users listing. */
router.get('/', function(req, res, next) {
    consola.start('你的express服务已经启动成功，下面这些东西是服务器返回的')
    consola.info('Hello World!')
    res.send('Hello World!');
    // get 请求获取参数
    // let mobile = req.query.mobile
    // let password = req.query.password
});

// 注册
router.post('/register', function(req, res) {
    consola.info('成功拉取register接口~~')
    let mobile = req.param('mobile')
    let password = req.param('password')

    if (mobile && password) {
        if (mobile.length != 11 || password.length < 6) {
            res.send({
                data: null,
                message: '手机号或者密码非法，密码长度至少6位',
                status: 10001
            })
        } else {
            let connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'root',
                database: 'express'
            });
            connection.connect();
            connection.query('SELECT * FROM user_info  WHERE mobile =' + mobile, function(error, results, fields) {
                console.log(results[0])
                console.log(1)
                if (results.length !== 0 && results[0].mobile === mobile) {
                    res.send({
                        data: null,
                        message: '手机号码已经被注册',
                        status: 10004
                    })
                } else {
                    connection.query('INSERT INTO user_info(mobile, password) VALUES(' + mobile + ',' + password + ')', function(error, results, fields) {
                        if (error) {
                            throw error
                        } else {
                            console.log(results)
                            console.log(results)
                            res.send({
                                data: {
                                    text: '注册成功'
                                },
                                message: '',
                                status: 200
                            })
                        }

                    });
                    connection.end();
                }
            })
        }
    } else {
        res.json({
            data: null,
            message: '手机号码或者密码不能为空',
            status: 10004
        })
        // res.send({
        //     data: null,
        //     message: '手机号码或者密码不能为空',
        //     status: 10004
        // })
    }
});

// 登录
router.post('/login', function(req, res) {
    consola.info('成功拉取login接口~~')
    let mobile = req.param('mobile')
    let password = req.param('password')

    if (mobile && password) {

        let connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'express'
        });
        connection.connect();
        connection.query('SELECT * FROM user_info  WHERE mobile =' + mobile, function(error, results, fields) {
            console.log(results[0])
            console.log(1)
            if (results.length !== 0 && results[0].mobile === mobile && results[0].password === password) {
                res.send({
                    data: null,
                    message: '登录成功',
                    status: 200
                })
            } else {
                res.send({
                    data: null,
                    message: '帐号或者密码错误',
                    status: 10006
                })
            }
        })

    } else {
        res.json({
            data: null,
            message: '手机号码或者密码不能为空',
            status: 10004
        })
        // res.send({
        //     data: null,
        //     message: '手机号码或者密码不能为空',
        //     status: 10004
        // })
    }
})


module.exports = router;