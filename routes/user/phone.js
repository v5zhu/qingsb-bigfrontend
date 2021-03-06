var express = require('express');
var router = express.Router();
var ModelProxy, phoneModel;
ModelProxy = require('./../../proxy/DataProxy').DataProxy;
phoneModel = ModelProxy.create("phone.*");

/*****************检测手机号是否已注册**********************/
router.post("/check", function (req, res) {
    //真正请求后台接口的路由
    req.session = {};
    console.log("time:"+new Date().getMilliseconds()+"(3)phone>>>"+req.body.phone);
    phoneModel.check({phone:req.body.phone}).done(function (data) {
        console.log("检测手机号,后端返回数据>>>" + JSON.stringify(data));
        res.send(data);
    }).fail(function (error) {
        console.log("error>>" + error);
        res.send(error);
    });
});

/*****************生成验证码**********************/
router.get("/code", function (req, res) {
    //真正请求后台接口的路由
    req.session = {};
    console.log("(3)phone>>>"+req.query.phone);
    phoneModel.generateCode({phone:req.query.phone}).done(function (data) {
        console.log("生成验证码成功,后端返回数据>>>" + JSON.stringify(data));
        res.send(data);
    }).fail(function (error) {
        console.log("error>>" + error);
        res.send(error);
    });
});
module.exports = router;