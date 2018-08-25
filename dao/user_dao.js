const {User} = require("./modal.js");

const UserDao = {
    save(userinfo){
        const user = new User(userinfo);//new一个User对象
        return user.save();//返回promise对象
    },
    find(){},
    update(){},
    delete(){}
};

module.exports = UserDao;