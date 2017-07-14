var express = require('express');
var router = express.Router();
const pg = require("pg");
const Pool = pg.Pool;
const config = {
    host: "47.94.226.150",
    user: "postgres",
    password: "986619667",
    database: "chatroom",
};
var pool=new Pool(config);
console.log('我是log');
router.post('/login', function(req, res) {
    console.log(req.body);
    var sql = "SELECT userpassword FROM public.user WHERE username='" + req.body.username + "'";
    console.log(sql);
    pool.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }
        if(result.rows[0]===undefined)
        {
            res.send('不存在此用户名')
        }
        else if(result.rows[0].userpassword == req.body.password) {
            var user = {
                username: req.body.username,
                password: req.body.password
            }
            req.session.user = user;
            res.send('y');



        } else {
            res.send('用户名与密码不匹配');
        }


    })

});

router.post('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        }
        console.log(1);
    })

    console.log(2);
    res.send('y');
})
router.post('/logup', function(req, res) {
    console.log(req.body);
    var sql = "INSERT INTO public.user (username,userpassword) VALUES ('" + req.body.username + "', '" + req.body.password + "')";
    console.log(sql);
    var user_table = "CREATE TABLE user_" + req.body.username + "(action VARCHAR, time VARCHAR)";
    console.log(user_table);
    pool.query(user_table, function(err, result) {
        if (err) {
            console.log(err);
        }


    });


    pool.query(sql, function(err, result) {
        if (err) {
            console.log(err);
            res.send('error');
        } else {

            console.log(result);
            res.send('成功插入');
        }
    })
});
module.exports = router;