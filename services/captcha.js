//验证码逻辑处理
const svgCaptcha = require('svg-captcha');
const session = require('express-session');

const CaptCha = {
    //生成验证码
    genCaptcha(req,res,next){
        //生成验证码
        const captcha = svgCaptcha.create({color:true,background:'#eee',noise:3,width:'120',height:'34'});
        //向session中保存验证码生成的字符串
        req.session.captcha = captcha.text;
        //响应返回生成的验证码svg
        res.type('svg');
        res.status(200).send(captcha.data);

    },
    //校验验证码
    verifyCaptcha(req,res,next){
        //从请求中获取待校验的验证码字符串
        const {code} = req.query;
        //与session中缓存的验证码比较：忽略大小写
        if(code.toUpperCase()===req.session.captcha.toUpperCase()){
            res.json({res_code:1,res_error:"",res_body:{valid:true}});
        }
        else{
            res.json({res_code:-1,res_error:"",res_body:{valid:false}});
        }
    }
}

module.exports = CaptCha;