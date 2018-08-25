//头部对象构造函数
function Header(){
    this.createDom();
    this.createModal();
    this.addListener();
};

//头部模板
Header.template=`<nav class="container navbar navbar-inverse" style="border-radius: 0px">
<div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">拉钩网管理系统</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
            <li class="active">
                <a href="/index.html">首页
                    <span class="sr-only">(current)</span>
                </a>
            </li>
            <li>
                <a href="/html/position.html" target="_blank">职位管理</a>
            </li>
        </ul>
        <ul class="nav navbar-nav navbar-right not-login">
            <li data-toggle="modal" data-target="#loginModal" class="link-login">
                <a href="#">登录</a>
            </li>
            <li data-toggle="modal" data-target="#registerModal" class="link-register">
                <a href="#">注册</a>
            </li>
        </ul>
        <ul class="nav navbar-nav navbar-right login-success hide">
	        <li><a href="#">你好，xxx</a></li>
            <li><a href="#">注销</a></li>
	      </ul>
    </div>
</div>
</nav>`;

$.extend(Header.prototype,{
    //创建dom元素并渲染
    createDom(){
        $(Header.template).appendTo("header");//将头部模板渲染到header元素中
    },
    //创建模态框
    createModal(){
        new loginModal();
        new registerModal()
    },
    //注册事件监听
    addListener(){
        $(".link-login,.link-register").on("click",this.genCaptchaHandle);
    },
    //生成验证码
    genCaptchaHandle(){
        $.get("/captcha/gencode",(data)=>{
            // console.log(data);
            $(".code-img").html(data);
        },"text");
    }
});

//创建头部对象实例
new Header();