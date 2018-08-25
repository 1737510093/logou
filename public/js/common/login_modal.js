//登录模态框构造函数
function loginModal(){
    this.createDom();
    this.addListener();
};

//模态框模板
loginModal.template=`<div class="modal fade" id="loginModal" tabindex="-1" role="dialog">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="loginTitle">用户登录</h4>
        </div>
        <div class="modal-body">
            <form class="login-form">
                <div class="form-group">
                    <label for="loginName">用户名</label>
                    <input type="text" class="form-control" name="username" id="loginName" placeholder="输入用户名">
                </div>
                <div class="form-group">
                    <label for="loginPwd">密码</label>
                    <input type="password" class="form-control" name="password" id="loginPwd" placeholder="输入密码">
                </div>
                
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary btn-login">登录</button>
        </div>
    </div>
</div>
</div>`;

//原型
$.extend(loginModal.prototype,{
    //创建dom元素并渲染
    createDom(){
        $(loginModal.template).appendTo("body");
    },

    //注册事件监听
    addListener(){
        //点击登录
        $(".btn-login").on("click",this.loginHandle);
    },
    //
    loginHandle(){
        //待传递到服务器的用户登录数据信息
        var data = $(".login-form").serialize();
        console.log(data);
        //ajax提交登录处理
        $.post("/users/login",data,(resData)=>{
            console.log(resData);
        }).done(()=>{
            $('#loginModal').modal('hide');//模态框隐藏
        }).done(()=>{
            //显示欢迎用户，隐藏登录按钮
            $('.login-success').removeClass('hide').siblings('.not-login').addClass('hide');
        })
    }

}) ;
