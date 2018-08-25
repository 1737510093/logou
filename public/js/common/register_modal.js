//注册模态框构造函数
function registerModal(){
    this.createDom();
    this.addListener();
};

//注册模态框模板
registerModal.template=`<div class="modal fade" id="registerModal" tabindex="-1" role="dialog">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="registerTitle">用户注册</h4>
        </div>
        <div class="modal-body">
            <form class="register-form">
                <div class="form-group">
                    <label for="registerName">用户名</label>
                    <input type="text" class="form-control" name="username" id="registerName" placeholder="输入用户名">
                </div>
                <div class="form-group">
                    <label for="registerPwd">密码</label>
                    <input type="password" class="form-control" name="password" id="registerPwd" placeholder="输入密码">
                </div>
                <div class="form-group">
                    <label for="registerRepwd">确认密码</label>
                    <input type="password" class="form-control" id="registerRepwd" placeholder="再次输入密码">
                </div>
                <div class="form-group">
                    <label for="registerEmail">邮箱</label>
                    <input type="email" class="form-control" name="email" id="registerEmail" placeholder="输入Email地址">
                </div>
                <div class="form-group input-group">
                    <label for="registerCode">验证码</label>
                    <input type="text" class="form-control" id="registerCode" placeholder="验证码">
                    <span class="code-info" >信息</span>
                    <p class="help-block code-img">这是个验证码图片</p>
			    </div>

            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary btn-register">注册</button>
        </div>
    </div>
</div>
</div>`;

//原型
$.extend(registerModal.prototype,{
    //创建注册模态框元素并渲染
    createDom(){
        $(registerModal.template).appendTo("body");
    },
    //注册事件监听
    addListener(){
        $('#registerCode').on('blur',this.verifyHandle);
        $('.btn-register').on('click',this.registerHandle);
    },
    //校验验证码
    verifyHandle(){
       const code = $('#registerCode').val();
        $.get('/captcha/verify',{code},(data)=>{
            if(data.res_code===1){
                $('.code-info').text("正确")
            }
            else{
                $('.code-info').text("错误")
            }
        })
    },

    //处理注册业务
    registerHandle(){
        const data = $('.register-form').serialize();
        console.log(data);
        //ajax请求
        $.post('/users/register',data,(resData)=>{
            console.log(resData);
        },'json')
    }
});
