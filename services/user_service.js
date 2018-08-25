const UserDao = require("../dao/user_dao.js");

const UserService = {
    login(){},
    register(req,res,next){
        //获取在请求中传递的用户信息
        const {username,password,email} =req.body;
        //验证用户名是否已被注册
        //...

        //保存用户信息
        UserDao
        .save({username,password,email})
        .then((data)=>{//then:处理成功
            res.json({res_code:1,res_err:"",res_body:data})
        })
        .catch((err)=>{//catch:处理失败
            res.json({res_code:-1,res_err:err,res_body:{}})
        })
    },
};

module.exports = UserService;