//引入mongose
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/logou');

//用户模型
const User = mongoose.model('user', { 
    username: String,
    password: String,
    email: String
});
//职位模型

module.exports = {User};